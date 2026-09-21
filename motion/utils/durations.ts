/**
 * Motion Duration Tokens — in SECONDS (GSAP format)
 * CSS tokens are in ms; these are converted for GSAP.
 *
 * Tier system:
 *   Micro     — 0–200ms  — instant feedback
 *   Standard  — 200–500ms — perceptible but fast
 *   Cinematic — 500–1200ms — deliberate and choreographed
 *
 * Rule: Absolute max is 1.2s. Nothing exceeds this.
 */

export const durations = {
  // Micro tier
  instant: 0,
  fast:    0.15,

  // Standard tier
  normal:  0.3,
  slow:    0.5,

  // Cinematic tier
  slower:  0.8,
  slowest: 1.2,

  // Max — used as the hard ceiling check
  MAX: 1.2,
} as const;

export type DurationName = keyof Omit<typeof durations, 'MAX'>;

/**
 * Stagger timing tokens — in SECONDS (GSAP format)
 * Rule: Max 6 children per stagger group.
 *       Always matches reading direction.
 */
export const staggers = {
  fast:   0.04,  // Nav links, tags
  normal: 0.08,  // Cards, list items
  slow:   0.12,  // Hero text lines, section reveals
  MAX_CHILDREN: 6,  // Beyond this, batch into sub-groups
} as const;

export type StaggerName = 'fast' | 'normal' | 'slow';
