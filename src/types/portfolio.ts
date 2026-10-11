export type ProjectCategory = "all" | "fullstack" | "mobile" | "systems" | "tools";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  metrics: string[];
  features: string[];
  architectureNotes: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    icon: string;
    popularIn: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Full-Time" | "Contract" | "Consulting";
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  feedback: string;
  endorsedSkill: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}
