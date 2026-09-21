'use client';

import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { AmbientGlow } from '@/effects/lighting/AmbientGlow';
import { NoiseOverlay } from '@/effects/overlays/NoiseOverlay';
import { Project } from '@/types/project';
import { Github, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectHero.module.css';

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const reducedMotion = useReducedMotion();
  const bgRef = useRegisteredAnimation('case-hero-parallax', reducedMotion) as React.RefObject<HTMLDivElement>;
  
  const theme = project.theme || { primaryHue: 'var(--color-primary)', ambientIntensity: 0.1 };
  const githubLink = project.links.find(l => l.type === 'github');

  return (
    <Section spacing="none" className={styles.heroSection}>
      <NoiseOverlay opacity={0.06} />
      <AmbientGlow 
        variant="primary" 
        position="center" 
        customColor={theme.primaryHue}
        opacity={theme.ambientIntensity}
      />
      
      <div ref={bgRef} className={styles.bgWrapper}>
        <Image
          src={project.hero}
          alt={`Hero for ${project.title}`}
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <Container className={styles.contentContainer}>
        <Stack gap="xl" className={styles.content}>
          <div className={styles.topNavRow}>
            <Link href="/projects" className={styles.backLink}>
              <ArrowLeft size={14} />
              <span>Back to all projects</span>
            </Link>

            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtn}
                aria-label={`${project.title} repository on GitHub`}
              >
                <Github size={13} />
                <span>View on GitHub ↗</span>
              </a>
            )}
          </div>

          <div className={styles.meta}>
            <Badge variant="secondary">{project.category}</Badge>
            <span className={styles.year}>{project.year}</span>
          </div>

          <Heading level={1} size="6xl" className={styles.title}>
            {project.title}
          </Heading>

          <Text size="xl" color="secondary" className={styles.tagline}>
            {project.tagline}
          </Text>

          <Stack direction="row" gap="xl" className={styles.details}>
            <div className={styles.detailItem}>
              <Text size="sm" className={styles.detailLabel}>Role</Text>
              <Text className={styles.detailValue}>{project.role}</Text>
            </div>
            {project.duration && (
              <div className={styles.detailItem}>
                <Text size="sm" className={styles.detailLabel}>Timeline</Text>
                <Text className={styles.detailValue}>{project.duration}</Text>
              </div>
            )}
            <div className={styles.detailItem}>
              <Text size="sm" className={styles.detailLabel}>Status</Text>
              <Text className={styles.detailValue}>{project.status}</Text>
            </div>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
