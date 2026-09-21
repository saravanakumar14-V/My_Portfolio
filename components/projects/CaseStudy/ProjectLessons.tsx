'use client';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Spacer } from '@/components/layout/Spacer';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Project } from '@/types/project';
import { GlassSurface } from '@/effects/overlays/GlassSurface';
import styles from './ProjectLessons.module.css';

interface ProjectLessonsProps {
  project: Project;
}

export function ProjectLessons({ project }: ProjectLessonsProps) {
  if (!project.lessons || project.lessons.length === 0) return null;

  return (
    <Section spacing="lg" className={styles.lessonsSection}>
      <Container size="narrow">
        <Stack gap="xl">
          <div className={styles.header}>
            <Heading level={2} size="base" className={styles.label}>
              Retrospective
            </Heading>
            <Heading level={3} size="4xl" className={styles.title}>
              Lessons Learned & Roadmap.
            </Heading>
          </div>
          
          <Spacer size="md" />

          <Stack gap="lg" className={styles.lessonList}>
            {project.lessons.map((lesson, idx) => (
              <GlassSurface key={idx} variant="heavy" className={styles.lessonCard}>
                <div className={styles.cardHeader}>
                  <Text size="xs" className={styles.lessonType}>
                    [{lesson.type.toUpperCase()}]
                  </Text>
                  <Heading level={4} size="xl" className={styles.lessonTitle}>
                    {lesson.title}
                  </Heading>
                </div>
                <Text size="base" color="secondary" className={styles.lessonDesc}>
                  {lesson.description}
                </Text>
              </GlassSurface>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
