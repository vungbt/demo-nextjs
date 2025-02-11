import clsx from 'clsx';
import React, { ReactNode } from 'react';

type CellViewProps = {
  content: ReactNode | string | number;
  className?: string;
};
export function CellView({ content, className }: CellViewProps) {
  return <div className={clsx(className)}>{content}</div>;
}
