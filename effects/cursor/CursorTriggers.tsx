'use client';

import { useRef, useCallback, ReactNode } from 'react';
import { useCursorStore, CursorState } from '@/stores/cursorStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CursorTriggerProps {
  children: ReactNode;
  cursorState?: CursorState;
  label?: string;
  magnetic?: boolean;
  className?: string;
  as?: React.ElementType;
}

/**
 * Reusable wrapper to trigger cursor state changes on hover with restrained physics.
 */
export function CursorTrigger({
  children,
  cursorState = 'hover',
  label,
  magnetic = false,
  className,
  as: Component = 'div',
}: CursorTriggerProps) {
  const ref = useRef<HTMLElement>(null);
  const setCursorState = useCursorStore((state) => state.setState);
  const setLabel = useCursorStore((state) => state.setLabel);
  const setMagnetic = useCursorStore((state) => state.setMagnetic);
  const resetCursor = useCursorStore((state) => state.reset);
  const reducedMotion = useReducedMotion();

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion) return;
    setCursorState(cursorState);
    if (label) setLabel(label);
    if (magnetic) setMagnetic(true);
  }, [cursorState, label, magnetic, reducedMotion, setCursorState, setLabel, setMagnetic]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion) return;
    resetCursor();
    
    // Smoothly return to exact resting position (no bounce or detached dragging)
    if (magnetic && ref.current) {
      import('gsap').then((m) => { 
        const gsap = m.default;
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.25, ease: 'power2.out' });
      });
    }
  }, [magnetic, reducedMotion, resetCursor]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!magnetic || reducedMotion || !ref.current) return;
    
    // Restrained magnetic pull calculation (bounded to ±3px maximum)
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    const strength = 0.04;
    const clampedX = Math.max(-3, Math.min(3, x * strength));
    const clampedY = Math.max(-3, Math.min(3, y * strength));
    
    import('gsap').then((m) => { 
      const gsap = m.default;
      gsap.to(ref.current, {
        x: clampedX,
        y: clampedY,
        duration: 0.2,
        ease: 'power2.out',
      });
    });
  }, [magnetic, reducedMotion]);

  return (
    <Component
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Component>
  );
}
