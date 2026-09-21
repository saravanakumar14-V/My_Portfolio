import { durations } from '../utils/durations';
import { easings } from '../utils/easings';

export const hoverEffects = {
  /**
   * Scale up slightly with subtle shadow increase
   */
  lift: (target: HTMLElement, isActive: boolean) => {
    import('gsap').then((m) => { const gsap = m.default;
      gsap.to(target, {
        scale: isActive ? 1.02 : 1,
        y: isActive ? -4 : 0,
        boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        duration: durations.fast,
        ease: easings.outCubic,
      });
    });
  },

  /**
   * Underline expansion (from left to right)
   */
  underline: (target: HTMLElement, isActive: boolean) => {
    import('gsap').then((m) => { const gsap = m.default;
      const line = target.querySelector('.hover-line');
      if (line) {
        gsap.to(line, {
          scaleX: isActive ? 1 : 0,
          transformOrigin: isActive ? 'left' : 'right',
          duration: durations.fast,
          ease: easings.outCubic,
        });
      }
    });
  },

  /**
   * Glow effect for buttons/cards
   */
  glow: (target: HTMLElement, isActive: boolean) => {
    import('gsap').then((m) => { const gsap = m.default;
      gsap.to(target, {
        boxShadow: isActive 
          ? '0 0 20px rgba(var(--color-accent-primary-rgb), 0.4)' 
          : 'none',
        duration: durations.normal,
        ease: easings.outCubic,
      });
    });
  }
};
