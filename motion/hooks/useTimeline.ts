import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseTimelineOptions {
  paused?: boolean;
  onComplete?: () => void;
  onUpdate?: () => void;
}

/**
 * Hook to create and manage a GSAP timeline with automatic cleanup.
 * Uses GSAP Context to ensure safe React Strict Mode behavior.
 */
export function useTimeline(options: UseTimelineOptions = {}) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        tlRef.current = gsap.timeline({
          paused: options.paused,
          onComplete: options.onComplete,
          onUpdate: options.onUpdate,
        });

        // Fast-forward timeline if reduced motion is requested
        if (reducedMotion && tlRef.current) {
          tlRef.current.progress(1);
        }
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
      if (tlRef.current) tlRef.current.kill();
    };
  }, [reducedMotion, options.paused]); // Re-create context if these change significantly

  return tlRef;
}
