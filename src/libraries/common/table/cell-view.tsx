import clsx from 'clsx';
import React, { ReactNode } from 'react';

type CellViewProps = {
  content: ReactNode | string | number;
  className?: string;
  onClick?: () => void;
};
export function CellView({ content, className, onClick }: CellViewProps) {
  return (
    <div className={clsx(className)} onClick={onClick}>
      {content}
    </div>
  );
}
