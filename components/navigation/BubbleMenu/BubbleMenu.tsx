'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './BubbleMenu.module.css';

interface BubbleMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuRef: React.RefObject<HTMLElement | null>;
}

export function BubbleMenu({ isOpen, onClose, menuRef }: BubbleMenuProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    (async () => {
      const gsap = (await import('gsap')).default;
      
      ctx = gsap.context(() => {
        if (reducedMotion) {
          gsap.set(bgRef.current, { autoAlpha: isOpen ? 1 : 0 });
          gsap.set(contentRef.current, { autoAlpha: isOpen ? 1 : 0 });
          return;
        }

        const tl = gsap.timeline();

        if (isOpen) {
          // Animate the bubble expanding (clip-path circle)
          tl.fromTo(bgRef.current, 
            { clipPath: 'circle(0% at 100% 0%)', autoAlpha: 1 },
            { clipPath: 'circle(150% at 100% 0%)', duration: 0.8, ease: 'power3.inOut' }
          );

          // Stagger items
          const items = gsap.utils.toArray(`.${styles.mobileNavLink}`);
          tl.fromTo(items,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
            '-=0.4'
          );
        } else {
          // Reverse animation
          tl.to(contentRef.current, { opacity: 0, duration: 0.2 });
          tl.to(bgRef.current, { 
            clipPath: 'circle(0% at 100% 0%)', 
            duration: 0.6, 
            ease: 'power3.inOut' 
          }, 0);
          tl.set(bgRef.current, { autoAlpha: 0 });
          tl.set(contentRef.current, { opacity: 1 }); // reset for next open
        }
      });
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isOpen, reducedMotion]);

  return (
    <>
      <svg className={styles.gooeyFilter} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <nav
        ref={menuRef}
        id="mobile-menu"
        className={cn(styles.mobileNav, isOpen && styles.open)}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div ref={bgRef} className={styles.bubbleBackground} />
        
        <div ref={contentRef} className={styles.content}>
          <ul role="list" className={styles.mobileNavList}>
            {siteConfig.nav.map((item, index) => {
              const href = item.href as string;
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

              return (
                <li key={href} style={{ '--item-index': index } as React.CSSProperties}>
                  <Link
                    href={href}
                    className={cn(styles.mobileNavLink, isActive && styles.mobileNavLinkActive)}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onClose}
                  >
                    <span className={styles.mobileNavNumber}>{String(index + 1).padStart(2, '0')}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.mobileNavFooter}>
            <Link
              href="/contact"
              className={styles.mobileCta}
              onClick={onClose}
            >
              Start a Project →
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
