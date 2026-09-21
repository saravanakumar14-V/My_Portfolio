'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollDirection, useScrollProgress } from '@/hooks/useScrollDirection';
import { useFocusTrap, useKeyboard } from '@/hooks/useKeyboard';
import { cn } from '@/lib/utils/cn';
import { siteConfig } from '@/config/site';
import { GlassSurface } from '@/effects/overlays/GlassSurface';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { SpecularButton } from '@/components/ui/Button/SpecularButton';
import { BubbleMenu } from '@/components/navigation/BubbleMenu/BubbleMenu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Home } from 'lucide-react';
import styles from './Header.module.css';

/**
 * Header — authoritative navigation bar with single responsive Home and Theme controls
 */
export function Header() {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const scrollProgress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Scrolled past threshold (≥ 80px)
  const isScrolled = scrollProgress > 0;
  const isHidden = scrollDirection === 'down' && scrollProgress > 0.05;
  const isInternalPage = pathname !== '/';

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Accessibility: Focus trap & Escape key support
  useFocusTrap(menuRef, menuOpen, toggleBtnRef);
  useKeyboard('Escape', () => setMenuOpen(false));

  const HeaderComponent = isScrolled ? GlassSurface : 'header';

  return (
    <HeaderComponent
      as="header"
      variant="heavy"
      className={cn(
        styles.header,
        isScrolled && styles.scrolled,
        isHidden && styles.hidden,
        menuOpen && styles.menuOpen
      )}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        {/* Logo / Wordmark */}
        <CursorTrigger cursorState="hover" magnetic>
          <Link
            href="/"
            className={styles.logo}
            aria-label={`${siteConfig.author.name} — Return to Home`}
          >
            <span className={styles.logoMark} aria-hidden="true">SK</span>
            <span className={styles.logoName}>{siteConfig.author.name}</span>
          </Link>
        </CursorTrigger>

        {/* ── DESKTOP NAVIGATION CONTROLS (≥ 768px) ────────────────── */}
        <div className={styles.desktopActions}>
          {isInternalPage && (
            <CursorTrigger cursorState="button" magnetic>
              <Link 
                href="/" 
                className={styles.homeBtn} 
                aria-label="Return to Homepage"
              >
                <Home size={14} className={styles.homeIcon} />
                <span>HOME</span>
              </Link>
            </CursorTrigger>
          )}

          <ThemeToggle variant="header" />
          
          <SpecularButton href="/contact" className={styles.ctaButton}>
            Start a Project
          </SpecularButton>
        </div>

        {/* ── MOBILE NAVIGATION CONTROLS (< 768px) ─────────────────── */}
        <div className={styles.mobileActions}>
          {isInternalPage && (
            <Link 
              href="/" 
              className={styles.mobileHomeBtn} 
              aria-label="Return to Homepage"
            >
              <Home size={13} />
              <span>HOME</span>
            </Link>
          )}

          <ThemeToggle variant="mobile" />

          <button
            ref={toggleBtnRef}
            className={cn(styles.menuToggle, menuOpen && styles.menuToggleOpen)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Mobile Navigation Menu */}
      <BubbleMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        menuRef={menuRef as React.RefObject<HTMLElement | null>} 
      />
    </HeaderComponent>
  );
}
