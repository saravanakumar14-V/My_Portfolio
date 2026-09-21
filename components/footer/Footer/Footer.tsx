import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { profile } from '@/data/profile';
import { Container } from '@/components/layout/Container';
import styles from './Footer.module.css';

/**
 * Footer — minimal, confident, authentic.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <Container>
        <div className={styles.inner}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Back to home">
              <span className={styles.logoMark} aria-hidden="true">{profile.monogram}</span>
            </Link>
            <p className={styles.tagline}>
              AI &amp; Full-Stack Developer · Web Applications · AI Systems
            </p>
          </div>

          {/* Navigation columns */}
          <nav aria-label="Footer navigation" className={styles.nav}>
            <div className={styles.navGroup}>
              <p className={styles.navGroupLabel}>Navigation</p>
              <ul role="list" className={styles.navList}>
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.navGroup}>
              <p className={styles.navGroupLabel}>Connect</p>
              <ul role="list" className={styles.navList}>
                <li>
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                    aria-label="GitHub profile (opens in new tab)"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                    aria-label="LinkedIn profile (opens in new tab)"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className={styles.navLink}
                    aria-label="Send direct email"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className={styles.builtWith}>
            Built with{' '}
            <span aria-label="Next.js">Next.js</span>
            {' · '}
            <span aria-label="TypeScript">TypeScript</span>
            {' · '}
            <span aria-label="GSAP">GSAP</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
