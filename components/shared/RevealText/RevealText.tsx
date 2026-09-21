'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';
import styles from './RevealText.module.css';

export interface RevealTextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

/**
 * RevealText component
 * Wraps text in a container and uses GSAP to reveal it line-by-line or 
 * fade it up smoothly, respecting reduced-motion preferences.
 */
export function RevealText({
  children,
  as: Component = 'div',
  className,
  delay = 0,
}: RevealTextProps) {
  const reducedMotion = useReducedMotion();
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !elementRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (!effectMounted) return;
      
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elementRef.current,
              start: 'top 85%',
              once: true,
            }
          }
        );
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion, delay]);

  return (
    <Component
      ref={elementRef}
      className={cn(styles.reveal, className)}
      style={{ opacity: reducedMotion ? 1 : 0 }}
    >
      {children}
    </Component>
  );
}
