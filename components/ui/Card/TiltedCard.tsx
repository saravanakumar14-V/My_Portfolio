'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';
import styles from './TiltedCard.module.css';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // How much it tilts (default 10)
}

export function TiltedCard({ children, className, intensity = 10 }: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardRef.current || !contentRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        const card = cardRef.current!;
        const content = contentRef.current!;

        // Use quickTo for performant tracking
        const rYTo = gsap.quickTo(content, 'rotateY', { duration: 0.5, ease: 'power3.out' });
        const rXTo = gsap.quickTo(content, 'rotateX', { duration: 0.5, ease: 'power3.out' });
        const xTo = gsap.quickTo(content, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(content, 'y', { duration: 0.5, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
          if (window.matchMedia('(pointer: coarse)').matches) return;

          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Calculate normalized coordinates (-1 to 1)
          const normX = (x / rect.width) * 2 - 1;
          const normY = (y / rect.height) * 2 - 1;
          
          // Calculate rotation (max ±2°) and translation (max ±4px)
          const maxRot = 2;
          const maxTrans = 4;
          const rotateX = normY * -maxRot;
          const rotateY = normX * maxRot;
          const transX = normX * maxTrans;
          const transY = normY * maxTrans;

          rYTo(rotateY);
          rXTo(rotateX);
          xTo(transX);
          yTo(transY);
        };

        const handleMouseLeave = () => {
          gsap.to(content, {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'power3.out'
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion, intensity]);

  return (
    <div 
      ref={cardRef} 
      className={cn(styles.wrapper, className)}
      style={{ perspective: '1000px' }}
    >
      <div ref={contentRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
