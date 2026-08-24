// ============================================================
// types/index.ts - All TypeScript Data Definitions
// ============================================================

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface HeroData {
  name: string;
  title: string;
  headline: string;
  bio: string;
  photoPath: string;
  photoAlt: string;
  resumePath: string;
  coverLetterPath: string;
  socials: {
    github: SocialLink;
    linkedin: SocialLink;
    leetcode: SocialLink;
    codechef: SocialLink;
    codeforces: SocialLink;
  };
}

export interface TechTag {
  label: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  duration: string;
  type: "full-time" | "internship" | "contract";
  bullets: string[];
  stack: string[];
  verificationUrl?: string;
}

export interface CurrentFocus {
  title: string;
  status: string;
  architecture: string;
  stack: string[];
  repoUrl: string;
}

export interface FlagshipProject {
  id: string;
  name: string;
  subheading: string;
  repoUrl: string;
  liveUrl?: string;
  paperUrl?: string;
  stack: string[];
  highlights: string[];
  imageHint: string;
}

export interface UtilityProject {
  id: string;
  name: string;
  summary: string;
  repoUrl: string;
  stack: string[];
  award?: string;
}

export interface CPPlatform {
  id: string;
  name: string;
  handle: string;
  profileUrl: string;
  peakRating: number ;
  ratingLabel: string;
  problemsSolved?: number;
  colorClass: string;
  accentColor: string;
  badgeLabel: string;
}

export interface CPAchievement {
  id: string;
  title: string;
  description: string;
  certUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  category: string;
  pdfPath: string;
  originalUrl: string;
  tldr: {
    problem: string;
    breakthrough: string;
    takeaways: string[];
  };
}

export interface Education {
  institution: string;
  degree: string;
  major?: string;
  duration: string;
  cgpa?: string;
  percentage?: string;
  location: string;
  logoHint: string;
}
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  verifyUrl: string;
  skills: string[];
}

export interface ContactInfo {
  email: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
}
