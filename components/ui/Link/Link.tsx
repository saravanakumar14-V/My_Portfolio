import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/lib/utils/cn';
import styles from './Link.module.css';

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'nav' | 'inline';
  showIcon?: boolean;
}

/**
 * Link component
 * Standardized link styling. Handles external links gracefully.
 */
export function Link({
  children,
  className,
  external = false,
  variant = 'inline',
  showIcon = false,
  href,
  ...props
}: LinkProps) {
  const isExternal = external || (typeof href === 'string' && href.startsWith('http'));

  const commonProps = {
    className: cn(
      styles.link,
      styles[variant],
      (isExternal && showIcon) && styles.withIcon,
      className
    ),
  };

  const content = (
    <>
      {children}
      {isExternal && showIcon && (
        <svg
          className={styles.externalIcon}
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 3h3v3M4 12l9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} {...props} {...commonProps}>
      {content}
    </NextLink>
  );
}
