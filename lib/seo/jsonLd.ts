/**
 * JSON-LD Structured Data Generators
 * Improves search engine understanding of page content.
 *
 * Schemas used:
 *   Home:     Person + WebSite
 *   Blog:     Article + BreadcrumbList
 *   Projects: CreativeWork + BreadcrumbList
 *   All pages: BreadcrumbList
 */

import { siteConfig } from '@/config/site';

/** Person schema — for the home page and about page */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
    ].filter(Boolean),
    jobTitle: siteConfig.author.role,
    email: siteConfig.author.email,
  };
}

/** WebSite schema — for the home page */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
}

/** Article schema — for blog posts */
export function articleSchema(post: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.image ? `${siteConfig.url}${post.image}` : `${siteConfig.url}${siteConfig.ogImage}`,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  };
}

/** CreativeWork schema — for project pages */
export function projectSchema(project: {
  title: string;
  description: string;
  url: string;
  year: number;
  tech: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: project.url,
    dateCreated: String(project.year),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    keywords: project.tech.join(', '),
  };
}

/** BreadcrumbList schema — for all inner pages */
export function breadcrumbSchema(
  items: Array<{ label: string; href: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

/** Combine multiple schemas for a page */
export function combineSchemas(...schemas: object[]): string {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
