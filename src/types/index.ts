export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin' | string;
  phone?: string;
  createdAt?: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  companySector?: string;
  category: string;
  location: string;
  genderPreference: string;
  salary: string;
  salaryNumeric?: number;
  timing: string;
  experienceRequired: string;
  isUrgent: boolean;
  isFeatured?: boolean;
  vacancies: number;
  description: string;
  requiredSkills: string[];
  benefits: string[];
  contactPhone1: string;
  contactPhone2: string;
  postedAt: string;
}

export interface Partner {
  _id: string;
  name: string;
  initials: string;
  sector: string;
  category: 'bfsi' | 'bpo' | 'fmcg' | 'manufacturing' | 'tech' | 'all';
  location: string;
  isVerified: boolean;
  placementsCount: string;
  frequentRoles: string;
  salaryRange: string;
  status: string;
}

export interface CandidateSubmission {
  _id?: string;
  fullName: string;
  phone: string;
  gender: string;
  position: string;
  location: string;
  skills: string;
  experience?: string;
  education?: string;
  status?: 'New' | 'Screened' | 'Interview Scheduled' | 'Placed' | 'Rejected' | string;
  appliedVia?: string;
  createdAt?: string;
}

export interface EmployerInquiry {
  _id?: string;
  companyName: string;
  industrySector: string;
  roleNeeded: string;
  vacancies: string;
  location: string;
  salaryRange: string;
  experienceLevel: string;
  genderPreference: string;
  notes: string;
  contactName: string;
  whatsapp: string;
  email?: string;
  status?: string;
  slaHours?: number;
  createdAt?: string;
}

export interface PlatformStats {
  placedCandidates: number;
  activeOpenings: number;
  urgentOpenings: number;
  partnerCompanies: number;
  employerInquiriesCount: number;
  avgTurnaroundHours: number;
  satisfactionRate: string;
}
