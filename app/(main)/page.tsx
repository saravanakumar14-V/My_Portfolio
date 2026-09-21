import type { Metadata } from 'next';
import { HeroSection } from '@/components/hero/HeroSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { ProjectShowcase } from '@/components/projects/ProjectShowcase';
import { WorkflowSection } from '@/components/workflow/WorkflowSection';
import { AboutExperience } from '@/components/about/AboutExperience';
import { JourneyExperience } from '@/components/journey';
import { SkillsExperience } from '@/components/skills';
import { ContactExperience } from '@/components/contact';
import { Spotlight } from '@/effects/lighting/Spotlight';
import { siteConfig } from '@/config/site';
import { personSchema, webSiteSchema, combineSchemas } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const jsonLd = combineSchemas(personSchema(), webSiteSchema());

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Spotlight size={600} color="rgba(100, 200, 255, 0.08)" />

      <HeroSection />
      <ServicesSection />
      <ProjectShowcase />
      <WorkflowSection />
      <SkillsExperience />
      <AboutExperience />
      <JourneyExperience />
      <ContactExperience />
    </>
  );
}
