import { cn } from '@/lib/utils/cn';
import styles from './Container.module.css';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  as?: React.ElementType;
}

/**
 * Container component
 * Applies max-width constraints and consistent horizontal padding.
 * Use as the primary content wrapper for all sections.
 */
export function Container({
  children,
  className,
  size = 'default',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={cn(styles.container, styles[size], className)}>
      {children}
    </Component>
  );
}
