// ============================================================
// PROJECT TYPE DEFINITIONS
// ============================================================

export type ProjectStatus = 'live' | 'in-progress' | 'archived';
export type ProjectCategory = 'web' | 'mobile' | 'backend' | 'fullstack' | 'tool' | 'design-system';

export interface ProjectTechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'other';
  icon?: string; // path to SVG in sprite
}

export interface ProjectLink {
  label: string;
  href: string;
  type: 'live' | 'github' | 'case-study' | 'demo' | 'article';
}

export interface ProjectMetrics {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  type: 'image' | 'video';
  caption?: string;
  width: number;
  height: number;
}

// Deep Case Study Sections
export interface CaseStudyFeature {
  title: string;
  description: string;
  media?: ProjectGalleryItem;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  type: 'client' | 'server' | 'database' | 'external' | 'ai';
  connections: string[]; // IDs of connected nodes
}

export interface CaseStudyLesson {
  title: string;
  description: string;
  type: 'success' | 'challenge' | 'future';
}

export interface ThemeConfig {
  primaryHue: string;
  ambientIntensity: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  
  // New Case Study Fields
  problem?: string;
  research?: string[]; // Paragraphs of research/planning
  architecture?: ArchitectureNode[];
  features?: CaseStudyFeature[];
  lessons?: CaseStudyLesson[];
  theme?: ThemeConfig;

  status: ProjectStatus;
  category: ProjectCategory;
  year: number;
  role: string;
  teamSize?: number;
  duration?: string;
  tech: ProjectTechStack[];
  links: ProjectLink[];
  metrics?: ProjectMetrics[];
  thumbnail: string;
  hero: string;
  gallery?: ProjectGalleryItem[];
  featured: boolean;
  featuredOrder?: number;
  ogImage?: string;
  mdxContent?: boolean;
}

// For home page showcase — subset of Project
export type ProjectPreview = Pick<
  Project,
  'id' | 'slug' | 'title' | 'tagline' | 'category' | 'year' | 'tech' | 'thumbnail' | 'hero' | 'links' | 'featured' | 'featuredOrder'
>;
