import { useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type InteractionSetup = (target: HTMLElement, isHovered: boolean, isFocused: boolean) => void;

/**
 * Hook to manage interactive GSAP animations (hover/focus).
 * Returns ref to attach to the element, and event handlers.
 */
export function useInteraction(setup: InteractionSetup) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isHovered = useRef(false);
  const isFocused = useRef(false);

  const update = useCallback(() => {
    if (reducedMotion || !ref.current) return;
    setup(ref.current, isHovered.current, isFocused.current);
  }, [reducedMotion, setup]);

  const onMouseEnter = useCallback(() => {
    isHovered.current = true;
    update();
  }, [update]);

  const onMouseLeave = useCallback(() => {
    isHovered.current = false;
    update();
  }, [update]);

  const onFocus = useCallback(() => {
    isFocused.current = true;
    update();
  }, [update]);

  const onBlur = useCallback(() => {
    isFocused.current = false;
    update();
  }, [update]);

  return {
    ref,
    bindings: {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    }
  };
}
