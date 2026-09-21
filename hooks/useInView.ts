'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * useInView
 * Triggers when an element enters the viewport using IntersectionObserver.
 * Marks as seen permanently once visible (animations don't replay).
 *
 * Rule: Once visible, always visible. Scroll-up never re-triggers.
 *
 * Usage:
 *   const [ref, inView] = useInView({ threshold: 0.2 });
 *   <div ref={ref} className={inView ? 'visible' : 'hidden'} />
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit & { once?: boolean } = {}
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { once = true, threshold = 0.15, rootMargin = '0px', ...rest } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // If once=true (default), disconnect after first visibility
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin, ...rest }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}
