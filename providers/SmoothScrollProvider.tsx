'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const SmoothScrollContext = createContext<{ lenis: Lenis | null }>({ lenis: null });

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Disable lenis on touch devices or if reduced motion is preferred
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || reducedMotion) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance);

    gsap.registerPlugin(ScrollTrigger);

    // Synchronize Lenis scrolling with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Synchronize GSAP ticker with Lenis requestAnimationFrame
    const updateLenis = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenisInstance.destroy();
    };
  }, [mounted, reducedMotion]);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
