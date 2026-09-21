import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { profile } from '@/data/profile';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import styles from './AboutPage.module.css';

export const metadata: Metadata = {
  title: `About | ${profile.name}`,
  description: profile.tagline,
};

export default function AboutPage() {
  return (
    <Section spacing="lg" background="primary" aria-label="About">
      <Container size="wide">
        
        {/* ── Main Editorial 2-Column Grid: Content Left (58%), Photo Right (42%) ── */}
        <div className={styles.pageGrid}>
          
          {/* ── Left Column: Editorial & Philosophy Content (58%) ──────────────── */}
          <div className={styles.contentColumn}>
            <PageHeader 
              number="02"
              category="PROFILE &amp; APPROACH"
              title="How I think and build."
              tagline="AI &amp; Full-Stack Developer engineering modern web applications, AI systems, automation tools, and data-driven products."
              meta={`${profile.education.institution} (${profile.education.affiliation}) · ${profile.education.period}`}
            />

            {/* Structured Identity & Signal Blocks */}
            <div className={styles.signalBlocks}>
              <div className={styles.signalBlock}>
                <span className={styles.signalEyebrow}>
                  01 / Identity
                </span>
                <p className={styles.signalText}>
                  I&apos;m <strong className={styles.authorHighlight}>{profile.name}</strong>, an AI &amp; Full-Stack Developer with a background in Artificial Intelligence &amp; Data Science at {profile.education.institution} under {profile.education.affiliation}.
                </p>
              </div>

              <div className={styles.signalBlock}>
                <span className={styles.signalEyebrow}>
                  02 / What I Build
                </span>
                <p className={styles.signalText}>
                  I build modern web applications, AI-powered systems, automation tools, dashboards, and custom software that solve real business problems.
                </p>
              </div>

              <div className={styles.signalBlock}>
                <span className={styles.signalEyebrow}>
                  03 / How I Work
                </span>
                <p className={styles.signalText}>
                  I focus on understanding the core problem, designing clean modular architectures, shipping robust type-safe code, and validating through continuous testing.
                </p>
              </div>

              <div className={styles.signalBlock}>
                <span className={styles.signalEyebrow}>
                  04 / Direction
                </span>
                <p className={styles.signalText}>
                  Available for freelance projects, technical collaborations, and building production-ready applications with modern web and AI technologies.
                </p>
              </div>
            </div>

            {/* Verified Philosophy Cards */}
            <div className={styles.philosophySection}>
              <span className={styles.philosophyHeading}>
                Personal Philosophy
              </span>
              <div className={styles.philosophyGrid}>
                {profile.philosophy.map((node) => (
                  <div key={node.number} className={styles.philosophyCard}>
                    <span className={styles.philosophyIndex}>{node.number}</span>
                    <h3 className={styles.philosophyTitle}>{node.title}</h3>
                    <p className={styles.philosophyDesc}>{node.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Bounded Profile Photo & Verified Credentials (42%) ─ */}
          <div className={styles.photoSidebar}>
            
            {/* Contained, Strictly Bounded Profile Photo Visual Anchor */}
            <div className={styles.photoFrame}>
              <Image
                src={profile.photo}
                alt={profile.photoAlt}
                width={420}
                height={525}
                priority
                className={styles.photoElement}
              />
              <div className={styles.photoGradientOverlay} />
            </div>

            {/* Verified Academic Credential Card */}
            <div className={styles.credentialCard}>
              <div className={styles.credentialHeader}>
                <GraduationCap size={14} className={styles.credentialIcon} />
                <span className={styles.credentialEyebrow}>
                  Verified Academic Education
                </span>
              </div>
              <p className={styles.credentialDegree}>
                {profile.education.degree} in {profile.education.field}
              </p>
              <p className={styles.credentialInst}>
                {profile.education.institution}
              </p>
              <p className={styles.credentialMeta}>
                {profile.education.affiliation} · {profile.education.status}
              </p>
            </div>

            {/* Core Focus Domains */}
            <div className={styles.domainCluster}>
              {profile.positioning.domains.map((tag) => (
                <span key={tag} className={styles.domainPill}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick Action to Contact */}
            <div className={styles.sidebarAction}>
              <Link href="/contact" className={styles.contactCtaLink}>
                <span>Let&apos;s work together</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
}
