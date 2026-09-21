'use client';

import { useEffect, useRef } from 'react';
import { useCursorStore } from '@/stores/cursorStore';
import { useExperienceDirector } from '@/stores/experienceDirectorStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function useCursorPhysics() {
  const reducedMotion = useReducedMotion();
  const setVisibility = useCursorStore((state) => state.setVisibility);
  
  // Track mouse coordinates & smooth interpolated coordinates
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });
  const currentColor = useRef({ r: 226, g: 232, b: 240 }); // Default cool white/slate
  
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is preferred
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || reducedMotion) return;

    let ctx: gsap.Context;

    (async () => {
      const gsap = (await import('gsap')).default;

      ctx = gsap.context(() => {
        if (!cursorRef.current) return;

        const xSet = gsap.quickSetter(cursorRef.current, 'x', 'px');
        const ySet = gsap.quickSetter(cursorRef.current, 'y', 'px');
        const scaleSet = gsap.quickSetter(cursorRef.current, 'scale');

        const onMouseMove = (e: MouseEvent) => {
          mouse.current.x = e.clientX;
          mouse.current.y = e.clientY;
          if (!useCursorStore.getState().isVisible) {
            setVisibility(true);
            // Snap to initial position on first move
            cursor.current.x = e.clientX;
            cursor.current.y = e.clientY;
            xSet(e.clientX);
            ySet(e.clientY);
          }
        };

        const onMouseLeave = () => {
          setVisibility(false);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', onMouseLeave);

        // Helper to parse hex to RGB
        const hexToRgb = (hex: string) => {
          const cleanHex = hex.replace('#', '');
          if (cleanHex.length === 3) {
            return {
              r: parseInt(cleanHex[0] + cleanHex[0], 16),
              g: parseInt(cleanHex[1] + cleanHex[1], 16),
              b: parseInt(cleanHex[2] + cleanHex[2], 16),
            };
          }
          return {
            r: parseInt(cleanHex.substring(0, 2), 16) || 226,
            g: parseInt(cleanHex.substring(2, 4), 16) || 232,
            b: parseInt(cleanHex.substring(4, 6), 16) || 240,
          };
        };

        const tickHandler = () => {
          const atmosphere = useExperienceDirector.getState().atmosphere;
          const targetWeight = atmosphere.cursorWeight || 0.18;
          const dt = 1.0 - Math.pow(1.0 - targetWeight, gsap.ticker.deltaRatio());
          
          // Smooth Precision Lerp (No overshoot, no jitter)
          cursor.current.x += (mouse.current.x - cursor.current.x) * dt;
          cursor.current.y += (mouse.current.y - cursor.current.y) * dt;

          xSet(cursor.current.x);
          ySet(cursor.current.y);

          // Subtle natural velocity scale damping (max 1.06 scale on fast swipe, returns to 1.0 instantly)
          const vx = mouse.current.x - cursor.current.x;
          const vy = mouse.current.y - cursor.current.y;
          const speed = Math.sqrt(vx * vx + vy * vy);
          const dynamicScale = Math.min(1 + speed * 0.0008, 1.08);
          scaleSet(dynamicScale);

          // Color interpolation
          const targetRgb = hexToRgb(atmosphere.cursorColor || '#E2E8F0');
          const colorDt = 0.08 * gsap.ticker.deltaRatio();
          currentColor.current.r += (targetRgb.r - currentColor.current.r) * colorDt;
          currentColor.current.g += (targetRgb.g - currentColor.current.g) * colorDt;
          currentColor.current.b += (targetRgb.b - currentColor.current.b) * colorDt;

          const r = Math.round(currentColor.current.r);
          const g = Math.round(currentColor.current.g);
          const b = Math.round(currentColor.current.b);

          if (cursorRef.current) {
            cursorRef.current.style.setProperty('--cursor-color', `rgb(${r}, ${g}, ${b})`);
            cursorRef.current.style.setProperty('--cursor-glow', `rgba(${r}, ${g}, ${b}, 0.35)`);
          }
        };

        gsap.ticker.add(tickHandler);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          document.body.removeEventListener('mouseleave', onMouseLeave);
          gsap.ticker.remove(tickHandler);
        };
      });
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [reducedMotion, setVisibility]);

  return cursorRef;
}
