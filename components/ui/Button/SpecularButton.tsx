'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './SpecularButton.module.css';

interface SpecularButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export function SpecularButton({ href, children, className, magnetic = true }: SpecularButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !btnRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        const xTo = gsap.quickTo(btnRef.current, '--x', { duration: 0.1, ease: 'power2.out' });
        const yTo = gsap.quickTo(btnRef.current, '--y', { duration: 0.1, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          if (!btnRef.current) return;
          const rect = btnRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          xTo(x);
          yTo(y);
        };

        const handleMouseLeave = () => {
          if (!btnRef.current) return;
          const rect = btnRef.current.getBoundingClientRect();
          xTo(rect.width / 2);
          yTo(rect.height / 2);
        };

        if (btnRef.current) {
          btnRef.current.addEventListener('mousemove', handleMouseMove);
          btnRef.current.addEventListener('mouseleave', handleMouseLeave);
        }
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <CursorTrigger cursorState="button" magnetic={magnetic}>
      <Link ref={btnRef} href={href} className={cn(styles.button, className)}>
        <span className={styles.content}>{children}</span>
        <span className={styles.borderMask} aria-hidden="true" />
      </Link>
    </CursorTrigger>
  );
}
