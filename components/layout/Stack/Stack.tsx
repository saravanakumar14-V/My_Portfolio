import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Stack.module.css';

interface StackProps {
  children: ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  as?: React.ElementType;
}

/**
 * Stack Component
 * Flexbox abstraction for consistent 1D layouts.
 */
export function Stack({
  children,
  className,
  direction = 'column',
  align = 'stretch',
  justify = 'start',
  gap = 'md',
  wrap = false,
  as: Component = 'div',
}: StackProps) {
  return (
    <Component
      className={cn(
        styles.stack,
        styles[`direction-${direction}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        styles[`gap-${gap}`],
        wrap && styles.wrap,
        className
      )}
    >
      {children}
    </Component>
  );
}
