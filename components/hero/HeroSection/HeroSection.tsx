'use client';

import React, { useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useUIStore } from '@/stores/uiStore';
import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { AmbientGlow } from '@/effects/lighting/AmbientGlow';
import { DriftWall } from '@/effects/background/DriftWall';
import { SpecularButton } from '@/components/ui/Button/SpecularButton';
import { profile } from '@/data/profile';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { SpatialEnergyCore } from '@/effects/background/SpatialEnergyCore';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const experienceState = useUIStore((state) => state.experienceState);
  
  const isAnimationReady = experienceState === 'reveal' || experienceState === 'interactive';
  const disableAnimation = reducedMotion || !isAnimationReady;

  const containerRef = useRegisteredAnimation('hero-entrance', disableAnimation) as React.RefObject<HTMLDivElement>;

  // Interactive Photo Card Tilt State
  const photoCardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className={styles.hero} aria-label="Hero Opening Interface">
      <DriftWall />
      <SpatialEnergyCore />
      <AmbientGlow variant="accent" position="top-left" opacity={0.3} />
      <AmbientGlow variant="primary" position="center" opacity={0.45} />

      <Container size="wide">
        <div ref={containerRef} className={styles.heroContainer}>
          
          {/* ── Top System Header Frame ──────────────────────────────── */}
          <div className={styles.topSystemBar}>
            <div className={styles.systemSignal}>
              <span className={styles.livePulse} aria-hidden="true" />
              <span>Available for freelance work · Based in India</span>
            </div>

            <div className={styles.availabilityRow}>
              <span className={styles.statusLive}>AI · FULL-STACK · AUTOMATION</span>
            </div>
          </div>

          {/* ── Asymmetric Multi-Zone Core ─────────────────────────────── */}
          <div className={styles.asymmetricGrid}>
            
            {/* ── Zone 1: Statement & Identity (Left Column) ──── */}
            <div className={styles.statementZone}>
              <div className={styles.subIdentityPill}>
                <Cpu size={12} className={styles.subIcon} />
                <span>PRODUCT ENGINEERING &amp; AI SYSTEMS</span>
              </div>

              <Heading level={1} size="6xl" className={styles.headline} aria-label="AI and Full-Stack Developer">
                <span className={styles.headWord}>AI &amp; FULL-STACK</span>
                <span className={styles.headAccent}>DEVELOPER.</span>
              </Heading>

              <Text size="lg" color="secondary" className={styles.positioningText}>
                I build modern web applications, AI-powered systems, automation tools, and data-driven products.
              </Text>

              {/* Action Buttons with Strict Visual Hierarchy */}
              <div className={styles.actionCluster}>
                <SpecularButton href="/contact" className={styles.primaryActionBtn}>
                  <span>START A PROJECT</span>
                  <ArrowRight size={14} className={styles.btnArrow} />
                </SpecularButton>

                <CursorTrigger cursorState="button" magnetic>
                  <a href="#featured-work" className={styles.secondaryActionBtn}>
                    <span>VIEW MY WORK</span>
                    <ArrowUpRight size={14} className={styles.ghostArrow} />
                  </a>
                </CursorTrigger>
              </div>
            </div>

            {/* ── Zone 2: Profile Photo Human Visual Anchor (Right Column) ─ */}
            <div className={styles.profileVisualZone}>
              <CursorTrigger cursorState="button" label="VIEW PROFILE">
                <Link
                  ref={photoCardRef}
                  href="/about"
                  className={styles.profileCard}
                  aria-label="View Saravanakumar V profile and background"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  }}
                >
                  <div className={styles.cardGlowBackdrop} />
                  <div className={styles.photoContainer}>
                    <Image
                      src={profile.photo}
                      alt={profile.photoAlt}
                      width={520}
                      height={650}
                      priority
                      className={styles.profileImage}
                    />
                    <div className={styles.photoGradientOverlay} />
                    
                    {/* Hover Pill Affordance */}
                    <div className={styles.photoOverlayBadge}>
                      <span>VIEW PROFILE</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                  {/* Compact Rezel System Indicator below photo */}
                  <div className={styles.rezelIndicatorRow}>
                    <div className={styles.rezelMeta}>
                      <Sparkles size={11} className={styles.sparkleIcon} />
                      <span className={styles.rezelMetaTitle}>REZEL · DESKTOP AI</span>
                    </div>
                    <span className={styles.rezelMetaSub}>Explore Architecture ↗</span>
                  </div>
                </Link>
              </CursorTrigger>
            </div>

          </div>

          {/* ── Bottom System Navigation Cue ──────────────────────────── */}
          <div className={styles.bottomSystemBar}>
            <a href="#featured-work" className={styles.scrollAffordance} aria-label="Scroll down to selected work">
              <div className={styles.scrollIndicatorLine} />
              <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
}
