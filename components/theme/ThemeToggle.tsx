'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
  variant?: 'dock' | 'header' | 'mobile';
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className, variant = 'dock' }: ThemeToggleProps) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || theme;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // ignore
    }
  };

  // Determine current active theme
  const activeTheme = isHydrated
    ? (typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : theme) || theme
    : 'dark';

  const isLight = activeTheme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggleButton} ${styles[variant]} ${className || ''}`}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <div className={styles.iconWrapper}>
        {isLight ? (
          <Sun size={17} className={styles.sunIcon} aria-hidden="true" />
        ) : (
          <Moon size={17} className={styles.moonIcon} aria-hidden="true" />
        )}
      </div>
      {variant === 'dock' && (
        <span className={styles.tooltip}>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
      )}
    </button>
  );
}
