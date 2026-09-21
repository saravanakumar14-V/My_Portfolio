import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { InteractiveTimeline } from '@/components/experience/InteractiveTimeline';
import { getExperiences } from '@/data/experience';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: `Experience | ${profile.name}`,
  description: 'Academic path and completed internships across AI, machine learning, data science, and cloud computing.',
};

export default function ExperiencePage() {
  const experiences = getExperiences();

  return (
    <Section spacing="lg" background="primary" aria-label="Experience & Education">
      <Container size="wide">
        <PageHeader 
          number="03"
          category="EXPERIENCE & EDUCATION"
          title="Learning, Building, Progressing."
          tagline="My academic path, completed internships, and the technical experiences shaping how I build software."
          meta="5 Verified Milestones"
        />

        <InteractiveTimeline experiences={experiences} />
      </Container>
    </Section>
  );
}
