import { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Text.module.css';

export interface TextProps {
  children: ReactNode;
  as?: ElementType;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent' | 'error' | 'success';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  balance?: boolean;
}

/**
 * Text component
 * Standardized typography for body copy.
 * Use Heading for h1-h6.
 */
export function Text({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'regular',
  color = 'secondary',
  align = 'left',
  className,
  balance = false,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        styles.text,
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`color-${color}`],
        styles[`align-${align}`],
        balance && styles.balance,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
