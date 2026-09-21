'use client';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Spotlight } from '@/effects/lighting/Spotlight';
import { Briefcase, Code, Cpu, Workflow, BarChart3 } from 'lucide-react';
import styles from './ServicesSection.module.css';

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack',
    index: '01',
    title: 'Full-Stack Development',
    description:
      'Modern responsive web applications, SaaS interfaces, dashboards, backend APIs, databases, authentication, and production deployment.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Drizzle ORM'],
    icon: Code,
  },
  {
    id: 'ai-llm',
    index: '02',
    title: 'AI / LLM Applications',
    description:
      'AI assistants, LLM integrations, RAG systems, intelligent interfaces, local AI workflows, and practical AI-powered features.',
    technologies: ['Python', 'PyTorch', 'scikit-learn', 'Hugging Face', 'NLP', 'LLM Tool Calling'],
    icon: Cpu,
  },
  {
    id: 'automation',
    index: '03',
    title: 'Automation & Internal Tools',
    description:
      'Business workflow automation, admin systems, dashboards, custom third-party integrations, and developer productivity tools.',
    technologies: ['Python', 'TypeScript', 'REST APIs', 'Webhooks', 'Zod', 'Data Ingestion'],
    icon: Workflow,
  },
  {
    id: 'data-dashboards',
    index: '04',
    title: 'Data & Dashboard Solutions',
    description:
      'Interactive dashboards, analytics interfaces, reporting systems, storage optimization, and data-focused applications.',
    technologies: ['PostgreSQL', 'MongoDB', 'Pandas', 'scikit-learn', 'Next.js', 'Data Modeling'],
    icon: BarChart3,
  },
];

export function ServicesSection() {
  return (
    <Section spacing="default" id="services" aria-label="Freelance Services" className={styles.servicesSection}>
      <Container size="wide">
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <Briefcase size={12} className={styles.eyebrowIcon} />
            <span className={styles.metaLabel}>SERVICES · WHAT I BUILD</span>
          </div>

          <Heading level={2} size="5xl" className={styles.title}>
            What I Build.
          </Heading>
          <Text size="xl" color="secondary" className={styles.description}>
            Targeted engineering services to take your product from requirements through production deployment.
          </Text>
        </div>

        <div className={styles.servicesGrid}>
          <Spotlight size={500} color="rgba(56, 189, 248, 0.08)" />
          {SERVICES.map((service) => {
            const IconComp = service.icon;

            return (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.cardTop}>
                  <span className={styles.indexTag}>{service.index}</span>
                  <IconComp size={18} className={styles.serviceIcon} />
                </div>

                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>

                <div className={styles.techRow}>
                  {service.technologies.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
