import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type CellLinkProps = {
  content: ReactNode | string | number;
  className?: string;
  href?: string;
};

export function CellLink({ content, href = '', className }: CellLinkProps) {
  return (
    <Link href={href} className={clsx(className, 'block capitalize cursor-pointer text-info')}>
      {content}
    </Link>
  );
}
