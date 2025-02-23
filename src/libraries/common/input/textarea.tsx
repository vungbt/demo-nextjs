import { IconName, RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { FormControl } from '../form';

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
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
  customClass?: { wrap?: string; textarea?: string };
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <label className={clsx('flex items-center gap-2', className, customClass?.textarea)}>
          {iconLeft && <RenderIcon name={iconLeft} className="inline-block !w-4 !h-4" />}
          <textarea
            ref={ref}
            className={clsx('grow textarea textarea-bordered ', {
              'textarea-primary': variant === 'primary',
              'textarea-secondary': variant === 'secondary',
              'textarea-accent': variant === 'accent',
              'textarea-ghost': variant === 'ghost',

              // size
              'textarea-xs': size === 'xs',
              'textarea-lg': size === 'lg',
              'textarea-sm': size === 'sm',

              // error
              'textarea-error': isError || !!error
            })}
            placeholder="Search"
            {...reset}
          />
          {(icon || isLoading) && (
            <RenderIcon name={isLoading ? 'loading' : icon} className="inline-block !w-4 !h-4" />
          )}
        </label>
      </FormControl>
    );
  }
);

Textarea.displayName = 'Textarea';
