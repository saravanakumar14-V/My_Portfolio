'use client';

import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Spacer } from '@/components/layout/Spacer';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Project } from '@/types/project';
import styles from './ProjectStory.module.css';

interface ProjectStoryProps {
  project: Project;
}

export function ProjectStory({ project }: ProjectStoryProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRegisteredAnimation('case-text-reveal', reducedMotion) as React.RefObject<HTMLDivElement>;

  if (!project.problem && !project.research) return null;

  return (
    <Section spacing="lg" className={styles.storySection}>
      <Container size="narrow">
        <div ref={ref}>
          
          {project.problem && (
            <div className={styles.block}>
              <div data-reveal>
                <Heading level={2} size="base" className={styles.label}>
                  The Problem
                </Heading>
              </div>
              <div data-reveal>
                <Heading level={3} size="4xl" className={styles.problemText}>
                  {project.problem}
                </Heading>
              </div>
            </div>
          )}

          {project.research && project.research.length > 0 && (
            <>
              <Spacer size="xxl" />
              <div className={styles.block}>
                <div data-reveal>
                  <Heading level={2} size="base" className={styles.label}>
                    Research & Planning
                  </Heading>
                </div>
                <Stack gap="xl" className={styles.researchContent}>
                  {project.research.map((paragraph, index) => (
                    <div key={index} data-reveal>
                      <Text size="xl" color="secondary" className={styles.paragraph}>
                        {paragraph}
                      </Text>
                    </div>
                  ))}
                </Stack>
              </div>
            </>
          )}

        </div>
      </Container>
    </Section>
  );
}
