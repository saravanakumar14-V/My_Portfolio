'use client';

import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './BorderGlow.module.css';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export function BorderGlow({ children, className, active = true }: BorderGlowProps) {
  const ambientColor = useUIStore(state => state.ambientColor);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={cn(styles.wrapper, active && styles.active, className)}
      style={{ '--glow-color': ambientColor } as React.CSSProperties}
    >
      <div className={styles.glowElement} aria-hidden="true" />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
