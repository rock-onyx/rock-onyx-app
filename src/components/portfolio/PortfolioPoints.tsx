import { Card } from '@nextui-org/react';

import { Point } from '@/@types/vault';
import { toFixedNumber, withCommas } from '@/utils/number';

import { EigenLayerIcon, RenzoIcon, ZircuitIcon } from '../shared/icons';

type PortfolioPointsProps = {
  points: Point[];
};

const PortfolioPoints = (props: PortfolioPointsProps) => {
  const { points } = props;

  return (
    <Card className="p-8 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Your points</p>
      {points.length > 0 && (
        <div className="w-full xl:w-auto shrink-0 flex items-center justify-center bg-secondary text-primary rounded-2xl py-4 mt-6">
          {points.map((x, index) => {
            const { label, icon: Icon } =
              x.name === 'renzo'
                ? { label: 'Renzo points', icon: RenzoIcon }
                : x.name === 'eigenlayer'
                  ? { label: 'EigenLayer points', icon: EigenLayerIcon }
                  : { label: 'Zircuit points', icon: ZircuitIcon };
            return (
              <div
                key={x.name}
                className={`space-y-2 px-12 xl:px-6 2xl:px-14 ${
                  index > 0 ? 'border-l border-l-primary border-opacity-10' : ''
                }`}
              >
                <p className="text-base capitalize opacity-60">{label}</p>
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-8 h-8" />
                  <span className="font-bold text-2xl">
                    {withCommas(toFixedNumber(x.point, 1))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default PortfolioPoints;
