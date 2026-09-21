'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * useMousePosition
 * Tracks the mouse cursor position relative to the viewport.
 * Throttled via requestAnimationFrame for performance.
 * Returns { x: 0, y: 0 } until the user moves the mouse.
 *
 * Rule: Only use on desktop. Check for pointer device before using.
 */
export function useMousePosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    let pending = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
        pending = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}

/**
 * useMousePositionRelative
 * Tracks mouse position relative to a specific element.
 * Useful for spotlight effects and tilt animations.
 *
 * Returns { x, y } normalized to -0.5 to 0.5
 * (0, 0 = center of element)
 */
export function useMousePositionRelative(
  ref: React.RefObject<HTMLElement | null>
): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      setPosition({ x, y });
    },
    [ref]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => element.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, [ref, handleMouseMove]);

  return position;
}
