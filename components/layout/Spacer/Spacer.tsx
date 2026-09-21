import { cn } from '@/lib/utils/cn';
import styles from './Spacer.module.css';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  axis?: 'vertical' | 'horizontal';
  className?: string;
}

/**
 * Spacer Component
 * Used for precise vertical or horizontal spacing when Stack/Grid gaps aren't enough.
 */
export function Spacer({ size = 'md', axis = 'vertical', className }: SpacerProps) {
  return (
    <div
      className={cn(
        styles.spacer,
        styles[axis],
        styles[`size-${size}`],
        className
      )}
      aria-hidden="true"
    />
  );
}
