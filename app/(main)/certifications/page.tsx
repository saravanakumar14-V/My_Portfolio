import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { CertificationsDirectory } from '@/components/certifications/CertificationsDirectory/CertificationsDirectory';
import { getCertifications } from '@/data/certifications';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: `Certifications | ${profile.name}`,
  description: 'Verified certificates and technical credentials in AI, Data Science, Cloud Computing, and Python.',
};

export default function CertificationsPage() {
  const certifications = getCertifications();

  return (
    <Section spacing="lg" background="primary" aria-label="Certifications Hub">
      <Container size="wide">
        <PageHeader 
          number="04"
          category="VERIFIED CREDENTIALS"
          title="Credentials &amp; Certifications."
          tagline="Verified credentials spanning Artificial Intelligence, Machine Learning, Data Science, Cloud Computing, and Algorithmic Python."
          meta="4 Verified Credentials"
        />

        <CertificationsDirectory certifications={certifications} />
      </Container>
    </Section>
  );
}
