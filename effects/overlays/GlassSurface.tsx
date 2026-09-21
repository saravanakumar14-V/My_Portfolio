import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './GlassSurface.module.css';

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'heavy';
  as?: React.ElementType;
}

/**
 * GlassSurface
 * A reusable wrapper for frosted glass (glassmorphism) effects.
 */
export function GlassSurface({ 
  children, 
  className, 
  variant = 'light',
  as: Component = 'div' 
}: GlassSurfaceProps) {
  return (
    <Component className={cn(styles.glass, styles[variant], className)}>
      {children}
    </Component>
  );
}
