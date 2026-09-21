import { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  padding?: 'none' | 'sm' | 'default' | 'lg';
  variant?: 'elevated' | 'bordered' | 'ghost';
  interactive?: boolean;
}

/**
 * Card component
 * Container for grouped content.
 * Supports different padding, background variants, and hover states.
 */
export function Card({
  children,
  as: Component = 'div',
  className,
  padding = 'default',
  variant = 'elevated',
  interactive = false,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        styles.card,
        styles[`padding-${padding}`],
        styles[`variant-${variant}`],
        interactive && styles.interactive,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
