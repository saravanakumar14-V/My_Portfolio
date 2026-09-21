'use client';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './SkillsExperience.module.css';

interface TechCategory {
  title: string;
  skills: string[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frontend',
    skills: ['Next.js', 'React', 'React Native', 'CSS Modules', 'GSAP'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js', 'Flask', 'REST APIs', 'Webhooks'],
  },
  {
    title: 'AI & Machine Learning',
    skills: ['PyTorch', 'scikit-learn', 'Hugging Face', 'NLP', 'LLM Tool Calling'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'Drizzle ORM', 'SQLite', 'MongoDB'],
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Linux'],
  },
];

export function SkillsExperience() {
  return (
    <Section spacing="default" id="capabilities" aria-label="Technical Stack" className={styles.skillsSection}>
      <Container size="wide">
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <Layers size={12} className={styles.eyebrowIcon} />
            <span className={styles.metaLabel}>TECH STACK · TOOLS &amp; RUNTIMES</span>
          </div>

          <Heading level={2} size="5xl" className={styles.title}>
            Technical Stack.
          </Heading>
          <Text size="xl" color="secondary" className={styles.description}>
            Technologies and frameworks I actively use to engineer full-stack web applications, AI systems, and backend services.
          </Text>
        </div>

        <div className={styles.categoriesGrid}>
          {TECH_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryTitle}>{cat.title}</span>
                <span className={styles.categoryCount}>{cat.skills.length}</span>
              </div>
              <div className={styles.skillsPillList}>
                {cat.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Credentials Bridge Link */}
        <div className={styles.actionWrapper}>
          <CursorTrigger cursorState="button" magnetic>
            <Link href="/certifications" className={styles.certLink}>
              <span>View Verified Technical Credentials &amp; Certifications</span>
              <ArrowRight size={14} />
            </Link>
          </CursorTrigger>
        </div>
      </Container>
    </Section>
  );
}
