import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--container-padding)',
        background: 'var(--color-bg-primary)',
      }}
    >
      {/* 404 Number — large display type */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(6rem, 20vw, 14rem)',
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          color: 'var(--color-bg-elevated)',
          userSelect: 'none',
          marginBottom: 'var(--space-4)',
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Page not found
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          maxWidth: '42ch',
          lineHeight: 'var(--leading-relaxed)',
          marginBottom: 'var(--space-8)',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to somewhere useful.
      </p>

      {/* CTA */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-accent-primary)',
          color: 'var(--color-text-inverse)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          letterSpacing: 'var(--tracking-wide)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          transition: 'background var(--duration-fast) var(--ease-out-cubic)',
        }}
      >
        ← Back to home
      </Link>
    </main>
  );
}
