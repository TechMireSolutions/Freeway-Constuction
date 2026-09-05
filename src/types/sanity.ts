import type { PortableTextBlock } from "@portabletext/types";

interface ImageWithAlt {
  _type: "image";
  asset?: { _ref: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  companyName: string;
  tagline?: string;
  logo?: ImageWithAlt;
  favicon?: ImageWithAlt;
  phone?: string;
  email?: string;
  adminEmail?: string;
  address?: string;
  socialLinks?: SocialLink[];
  defaultSeoImage?: ImageWithAlt;
  footerText?: string;
}

export type ClientSettings = SiteSettings;

export interface Stat {
  number: number;
  suffix?: string;
  label: string;
}

export interface CtaBanner {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  backgroundImage?: ImageWithAlt;
}

export interface HomePage {
  _id: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroBackgroundImage?: ImageWithAlt;
  introHeading?: string;
  introText?: string;
  stats?: Stat[];
  ctaBanner?: CtaBanner;
  seo?: { title?: string; description?: string };
}

export interface ServiceCard {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  icon?: string;
  heroImage?: ImageWithAlt;
}

export interface ServiceDetail extends ServiceCard {
  fullDescription?: PortableTextBlock[];
  galleryImages?: ImageWithAlt[];
  relatedProjects?: ProjectCard[];
}

export interface ProjectCard {
  _id: string;
  title: string;
  slug: string;
  clientName?: string;
  location?: string;
  year?: number;
  coverImage?: ImageWithAlt;
  category?: { title: string; slug: string };
}

export interface ProjectDetail extends ProjectCard {
  gallery?: ImageWithAlt[];
  beforeImages?: ImageWithAlt[];
  afterImages?: ImageWithAlt[];
  description?: PortableTextBlock[];
  services?: { title: string; slug: string }[];
  seo?: { title?: string; description?: string };
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientPhoto?: ImageWithAlt;
  companyLocation?: string;
  quote?: string;
  rating?: number;
  project?: { title: string; slug: string };
}

export interface Value {
  title: string;
  description?: string;
  icon?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: ImageWithAlt;
  bio?: string;
}

export interface AboutPage {
  _id: string;
  heading?: string;
  story?: PortableTextBlock[];
  introImage?: ImageWithAlt;
  values?: Value[];
  milestones?: Milestone[];
  teamMembers?: TeamMember[];
  seo?: { title?: string; description?: string };
}

export interface OfficeLocation {
  name: string;
  address: string;
  phone?: string;
}

export interface ContactPage {
  _id: string;
  heading?: string;
  introText?: string;
  officeLocations?: OfficeLocation[];
  businessHours?: string;
  mapEmbedUrl?: string;
  successMessage?: string;
  seo?: { title?: string; description?: string };
}