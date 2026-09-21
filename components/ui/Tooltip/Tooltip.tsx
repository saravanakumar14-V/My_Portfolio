'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Tooltip.module.css';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number; // ms
}

/**
 * Tooltip Component
 * Accessible tooltip with GSAP-powered entrance animations.
 */
export function Tooltip({
  children,
  content,
  position = 'top',
  className,
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    if (reducedMotion || !tooltipRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;
      
      ctx = gsap.context(() => {
        if (isVisible && tooltipRef.current) {
          // Reset before animation
          gsap.set(tooltipRef.current, { opacity: 0, scale: 0.95 });
          
          let yOffset = 0;
          let xOffset = 0;
          if (position === 'top') yOffset = 5;
          if (position === 'bottom') yOffset = -5;
          if (position === 'left') xOffset = 5;
          if (position === 'right') xOffset = -5;

          gsap.fromTo(
            tooltipRef.current,
            { opacity: 0, scale: 0.95, y: yOffset, x: xOffset },
            { opacity: 1, scale: 1, y: 0, x: 0, duration: 0.3, ease: 'back.out(1.5)' }
          );
        }
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [isVisible, position, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(styles.tooltip, styles[position], className)}
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
