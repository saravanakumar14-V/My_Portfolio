'use client';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { Spotlight } from '@/effects/lighting/Spotlight';
import { getExperiences } from '@/data/experience';
import { ArrowRight, History, Calendar, Building2 } from 'lucide-react';
import Link from 'next/link';
import styles from './JourneyExperience.module.css';

export function JourneyExperience() {
  const experiences = getExperiences();
  
  return (
    <Section spacing="default" id="journey" aria-label="Experience & Education">
      <Container size="wide">
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <History size={12} className={styles.eyebrowIcon} />
            <span className={styles.metaLabel}>EXPERIENCE &amp; EDUCATION</span>
          </div>

          <Heading level={2} size="5xl" className={styles.title}>
            Experience &amp; Education.
          </Heading>
          <Text size="xl" color="secondary" className={styles.description}>
            A snapshot of my academic path and completed internships across AI, machine learning, data science, and cloud computing.
          </Text>
        </div>

        {/* ── High-Signal Milestone Cards Matrix ──────────────────────── */}
        <div className={styles.milestoneMatrix}>
          <Spotlight size={600} color="rgba(56, 189, 248, 0.08)" />
          {experiences.map((exp, idx) => (
            <div key={exp.id} className={styles.milestoneCard}>
              <div className={styles.cardTop}>
                <span className={styles.indexTag}>0{idx + 1}</span>
                <span className={styles.dateTag}>
                  <Calendar size={11} className={styles.dateIcon} />
                  <span>{exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}</span>
                </span>
                {exp.current ? (
                  <span className={styles.activeTag}>IN PROGRESS</span>
                ) : (
                  <span className={styles.completedTag}>COMPLETED</span>
                )}
              </div>

              <h3 className={styles.roleTitle}>{exp.role}</h3>
              
              <div className={styles.companyRow}>
                <Building2 size={12} className={styles.companyIcon} />
                <span>{exp.company}</span>
              </div>

              <p className={styles.shortDesc}>{exp.description}</p>

              <div className={styles.techRow}>
                {exp.tech.slice(0, 3).map((t) => (
                  <span key={t} className={styles.techPill}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA to Dedicated /experience Page ───────────────────────── */}
        <div className={styles.actionWrapper}>
          <CursorTrigger cursorState="button" magnetic>
            <Link href="/experience" className={styles.exploreBtn}>
              <span>Explore Full Experience &amp; Education Timeline</span>
              <ArrowRight size={14} />
            </Link>
          </CursorTrigger>
        </div>
      </Container>
    </Section>
  );
}
