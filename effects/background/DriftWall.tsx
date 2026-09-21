'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './DriftWall.module.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function DriftWall() {
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
    let particles: Particle[] = [];

    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      if (!effectMounted) return;
      gsap.registerPlugin(ScrollTrigger);

      const initParticles = () => {
        particles = [];
        const count = Math.min(window.innerWidth / 10, 100); // Very low density
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.4 + 0.1,
          });
        }
      };

      resizeHandler = () => {
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx2d.scale(dpr, dpr);
        initParticles();
      };
      
      window.addEventListener('resize', resizeHandler);
      resizeHandler();

      ctx = gsap.context(() => {
        const render = () => {
          if (!ctx2d || !canvas) return;
          ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
          
          particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = window.innerWidth;
            if (p.x > window.innerWidth) p.x = 0;
            if (p.y < 0) p.y = window.innerHeight;
            if (p.y > window.innerHeight) p.y = 0;

            ctx2d.beginPath();
            ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx2d.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx2d.fill();
          });
        };

        ScrollTrigger.create({
          trigger: canvas,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => gsap.ticker.add(render),
          onEnterBack: () => gsap.ticker.add(render),
          onLeave: () => gsap.ticker.remove(render),
          onLeaveBack: () => gsap.ticker.remove(render),
        });
        
        gsap.ticker.add(render);
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
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
