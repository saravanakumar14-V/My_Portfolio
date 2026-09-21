// ============================================================
// ANIMATION TYPE DEFINITIONS
// ============================================================

// Duration tier — all animations map to one of these
export type DurationTier = 'micro' | 'standard' | 'cinematic';

// Easing intent — assigned by animation intent, not aesthetics
export type EasingIntent =
  | 'entrance'    // Element appearing
  | 'exit'        // Element disappearing
  | 'interaction' // Hover, focus, active
  | 'tactile'     // Button press, toggle
  | 'tracking'    // Cursor, magnetic
  | 'transition'; // Page swap, crossfade

export interface AnimationConfig {
  duration: number;         // ms
  ease: string;             // cubic-bezier or GSAP easing string
  delay?: number;           // ms
}

export interface StaggerConfig {
  amount: number;           // ms between children
  from?: 'start' | 'end' | 'center' | number;
  ease?: string;
  maxChildren?: number;     // Max 6 per group (split into batches above)
}

export interface ScrollAnimationConfig {
  trigger?: string | Element;
  start?: string;           // e.g., "top 80%"
  end?: string;             // e.g., "bottom 20%"
  scrub?: boolean | number; // Smoothing in seconds (prefer number 1)
  markers?: boolean;        // Debug — never true in production
  toggleActions?: string;   // e.g., "play none none reverse"
  once?: boolean;           // Animation plays only once
}

export interface RevealAnimationOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;        // px — default 24
  duration?: DurationTier;
  stagger?: StaggerConfig;
  delay?: number;           // ms
  once?: boolean;           // Default true
}

// GSAP context ref type
export type GSAPContextRef = React.MutableRefObject<gsap.Context | undefined>;
