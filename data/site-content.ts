export type Project = {
  title: string;
  description: string;
  tech: string[];
  imageUrl?: string;
  imageUrls?: string[];
  demo?: string;
  repo?: string;
};

export type ExperienceItem = {
  years: string;
  title: string;
  company: string;
  summary: string;
};

export type AboutContent = {
  intro: string;
  details: string;
  cvUrl?: string;
};

export type SiteContent = {
  about: AboutContent;
  projects: Project[];
  experience: ExperienceItem[];
  techStack: string[];
};

export const defaultAbout: AboutContent = {
  intro: "",
  details: "",
  cvUrl: "",
};

export const defaultExperience: ExperienceItem[] = [];

export const defaultTechStack: string[] = [];

export const defaultSiteContent: SiteContent = {
  about: defaultAbout,
  projects: [],
  experience: defaultExperience,
  techStack: defaultTechStack,
};
