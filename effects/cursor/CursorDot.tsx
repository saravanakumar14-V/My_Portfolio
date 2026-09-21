'use client';

import { useCursorStore } from '@/stores/cursorStore';
import { useCursorPhysics } from './useCursorPhysics';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './CursorDot.module.css';

/**
 * Custom Cursor DOM Element
 * Only renders on devices with a fine pointer (mouse).
 */
export function CursorDot() {
  const reducedMotion = useReducedMotion();
  const { state, isVisible, label } = useCursorStore();
  const cursorRef = useCursorPhysics();

  // On touch devices or reduced motion, we completely hide the custom cursor
  if (reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        styles.cursorWrapper,
        !isVisible && styles.hidden,
        styles[state]
      )}
      aria-hidden="true"
    >
      <div className={styles.dot}>
        {label && <span className={styles.label}>{label}</span>}
      </div>
      <div className={styles.ring} />
    </div>
  );
}
