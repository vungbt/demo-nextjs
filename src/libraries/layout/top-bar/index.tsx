'use client';
import { useTopBar } from '@/hooks/top-bar';
import clsx from 'clsx';
import isArray from 'lodash/isArray';

type TopBarProps = {
  className?: string;
};

export default function TopBar({ className }: TopBarProps) {
  const { state } = useTopBar();
  const { actions, label, subtitle } = state;

  return (
    <div className={clsx(className, 'flex items-center justify-between gap-2 py-4 px-4')}>
      {/* right content */}
      <div className="flex items-end gap-2">
        <h2 className="text-2xl font-bold">{label}</h2>
        {subtitle ? <div className="mb-1">{subtitle}</div> : null}
      </div>

      {/* left content */}
      <div className="flex items-center gap-2">
        {isArray(actions) ? actions.map((item, index) => <div key={index}>{item}</div>) : actions}
      </div>
    </div>
  );
}
