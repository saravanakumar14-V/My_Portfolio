'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useExperienceDirector, NarrativeChapter } from '@/stores/experienceDirectorStore';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const setChapter = useExperienceDirector((state) => state.setChapter);

  // Synchronize atmosphere and narrative chapter with active route
  useEffect(() => {
    let targetChapter: NarrativeChapter = 'hero';
    if (pathname === '/') targetChapter = 'hero';
    else if (pathname.startsWith('/about')) targetChapter = 'about';
    else if (pathname.startsWith('/experience')) targetChapter = 'journey';
    else if (pathname.startsWith('/projects')) targetChapter = 'showcase';
    else if (pathname.startsWith('/certifications')) targetChapter = 'capabilities';
    else if (pathname.startsWith('/contact')) targetChapter = 'contact';

    setChapter(targetChapter);
  }, [pathname, setChapter]);

  // Cinematic page entrance choreography
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    let ctx: gsap.Context;

    (async () => {
      const gsap = (await import('gsap')).default;

      ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
            clearProps: 'transform',
          }
        );
      });
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [pathname, reducedMotion]);

  return (
    <div ref={containerRef} key={pathname} style={{ minHeight: '100vh', width: '100%' }}>
      {children}
    </div>
  );
}
