import { animationRegistry } from '../core/AnimationRegistry';
import { useExperienceDirector } from '@/stores/experienceDirectorStore';

/**
 * Registers global scroll choreography animations.
 * These animations control how different narrative sections reveal themselves as the user scrolls.
 */
export function registerScrollChoreography() {
  
  // Staggered text reveal for narrative prose (About Section)
  animationRegistry.register('story-reveal', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const scale = useExperienceDirector.getState().atmosphere.motionScale;
        
        // Find all lines or paragraphs marked for reveal
        const elements = target.querySelectorAll('[data-reveal]');
        
        if (elements.length > 0) {
          gsap.fromTo(elements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2 * scale,
              ease: 'expo.out',
              stagger: 0.1 * scale,
              scrollTrigger: {
                trigger: target,
                start: 'top 75%',
                once: true,
              }
            }
          );
        }
      });
    });
  });

  // Z-depth parallax and focus for Journey Milestones
  animationRegistry.register('journey-milestone', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const scale = useExperienceDirector.getState().atmosphere.motionScale;

        gsap.fromTo(target,
          { opacity: 0.3, scale: 0.95, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0 * scale,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 0.5 * scale,
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      });
    });
  });

  // Staggered grid reveal for Skills and Certifications
  animationRegistry.register('grid-reveal', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const scale = useExperienceDirector.getState().atmosphere.motionScale;

        const items = target.children;
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8 * scale,
              ease: 'expo.out',
              stagger: 0.1 * scale,
              scrollTrigger: {
                trigger: target,
                start: 'top 85%',
                once: true,
              }
            }
          );
        }
      });
    });
  });
}
