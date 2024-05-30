'use client';

import { Card } from '@nextui-org/react';

import { WalletConnectStatus } from '@/@types/wallet';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

import Typography from '../shared/Typography';

type PortfolioOverviewProps = {
  status: WalletConnectStatus;
  error: boolean;
  totalBalance?: number;
  pnl?: number;
};

const PortfolioOverview = (props: PortfolioOverviewProps) => {
  const { status, error, totalBalance = 0, pnl = 0 } = props;

  if (status === 'disconnected') {
    return (
      <p className="text-rock-sub-body text-base md:text-xl text-center">
        Connect your wallet to view your portfolio
      </p>
    );
  }

  if (error) {
    return (
      <div>
        <Typography variant="subheading">Portfolio Overview</Typography>
        <p className="text-red-600 mt-4">Oops, something went wrong! Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="subheading">Portfolio Overview</Typography>

      <Card className="sm:w-[360px] xl:w-[400px] p-6 md:p-8 xl:p-11 mt-4 lg:mt-8">
        <div>
          <p className="text-sm md:text-base xl:text-xl uppercase text-rock-gray leading-3">
            Your balance
          </p>
          <div className="flex items-center gap-6 mt-6 lg:mt-10">
            <p className="text-sm md:text-xl xl:text-2xl font-semibold leading-4">
              {withCommas(toFixedNumber(totalBalance))} USDC
            </p>
            <p
              className={`text-sm md:text-xl xl:text-2xl leading-4 font-normal ${
                Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
              }`}
            >
              {formatPnl(toFixedNumber(pnl), true)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
