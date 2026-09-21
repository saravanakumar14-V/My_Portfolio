'use client';

import { useEffect, useRef } from 'react';
import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { AmbientGlow } from '@/effects/lighting/AmbientGlow';
import { SpecularButton } from '@/components/ui/Button/SpecularButton';
import { profile } from '@/data/profile';
import { Linkedin, Github, Mail, ArrowUpRight, Sparkles, CheckCircle2, Radio } from 'lucide-react';
import { useExperienceDirector } from '@/stores/experienceDirectorStore';
import styles from './ContactExperience.module.css';

export function ContactExperience() {
  const reducedMotion = useReducedMotion();
  const revealRef = useRegisteredAnimation('scroll-reveal', reducedMotion) as React.RefObject<HTMLDivElement>;
  const sectionRef = useRef<HTMLElement>(null);
  const setChapter = useExperienceDirector(state => state.setChapter);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    
    let ctx: gsap.Context;
    let effectMounted = true;
    
    (async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          onEnter: () => setChapter('contact'),
          onLeaveBack: () => setChapter('capabilities'),
        });
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion, setChapter]);

  return (
    <Section ref={sectionRef} spacing="lg" id="contact" className={styles.contactSection}>
      <AmbientGlow variant="accent" position="top-left" opacity={0.4} />
      <AmbientGlow variant="primary" position="bottom-right" opacity={0.5} />
      
      <Container size="wide" className={styles.container}>
        <div ref={revealRef} className={styles.climaxCard}>
          
          {/* ── Top Eyebrow Tag ──────────────────────────────────────── */}
          <div className={styles.topBar}>
            <div className={styles.metaBadge}>
              <Sparkles size={12} className={styles.sparkleIcon} />
              <span>CONTACT · DIRECT INQUIRIES</span>
            </div>
            <div className={styles.statusBeacon}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.statusText}>AVAILABLE FOR PROJECTS</span>
            </div>
          </div>

          {/* ── Asymmetric Dual-Zone Composition ────────────────────────── */}
          <div className={styles.asymmetricGrid}>
            
            {/* ── Left Zone: Statement, Hierarchy & Primary Action (60%) ── */}
            <div className={styles.statementZone}>
              <Heading level={2} size="6xl" className={styles.headline}>
                <span className={styles.headLineText}>HAVE A PROJECT</span>
                <span className={styles.accentText}>IN MIND?</span>
              </Heading>
              
              <Text size="xl" color="secondary" className={styles.supportingSentence}>
                I build web applications, AI systems, automation tools, dashboards, and custom software.
              </Text>

              <div className={styles.ctaWrapper}>
                <SpecularButton href="/contact" className={styles.primaryCtaBtn}>
                  <span>START A PROJECT</span>
                  <ArrowUpRight size={16} className={styles.ctaArrow} />
                </SpecularButton>

                <a
                  href={`mailto:${profile.contact.email}`}
                  className={styles.secondaryCtaBtn}
                  aria-label="Send direct email"
                >
                  <Mail size={15} />
                  <span>EMAIL ME</span>
                </a>
              </div>
            </div>

            {/* ── Right Zone: Technical Domain Matrix & Signal Panel (40%) ── */}
            <div className={styles.technicalZone}>
              <div className={styles.matrixCard}>
                <div className={styles.matrixHeader}>
                  <Radio size={13} className={styles.matrixIcon} />
                  <span className={styles.matrixTitle}>AVAILABLE FOR</span>
                </div>

                <ul className={styles.opportunityList}>
                  <li className={styles.opportunityItem}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.opportunityText}>FULL-STACK WEB APPLICATIONS</span>
                  </li>
                  <li className={styles.opportunityItem}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.opportunityText}>AI &amp; LLM INTEGRATIONS</span>
                  </li>
                  <li className={styles.opportunityItem}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.opportunityText}>WORKFLOW AUTOMATION &amp; TOOLS</span>
                  </li>
                  <li className={styles.opportunityItem}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.opportunityText}>DATA &amp; DASHBOARD SOLUTIONS</span>
                  </li>
                  <li className={styles.opportunityItem}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.opportunityText}>FREELANCE CONTRACTS</span>
                  </li>
                </ul>

                <div className={styles.locationFooter}>
                  <span className={styles.locationDot} />
                  <span>Available for freelance work · Based in India</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Bottom Channel Bar: Recognizable Social Links ─────────── */}
          <div className={styles.bottomSocialBar}>
            <span className={styles.connectLabel}>Direct Channels:</span>
            
            <div className={styles.socialButtons}>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <Linkedin size={15} className={styles.socialIcon} />
                <span>LinkedIn ↗</span>
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
                aria-label="GitHub profile (opens in new tab)"
              >
                <Github size={15} className={styles.socialIcon} />
                <span>GitHub ↗</span>
              </a>

              <a
                href={`mailto:${profile.contact.email}`}
                className={styles.socialPill}
                aria-label="Send direct email"
              >
                <Mail size={15} className={styles.socialIcon} />
                <span>Direct Email</span>
              </a>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
