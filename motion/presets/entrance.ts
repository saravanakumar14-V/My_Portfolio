/**
 * Reveal Animation Presets
 * Reusable GSAP animation functions for scroll-driven element reveals.
 *
 * Rules:
 * - All durations come from motion/utils/durations.ts
 * - All easings come from motion/utils/easings.ts
 * - Distance: 24px default. Never exceed 40px.
 * - Animations use transform + opacity ONLY (GPU-composited)
 * - Always check reducedMotion before calling
 * - Use GSAP context for cleanup
 */

import { durations, staggers } from '../utils/durations';
import { easings } from '../utils/easings';

export interface RevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;   // px — default 24
  duration?: number;   // seconds — defaults to durations.slow
  delay?: number;      // seconds — default 0
  ease?: string;       // defaults to easings.outExpo
  stagger?: number;    // seconds between children — default 0
}

/**
 * Reveal one or more elements from invisible to visible.
 * Returns a GSAP tween/timeline.
 */
export async function revealFrom(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
): Promise<gsap.core.Tween> {
  const {
    direction = 'up',
    distance = 24,
    duration = durations.slow,
    delay = 0,
    ease = easings.outExpo,
    stagger = 0,
  } = options;

  const gsap = (await import('gsap')).default;

  const fromVars: gsap.TweenVars = { opacity: 0, autoAlpha: 0 };
  const toVars: gsap.TweenVars = {
    opacity: 1,
    autoAlpha: 1,
    duration,
    delay,
    ease,
    stagger: stagger > 0 ? stagger : undefined,
  };

  switch (direction) {
    case 'up':
      fromVars.y = distance;
      toVars.y = 0;
      break;
    case 'down':
      fromVars.y = -distance;
      toVars.y = 0;
      break;
    case 'left':
      fromVars.x = distance;
      toVars.x = 0;
      break;
    case 'right':
      fromVars.x = -distance;
      toVars.x = 0;
      break;
    case 'fade':
      // No transform — opacity only
      break;
  }

  return gsap.fromTo(targets, fromVars, toVars);
}

/**
 * Stagger reveal a group of elements (child nodes).
 * Rule: max 6 per group. Larger groups need batching.
 */
export async function staggerReveal(
  parent: string | Element,
  childSelector: string,
  options: RevealOptions & { staggerAmount?: 'fast' | 'normal' | 'slow' } = {}
): Promise<gsap.core.Timeline> {
  const gsap = (await import('gsap')).default;
  const {
    direction = 'up',
    distance = 24,
    duration = durations.slow,
    delay = 0,
    ease = easings.outExpo,
    staggerAmount = 'normal',
  } = options;

  const stagger = staggers[staggerAmount];

  const fromVars: gsap.TweenVars = { opacity: 0, autoAlpha: 0 };
  const toVars: gsap.TweenVars = {
    opacity: 1,
    autoAlpha: 1,
    duration,
    ease,
    stagger,
  };

  if (direction === 'up')    { fromVars.y = distance; toVars.y = 0; }
  if (direction === 'down')  { fromVars.y = -distance; toVars.y = 0; }
  if (direction === 'left')  { fromVars.x = distance; toVars.x = 0; }
  if (direction === 'right') { fromVars.x = -distance; toVars.x = 0; }

  const tl = gsap.timeline({ delay });

  // Query children within parent
  const targets =
    typeof parent === 'string'
      ? document.querySelector(parent)?.querySelectorAll(childSelector)
      : (parent as Element).querySelectorAll(childSelector);

  if (targets && targets.length > 0) {
    tl.fromTo(targets, fromVars, toVars);
  }

  return tl;
}

/**
 * Scale reveal — for cards and image containers.
 * Subtle scale from 0.95 to 1 with opacity.
 */
export async function scaleReveal(
  targets: gsap.TweenTarget,
  options: Pick<RevealOptions, 'duration' | 'delay' | 'ease' | 'stagger'> = {}
): Promise<gsap.core.Tween> {
  const gsap = (await import('gsap')).default;
  const {
    duration = durations.slow,
    delay = 0,
    ease = easings.outExpo,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, autoAlpha: 0, scale: 0.95 },
    { opacity: 1, autoAlpha: 1, scale: 1, duration, delay, ease, stagger: stagger || undefined }
  );
}
