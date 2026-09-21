'use client';

import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { AmbientGlow } from '@/effects/lighting/AmbientGlow';
import { profile } from '@/data/profile';
import { ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';
import styles from './AboutExperience.module.css';

export function AboutExperience() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRegisteredAnimation('story-reveal', reducedMotion) as React.RefObject<HTMLDivElement>;

  return (
    <Section spacing="default" id="about" aria-label="About Me">
      <AmbientGlow variant="primary" position="top-left" opacity={0.35} />
      
      <Container size="wide">
        <div ref={containerRef} className={styles.storyContainer}>
          <div className={styles.grid}>
            
            {/* Left Column: Anchor Statement (45%) */}
            <div className={styles.leftColumn}>
              <div data-reveal>
                <div className={styles.eyebrowRow}>
                  <Compass size={12} className={styles.eyebrowIcon} />
                  <span className={styles.metaLabel}>PROFILE &amp; APPROACH</span>
                </div>

                <Heading level={2} size="5xl" className={styles.statement}>
                  Turning ideas into working software.<br/>
                  <span className={styles.accent}>Where AI and engineering meet.</span>
                </Heading>

                <div className={styles.academicBadge}>
                  <span className={styles.academicDot} aria-hidden="true" />
                  <span>{profile.education.field} · {profile.education.institution} ({profile.education.affiliation}) · {profile.education.period}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Teaser & Philosophy Cards (55%) */}
            <div className={styles.rightColumn}>
              <div data-reveal className={styles.teaserBlock}>
                <Text size="lg" color="secondary" className={styles.prose}>
                  {profile.positioning.summary} {profile.positioning.approach}
                </Text>
              </div>

              {/* 3 Verified Philosophy Nodes */}
              <div data-reveal className={styles.philosophyList}>
                {profile.philosophy.map((node) => (
                  <div key={node.number} className={styles.node}>
                    <span className={styles.nodeIndex}>{node.number}</span>
                    <div className={styles.nodeBody}>
                      <h3 className={styles.nodeTitle}>{node.title}</h3>
                      <p className={styles.nodeDesc}>{node.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Link to Dedicated /about Page */}
              <div data-reveal className={styles.actionWrapper}>
                <CursorTrigger cursorState="button" magnetic>
                  <Link href="/about" className={styles.readMoreBtn}>
                    <span>Read Full Profile &amp; Approach</span>
                    <ArrowRight size={14} />
                  </Link>
                </CursorTrigger>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
