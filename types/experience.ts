// ============================================================
// EXPERIENCE TYPE DEFINITIONS
// ============================================================

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'education';

export interface ExperienceHighlight {
  text: string;
  metric?: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  role: string;
  type: EmploymentType;
  location: string;
  locationMode: 'remote' | 'hybrid' | 'onsite';
  startDate: string;
  endDate?: string;
  current: boolean;
  statusText?: string;
  certificateUrl?: string;
  description: string;
  highlights: ExperienceHighlight[];
  tech: string[];
  skills: string[];
}

// ============================================================
// CERTIFICATION TYPE DEFINITIONS
// ============================================================

export type CertificationStatus = 'active' | 'expired' | 'in-progress';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo?: string;
  credentialId?: string;
  credentialUrl?: string;
  issuedDate: string;
  expiryDate?: string;
  status: CertificationStatus;
  category: 'cloud' | 'development' | 'design' | 'management' | 'security' | 'data' | 'other';
  description?: string;
  skills?: string[];
}
