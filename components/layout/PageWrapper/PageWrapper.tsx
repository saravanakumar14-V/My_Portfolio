'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { sceneManager } from '@/motion/core/SceneManager';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageWrapperProps {
  children: React.ReactNode;
}

/**
 * PageWrapper
 * Wraps page routes to coordinate entrance/exit transitions 
 * with the global SceneManager.
 */
export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        // Simple fade-up entrance for the entire page route
        tl.fromTo(
          wrapperRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );

        // Tell the SceneManager to transition in with this timeline
        sceneManager.transitionIn(tl);
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [pathname, reducedMotion]);

  return (
    <div ref={wrapperRef} style={{ opacity: reducedMotion ? 1 : 0, willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}
