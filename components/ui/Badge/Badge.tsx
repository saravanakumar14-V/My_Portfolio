import { cn } from '@/lib/utils/cn';
import styles from './Badge.module.css';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'error';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

/**
 * Badge component
 * Used for status indicators, counts, and categories.
 */
export function Badge({
  children,
  variant = 'secondary',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
