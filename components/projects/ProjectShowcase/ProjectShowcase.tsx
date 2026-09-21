'use client';

import { useRouter } from 'next/navigation';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { getFeaturedProjects } from '@/data/projects';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { Spotlight } from '@/effects/lighting/Spotlight';
import { GlassSurface } from '@/effects/overlays/GlassSurface';
import { TiltedCard } from '@/components/ui/Card/TiltedCard';
import { BorderGlow } from '@/effects/borders/BorderGlow';
import { Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectShowcase.module.css';

export function ProjectShowcase() {
  const router = useRouter();
  const projects = getFeaturedProjects();

  if (projects.length === 0) return null;

  const flagshipProject = projects[0];
  const secondaryProjects = projects.slice(1, 6);

  const navigateToProject = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  return (
    <Section spacing="default" background="secondary" id="featured-work" aria-label="Featured Projects">
      <Container size="wide">
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrow}>SELECTED WORK · AI &amp; FULL-STACK SYSTEMS</span>
          </div>
          
          <Heading level={2} size="5xl" className={styles.title}>
            Selected Work &amp; Products.
          </Heading>
          <Text size="xl" color="secondary" className={styles.description}>
            A selection of production-grade web platforms, AI systems, mobile applications, and cloud software engineering projects.
          </Text>
        </div>

        {/* ── 01: Flagship Centerpiece (Nexarks) ───────────────────────── */}
        <div className={styles.flagshipContainer}>
          <TiltedCard intensity={2}>
            <BorderGlow active={true} className={styles.flagshipCard}>
              <div 
                className={styles.cardClickableArea}
                role="link"
                tabIndex={0}
                aria-label={`Open case study for ${flagshipProject.title}`}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('a[data-github="true"]')) return;
                  navigateToProject(flagshipProject.slug);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateToProject(flagshipProject.slug);
                  }
                }}
              >
                <div className={styles.flagshipInner}>
                  <Spotlight size={600} color={flagshipProject.theme?.primaryHue || 'rgba(103,217,255,0.12)'} />

                  {/* Left Column: Flagship Identity & Metadata */}
                  <div className={styles.flagshipContentCol}>
                    <div className={styles.topMetaRow}>
                      <div className={styles.statusOngoing}>
                        <span className={styles.pulsingDot} aria-hidden="true" />
                        <span>
                          {flagshipProject.status === 'in-progress' ? 'ACTIVE DEV · PRIVATE' : 'PRODUCTION READY · LIVE'}
                        </span>
                      </div>
                      <span className={styles.flagshipPill}>
                        {flagshipProject.category === 'fullstack' ? 'FLAGSHIP FULL-STACK' : 'FLAGSHIP AI'}
                      </span>
                    </div>

                    <div className={styles.flagshipIdentity}>
                      <Heading level={3} size="3xl" className={styles.flagshipTitle}>
                        {flagshipProject.title}
                      </Heading>
                      <Text size="sm" color="secondary" className={styles.flagshipTagline}>
                        {flagshipProject.tagline}
                      </Text>
                    </div>

                    <div className={styles.techRow}>
                      {flagshipProject.tech.map((t) => (
                        <span key={t.name} className={styles.techPill}>
                          {t.name}
                        </span>
                      ))}
                    </div>

                    <div className={styles.flagshipActionRow}>
                      <CursorTrigger cursorState="button" magnetic>
                        <Link 
                          href={`/projects/${flagshipProject.slug}`} 
                          className={styles.flagshipBtn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Explore Technical Architecture</span>
                          <ArrowUpRight size={14} className={styles.linkArrow} />
                        </Link>
                      </CursorTrigger>
                    </div>
                  </div>

                  {/* Right Column: Flagship Visual Viewport */}
                  <div className={styles.flagshipVisualCol}>
                    <div className={styles.flagshipVisualFrame}>
                      <Image
                        src={flagshipProject.thumbnail}
                        alt={`${flagshipProject.title} interface preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className={styles.flagshipImage}
                        priority
                      />
                      <div className={styles.visualOverlay} aria-hidden="true" />
                      <div className={styles.visualStatusBadge}>
                        <span className={styles.pulsingDot} />
                        <span>
                          {flagshipProject.slug === 'nexarks' ? 'CLIENT PORTAL & MILESTONES' : '3D COGNITIVE FIELD'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </TiltedCard>
        </div>

        {/* ── 02: Balanced Projects Grid (3 Columns) ───────────────────── */}
        <div className={styles.showcaseGrid}>
          {secondaryProjects.map((project) => {
            const githubLink = project.links.find(l => l.type === 'github');

            return (
              <div key={project.id} className={styles.gridCell}>
                <TiltedCard intensity={3}>
                  <GlassSurface variant="light" className={styles.projectBlock}>
                    <div 
                      className={styles.cardClickableArea}
                      role="link"
                      tabIndex={0}
                      aria-label={`Open case study for ${project.title}`}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('a[data-github="true"]')) return;
                        navigateToProject(project.slug);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigateToProject(project.slug);
                        }
                      }}
                    >
                      <div className={styles.cardInner}>
                        <Spotlight size={400} color={project.theme?.primaryHue || 'rgba(255,255,255,0.04)'} />

                        {/* Compact Visual Preview */}
                        <div className={styles.visualFrame}>
                          <Image
                            src={project.thumbnail}
                            alt={`${project.title} interface preview`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={styles.projectImage}
                          />
                          <div className={styles.visualOverlay} aria-hidden="true" />
                          <span className={styles.categoryFloatingBadge}>
                            {project.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Project Info */}
                        <div className={styles.cardBody}>
                          <div className={styles.cardHeaderRow}>
                            <Heading level={3} size="xl" className={styles.projectTitle}>
                              {project.title}
                            </Heading>
                            <span className={styles.statusCompletedBadge}>COMPLETED</span>
                          </div>

                          <p className={styles.projectTagline}>
                            {project.tagline}
                          </p>

                          <div className={styles.techRow}>
                            {project.tech.slice(0, 3).map((t) => (
                              <span key={t.name} className={styles.techPill}>
                                {t.name}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className={styles.techMorePill}>+{project.tech.length - 3}</span>
                            )}
                          </div>

                          <div className={styles.actionRow}>
                            <CursorTrigger cursorState="button" magnetic>
                              <Link 
                                href={`/projects/${project.slug}`} 
                                className={styles.caseStudyLink}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Case Study</span>
                                <ArrowUpRight size={13} className={styles.linkArrow} />
                              </Link>
                            </CursorTrigger>

                            {githubLink && (
                              <CursorTrigger cursorState="button" magnetic>
                                <a
                                  href={githubLink.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-github="true"
                                  className={styles.githubLink}
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`GitHub repository for ${project.title}`}
                                >
                                  <Github size={13} />
                                  <span>Source</span>
                                </a>
                              </CursorTrigger>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassSurface>
                </TiltedCard>
              </div>
            );
          })}
        </div>

        {/* ── 03: Product Catalog Bridge CTA ──────────────────────────── */}
        <div className={styles.catalogBridge}>
          <CursorTrigger cursorState="button" magnetic>
            <Link href="/projects" className={styles.catalogBridgeBtn}>
              <span>Explore All Projects in Catalog</span>
              <ArrowRight size={15} />
            </Link>
          </CursorTrigger>
        </div>
      </Container>
    </Section>
  );
}
