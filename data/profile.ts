// ============================================================
// CENTRALIZED SOURCE OF TRUTH: PERSONAL PROFILE & CREDENTIALS
// ============================================================

export interface ProfileData {
  name: string;
  shortName: string;
  monogram: string;
  headline: string;
  tagline: string;
  bio: string;
  photo: string;
  photoAlt: string;
  
  education: {
    degree: string;
    field: string;
    institution: string;
    affiliation: string;
    period: string;
    status: string;
  };

  positioning: {
    headline: string;
    domains: string[];
    summary: string;
    approach: string;
  };

  philosophy: Array<{
    number: string;
    title: string;
    description: string;
  }>;

  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
    availability: string;
  };
}

export const profile: ProfileData = {
  name: 'Saravanakumar V',
  shortName: 'Saravana',
  monogram: 'SK',
  headline: 'AI & Full-Stack Developer',
  tagline: 'I build modern web applications, AI-powered systems, automation tools, and data-driven products.',
  bio: "I'm Saravanakumar V — an AI & Full-Stack Developer with a background in Artificial Intelligence & Data Science at MAM College of Engineering and Technology (Anna University). I engineer modern web applications, AI systems, automation tools, and data-driven products designed to solve practical business problems.",
  photo: '/images/profile/saravanakumar.jpg',
  photoAlt: 'Saravanakumar V — AI & Full-Stack Developer',

  education: {
    degree: 'B.Tech',
    field: 'Artificial Intelligence & Data Science',
    institution: 'MAM College of Engineering and Technology',
    affiliation: 'Anna University',
    period: '2024 — 2028',
    status: 'Expected 2028',
  },

  positioning: {
    headline: 'I BUILD INTELLIGENT SOFTWARE.',
    domains: [
      'Full-Stack Web Applications',
      'AI & LLM Integration',
      'Workflow Automation',
      'API & Backend Engineering',
      'Data & Dashboards',
    ],
    summary:
      'Developing production-grade web applications, AI-assisted workflows, reliable backend APIs, and data-driven interfaces with an emphasis on performance and clean architecture.',
    approach:
      'I focus on understanding the core problem, designing clean architectures, shipping robust type-safe code, and continuously refining through testing and user feedback.',
  },

  philosophy: [
    {
      number: '01',
      title: 'Problem-First Engineering',
      description: 'Understand the client’s domain, constraints, and user needs before writing a line of code.',
    },
    {
      number: '02',
      title: 'Clean Architecture',
      description: 'Build modular, maintainable systems that scale smoothly without unnecessary complexity.',
    },
    {
      number: '03',
      title: 'Rapid Iteration',
      description: 'Deliver working increments early, validate against real requirements, and refine continuously.',
    },
  ],

  contact: {
    email: 'saravanakumarV1214@gmail.com',
    github: 'https://github.com/saravanakumar14-V',
    linkedin: 'https://www.linkedin.com/in/saravana-kumar-6903233b5',
    location: 'India',
    availability: 'Available for freelance work · Based in India',
  },
};
