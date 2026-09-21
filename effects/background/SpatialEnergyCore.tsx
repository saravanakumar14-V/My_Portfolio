'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './SpatialEnergyCore.module.css';

export function SpatialEnergyCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !coreRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        // Subtle organic breathing of the core
        gsap.to(coreRef.current, {
          scale: 1.05,
          opacity: 0.8,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        // Mouse parallax for the core
        const xTo = gsap.quickTo(coreRef.current, 'x', { duration: 2, ease: 'power3.out' });
        const yTo = gsap.quickTo(coreRef.current, 'y', { duration: 2, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 30; // Max 15px movement
          const y = (e.clientY / innerHeight - 0.5) * 30;
          xTo(x);
          yTo(y);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, containerRef);
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      <div ref={coreRef} className={styles.core} />
      {!reducedMotion && <div className={styles.particles} />}
    </div>
  );
}
