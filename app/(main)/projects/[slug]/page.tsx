import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import { 
  ProjectHero, 
  ProjectStory, 
  ProjectArchitecture, 
  ProjectFeatures, 
  ProjectGallery,
  ProjectLessons 
} from '@/components/projects/CaseStudy';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.tagline,
  };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <ProjectHero project={project} />
      <ProjectStory project={project} />
      <ProjectArchitecture project={project} />
      <ProjectFeatures project={project} />
      <ProjectGallery gallery={project.gallery} />
      <ProjectLessons project={project} />
    </article>
  );
}
