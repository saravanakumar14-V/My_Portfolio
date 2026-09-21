'use client';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { GitCommit } from 'lucide-react';
import styles from './WorkflowSection.module.css';

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: "Understand the client's problem, requirements, users, and constraints.",
  },
  {
    number: '02',
    title: 'Design',
    description: 'Plan the product structure, architecture, interface, and technical approach.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Develop the application with maintainable frontend/backend architecture.',
  },
  {
    number: '04',
    title: 'Test',
    description: 'Validate functionality, security, responsiveness, and edge cases.',
  },
  {
    number: '05',
    title: 'Deploy',
    description: 'Prepare the final project for production and clean handoff.',
  },
];

export function WorkflowSection() {
  return (
    <Section spacing="default" id="workflow" aria-label="How I Work" className={styles.workflowSection}>
      <Container size="wide">
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <GitCommit size={12} className={styles.eyebrowIcon} />
            <span className={styles.metaLabel}>PROCESS · HOW I WORK</span>
          </div>

          <Heading level={2} size="5xl" className={styles.title}>
            How I Work.
          </Heading>
          <Text size="xl" color="secondary" className={styles.description}>
            A structured, transparent engineering process from concept to production.
          </Text>
        </div>

        <div className={styles.stepsGrid}>
          {STEPS.map((step, idx) => (
            <div key={step.number} className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{step.number}</span>
                {idx < STEPS.length - 1 && <span className={styles.stepArrow}>→</span>}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
