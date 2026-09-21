'use client';

import { useEffect, ReactNode } from 'react';
import { usePerformanceStore } from '@/stores/performanceStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * PerformanceProvider
 * Monitors framerate and automatically disables heavy effects if the system is struggling.
 */
export function PerformanceProvider({ children }: { children: ReactNode }) {
  const setFps = usePerformanceStore((state) => state.setFps);
  const setLowEndDevice = usePerformanceStore((state) => state.setLowEndDevice);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, treat as low-end/no-effects to save battery
    if (reducedMotion) {
      setLowEndDevice(true);
      return;
    }

    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = (time: number) => {
      frameCount++;
      const delta = time - lastTime;
      
      // Calculate FPS every second
      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        setFps(fps);
        
        frameCount = 0;
        lastTime = time;
      }
      
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    // Initial check for low-end device via hardware concurrency
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      setLowEndDevice(true);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [reducedMotion, setFps, setLowEndDevice]);

  return <>{children}</>;
}
