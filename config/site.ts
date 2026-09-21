// ============================================================
// SITE-WIDE CONFIGURATION
// ============================================================

import { profile } from '@/data/profile';

export const siteConfig = {
  // Identity
  name: profile.name,
  shortName: profile.shortName,
  monogram: profile.monogram,
  title: `${profile.name} | AI & Full-Stack Developer`,
  description: profile.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://saravanakumar.dev',

  // Author
  author: {
    name: profile.name,
    role: profile.headline,
    email: profile.contact.email,
    avatar: profile.photo,
  },

  // Open Graph
  ogImage: '/images/og/default.png',
  twitterHandle: '@saravanakumar',
  locale: 'en_US',

  // Navigation
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/#featured-work' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // Social
  social: {
    github:   profile.contact.github,
    linkedin: profile.contact.linkedin,
    email:    `mailto:${profile.contact.email}`,
  },

  // Content limits
  projectsPerPage: 6,
  postsPerPage: 8,
  featuredProjectsCount: 6,
} as const;

export type SiteConfig = typeof siteConfig;
