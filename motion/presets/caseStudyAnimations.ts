import { animationRegistry } from '../core/AnimationRegistry';

export function registerCaseStudyAnimations() {
  // Parallax background hero
  animationRegistry.register('case-hero-parallax', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to(target, {
          yPercent: 30,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: target,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    });
  });

  // Staggered text reveal for problem/research
  animationRegistry.register('case-text-reveal', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        const lines = target.querySelectorAll('[data-reveal]');
        if (lines.length > 0) {
          gsap.fromTo(lines, 
            { opacity: 0, y: 30 },
            {
              opacity: 1, 
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: target,
                start: 'top 80%',
                once: true
              }
            }
          );
        }
      });
    });
  });

  // Pinning for the features section
  animationRegistry.register('case-feature-pin', (_, target) => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const visualContainer = target.querySelector('[data-feature-visual]');
        
        if (visualContainer) {
          ScrollTrigger.create({
            trigger: target,
            start: 'top top',
            end: 'bottom bottom',
            pin: visualContainer,
            pinSpacing: false
          });
        }
      });
    });
  });
}
