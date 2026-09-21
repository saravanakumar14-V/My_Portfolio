/**
 * GSAP Initialization
 * Register all required GSAP plugins.
 * Import and call once at the app root (MotionProvider).
 *
 * Rules:
 * - Only import/register plugins that are actually used
 * - This file handles all GSAP plugin registration in one place
 * - Never import GSAP plugins directly in components
 */

let initialized = false;

/**
 * Initialize and register all GSAP plugins.
 * Safe to call multiple times — runs only once.
 */
export async function initGSAP(): Promise<void> {
  if (initialized) return;
  if (typeof window === 'undefined') return;

  const gsap = (await import('gsap')).default;
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  // Global GSAP configuration
  gsap.config({
    force3D: true,         // GPU-accelerated transforms
    nullTargetWarn: false, // Suppress warnings for null targets
  });

  // ScrollTrigger defaults
  ScrollTrigger.config({
    ignoreMobileResize: true,   // Prevent resize reflow on mobile (address bar)
    limitCallbacks: true,       // Reduce unnecessary callbacks
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',  // Play once, never reverse
    once: false,                           // Managed per-animation
    markers: false,                        // Never in production
  });

  initialized = true;
  console.debug('[GSAP] Initialized with ScrollTrigger');
}

/**
 * Get the GSAP instance (after initialization).
 * Used when you need gsap directly without importing.
 */
export async function getGSAP() {
  await initGSAP();
  return import('gsap');
}

/**
 * Get ScrollTrigger instance (after initialization).
 */
export async function getScrollTrigger() {
  await initGSAP();
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  return ScrollTrigger;
}
