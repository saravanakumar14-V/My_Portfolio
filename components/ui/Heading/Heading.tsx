import { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Heading.module.css';

export interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: ElementType;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
  balance?: boolean;
}

/**
 * Heading component
 * Standardized typography for headings.
 * Separates semantic level (h1-h6) from visual size.
 */
export function Heading({
  children,
  level = 2,
  as,
  size,
  weight,
  align = 'left',
  className,
  balance = true, // Headings balance by default for better typography
  ...props
}: HeadingProps) {
  const Component = as || (`h${level}` as ElementType);
  const sizeClass = size || `h${level}`;
  const weightClass = weight || (level <= 3 ? 'bold' : 'semibold');

  return (
    <Component
      className={cn(
        styles.heading,
        styles[`size-${sizeClass}`],
        styles[`weight-${weightClass}`],
        styles[`align-${align}`],
        balance && styles.balance,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
