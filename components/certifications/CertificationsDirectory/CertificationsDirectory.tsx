'use client';

import { useState } from 'react';
import { Certification } from '@/types/experience';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { CheckCircle2, Filter, ExternalLink, Calendar, Building } from 'lucide-react';
import styles from './CertificationsDirectory.module.css';

interface CertificationsDirectoryProps {
  certifications: Certification[];
}

type FilterCategory = 'all' | 'ai' | 'data' | 'cloud' | 'programming';

export function CertificationsDirectory({ certifications }: CertificationsDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filteredCertifications = certifications.filter((cert) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ai') return cert.name.toLowerCase().includes('intelligence') || cert.name.toLowerCase().includes('machine learning');
    if (activeCategory === 'data') return cert.name.toLowerCase().includes('data science') || cert.category === 'data';
    if (activeCategory === 'cloud') return cert.name.toLowerCase().includes('cloud') || cert.category === 'cloud';
    if (activeCategory === 'programming') return cert.name.toLowerCase().includes('python');
    return true;
  });

  return (
    <div className={styles.directoryWrapper}>
      {/* ── Category Filter Bar ────────────────────────────────────────── */}
      <div className={styles.filterBar}>
        <div className={styles.filterLabelGroup}>
          <Filter size={13} className={styles.filterIcon} />
          <span className={styles.filterLabel}>Filter Domain:</span>
        </div>

        <div className={styles.categoryPills}>
          {[
            { id: 'all', label: 'All Credentials (4)' },
            { id: 'ai', label: 'AI & Machine Learning' },
            { id: 'data', label: 'Data Science' },
            { id: 'cloud', label: 'Cloud Computing' },
            { id: 'programming', label: 'Python Programming' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <CursorTrigger key={cat.id} cursorState="button">
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.id as FilterCategory)}
                  className={`${styles.filterPill} ${isActive ? styles.activeFilterPill : ''}`}
                >
                  {cat.label}
                </button>
              </CursorTrigger>
            );
          })}
        </div>
      </div>

      {/* ── Certifications Grid ────────────────────────────────────────── */}
      <div className={styles.certGrid}>
        {filteredCertifications.map((cert) => (
          <div key={cert.id} className={styles.certCard}>
            <div className={styles.cardHeader}>
              <div className={styles.issuerRow}>
                <div className={styles.issuerBadge}>
                  <Building size={11} className={styles.issuerIcon} />
                  <span>{cert.issuer}</span>
                </div>
                <div className={styles.dateBadge}>
                  <Calendar size={11} className={styles.dateIcon} />
                  <span>{cert.issuedDate}</span>
                </div>
              </div>

              <div className={styles.verifiedPill}>
                <CheckCircle2 size={12} className={styles.checkIcon} />
                <span>VERIFIED CREDENTIAL</span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <Heading level={3} size="xl" className={styles.certTitle}>
                {cert.name}
              </Heading>

              {cert.description && (
                <Text size="sm" color="secondary" className={styles.certDescription}>
                  {cert.description}
                </Text>
              )}
            </div>

            <div className={styles.cardFooter}>
              {cert.skills && cert.skills.length > 0 && (
                <div className={styles.skillPills}>
                  {cert.skills.map((s) => (
                    <span key={s} className={styles.skillPill}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {cert.credentialUrl && (
                <CursorTrigger cursorState="button">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewCertBtn}
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={12} />
                  </a>
                </CursorTrigger>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
