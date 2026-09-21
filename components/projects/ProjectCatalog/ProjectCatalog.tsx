'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types/project';
import { Heading } from '@/components/ui/Heading';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { ArrowUpRight, Github, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectCatalog.module.css';

interface ProjectCatalogProps {
  projects: Project[];
}

type FilterCategory = 'all' | 'ai' | 'cloud' | 'web' | 'mobile' | 'security';

export function ProjectCatalog({ projects }: ProjectCatalogProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const navigateToProject = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ai') return p.tech.some(t => t.name.toLowerCase().includes('nlp') || t.name.toLowerCase().includes('learning') || t.name.toLowerCase().includes('ai') || t.name.toLowerCase().includes('scikit'));
    if (activeCategory === 'cloud') return p.category === 'backend' || p.tech.some(t => t.name.toLowerCase().includes('cloud') || t.name.toLowerCase().includes('mongo'));
    if (activeCategory === 'web') return p.category === 'web' || p.tech.some(t => t.name.toLowerCase().includes('react') || t.name.toLowerCase().includes('node'));
    if (activeCategory === 'mobile') return p.category === 'mobile' || p.tech.some(t => t.name.toLowerCase().includes('native') || t.name.toLowerCase().includes('mobile'));
    if (activeCategory === 'security') return p.tech.some(t => t.name.toLowerCase().includes('security') || t.name.toLowerCase().includes('crypto') || t.name.toLowerCase().includes('prevention'));
    return true;
  });

  const flagshipProject = projects.find(p => p.slug === 'rezel') || projects[0];

  return (
    <div className={styles.catalogWrapper}>
      {/* ── Flagship Initiative Hero Spotlight (Rezel) ─────────────── */}
      <div 
        className={`${styles.flagshipCard} cursor-pointer`}
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
        <div className={styles.flagshipGlow} />
        <div className={styles.flagshipContent}>
          <div className={styles.flagshipMetaRow}>
            <span className={styles.flagshipBadge}>
              <Sparkles size={12} className={styles.sparkleIcon} />
              FLAGSHIP AI INITIATIVE
            </span>
            <span className={styles.statusLive}>ACTIVE DEVELOPMENT</span>
          </div>

          <Heading level={2} size="4xl" className={styles.flagshipTitle}>
            {flagshipProject.title}
          </Heading>

          <div className={styles.flagshipTechStack}>
            {flagshipProject.tech.map(t => (
              <span key={t.name} className={styles.flagshipTechPill}>{t.name}</span>
            ))}
          </div>

          <div className={styles.flagshipActions}>
            <CursorTrigger cursorState="button">
              <Link 
                href={`/projects/${flagshipProject.slug}`} 
                className={styles.primaryActionBtn}
                onClick={(e) => e.stopPropagation()}
              >
                <span>Explore Technical Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
            </CursorTrigger>
          </div>
        </div>

        <div className={styles.flagshipVisual}>
          <Image 
            src={flagshipProject.thumbnail} 
            alt={flagshipProject.title} 
            fill 
            priority
            className={styles.flagshipImage} 
          />
        </div>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────────────── */}
      <div className={styles.filterBar}>
        <div className={styles.filterLabelGroup}>
          <Filter size={14} className={styles.filterIcon} />
          <span className={styles.filterLabel}>Filter by Domain:</span>
        </div>

        <div className={styles.categoryPills}>
          {[
            { id: 'all', label: 'All Architectures' },
            { id: 'ai', label: 'AI & Machine Learning' },
            { id: 'cloud', label: 'Cloud & Storage' },
            { id: 'security', label: 'Cybersecurity' },
            { id: 'mobile', label: 'Mobile Engineering' },
            { id: 'web', label: 'Web Applications' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <CursorTrigger key={cat.id} cursorState="button">
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.id as FilterCategory)}
                  className={`${styles.filterPill} ${isActive ? styles.activeFilterPill : ''}`}
                >
                  {cat.label}
                </button>
              </CursorTrigger>
            );
          })}
        </div>
      </div>

      {/* ── Selected Work Product Catalog Grid ─────────────────────── */}
      <div className={styles.catalogGrid}>
        {filteredProjects.map((project) => {
          const isOngoing = project.status === 'in-progress';
          const githubLink = project.links.find(l => l.type === 'github');

          return (
            <div 
              key={project.id} 
              className={`${styles.catalogCard} cursor-pointer`}
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
              {/* Project Visual Preview */}
              <div className={styles.cardVisual}>
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} interface preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardVisualOverlay} aria-hidden="true" />
                <span className={styles.cardCategoryBadge}>{project.category.toUpperCase()}</span>
              </div>

              <div className={styles.cardHeader}>
                <div className={styles.statusRow}>
                  <span className={isOngoing ? styles.cardOngoing : styles.cardCompleted}>
                    {isOngoing ? 'ACTIVE DEV' : 'COMPLETED'}
                  </span>
                  <span className={styles.cardYear}>{project.year}</span>
                </div>

                <Heading level={3} size="xl" className={styles.cardTitle}>
                  {project.title}
                </Heading>

                <p className={styles.cardTagline}>
                  {project.tagline}
                </p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.techTagsRow}>
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t.name} className={styles.techTag}>{t.name}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className={styles.techTagMore}>+{project.tech.length - 4}</span>
                  )}
                </div>

                <div className={styles.cardActionRow}>
                  <CursorTrigger cursorState="button">
                    <Link 
                      href={`/projects/${project.slug}`} 
                      className={styles.cardCaseStudyBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </CursorTrigger>

                  {githubLink && (
                    <CursorTrigger cursorState="button">
                      <a
                        href={githubLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-github="true"
                        className={styles.cardGithubBtn}
                        aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Github size={13} />
                        <span>GitHub ↗</span>
                      </a>
                    </CursorTrigger>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
