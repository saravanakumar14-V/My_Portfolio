export type SkillCategory = 'AI & LLMs' | 'Software & Full-Stack' | 'Core Engineering';

export interface Skill {
  name: string;
  category: SkillCategory;
  description: string;
}

export const skills: Skill[] = [
  {
    name: 'Artificial Intelligence',
    category: 'AI & LLMs',
    description: 'AI-powered application development, prompt workflows, and intelligent software integration.'
  },
  {
    name: 'LLM & Generative AI Integration',
    category: 'AI & LLMs',
    description: 'Integrating large language models, structured tool calling, and generative API pipelines.'
  },
  {
    name: 'Machine Learning',
    category: 'AI & LLMs',
    description: 'Supervised classification, predictive modeling, and data preprocessing with scikit-learn.'
  },
  {
    name: 'Natural Language Processing',
    category: 'AI & LLMs',
    description: 'Text parsing, semantic token matching, and document intelligence workflows.'
  },
  {
    name: 'Python',
    category: 'Core Engineering',
    description: 'Backend services, data analysis, API development, and ML scripting.'
  },
  {
    name: 'TypeScript',
    category: 'Core Engineering',
    description: 'Strict type safety, robust frontend architectures, and scalable UI codebases.'
  },
  {
    name: 'JavaScript',
    category: 'Core Engineering',
    description: 'Modern ESNext, asynchronous logic, and reactive DOM interactions.'
  },
  {
    name: 'Full-Stack Development',
    category: 'Software & Full-Stack',
    description: 'End-to-end web applications combining reactive interfaces with clean server architectures.'
  },
  {
    name: 'Web Development',
    category: 'Software & Full-Stack',
    description: 'Modern, responsive web applications built with Next.js, React, and clean CSS styling.'
  },
  {
    name: 'API Development & Integration',
    category: 'Software & Full-Stack',
    description: 'Designing RESTful endpoints, service integrations, and JSON payload handling with Flask & Node.js.'
  },
  {
    name: 'React & React Native',
    category: 'Software & Full-Stack',
    description: 'Interactive component architectures for desktop, web, and cross-platform mobile apps.'
  },
  {
    name: 'Desktop Application Development',
    category: 'Software & Full-Stack',
    description: 'Native desktop shell development with Tauri, React, and local system integration.'
  },
  {
    name: 'SQL & Databases',
    category: 'Core Engineering',
    description: 'Relational data modeling, parameterized queries, and database optimization.'
  },
  {
    name: 'MongoDB',
    category: 'Core Engineering',
    description: 'Document database schema design, indexing, and scalable storage integration.'
  },
  {
    name: 'Cloud Computing',
    category: 'Core Engineering',
    description: 'Cloud storage fundamentals, API deployment, and data deduplication concepts.'
  }
];

export function getSkillsByCategory(): Record<SkillCategory, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);
}

export function getAllSkills(): Skill[] {
  return skills;
}
