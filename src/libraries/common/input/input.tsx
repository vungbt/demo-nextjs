import { IconName, RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { FormControl } from '../form';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  icon?: IconName;
  iconLeft?: IconName;
  isLoading?: boolean;
  size?: 'xs' | 'lg' | 'sm';
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  error?: string;
  isError?: boolean;

  label?: string;
  required?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, iconLeft, isLoading, variant, size, error, isError, label, required, ...reset },
    ref
  ) => {
    return (
      <FormControl label={label} message={error} required={required}>
        <label
          className={clsx('input input-bordered flex items-center gap-2', {
            'btn-neutral': variant === 'neutral',
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-accent': variant === 'accent',
            'btn-ghost': variant === 'ghost',
            'btn-link': variant === 'link',

            // size
            'btn-xs': size === 'xs',
            'btn-lg': size === 'lg',
            'btn-sm': size === 'sm',

            // error
            'input-error': isError || !!error
          })}
        >
          {iconLeft && <RenderIcon name={iconLeft} className="inline-block !w-4 !h-4" />}
          <input type="text" ref={ref} className="grow" placeholder="Search" {...reset} />
          {(icon || isLoading) && (
            <RenderIcon name={isLoading ? 'loading' : icon} className="inline-block !w-4 !h-4" />
          )}
        </label>
      </FormControl>
    );
  }
);

Input.displayName = 'Input';
