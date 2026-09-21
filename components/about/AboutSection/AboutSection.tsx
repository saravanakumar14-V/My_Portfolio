import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import Link from 'next/link';
import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <Section spacing="lg" background="primary" id="about" aria-label="About Me">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <Heading level={2} size="3xl" className={styles.title}>
              Turning ideas into working software.
            </Heading>
            
            <div className={styles.prose}>
              <Text size="lg" color="secondary">
                {profile.bio}
              </Text>
              
              <Text size="lg" color="secondary">
                {profile.positioning.summary}
              </Text>
            </div>

            <div className={styles.actions}>
              <Link href="/about" passHref legacyBehavior>
                <Button variant="secondary" as="a">
                  More about my approach
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>2028</span>
              <span className={styles.statLabel}>B.Tech AI &amp; DS Graduation</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>4</span>
              <span className={styles.statLabel}>Completed Internships</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>7</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
