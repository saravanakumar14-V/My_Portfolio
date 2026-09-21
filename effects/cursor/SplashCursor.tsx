'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './SplashCursor.module.css';

interface Splash {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  color: string;
}

export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let ctx: gsap.Context;
    let effectMounted = true;
    let resizeHandler: () => void;
    let clickHandler: (e: MouseEvent) => void;
    const splashes: Splash[] = [];

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      resizeHandler = () => {
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx2d.scale(dpr, dpr);
      };
      
      window.addEventListener('resize', resizeHandler);
      resizeHandler();

      clickHandler = (e: MouseEvent) => {
        // Create a new splash on click
        const color = getComputedStyle(document.documentElement)
          .getPropertyValue('--color-accent').trim() || '255, 255, 255';
          
        splashes.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          alpha: 1,
          color: `rgba(${color}, 0.5)`
        });
      };
      
      window.addEventListener('click', clickHandler);

      ctx = gsap.context(() => {
        const render = () => {
          if (!ctx2d || !canvas) return;
          ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
          
          // Animate and draw splashes
          for (let i = splashes.length - 1; i >= 0; i--) {
            const s = splashes[i];
            s.radius += 4;
            s.alpha -= 0.02;

            if (s.alpha <= 0) {
              splashes.splice(i, 1);
              continue;
            }

            ctx2d.beginPath();
            ctx2d.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx2d.strokeStyle = s.color.replace('0.5', s.alpha.toString());
            ctx2d.lineWidth = 2;
            ctx2d.stroke();
            
            // Inner filled dot
            ctx2d.beginPath();
            ctx2d.arc(s.x, s.y, s.radius * 0.3, 0, Math.PI * 2);
            ctx2d.fillStyle = s.color.replace('0.5', (s.alpha * 0.3).toString());
            ctx2d.fill();
          }
        };

        gsap.ticker.add(render);
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (clickHandler) window.removeEventListener('click', clickHandler);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas 
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
