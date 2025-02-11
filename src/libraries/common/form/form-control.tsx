import clsx from 'clsx';
import React, { ReactNode } from 'react';

type FormControlProps = {
  children?: ReactNode;
  label?: string;
  message?: string;
  required?: boolean;
};
export function FormControl({ children, label, message, required }: FormControlProps) {
  return (
    <label className="form-control">
      {/* label */}
      <div className="label">
        <span
          className={clsx('label-text relative', {
            'before:content-["*"] before:absolute before:text-error before:top-0 before:-right-2':
              required
          })}
        >
          {label}
        </span>
      </div>
      {children}
      {/* mess error */}
      <div className="label">
        <span className="label-text text-error">{message}</span>
      </div>
    </label>
  );
}
