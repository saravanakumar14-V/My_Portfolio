'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectPreview } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: ProjectPreview;
  index: number;
}

/**
 * ProjectCard component
 * Displays a single clickable project preview card without descriptive body text.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !cardRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      await import('gsap/ScrollTrigger');
      if (!effectMounted) return;
      
      ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            }
          }
        );
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div 
      className={`${styles.card} cursor-pointer`}
      ref={cardRef}
      role="link"
      tabIndex={0}
      aria-label={`Open case study for ${project.title}`}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(`/projects/${project.slug}`);
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={project.thumbnail}
          alt={`Thumbnail for ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          priority={index < 2}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <Badge variant="secondary" size="sm">{project.category}</Badge>
          <span className={styles.year}>{project.year}</span>
        </div>

        <Heading level={3} size="xl" className={styles.title}>
          <Link 
            href={`/projects/${project.slug}`} 
            className={styles.titleLink}
            onClick={(e) => e.stopPropagation()}
          >
            {project.title}
          </Link>
        </Heading>

        <div className={styles.techStack}>
          {project.tech.slice(0, 3).map(tech => (
            <span key={tech.name} className={styles.techItem}>
              {tech.name}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className={styles.techItem}>+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}
