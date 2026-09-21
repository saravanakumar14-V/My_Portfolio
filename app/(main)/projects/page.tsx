import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { ProjectCatalog } from '@/components/projects/ProjectCatalog/ProjectCatalog';
import { getAllProjects } from '@/data/projects';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: 'A collection of AI applications, software projects, mobile experiences, security tools, and full-stack systems.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Section spacing="lg" background="primary" aria-label="All Projects">
      <Container size="wide">
        <PageHeader 
          number="01"
          category="SELECTED WORK"
          title="Selected Work &amp; Products."
          tagline="A collection of AI applications, software projects, mobile experiences, security tools, and full-stack systems I've built."
          meta="7 Verified Projects"
        />

        <ProjectCatalog projects={projects} />
      </Container>
    </Section>
  );
}
