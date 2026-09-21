'use client';

import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useUIStore } from '@/stores/uiStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteConfig } from '@/config/site';
import styles from './Preloader.module.css';

/**
 * Preloader
 * Cinematic initial loading experience that transitions into the Hero.
 * Updates the global ExperienceState to coordinate all downstream animations.
 */
export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(true);
  
  const experienceState = useUIStore((state) => state.experienceState);
  const setExperienceState = useUIStore((state) => state.setExperienceState);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    // If user prefers reduced motion, skip the loader immediately
    if (experienceState === 'booting' && reducedMotion) {
      setExperienceState('interactive');
      setIsMounted(false);
      return;
    }

    // If we've already booted and are in another state, just unmount
    if (experienceState !== 'booting') {
      setIsMounted(false);
      return;
    }

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;
      
      ctx = gsap.context(() => {
        setExperienceState('loading');
        
        const tl = gsap.timeline({
          onComplete: () => {
            setExperienceState('interactive');
            setIsMounted(false); // Remove from DOM
          }
        });

        // 1. Counter increment animation
        tl.to(counterRef.current, {
          textContent: 100,
          duration: 1.5,
          ease: 'power3.inOut',
          snap: { textContent: 1 },
          stagger: 1,
        });

        // 2. Brand reveal
        tl.to(counterRef.current, { opacity: 0, duration: 0.3, y: -20 }, '+=0.2');
        tl.fromTo(brandRef.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // 3. Trigger 'reveal' state for downstream components (like Hero)
        tl.add(() => {
          setExperienceState('reveal');
        }, '+=0.5');

        // 4. Cinematic exit (slide up / dissolve)
        tl.to(brandRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, '+=0.5');
        tl.to(overlayRef.current, { 
          yPercent: -100, 
          duration: 1, 
          ease: 'expo.inOut' 
        }, '-=0.2');
        
      }, containerRef);
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className={styles.wrapper} aria-hidden="true">
      <div ref={overlayRef} className={styles.overlay}>
        <div ref={counterRef} className={styles.counter}>
          0
        </div>
        <div ref={brandRef} className={styles.brand}>
          {siteConfig.author.name}
        </div>
      </div>
    </div>
  );
}
