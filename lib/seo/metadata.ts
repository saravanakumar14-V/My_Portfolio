/**
 * SEO Metadata Generator
 * Creates Next.js Metadata objects for each page.
 * Enforces consistent SEO across all routes.
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for any page.
 * Falls back to site defaults when not provided.
 */
export function generateMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    type = 'website',
    publishedTime,
    modifiedTime,
    tags,
    noIndex = false,
  } = options;

  const formattedTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.title;

  const absoluteImage = image.startsWith('http')
    ? image
    : `${siteConfig.url}${image}`;

  return {
    title: formattedTitle,
    description,
    metadataBase: new URL(siteConfig.url),

    openGraph: {
      title: formattedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && { tags }),
    },

    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [absoluteImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },

    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },

    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate Article metadata for blog posts.
 */
export function generateArticleMetadata(options: PageMetadataOptions & {
  author?: string;
}): Metadata {
  const base = generateMetadata({ ...options, type: 'article' });
  return {
    ...base,
    authors: [{ name: options.author || siteConfig.author.name }],
  };
}
