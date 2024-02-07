import { useEffect, useState } from 'react';

import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';

const useRockOnyxVaultContract = () => {
  const address = useAddress();

  const signer = useSigner();

  const [availableWithdrawalAmount, setAvailableWithdrawalAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);

  const { contract } = useContract(rockOnyxVaultAddress, rockOnyxUsdtVaultAbi);

  const { data: balanceOfData } = useContractRead(contract, 'balanceOf', [address]);

  const { data: totalValueLockedData } = useContractRead(contract, 'totalValueLocked', []);

  const { data: pricePerShareData } = useContractRead(contract, 'pricePerShare');

  const { mutateAsync: deposit, isLoading: isDepositing } = useContractWrite(contract, 'deposit');

  const { mutateAsync: initiateWithdrawal, isLoading: isInitiatingWithdrawal } = useContractWrite(
    contract,
    'initiateWithdrawal',
  );
  const { mutateAsync: completeWithdraw, isLoading: isCompletingWithdraw } = useContractWrite(
    contract,
    'completeWithdrawal',
  );

  const balanceOf = balanceOfData ? Number(ethers.utils.formatUnits(balanceOfData._hex, 6)) : 0;

  const totalValueLocked = totalValueLockedData
    ? Number(ethers.utils.formatUnits(totalValueLockedData._hex, 6))
    : 0;

  const pricePerShare = pricePerShareData
    ? Number(ethers.utils.formatUnits(pricePerShareData._hex, 6))
    : 0;

  useEffect(() => {
    const onGetAvailableWithdrawalAmount = async () => {
      try {
        const usdcContract = new ethers.Contract(
          rockOnyxVaultAddress,
          rockOnyxUsdtVaultAbi,
          signer,
        );

        const response = await usdcContract.getAvailableWithdrawlAmount();

        if (response && response[0]) {
          setAvailableWithdrawalAmount(Number(ethers.utils.formatUnits(response[0]._hex, 6)));
        }
      } catch (error) {
        console.log('@error', error);
      }
    };

    onGetAvailableWithdrawalAmount();
  }, [signer]);

  useEffect(() => {
    const onGetDepositAmount = async () => {
      try {
        const usdcContract = new ethers.Contract(
          rockOnyxVaultAddress,
          rockOnyxUsdtVaultAbi,
          signer,
        );

        const response = await usdcContract.getDepositAmount();
        if (response) {
          setDepositAmount(Number(ethers.utils.formatUnits(response._hex, 6)));
        }
      } catch (error) {
        console.log('@error', error);
      }
    };

    onGetDepositAmount();
  }, [signer]);

  useEffect(() => {
    const onGetPnl = async () => {
      try {
        const usdcContract = new ethers.Contract(
          rockOnyxVaultAddress,
          rockOnyxUsdtVaultAbi,
          signer,
        );

        const response = await usdcContract.getPnL();
        if (response && response[0]) {
          setProfit(Number(ethers.utils.formatUnits(response[0]._hex, 6)));
        }

        if (response && response[1]) {
          setLoss(Number(ethers.utils.formatUnits(response[1]._hex, 6)));
        }
      } catch (error) {
        console.log('@error', error);
      }
    };

    onGetPnl();
  }, [signer]);

  return {
    isDepositing,
    isInitiatingWithdrawal,
    isCompletingWithdraw,
    balanceOf,
    totalValueLocked,
    pricePerShare,
    availableWithdrawalAmount,
    depositAmount,
    profit,
    loss,
    deposit,
    initiateWithdrawal,
    completeWithdraw,
  };
};

export default useRockOnyxVaultContract;