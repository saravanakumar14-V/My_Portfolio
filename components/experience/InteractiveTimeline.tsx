'use client';

import { useState } from 'react';
import { Experience } from '@/types/experience';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { Building2, Calendar, MapPin, CheckCircle2, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import Link from 'next/link';
import styles from './InteractiveTimeline.module.css';

interface InteractiveTimelineProps {
  experiences: Experience[];
}

export function InteractiveTimeline({ experiences }: InteractiveTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = experiences[activeIndex] || experiences[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <div className={styles.container}>
      {/* ── Interactive Horizontal Milestone Axis ───────────────────── */}
      <div className={styles.axisWrapper}>
        <div className={styles.axisLine} />
        <div className={styles.milestoneNodes}>
          {experiences.map((exp, idx) => {
            const isActive = idx === activeIndex;
            return (
              <CursorTrigger key={exp.id} cursorState="button">
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`${styles.nodeButton} ${isActive ? styles.activeNode : ''}`}
                  aria-label={`View milestone ${exp.role} at ${exp.company}`}
                  aria-pressed={isActive}
                >
                  <div className={styles.nodeIndicator}>
                    <div className={styles.nodeDot} />
                    {isActive && <div className={styles.nodePulse} />}
                  </div>
                  <div className={styles.nodeMeta}>
                    <span className={styles.nodeDate}>{exp.startDate}</span>
                    <span className={styles.nodeCompany}>{exp.company.split(' ')[0]}</span>
                  </div>
                </button>
              </CursorTrigger>
            );
          })}
        </div>
      </div>

      {/* ── Active Milestone Spotlight View (Product Level) ─────────── */}
      <div className={styles.spotlightCard}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.badgeRow}>
              <span className={styles.indexBadge}>MILESTONE 0{activeIndex + 1} / 0{experiences.length}</span>
              <span className={styles.typeBadge}>{activeExp.type}</span>
              {activeExp.current ? (
                <span className={styles.currentBadge}>IN PROGRESS (2028 EXPECTED)</span>
              ) : (
                <span className={styles.completedBadge}>{activeExp.statusText || 'COMPLETED'}</span>
              )}
            </div>

            <Heading level={2} size="3xl" className={styles.roleTitle}>
              {activeExp.role}
            </Heading>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Building2 size={14} className={styles.metaIcon} />
                <span>{activeExp.company}</span>
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <Calendar size={14} className={styles.metaIcon} />
                <span>{activeExp.startDate} {activeExp.endDate ? `— ${activeExp.endDate}` : ''}</span>
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <MapPin size={14} className={styles.metaIcon} />
                <span>{activeExp.location} ({activeExp.locationMode})</span>
              </span>
            </div>
          </div>

          {/* Stepper Navigation Controls */}
          <div className={styles.stepperControls}>
            <CursorTrigger cursorState="button">
              <button 
                type="button" 
                onClick={handlePrev} 
                className={styles.stepBtn}
                aria-label="Previous milestone"
              >
                <ChevronLeft size={16} />
              </button>
            </CursorTrigger>
            <CursorTrigger cursorState="button">
              <button 
                type="button" 
                onClick={handleNext} 
                className={styles.stepBtn}
                aria-label="Next milestone"
              >
                <ChevronRight size={16} />
              </button>
            </CursorTrigger>
          </div>
        </div>

        <Text size="lg" color="secondary" className={styles.description}>
          {activeExp.description}
        </Text>

        {activeExp.highlights && activeExp.highlights.length > 0 && (
          <div className={styles.highlightsBox}>
            <span className={styles.highlightsTitle}>Verified Focus &amp; Competencies</span>
            <ul className={styles.highlightsList}>
              {activeExp.highlights.map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <CheckCircle2 size={15} className={styles.checkIcon} />
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.techSection}>
          <span className={styles.techLabel}>Technologies &amp; Disciplines:</span>
          <div className={styles.techTags}>
            {activeExp.tech.map((t) => (
              <span key={t} className={styles.techPill}>{t}</span>
            ))}
          </div>
        </div>

        {/* Certificate / Credential Action Link */}
        {activeExp.type === 'internship' && (
          <div className={styles.credentialLinkRow}>
            {activeExp.certificateUrl ? (
              <CursorTrigger cursorState="button" magnetic>
                <a
                  href={activeExp.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.certBtn}
                >
                  <Award size={14} />
                  <span>View Certificate ↗</span>
                </a>
              </CursorTrigger>
            ) : (
              <CursorTrigger cursorState="button" magnetic>
                <Link href="/certifications" className={styles.certBtn}>
                  <Award size={14} />
                  <span>View Verified Credentials in Certifications Hub ↗</span>
                </Link>
              </CursorTrigger>
            )}
          </div>
        )}
      </div>

      {/* ── Compact Milestone Grid (All Milestones Quick Jump) ───────── */}
      <div className={styles.quickJumpSection}>
        <span className={styles.quickJumpLabel}>All Chronological Milestones:</span>
        <div className={styles.quickGrid}>
          {experiences.map((exp, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <CursorTrigger key={exp.id} cursorState="button">
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`${styles.quickCard} ${isSelected ? styles.selectedQuickCard : ''}`}
                >
                  <div className={styles.quickHeader}>
                    <span className={styles.quickDate}>{exp.startDate}</span>
                    <span className={styles.quickIndex}>0{idx + 1}</span>
                  </div>
                  <h4 className={styles.quickRole}>{exp.role}</h4>
                  <p className={styles.quickCompany}>{exp.company.split('(')[0].trim()}</p>
                </button>
              </CursorTrigger>
            );
          })}
        </div>
      </div>
    </div>
  );
}
