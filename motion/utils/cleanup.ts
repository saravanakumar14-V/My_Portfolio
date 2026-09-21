import type gsap from 'gsap';

/**
 * Animation Cleanup Utilities
 * Ensures GSAP timelines and ScrollTriggers are properly
 * cleaned up to prevent memory leaks and orphaned animations.
 *
 * Rule: Every component that creates GSAP animations must
 *       call cleanup in its useEffect return function.
 */

/**
 * Kill an array of GSAP timelines.
 * Clears their properties to avoid style leakage.
 */
export function killTimelines(
  timelines: (gsap.core.Timeline | gsap.core.Tween | null | undefined)[]
): void {
  timelines.forEach((tl) => {
    if (tl) {
      tl.kill();
    }
  });
}

/**
 * Kill all ScrollTriggers associated with a specific element or container.
 * Call on component unmount.
 */
export function killScrollTriggers(
  triggers: Array<{ kill: () => void } | null | undefined>
): void {
  triggers.forEach((trigger) => {
    if (trigger) {
      trigger.kill();
    }
  });
}

/**
 * Pause all animations in GSAP's global timeline when the browser tab is hidden.
 * Resume when the tab is visible again.
 *
 * This prevents animations running invisibly, causing jank when the user returns.
 *
 * Usage: Call once in the root layout or MotionProvider.
 */
export function setupVisibilityPause(gsapInstance: typeof gsap): () => void {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      gsapInstance.globalTimeline.pause();
    } else {
      gsapInstance.globalTimeline.resume();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}

/**
 * Clear transform and opacity inline styles from an element after animation.
 * Prevents inline style pollution.
 */
export function clearAnimationStyles(
  elements: (HTMLElement | null | undefined)[]
): void {
  elements.forEach((el) => {
    if (el) {
      el.style.transform = '';
      el.style.opacity = '';
      el.style.willChange = '';
    }
  });
}
