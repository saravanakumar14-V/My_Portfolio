'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';
import styles from './AmbientGlow.module.css';

interface AmbientGlowProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  customColor?: string;
  opacity?: number;
}

/**
 * AmbientGlow
 * A subtle, slow-moving radial gradient to provide depth to the background.
 * Uses pure CSS animation for performance.
 */
export function AmbientGlow({ 
  className, 
  variant = 'primary', 
  position = 'center',
  customColor,
  opacity
}: AmbientGlowProps) {
  const reducedMotion = useReducedMotion();

  const customStyle: React.CSSProperties = {};
  if (customColor) {
    customStyle.background = `radial-gradient(circle, ${customColor} 0%, transparent 70%)`;
  }
  if (opacity !== undefined) {
    customStyle.opacity = opacity;
  }

  return (
    <div
      className={cn(
        styles.glow,
        !customColor && styles[variant],
        styles[position],
        reducedMotion && styles.static,
        className
      )}
      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
      aria-hidden="true"
    />
  );
}
