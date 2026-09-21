import type { Certification } from '@/types/experience';

/**
 * Verified certification credentials.
 */
export const certifications: Certification[] = [
  {
    id: 'cert-novitech-aiml',
    name: 'Artificial Intelligence & Machine Learning Internship Certificate',
    issuer: 'Novitech',
    issuedDate: '2026',
    status: 'active',
    category: 'development',
    description: 'Training in artificial intelligence workflows, machine learning models, and classification pipelines.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Python', 'scikit-learn'],
  },
  {
    id: 'cert-novitech-ds',
    name: 'Data Science Internship Certificate',
    issuer: 'Novitech',
    issuedDate: '2026',
    status: 'active',
    category: 'data',
    description: 'Exploratory data analysis, dataset preprocessing, and predictive data modeling.',
    skills: ['Data Science', 'Data Analysis', 'Python', 'Feature Engineering'],
  },
  {
    id: 'cert-codealpha-cloud',
    name: 'Cloud Computing Internship Certificate',
    issuer: 'CodeAlpha',
    issuedDate: '2026',
    status: 'active',
    category: 'cloud',
    description: 'Foundations of cloud computing architectures, data storage, and web application deployments.',
    skills: ['Cloud Computing', 'Storage Systems', 'Web Integration'],
  },
  {
    id: 'cert-nptel-python',
    name: 'The Joy of Computing using Python',
    issuer: 'NPTEL',
    issuedDate: '2024',
    status: 'active',
    category: 'development',
    description: 'Algorithmic computing, core data structures, and problem-solving using Python.',
    skills: ['Python', 'Algorithms', 'Data Structures', 'Problem Solving'],
  },
];

/** Get certifications sorted by issue date */
export function getCertifications(): Certification[] {
  return [...certifications];
}

/** Group certifications by category */
export function getCertificationsByCategory(): Record<string, Certification[]> {
  return certifications.reduce<Record<string, Certification[]>>((acc, cert) => {
    if (!acc[cert.category]) acc[cert.category] = [];
    acc[cert.category].push(cert);
    return acc;
  }, {});
}
