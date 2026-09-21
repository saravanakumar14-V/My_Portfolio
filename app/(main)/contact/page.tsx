import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { EditorialContact } from '@/components/contact/EditorialContact';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: `Contact | ${profile.name}`,
  description: profile.contact.availability,
};

export default function ContactPage() {
  return (
    <Section spacing="lg" background="primary" aria-label="Contact">
      <Container size="wide">
        <PageHeader 
          number="05"
          category="CONTACT"
          title="Have a project in mind?"
          tagline="I build modern web applications, AI systems, automation tools, dashboards, and custom software. Available for freelance work."
          meta="Direct Channels Open"
        />

        <EditorialContact />
      </Container>
    </Section>
  );
}
