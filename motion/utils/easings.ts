/**
 * Motion Easings — GSAP format strings
 * Import in GSAP animation calls. Never hardcode easing strings.
 *
 * Rule: Easings are assigned by INTENT, not aesthetics.
 * See config/animation.ts for the full easing intent table.
 */

export const easings = {
  /** Entrance — fast start, graceful stop. Use for scroll reveals, page entrance. */
  outExpo:  'power4.out',

  /** Entrance (softer) — slightly less dramatic. */
  outQuart: 'power3.out',

  /** Exit — slow start, fast exit. Use for page exit, menu close. */
  inExpo:   'power4.in',

  /** Exit (softer) */
  inQuart:  'power3.in',

  /** State change — quick response, soft landing. Use for ALL hover/focus. */
  outCubic: 'power2.out',

  /** Tactile — slight overshoot. Use for button press, toggles. */
  outBack:  'back.out(1.7)',

  /** Continuous tracking — organic. Use for cursor follower, magnetic. */
  spring:   'elastic.out(0.6, 0.4)',

  /** Symmetric — smooth handoff. Use for page transitions, crossfades. */
  inOut:    'power2.inOut',

  /** Linear — only for progress bars, never UI elements. */
  linear:   'none',
} as const;

export type EasingName = keyof typeof easings;
