import React, { forwardRef } from 'react';
import { FormControl } from '../form';
import clsx from 'clsx';

export type SelectOptionItem = {
  label: any;
  value: any;
};

type SelectProps = Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> & {
  isLoading?: boolean;
  size?: 'xs' | 'lg' | 'sm';
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  error?: string;
  isError?: boolean;

  label?: string;
  required?: boolean;
  className?: string;
  customClass?: { wrap?: string; input?: string };
  options: SelectOptionItem[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { variant, size, error, isError, label, options, required, className, customClass, ...reset },
    ref
  ) => {
    return (
      <FormControl
        label={label}
        message={error}
        required={required}
        className={clsx(customClass?.wrap, className)}
      >
        <select
          ref={ref}
          className={clsx('select select-bordered', {
            'select-primary': variant === 'primary',
            'select-secondary': variant === 'secondary',
            'select-accent': variant === 'accent',
            'select-ghost': variant === 'ghost',

            // size
            'select-xs': size === 'xs',
            'select-lg': size === 'lg',
            'select-sm': size === 'sm',

            // error
            'select-error': isError || !!error
          })}
          {...reset}
        >
          {options.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </FormControl>
    );
  }
);

Select.displayName = 'Select'; // Recommended for debugging
