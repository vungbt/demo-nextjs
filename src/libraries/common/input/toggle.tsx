import { IconName, RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

type ToggleProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
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

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
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
      <div className={clsx('form-control h-fit w-fit', customClass?.wrap)}>
        <label className="label cursor-pointer">
          {label && (
            <span
              className={clsx('label-text relative min-w-max mr-3', {
                'before:content-["*"] before:absolute before:text-error before:top-0 before:-right-2':
                  required
              })}
            >
              {label}
            </span>
          )}
          <label
            className={clsx('flex items-center gap-2', className, customClass?.input, {
              'toggle-primary': variant === 'primary',
              'toggle-secondary': variant === 'secondary',
              'toggle-accent': variant === 'accent',
              'toggle-ghost': variant === 'ghost',

              // size
              'toggle-xs': size === 'xs',
              'toggle-lg': size === 'lg',
              'toggle-sm': size === 'sm',

              // error
              'toggle-error': isError || !!error
            })}
          >
            {iconLeft && <RenderIcon name={iconLeft} className="inline-block !w-4 !h-4" />}
            <input type="checkbox" ref={ref} className="toggle" placeholder="Search" {...reset} />
            {(icon || isLoading) && (
              <RenderIcon name={isLoading ? 'loading' : icon} className="inline-block !w-4 !h-4" />
            )}
          </label>
        </label>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
