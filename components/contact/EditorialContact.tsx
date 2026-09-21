'use client';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { ContactForm } from '@/components/contact/ContactForm';
import { profile } from '@/data/profile';
import { Linkedin, Github, Mail, Sparkles, MapPin } from 'lucide-react';
import styles from './EditorialContact.module.css';

export function EditorialContact() {
  return (
    <div className={styles.editorialGrid}>
      {/* ── Left Column: Anchor & Direct Access (50%) ─────────────── */}
      <div className={styles.leftColumn}>
        <div className={styles.metaBadge}>
          <Sparkles size={12} className={styles.sparkleIcon} />
          <span>DIRECT CONTACT</span>
        </div>

        <Heading level={1} size="6xl" className={styles.statement}>
          Have a project<br />
          <span className={styles.accentText}>in mind?</span>
        </Heading>

        <Text size="xl" color="secondary" className={styles.description}>
          {profile.contact.availability}
        </Text>

        <div className={styles.availabilityCard}>
          <div className={styles.availHeader}>
            <span className={styles.availDot} />
            <span className={styles.availTitle}>Opportunities &amp; Collaboration</span>
          </div>
          <div className={styles.availMeta}>
            <span className={styles.metaItem}>
              <MapPin size={13} className={styles.metaIcon} />
              <span>{profile.contact.location} · Remote / On-Site</span>
            </span>
          </div>
        </div>

        {/* Recognizable Direct Actions Bar */}
        <div className={styles.socialBar}>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Connect on LinkedIn (opens in new tab)"
          >
            <Linkedin size={16} />
            <span>LinkedIn Profile ↗</span>
          </a>

          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Explore GitHub Repositories (opens in new tab)"
          >
            <Github size={16} />
            <span>GitHub Profile ↗</span>
          </a>

          <a
            href={`mailto:${profile.contact.email}`}
            className={styles.socialBtn}
            aria-label="Direct Email"
          >
            <Mail size={16} />
            <span>Direct Email</span>
          </a>
        </div>
      </div>

      {/* ── Right Column: Minimalist Contact Interface (50%) ────────── */}
      <div className={styles.rightColumn}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <span className={styles.formEyebrow}>05 / TRANSMISSION</span>
            <h2 className={styles.formTitle}>Initiate Conversation</h2>
            <p className={styles.formSubtitle}>Send a direct message to discuss a project or opportunity.</p>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
