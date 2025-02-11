'use client';
import clsx from 'clsx';
import React, { ReactNode, Ref, forwardRef } from 'react';
import { IconName, RenderIcon } from '../../icons';

export type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children'
> & {
  icon?: IconName;
  leftIcon?: IconName;
  isLoading?: boolean;
  text: ReactNode;
  size?: 'xs' | 'lg' | 'sm';
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  styles?: 'outline';
  customClass?: {
    icon?: string;
  };
};

export const Button = forwardRef(function ButtonBase(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    className,
    text,
    icon,
    leftIcon,
    isLoading,
    variant,
    size,
    styles,
    type = 'button',
    ...reset
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(className, 'btn', {
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

        // styles
        'btn-outline': styles === 'outline'
      })}
      {...reset}
    >
      {leftIcon && <RenderIcon name={leftIcon} className="inline-block !w-4 !h-4" />}
      {text}
      {(icon || isLoading) && (
        <RenderIcon name={isLoading ? 'loading' : icon} className="inline-block !w-4 !h-4" />
      )}
    </button>
  );
});
