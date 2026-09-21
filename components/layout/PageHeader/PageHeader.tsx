'use client';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  number: string;
  category: string;
  title: string;
  tagline: string;
  meta?: string;
}

export function PageHeader({
  number,
  category,
  title,
  tagline,
  meta,
}: PageHeaderProps) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.metaRow}>
        <span className={styles.numberBadge}>{number}</span>
        <span className={styles.categoryLabel}>{category}</span>
        {meta && (
          <>
            <span className={styles.divider}>•</span>
            <span className={styles.metaText}>{meta}</span>
          </>
        )}
      </div>

      <Heading level={1} size="6xl" className={styles.title}>
        {title}
      </Heading>

      <Text size="xl" color="secondary" className={styles.tagline}>
        {tagline}
      </Text>
    </div>
  );
}
