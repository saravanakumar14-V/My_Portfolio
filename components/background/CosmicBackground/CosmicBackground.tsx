'use client';

import { useRef, useEffect } from 'react';
import { useExperienceDirector } from '@/stores/experienceDirectorStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './CosmicBackground.module.css';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  layer: 'dust' | 'far' | 'mid' | 'near';
  twinkleSpeed: number;
  twinklePhase: number;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  
  const ambientColor = useExperienceDirector(state => state.atmosphere.ambientColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    if (dpr > 2) dpr = 2;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(document.body);

    // Particle system
    const numStars = reducedMotion ? 40 : (width < 768 ? 70 : 180);
    const stars: Star[] = [];
    
    for (let i = 0; i < numStars; i++) {
      const rand = Math.random();
      let layer: 'dust' | 'far' | 'mid' | 'near' = 'far';
      let size = Math.random() * 0.9 + 0.3;
      let alpha = Math.random() * 0.35 + 0.15;
      let vx = -0.08 - Math.random() * 0.06;
      let vy = -0.12 - Math.random() * 0.08;
      
      if (rand > 0.88) {
        // Near particles
        layer = 'near';
        size = Math.random() * 1.5 + 0.8;
        alpha = Math.random() * 0.55 + 0.25;
        vx = -0.35 - Math.random() * 0.25;
        vy = -0.45 - Math.random() * 0.3;
      } else if (rand > 0.55) {
        // Mid stars
        layer = 'mid';
        size = Math.random() * 1.1 + 0.5;
        alpha = Math.random() * 0.4 + 0.2;
        vx = -0.18 - Math.random() * 0.12;
        vy = -0.25 - Math.random() * 0.15;
      } else if (rand > 0.38) {
        // Dust layer
        layer = 'dust';
        size = Math.random() * 3.5 + 2.0;
        alpha = Math.random() * 0.12 + 0.04;
        vx = -0.04 - Math.random() * 0.04;
        vy = -0.06 - Math.random() * 0.04;
      }

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: reducedMotion ? 0 : vx,
        vy: reducedMotion ? 0 : vy,
        size,
        alpha,
        baseAlpha: alpha,
        layer,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    
    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('pointermove', handlePointerMove);

    const draw = () => {
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      // Parallax offset
      const parallaxX = (mouseX - width / 2) * 0.012;
      const parallaxY = (mouseY - height / 2) * 0.012;

      // Check current theme
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      if (isLight) {
        // Light theme: clean near-white with soft sky-blue atmospheric gradient
        ctx.fillStyle = '#F6F9FC';
        ctx.fillRect(0, 0, width, height);

        const grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.85);
        grd.addColorStop(0, 'rgba(2, 132, 199, 0.06)');
        grd.addColorStop(1, 'rgba(246, 249, 252, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Dark theme: deep cosmic void with ambient glow
        ctx.fillStyle = '#02040A';
        ctx.fillRect(0, 0, width, height);

        const grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.85);
        grd.addColorStop(0, ambientColor || 'rgba(59, 167, 255, 0.1)');
        grd.addColorStop(1, 'rgba(2, 4, 10, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
      }

      for (const star of stars) {
        if (!reducedMotion) {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < -10) star.x = width + 10;
          if (star.x > width + 10) star.x = -10;
          if (star.y < -10) star.y = height + 10;
          if (star.y > height + 10) star.y = -10;
        }

        const layerDepth = star.layer === 'near' ? 1.4 : star.layer === 'mid' ? 0.9 : 0.4;
        const currentParallaxX = reducedMotion ? 0 : parallaxX * layerDepth;
        const currentParallaxY = reducedMotion ? 0 : parallaxY * layerDepth;
        
        const renderX = star.x - currentParallaxX;
        const renderY = star.y - currentParallaxY;

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.12;
        const currentAlpha = Math.max(0.02, Math.min(1, star.baseAlpha + twinkle));

        ctx.beginPath();
        if (isLight) {
          // Soft blue and slate particles in light mode
          if (star.layer === 'near') {
            ctx.fillStyle = `rgba(2, 132, 199, ${currentAlpha * 0.35})`;
          } else if (star.layer === 'dust') {
            ctx.fillStyle = `rgba(148, 163, 184, ${currentAlpha * 0.25})`;
          } else {
            ctx.fillStyle = `rgba(100, 116, 139, ${currentAlpha * 0.2})`;
          }
          ctx.shadowBlur = 0;
        } else {
          // Vibrant cyan & white particles in dark mode
          if (star.layer === 'near') {
            ctx.fillStyle = `rgba(103, 217, 255, ${currentAlpha})`;
          } else if (star.layer === 'dust') {
            ctx.fillStyle = `rgba(59, 167, 255, ${currentAlpha * 0.7})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(59, 167, 255, ${currentAlpha})`;
          } else {
            ctx.fillStyle = `rgba(244, 247, 255, ${currentAlpha})`;
            ctx.shadowBlur = 0;
          }
        }

        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let gsap: typeof import('gsap').default;
    let tickerAdded = false;
    
    import('gsap').then((m) => {
      gsap = m.default;
      gsap.ticker.add(draw);
      tickerAdded = true;
    });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      if (gsap && tickerAdded) {
        gsap.ticker.remove(draw);
      }
    };
  }, [reducedMotion, ambientColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.canvas} 
      aria-hidden="true" 
    />
  );
}
