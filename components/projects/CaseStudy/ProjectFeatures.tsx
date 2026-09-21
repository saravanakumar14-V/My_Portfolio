'use client';

import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Project } from '@/types/project';
import { NoiseOverlay } from '@/effects/overlays/NoiseOverlay';
import Image from 'next/image';
import styles from './ProjectFeatures.module.css';

interface ProjectFeaturesProps {
  project: Project;
}

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const reducedMotion = useReducedMotion();
  const pinRef = useRegisteredAnimation('case-feature-pin', reducedMotion) as React.RefObject<HTMLDivElement>;

  if (!project.features || project.features.length === 0) return null;

  return (
    <Section spacing="none" className={styles.featureSection}>
      <Container size="wide" className={styles.container}>
        <div ref={pinRef} className={styles.layout}>
          
          {/* Left Column - Pinned Visuals */}
          <div className={styles.visualColumn} data-feature-visual>
            <div className={styles.visualPlaceholder}>
              <NoiseOverlay opacity={0.05} />
              {/* In a real implementation, this would orchestrate media based on scroll position */}
              <div className={styles.placeholderBox}>
                {project.thumbnail && (
                  <Image 
                    src={project.thumbnail} 
                    alt="Feature visual" 
                    fill 
                    className={styles.image}
                  />
                )}
                <div className={styles.overlay} />
              </div>
            </div>
          </div>

          {/* Right Column - Scrolling Content */}
          <div className={styles.contentColumn}>
            <Stack gap="xl" className={styles.featureList}>
              {project.features.map((feature, idx) => (
                <div key={idx} className={styles.featureBlock}>
                  <Text size="sm" className={styles.featureIndex}>
                    0{idx + 1}
                  </Text>
                  <Heading level={3} size="3xl" className={styles.featureTitle}>
                    {feature.title}
                  </Heading>
                  <Text size="lg" color="secondary" className={styles.featureDesc}>
                    {feature.description}
                  </Text>
                </div>
              ))}
            </Stack>
          </div>

        </div>
      </Container>
    </Section>
  );
}
