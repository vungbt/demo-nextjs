import clsx from 'clsx';
import React, { ReactNode } from 'react';

type FormControlProps = {
  children?: ReactNode;
  label?: string;
  message?: string;
  required?: boolean;
  className?: string;
};
export function FormControl({ children, label, message, required, className }: FormControlProps) {
  return (
    <label className={clsx('form-control', className)}>
      {/* label */}

      {label && (
        <div className="label pt-0">
          <span
            className={clsx('label-text relative', {
              'before:content-["*"] before:absolute before:text-error before:top-0 before:-right-2':
                required
            })}
          >
            {label}
          </span>
        </div>
      )}
      {children}

      {/* mess error */}
      {message && (
        <div className="label pb-0">
          <span className="label-text text-error">{message}</span>
        </div>
      )}
    </label>
  );
}
