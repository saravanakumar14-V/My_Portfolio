// ============================================================
// NAVIGATION TYPE DEFINITIONS
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  description?: string;    // Used in mega-menus or tooltips
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// ============================================================
// BLOG TYPE DEFINITIONS
// ============================================================

export type BlogCategory =
  | 'engineering'
  | 'product'
  | 'design'
  | 'career'
  | 'tutorial'
  | 'opinion'
  | 'case-study';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;      // Meta description — 150 chars max
  publishedAt: string;      // ISO date string
  updatedAt?: string;       // ISO date string
  category: BlogCategory;
  tags: string[];
  readingTime: number;      // Minutes
  featured: boolean;
  cover?: string;           // Cover image path
  ogImage?: string;
  draft: boolean;
}

// ============================================================
// COMMON TYPE DEFINITIONS
// ============================================================

export type Theme = 'dark' | 'light' | 'system';

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' | 'email' | 'rss';
  href: string;
  label: string;            // Accessible label
  icon?: string;            // Icon name in Lucide
}

export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

// Utility types
export type WithClassName = {
  className?: string;
};

export type WithChildren = {
  children: React.ReactNode;
};

export type WithOptionalChildren = {
  children?: React.ReactNode;
};

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ColorScheme = 'default' | 'accent' | 'success' | 'error' | 'warning';
