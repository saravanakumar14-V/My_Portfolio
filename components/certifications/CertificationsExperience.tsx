'use client';

import { useRegisteredAnimation } from '@/motion/core/AnimationRegistry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { getCertifications } from '@/data/certifications';
import { Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import styles from './CertificationsExperience.module.css';

export function CertificationsExperience() {
  const reducedMotion = useReducedMotion();
  const ref = useRegisteredAnimation('scroll-reveal', reducedMotion) as React.RefObject<HTMLDivElement>;
  const certifications = getCertifications();

  return (
    <Section spacing="sm" id="certifications" aria-label="Certifications">
      <Container size="narrow">
        <div ref={ref} className={styles.wrapper}>
          <div className={styles.headerRow}>
            <Award size={14} className={styles.headerIcon} />
            <Heading level={3} size="base" className={styles.eyebrow}>
              Verified Credentials &amp; Certifications
            </Heading>
          </div>
          
          <div className={styles.list}>
            {certifications.map(cert => (
              <div key={cert.id} className={styles.certItem}>
                <div className={styles.certMain}>
                  <CheckCircle2 size={13} className={styles.verifiedIcon} />
                  <span className={styles.certName}>{cert.name}</span>
                  <span className={styles.issuer}>({cert.issuer} · {cert.issuedDate})</span>
                </div>
                {cert.credentialUrl ? (
                  <CursorTrigger cursorState="button">
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.certLink}
                      aria-label={`View certificate for ${cert.name}`}
                    >
                      <span>View</span>
                      <span className={styles.arrow}>↗</span>
                    </a>
                  </CursorTrigger>
                ) : (
                  <span className={styles.verifiedBadge}>VERIFIED</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.hubLinkRow}>
            <CursorTrigger cursorState="button">
              <Link href="/certifications" className={styles.hubLink}>
                <span>Explore Full Credentials Directory ↗</span>
              </Link>
            </CursorTrigger>
          </div>
        </div>
      </Container>
    </Section>
  );
}
