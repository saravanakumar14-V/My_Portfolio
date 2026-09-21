'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';
import { BorderGlow } from '@/effects/borders/BorderGlow';
import { Icon } from '@/components/ui/Icon';
import { Home, FolderOpen, User, Briefcase, Award, Mail } from 'lucide-react';
import styles from './Dock.module.css';

// Map labels to icons
const getIconForRoute = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('home')) return Home;
  if (l.includes('project') || l.includes('work')) return FolderOpen;
  if (l.includes('about') || l.includes('profile')) return User;
  if (l.includes('experience') || l.includes('journey')) return Briefcase;
  if (l.includes('cert') || l.includes('credential')) return Award;
  if (l.includes('contact')) return Mail;
  return FolderOpen;
};

export function Dock() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !dockRef.current) return;

    let ctx: gsap.Context;
    let effectMounted = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!effectMounted) return;

      ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(`.${styles.dockItem}`);
        const baseSize = 48; // Base width/height
        const maxScale = 1.4; // Max magnification
        const range = 150; // Proximity range in px

        const handleMouseMove = (e: MouseEvent) => {
          items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distance = Math.abs(e.clientX - centerX);
            
            // Calculate scale based on distance
            let scale = 1;
            if (distance < range) {
              const proximity = 1 - distance / range;
              const ease = Math.sin((proximity * Math.PI) / 2);
              scale = 1 + (maxScale - 1) * ease;
            }

            gsap.to(item, {
              width: baseSize * scale,
              height: baseSize * scale,
              duration: 0.1,
              overwrite: 'auto'
            });
          });
        };

        const handleMouseLeave = () => {
          gsap.to(items, {
            width: baseSize,
            height: baseSize,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };

        if (dockRef.current) {
          dockRef.current.addEventListener('mousemove', handleMouseMove);
          dockRef.current.addEventListener('mouseleave', handleMouseLeave);
        }
      });
    })();

    return () => {
      effectMounted = false;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div className={styles.dockContainer}>
      <nav ref={dockRef} className={styles.dock} aria-label="Desktop navigation">
        <ul className={styles.dockList}>
          {siteConfig.nav.map((item) => {
            const href = item.href as string;
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            const ItemIcon = getIconForRoute(item.label);

            return (
              <li key={href} className={styles.dockListItem}>
                <CursorTrigger cursorState="hover" magnetic>
                  <BorderGlow active={isActive} className={styles.dockItemWrapper}>
                    <Link
                      href={href}
                      className={cn(styles.dockItem, isActive && styles.active)}
                      aria-label={item.label}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon icon={ItemIcon} size="sm" className={styles.dockIcon} />
                      <span className={styles.tooltip}>{item.label}</span>
                    </Link>
                  </BorderGlow>
                </CursorTrigger>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
