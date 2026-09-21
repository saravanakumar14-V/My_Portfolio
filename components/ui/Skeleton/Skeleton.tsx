import { cn } from '@/lib/utils/cn';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Skeleton component
 * Placeholder for loading states with a pulse animation.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      aria-hidden="true"
      {...props}
    />
  );
}
