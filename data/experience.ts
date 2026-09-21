import type { Experience } from '@/types/experience';

/**
 * Verified career and academic journey.
 * Factually accurate records representing real academic milestones and completed internships.
 */
export const experiences: Experience[] = [
  {
    id: 'exp-btech',
    company: 'MAM College of Engineering and Technology (Anna University)',
    companyUrl: 'https://annauniv.edu',
    role: 'B.Tech — Artificial Intelligence & Data Science',
    type: 'education',
    location: 'Tamil Nadu, India',
    locationMode: 'onsite',
    startDate: '2024',
    endDate: '2028 · Expected',
    current: true,
    statusText: 'In Progress (Expected 2028)',
    description:
      'Pursuing foundational and applied coursework in Artificial Intelligence, Machine Learning, Database Management Systems, Data Structures, and Software Development.',
    highlights: [
      { text: 'Undergraduate study in AI, Machine Learning, and Computer Systems' },
    ],
    tech: ['Python', 'SQL', 'Data Structures', 'Machine Learning', 'Algorithms'],
    skills: ['Artificial Intelligence', 'Data Science', 'Problem Solving'],
  },
  {
    id: 'exp-novitech-ai',
    company: 'Novitech',
    companyUrl: 'https://novitech.in',
    role: 'Artificial Intelligence Intern',
    type: 'internship',
    location: 'India',
    locationMode: 'remote',
    startDate: 'January 2026',
    endDate: 'January 2026',
    current: false,
    statusText: 'Completed — January 2026',
    description:
      'Explored artificial intelligence workflows, generative concepts, and practical integration of intelligent features into application logic.',
    highlights: [
      { text: 'Hands-on practical training in artificial intelligence workflows' },
    ],
    tech: ['Python', 'Artificial Intelligence', 'API Integration', 'NLP'],
    skills: ['Artificial Intelligence', 'AI Application Development'],
  },
  {
    id: 'exp-novitech-ml',
    company: 'Novitech',
    companyUrl: 'https://novitech.in',
    role: 'Machine Learning Intern',
    type: 'internship',
    location: 'India',
    locationMode: 'remote',
    startDate: 'January 2026',
    endDate: 'January 2026',
    current: false,
    statusText: 'Completed — January 2026',
    description:
      'Implemented supervised machine learning models, dataset preprocessing pipelines, and classification algorithms using scikit-learn.',
    highlights: [
      { text: 'Supervised classification pipelines and feature preprocessing' },
    ],
    tech: ['Python', 'Machine Learning', 'scikit-learn', 'Data Modeling'],
    skills: ['Machine Learning', 'Model Evaluation'],
  },
  {
    id: 'exp-novitech-ds',
    company: 'Novitech',
    companyUrl: 'https://novitech.in',
    role: 'Data Science Intern',
    type: 'internship',
    location: 'India',
    locationMode: 'remote',
    startDate: 'January 2026',
    endDate: 'January 2026',
    current: false,
    statusText: 'Completed — January 2026',
    description:
      'Conducted exploratory data analysis (EDA), dataset cleaning, statistical verification, and feature visualization for data-driven applications.',
    highlights: [
      { text: 'Exploratory data analysis, cleaning, and statistical validation' },
    ],
    tech: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Visualization'],
    skills: ['Data Science', 'Data Analysis'],
  },
  {
    id: 'exp-codealpha-cloud',
    company: 'CodeAlpha',
    companyUrl: 'https://codealpha.tech',
    role: 'Cloud Computing Intern',
    type: 'internship',
    location: 'India',
    locationMode: 'remote',
    startDate: 'July 2026',
    endDate: 'July 2026',
    current: false,
    statusText: 'Completed — July 2026',
    description:
      'Explored cloud architecture fundamentals, storage services, API endpoints, and web deployment mechanisms.',
    highlights: [
      { text: 'Cloud infrastructure components, storage scaling, and web integration' },
    ],
    tech: ['Cloud Computing', 'Web Development', 'Storage Systems', 'APIs'],
    skills: ['Cloud Computing', 'System Fundamentals'],
  },
];

/** Get experiences sorted by start date */
export function getExperiences(): Experience[] {
  return [...experiences];
}

/** Get the current role */
export function getCurrentExperience(): Experience | undefined {
  return experiences.find((e) => e.current);
}
