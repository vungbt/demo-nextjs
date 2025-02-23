import clsx from 'clsx';
import React from 'react';

type LogoProps = {
  className?: string;
};
export default function Logo({ className }: LogoProps) {
  return (
    <div className={clsx(className, 'flex items-center gap-4 w-fit')}>
      <div>
        <div className='w-5 h-5 border border-solid border-neutral-content rounded-full relative before:contents-[""] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-warning before:rounded-full' />
        <div className="block w-5 h-2 rounded-full bg-success mt-1" />
      </div>
      <span className="font-black text-2xl">EasyHome</span>
    </div>
  );
}
