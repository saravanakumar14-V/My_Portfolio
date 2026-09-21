import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Grid.module.css';

interface GridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
}

/**
 * Grid Component
 * CSS Grid abstraction that uses our token system for gaps.
 */
export function Grid({
  children,
  className,
  columns = 1,
  gap = 'md',
  as: Component = 'div',
}: GridProps) {
  return (
    <Component
      className={cn(
        styles.grid,
        styles[`cols-${columns}`],
        styles[`gap-${gap}`],
        className
      )}
    >
      {children}
    </Component>
  );
}
