'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * useScrollDirection
 * Detects whether the user is scrolling up or down.
 * Used to show/hide the navigation header.
 * Throttled to prevent excessive re-renders.
 */
export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const threshold = 10; // px — prevent micro-scrolls from triggering

        if (Math.abs(currentScrollY - lastScrollY.current) < threshold) return;

        setDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return direction;
}

/**
 * useScrollProgress
 * Returns the page scroll progress as a value from 0 to 1.
 * 0 = top of page, 1 = bottom of page.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}
