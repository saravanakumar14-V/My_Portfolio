// ============================================================
// ANIMATION CONFIGURATION
// ============================================================
// Centralised constants — import in GSAP setup and motion utils.
// Rule: Never hardcode durations/easings in components.
//       Always import from this file.
// ============================================================

// ── Duration Tokens (in seconds — GSAP uses seconds, not ms) ─
export const DURATIONS = {
  instant:  0,
  fast:     0.15,
  normal:   0.3,
  slow:     0.5,
  slower:   0.8,
  slowest:  1.2,
} as const;

// ── Easing Tokens (GSAP format) ──────────────────────────────
export const EASINGS = {
  // Entrance
  outExpo:   'power4.out',
  outQuart:  'power4.out',
  // Exit
  inExpo:    'power4.in',
  inQuart:   'power3.in',
  // Interaction (hover, focus)
  outCubic:  'power2.out',
  // Tactile (button press)
  outBack:   'back.out(1.7)',
  // Continuous tracking (cursor)
  spring:    'elastic.out(1, 0.5)',
  // Symmetric (page transitions)
  inOut:     'power2.inOut',
  // CSS equivalent strings
  css: {
    outExpo:   'cubic-bezier(0.16, 1, 0.3, 1)',
    outQuart:  'cubic-bezier(0.25, 1, 0.5, 1)',
    inExpo:    'cubic-bezier(0.7, 0, 0.84, 0)',
    inQuart:   'cubic-bezier(0.5, 0, 0.75, 0)',
    outCubic:  'cubic-bezier(0.33, 1, 0.68, 1)',
    outBack:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring:    'cubic-bezier(0.22, 1.2, 0.36, 1)',
    inOut:     'cubic-bezier(0.65, 0, 0.35, 1)',
  },
} as const;

// ── Stagger Tokens (in seconds) ──────────────────────────────
export const STAGGERS = {
  fast:   0.04,  // Nav links, tags
  normal: 0.08,  // Cards, list items
  slow:   0.12,  // Hero text lines, section reveals
  max:    6,     // Maximum staggered children per group
} as const;

// ── Scroll Animation Defaults ─────────────────────────────────
export const SCROLL_DEFAULTS = {
  start:         'top 80%',
  end:           'bottom 20%',
  scrub:         1,           // 1-second smoothing (never true/false)
  once:          true,        // Animations play once, never replay
  markers:       false,       // Always false in production
  toggleActions: 'play none none none',
} as const;

// ── Page Transition Config ────────────────────────────────────
export const PAGE_TRANSITION = {
  exit: {
    duration: DURATIONS.fast,
    ease:     EASINGS.inExpo,
    y:        -10,
    opacity:  0,
  },
  enter: {
    duration: DURATIONS.normal,
    ease:     EASINGS.outExpo,
    y:        10,
    opacity:  1,
  },
} as const;

// ── Parallax Limits ───────────────────────────────────────────
export const PARALLAX = {
  maxDisplacement: 60,        // px — beyond this causes overlap
  backgroundSpeed: 0.6,       // Slower than content
  foregroundSpeed: 1.2,       // Faster than content
} as const;

// ── Max Simultaneous Timelines ────────────────────────────────
export const ANIMATION_BUDGET = {
  maxGSAPTimelines:     5,
  maxScrollTriggers:    8,
  maxScrollPerViewport: 3,
  maxWillChange:        5,
  maxFrameMs:           4,    // JS animation budget per 16.67ms frame
} as const;
