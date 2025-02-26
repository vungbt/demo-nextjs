import { ConfigTypeLabels } from '@/constants/common';
import { EConfigType } from '@/types';
import clsx from 'clsx';

type CellConfigProps = {
  type: EConfigType;
  className?: string;
  onClick?: () => void;
};
export function CellConfig({ type, className, onClick }: CellConfigProps) {
  return (
    <div
      className={clsx(className, 'flex items-center justify-center', {
        'bg-info p-1 rounded text-white': type === EConfigType.Deluxe,
        'bg-success p-1 rounded text-white': type === EConfigType.Luxury,
        'bg-warning p-1 rounded text-white': type === EConfigType.Premium
      })}
      onClick={onClick}
    >
      {ConfigTypeLabels[type]}
    </div>
  );
}
