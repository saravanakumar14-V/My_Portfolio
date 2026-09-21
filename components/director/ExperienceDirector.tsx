'use client';

import { useEffect, useRef } from 'react';
import { useExperienceDirector, NarrativeChapter } from '@/stores/experienceDirectorStore';

/**
 * Headless controller that watches section intersections and 
 * drives global CSS atmospheric variables based on the active chapter.
 */
export function ExperienceDirector() {
  const setChapter = useExperienceDirector((state) => state.setChapter);
  const atmosphere = useExperienceDirector((state) => state.atmosphere);
  const isInitialized = useRef(false);

  // Set up ScrollTriggers for each section
  useEffect(() => {
    let ctx: gsap.Context;
    let retryCount = 0;
    let rafId: number;

    const initTriggers = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const sections: { id: string; chapter: NarrativeChapter }[] = [
        { id: 'hero', chapter: 'hero' },
        { id: 'projects', chapter: 'showcase' }, // Assuming ProjectShowcase has id="projects"
        { id: 'about', chapter: 'about' },
        { id: 'journey', chapter: 'journey' },
        { id: 'capabilities', chapter: 'capabilities' },
        { id: 'contact', chapter: 'contact' },
      ];

      const attemptSetup = () => {
        // Check if all elements exist
        const missingSections = sections.filter(({ id }) => !document.getElementById(id));
        
        // If elements are missing and we haven't retried too many times, wait for next frame
        if (missingSections.length > 0 && retryCount < 10) {
          retryCount++;
          rafId = requestAnimationFrame(attemptSetup);
          return;
        }

        ctx = gsap.context(() => {
          sections.forEach(({ id, chapter }) => {
            const element = document.getElementById(id);
            if (!element) return; // If still missing after retries, skip gracefully

            ScrollTrigger.create({
              trigger: element,
              start: 'top 50%',
              end: 'bottom 50%',
              onEnter: () => setChapter(chapter),
              onEnterBack: () => setChapter(chapter),
            });
          });

          // Initial setup for the first chapter if we are at the top
          if (!isInitialized.current && window.scrollY < 100) {
            setChapter('hero');
            isInitialized.current = true;
          }
        });
      };

      attemptSetup();
    };

    initTriggers();

    return () => {
      cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, [setChapter]);

  // Inject CSS variables globally when atmosphere changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--dir-ambient-color', atmosphere.ambientColor);
    root.style.setProperty('--dir-ambient-intensity', atmosphere.ambientIntensity.toString());
    root.style.setProperty('--dir-cursor-weight', atmosphere.cursorWeight.toString());
    root.style.setProperty('--dir-motion-scale', atmosphere.motionScale.toString());
  }, [atmosphere]);

  return null; // Headless
}
