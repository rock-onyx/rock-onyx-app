'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { SupportedCurrency } from '@/@types/enum';
import { FLOAT_REGEX } from '@/constants/regex';
import useAppConfig from '@/hooks/useAppConfig';
import useApprove from '@/hooks/useApprove';
import useDeposit from '@/hooks/useDeposit';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';
import useUsdcQueries from '@/hooks/useUsdcQueries';
import { formatTokenAmount } from '@/utils/number';

import ConfirmDialog from '../shared/ConfirmDialog';
import CurrencySelect from '../shared/CurrencySelect';
import TransactionStatusDialog from '../shared/TransactionStatusDialog';
import { SpinnerIcon, WarningIcon } from '../shared/icons';

const VaultDeposit = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(
    SupportedCurrency.Usdc,
  );
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const { transactionBaseUrl } = useAppConfig();
  const { isOpen, type, url, onOpenDialog, onCloseDialog } = useTransactionStatusDialog();

  const { status } = useAccount();

  const { balanceOf, pricePerShare } = useRockOnyxVaultQueries();
  const { allowance, balance } = useUsdcQueries();
  const { isApproving, approve } = useApprove();
  const { isDepositing, isConfirmedDeposit, isDepositError, depositTransactionHash, deposit } =
    useDeposit();

  useEffect(() => {
    if (isConfirmedDeposit) {
      setInputValue('');
      onOpenDialog('success', `${transactionBaseUrl}/${depositTransactionHash}`);
    }
  }, [isConfirmedDeposit]);

  useEffect(() => {
    if (isDepositError) {
      onOpenDialog('failed');
    }
  }, [isDepositError]);

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.match(FLOAT_REGEX)) setInputValue(value);
  };

  const handleClickMax = () => {
    setInputValue(balance?.formatted ?? '');
  };

  const handleConfirm = async () => {
    setIsOpenConfirmDialog(false);
    try {
      const amount = ethers.utils.parseUnits(inputValue, 6);

      if (!skipApprove) {
        await approve(amount);
      }

      await deposit(amount);
    } catch {
      onOpenDialog('failed');
    }
  };

  const isConnectedWallet = status === 'connected';
  const isButtonLoading = isDepositing || isApproving;
  const disabledButton = !isConnectedWallet || !inputValue || isButtonLoading;
  const skipApprove = allowance > 0 && Number(inputValue) <= allowance;

  return (
    <div>
      {!isConnectedWallet && (
        <div className="flex items-center gap-2 mt-12">
          <WarningIcon />
          <p className="text-sm font-normal text-rock-yellow">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between mt-12">
        <p className="text-lg lg:text-xl text-rock-gray font-semibold uppercase">{`Amount (${selectedCurrency})`}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-rock-gray">
            Wallet Balance: {balance ? formatTokenAmount(Number(balance.formatted)) : '0'} USDC
          </p>
          <button
            type="button"
            className="border border-rock-primary rounded-full px-3 py-0.5 text-sm font-light uppercase hover:ring-2 hover:ring-blue-800"
            onClick={handleClickMax}
          >
            Max
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        <input
          className="w-full h-20 block bg-[#5A5A5A] rounded-xl bg-opacity-10 pl-8 pr-[180px] text-2xl text-rock-gray focus:ring-2 focus:outline-none"
          type="text"
          placeholder="0.0"
          disabled={!isConnectedWallet}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
        <div className="absolute top-1.5 right-6">
          <CurrencySelect value={selectedCurrency} onChange={setSelectedCurrency} />
        </div>
      </div>
      {pricePerShare > 0 && (
        <p className="w-full text-right text-rock-gray text-xs font-light mt-2">{`1 roUSD = ${formatTokenAmount(
          pricePerShare,
        )} ${selectedCurrency.toUpperCase()}`}</p>
      )}

      <div className="flex items-center justify-between mt-8 text-rock-gray">
        <p>You will receive</p>
        <div className="flex items-center justify-between gap-2">
          <p>{`${formatTokenAmount(Number(inputValue) / Number(pricePerShare))} roUSD`}</p>
        </div>
      </div>

      <div
        className="w-full h-[1px] my-3 lg:my-6"
        style={{
          background:
            'linear-gradient(270deg, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
        }}
      />

      <div className="flex items-center justify-between text-sm lg:text-base text-rock-gray">
        <p>Current Deposit</p>
        <p>{`${formatTokenAmount(balanceOf)} USDC`}</p>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-rock-primary text-sm lg:text-base text-white font-light rounded-full uppercase mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20 text-opacity-40' : ''
        } ${isButtonLoading ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={() => setIsOpenConfirmDialog(true)}
      >
        {isButtonLoading && <SpinnerIcon className="w-6 h-6 animate-spin" />}
        {skipApprove ? 'Deposit' : 'Approve'}
      </button>

      <TransactionStatusDialog isOpen={isOpen} type={type} url={url} onClose={onCloseDialog} />

      <ConfirmDialog
        isOpen={isOpenConfirmDialog}
        title="You are about to deposit into your account"
        description="Please be aware that this transaction is being processed in our beta version. If you encounter any issues or discrepancies, kindly report them to our support team."
        confirmText="Continue"
        onCancel={() => setIsOpenConfirmDialog(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default VaultDeposit;
