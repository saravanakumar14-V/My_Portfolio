import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Experimental features ──────────────────────────────────
  experimental: {
    // Enable CSS optimization
    optimizeCss: false, // requires critters package — enable later
    turbopackUseSystemTlsCerts: true,
  },

  // ── Image optimization ─────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF first, WebP fallback
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes:  [16, 32, 64, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── TypeScript ─────────────────────────────────────────────
  typescript: {
    // !! Failing builds on type errors is intentional !!
    // Never disable this in production.
    ignoreBuildErrors: false,
  },

  // ── ESLint ─────────────────────────────────────────────────
 

  // ── HTTP Headers ───────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────
  async redirects() {
    return [];
  },

  // ── Webpack customization ─────────────────────────────────
  webpack(config) {
    // SVG handling — inline SVG as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  turbopack: {},
};

export default nextConfig;
