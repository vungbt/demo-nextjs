import { IconName, RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { FormControl } from '../form';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  icon?: IconName;
  iconLeft?: IconName;
  isLoading?: boolean;
  size?: 'xs' | 'lg' | 'sm';
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  error?: string;
  isError?: boolean;

  label?: string;
  required?: boolean;
  className?: string;
  customClass?: { wrap?: string; input?: string };
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      iconLeft,
      isLoading,
      variant,
      size,
      error,
      isError,
      label,
      required,
      className,
      customClass,
      ...reset
    },
    ref
  ) => {
    return (
      <FormControl
        label={label}
        message={error}
        required={required}
        className={clsx(customClass?.wrap, className)}
      >
        <label
          className={clsx(
            'input input-bordered flex items-center gap-2',
            className,
            customClass?.input,
            {
              'input-primary': variant === 'primary',
              'input-secondary': variant === 'secondary',
              'input-accent': variant === 'accent',
              'input-ghost': variant === 'ghost',

              // size
              'input-xs': size === 'xs',
              'input-lg': size === 'lg',
              'input-sm': size === 'sm',

              // error
              'input-error': isError || !!error
            }
          )}
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
