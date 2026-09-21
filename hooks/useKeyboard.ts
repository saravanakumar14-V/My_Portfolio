'use client';

import { useEffect } from 'react';

/**
 * useLockScroll
 * Prevents body scroll when a modal or menu is open.
 * Preserves scroll position on unlock.
 */
export function useLockScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

/**
 * useKeyboard
 * Listens for a specific key press and calls the handler.
 * Cleans up the listener on unmount.
 *
 * Usage:
 *   useKeyboard('Escape', () => setOpen(false));
 */
export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  target: 'window' | 'document' = 'window'
): void {
  useEffect(() => {
    const element = target === 'window' ? window : document;

    const handleKeyDown = (event: Event) => {
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key === key) {
        handler(keyEvent);
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [key, handler, target]);
}

/**
 * useFocusTrap
 * Traps keyboard focus within an element (for modals and menus).
 * Cycles through focusable elements with Tab / Shift+Tab.
 * Focus returns to trigger element on close.
 */
export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  returnFocusRef?: React.RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    if (!active || !ref.current) return;

    const FOCUSABLE_SELECTORS = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const container = ref.current;
    const returnNode = returnFocusRef?.current;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    );

    if (focusable.length === 0) return;

    // Focus first element on open
    focusable[0].focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Return focus to trigger on close
      returnNode?.focus();
    };
  }, [active, ref, returnFocusRef]);
}
