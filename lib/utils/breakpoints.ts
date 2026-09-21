/**
 * Breakpoint constants
 * Mirror the CSS custom property breakpoints.
 * Use in JS/TS where CSS cannot be used (GSAP, conditional rendering).
 */
export const BREAKPOINTS = {
  sm:    640,   // Large phones
  md:    768,   // Tablets
  lg:    1024,  // Laptops
  xl:    1280,  // Desktops
  '2xl': 1536,  // Large desktops
  ultra: 1920,  // Ultrawide
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Returns whether the current viewport is at or above the given breakpoint.
 * Only call on client side.
 */
export function isAbove(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
}

/**
 * Returns whether the current viewport is below the given breakpoint.
 * Only call on client side.
 */
export function isBelow(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS[breakpoint];
}

/**
 * Build a CSS media query string from a breakpoint.
 */
export function mediaQuery(breakpoint: Breakpoint, direction: 'up' | 'down' = 'up'): string {
  const px = BREAKPOINTS[breakpoint];
  return direction === 'up'
    ? `(min-width: ${px}px)`
    : `(max-width: ${px - 1}px)`;
}
