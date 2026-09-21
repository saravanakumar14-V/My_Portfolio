import { ElementType } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Divider.module.css';

export interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  as?: ElementType;
}

/**
 * Divider component
 * Semantic separator for content sections.
 */
export function Divider({
  className,
  orientation = 'horizontal',
  as: Component = 'hr',
}: DividerProps) {
  return (
    <Component
      className={cn(
        styles.divider,
        styles[orientation],
        className
      )}
      aria-orientation={orientation}
    />
  );
}
