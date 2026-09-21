'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';
import styles from './Spotlight.module.css';

interface SpotlightProps {
  className?: string;
  size?: number; // Size of the spotlight in px
  color?: string; // CSS color string (e.g. rgba(255,255,255,0.1))
}

/**
 * Spotlight
 * A performant radial gradient that follows the mouse cursor.
 * Uses GSAP quickSetter and CSS Variables to avoid React state re-renders.
 */
export function Spotlight({ className, size = 400, color = 'var(--color-accent-primary)' }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    let ctx: gsap.Context;

    (async () => {
      const gsap = (await import('gsap')).default;

      ctx = gsap.context(() => {
        if (!ref.current) return;
        
        // Use CSS variables instead of inline styles for better performance
        const xSet = gsap.quickSetter(ref.current, '--x', 'px');
        const ySet = gsap.quickSetter(ref.current, '--y', 'px');

        const onMouseMove = (e: MouseEvent) => {
          // Center the spotlight on the cursor
          xSet(e.clientX - size / 2);
          ySet(e.clientY - size / 2);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        return () => window.removeEventListener('mousemove', onMouseMove);
      });
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [reducedMotion, size]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ref}
      className={cn(styles.spotlight, className)}
      style={{
        width: size,
        height: size,
        '--spotlight-color': color,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
