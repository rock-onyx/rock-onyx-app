'use client';

// import { useState } from 'react';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

// import Select from '../shared/Select';
import Tooltip from '../shared/Tooltip';
import { QuestionIcon } from '../shared/icons';

type VaultSummaryProps = {
  weeklyApy: number;
  monthlyApy: number;
};

const VaultSummary = (props: VaultSummaryProps) => {
  const { weeklyApy } = props;

  const { totalValueLocked } = useRockOnyxVaultQueries();

  // const [apyRange, setApyRange] = useState('1w');

  return (
    <div className="relative grid grid-cols-2 gap-12 w-full xl:w-2/3 bg-rock-bg-tab rounded-2xl px-8 py-6">
      <div className="flex flex-col items-center justify-between gap-2 lg:gap-4">
        <div className="flex items-center gap-4 text-lg lg:text-2xl text-rock-gray font-semibold">
          <p>APY</p>
          <Tooltip message="The Annual Percentage Yield (APY) Is Extrapolated From The Previous Month/Week.">
            <QuestionIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          </Tooltip>
          <div>
            {/* <Select
              placeholder="1W"
              options={[
                { label: '1W', value: '1w' },
                { label: '1M', value: '1m' },
              ]}
              onChange={(selected) => setApyRange(selected.value)}
            /> */}
            <p className="ml-2">1W</p>
          </div>
        </div>
        <p className="text-xl lg:text-3xl font-semibold">{`${Math.round(weeklyApy)}%`}</p>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 lg:gap-4">
        <p className="text-lg lg:text-2xl text-rock-gray font-semibold translate-y-1">TVL</p>
        <p className="text-xl lg:text-3xl font-semibold">
          {totalValueLocked.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div
        className="w-[1px] h-full absolute top-0 left-1/2"
        style={{
          background:
            'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
        }}
      />
    </div>
  );
};

export default VaultSummary;
