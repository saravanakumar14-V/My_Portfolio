import { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  as?: ElementType;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * Button component
 * State matrix: Default | Hover | Active | Focus | Disabled | Loading
 * See Component State Matrix in architecture docs for exact token specs.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'right',
      className,
      as,
      href,
      children,
      disabled,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;
    const Component = as || (href ? 'a' : 'button');

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        href={href}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className
        )}
        disabled={Component === 'button' ? isDisabled : undefined}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={styles.iconLeft} aria-hidden="true">{icon}</span>
            )}
            <span className={styles.label}>{children}</span>
            {icon && iconPosition === 'right' && (
              <span className={styles.iconRight} aria-hidden="true">{icon}</span>
            )}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
