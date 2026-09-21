import { cn } from '@/lib/utils/cn';
import styles from './Tag.module.css';

export interface TagProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Tag component
 * Used primarily for tech stack labels and categories.
 * Mono-spaced, subtle appearance.
 */
export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn(styles.tag, className)}>
      {children}
    </span>
  );
}
