'use client';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { registerHeroAnimations } from '@/motion/presets/heroAnimations';
import { registerScrollChoreography } from '@/motion/presets/scrollChoreography';
import { registerCaseStudyAnimations } from '@/motion/presets/caseStudyAnimations';

/**
 * MotionProvider
 * Global provider for registering GSAP plugins and managing global motion state.
 * Currently, we use it to register ScrollTrigger once at the root level.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: gsap.Context;
    
    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // Register all presets
      registerHeroAnimations();
      registerScrollChoreography();
      registerCaseStudyAnimations();

      // Disable GSAP animations globally if reduced motion is requested
      if (reducedMotion) {
        gsap.ticker.fps(1); // Extremely low FPS to effectively pause animations
        // Alternatively, use gsap.globalTimeline.timeScale(0);
      } else {
        gsap.ticker.fps(120); // allow up to 120fps based on monitor
      }

      ctx = gsap.context(() => {
        // Global setups can go here
      });
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
