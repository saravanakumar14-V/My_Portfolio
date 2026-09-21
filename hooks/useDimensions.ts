'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * useDimensions
 * Tracks an element's dimensions using ResizeObserver.
 * Returns { width, height } in pixels.
 * Useful for animation calculations and responsive component behavior.
 */
export function useDimensions<T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T | null>
): { width: number; height: number } {
  const localRef = useRef<T | null>(null);
  const targetRef = ref || localRef;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    });

    observer.observe(element);

    // Set initial dimensions
    const rect = element.getBoundingClientRect();
    setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });

    return () => observer.disconnect();
  }, [targetRef]);

  return dimensions;
}
