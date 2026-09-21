import { ElementType, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Section.module.css';

export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
  spacing?: 'none' | 'sm' | 'default' | 'lg';
  background?: 'primary' | 'secondary';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * Section component
 * Standardized semantic wrapper for major page sections.
 * Enforces vertical rhythm.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  id,
  className,
  as: Component = 'section',
  spacing = 'default',
  background = 'primary',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      id={id}
      className={cn(
        styles.section,
        styles[`spacing-${spacing}`],
        styles[`bg-${background}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Section.displayName = 'Section';
