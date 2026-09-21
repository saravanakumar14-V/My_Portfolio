import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

type AnimationSetup = (context: { add?: (...args: unknown[]) => void, revert?: () => void, [key: string]: unknown }, target: HTMLElement) => void;

class AnimationRegistry {
  private static instance: AnimationRegistry;
  private registry: Map<string, AnimationSetup>;

  private constructor() {
    this.registry = new Map();
  }

  public static getInstance(): AnimationRegistry {
    if (!AnimationRegistry.instance) {
      AnimationRegistry.instance = new AnimationRegistry();
    }
    return AnimationRegistry.instance;
  }

  /**
   * Register a new animation setup function.
   */
  public register(name: string, setup: AnimationSetup) {
    if (this.registry.has(name)) {
      console.warn(`Animation "${name}" is already registered. Overwriting.`);
    }
    this.registry.set(name, setup);
  }

  /**
   * Get an animation setup function by name.
   */
  public get(name: string): AnimationSetup | undefined {
    return this.registry.get(name);
  }
}

export const animationRegistry = AnimationRegistry.getInstance();

/**
 * Hook to apply a registered animation to a component.
 * Uses GSAP Context for safe cleanup.
 */
export function useRegisteredAnimation(animationName: string, disabled: boolean = false) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (disabled || !ref.current) return;

    let ctx: { revert: () => void } | undefined; // fixed TS error
    let effectMounted = true;
    const setup = animationRegistry.get(animationName);

    if (setup) {
      import('gsap').then((m) => { 
        if (!effectMounted) return;
        const gsap = m.default;
        ctx = gsap.context(() => {
          if (ref.current) {
            setup(ctx!, ref.current);
          }
        }, ref);
      });
    } else {
      console.warn(`Animation "${animationName}" not found in registry.`);
    }

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [animationName, disabled]);

  return ref;
}
