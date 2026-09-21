import { animationRegistry } from '../core/AnimationRegistry';
import { useExperienceDirector } from '@/stores/experienceDirectorStore';

export function registerHeroAnimations() {
  animationRegistry.register('hero-entrance', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      const scale = useExperienceDirector.getState().atmosphere.motionScale;
      const tl = gsap.timeline({ delay: 0.1 });

      const eyebrow = target.querySelector('[data-hero-eyebrow]');
      const headingLines = target.querySelectorAll('[data-hero-line]');
      const description = target.querySelector('[data-hero-desc]');
      const actions = target.querySelector('[data-hero-actions]');
      const scrollHint = target.querySelector('[data-hero-scroll]');

      if (eyebrow) {
        tl.fromTo(eyebrow, 
          { opacity: 0, y: 16 }, 
          { opacity: 1, y: 0, duration: 1.2 * scale, ease: 'expo.out' }
        );
      }

      if (headingLines.length) {
        tl.fromTo(headingLines, 
          { opacity: 0, y: 32, clipPath: 'inset(0 0 100% 0)' },
          { 
            opacity: 1, 
            y: 0, 
            clipPath: 'inset(0 0 0% 0)', 
            duration: 1.4 * scale, 
            ease: 'expo.out', 
            stagger: 0.08 * scale
          }, 
          '<0.1'
        );
      }

      if (description) {
        tl.fromTo(description, 
          { opacity: 0, y: 16 }, 
          { opacity: 1, y: 0, duration: 1.2 * scale, ease: 'expo.out' }, 
          '<0.3'
        );
      }

      if (actions && actions.children.length) {
        tl.fromTo(actions.children, 
          { opacity: 0, y: 12 }, 
          { opacity: 1, y: 0, duration: 1.0 * scale, ease: 'expo.out', stagger: 0.05 * scale }, 
          '<0.1'
        );
      }

      if (scrollHint) {
        tl.fromTo(scrollHint, 
          { opacity: 0 }, 
          { opacity: 1, duration: 1, ease: 'power2.out' }, 
          '+=0.2'
        );
      }
    });
  });
}
