import { client } from "./client";
import {
  siteSettingsQuery,
  homePageQuery,
  servicesQuery,
  featuredProjectsQuery,
  allProjectsQuery,
  projectBySlugQuery,
  serviceBySlugQuery,
  testimonialsQuery,
  aboutPageQuery,
  contactPageQuery,
} from "./queries";
import type {
  SiteSettings,
  HomePage,
  ServiceCard,
  ProjectCard,
  ProjectDetail,
  ServiceDetail,
  Testimonial,
  AboutPage,
  ContactPage,
  ClientSettings,
} from "@/types/sanity";

export async function getSiteSettings(): Promise<ClientSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}

export async function getHomePage(): Promise<HomePage> {
  try {
    const data: HomePage | null = await client.fetch(homePageQuery);
    if (data) return data;
  } catch {
    /* fall through to defaults */
  }
  return {
    _id: "home-fallback",
    heroHeading: "We build spaces that last.",
    heroSubheading:
      "Premium construction and design-build services. From ground-up commercial builds to bespoke homes and cabinetry.",
    introHeading:
      "We don't just construct buildings. We build what matters — homes, workspaces and legacies that endure.",
    introText:
      "For two decades, Freeway Constructions has delivered meticulous design-build projects across residential, commercial and bespoke living spaces.",
    stats: [
      { number: 250, suffix: "+", label: "Projects delivered" },
      { number: 180, suffix: "+", label: "Happy clients" },
      { number: 20, suffix: " yrs", label: "Experience" },
      { number: 98, suffix: "%", label: "On-time completion" },
    ],
    ctaBanner: {
      heading: "Ready to start your next project?",
      subheading:
        "Tell us about your build and get a free, no-obligation estimate within 48 hours.",
      buttonText: "Get a Free Estimate",
    },
  };
}

const fallbackServices: ServiceCard[] = [
  { _id: "s1", title: "Design & Construction Consultancy", slug: "design-construction-consultancy", shortDescription: "Early-stage advice, feasibility and design-build coordination from day one.", icon: "Lightbulb" },
  { _id: "s2", title: "Commercial", slug: "commercial", shortDescription: "Offices, retail and mixed-use spaces built for the way you work.", icon: "Building2" },
  { _id: "s3", title: "Residential", slug: "residential", shortDescription: "New homes and extensions crafted around the way you actually live.", icon: "Home" },
  { _id: "s4", title: "Renovations", slug: "renovations", shortDescription: "Thoughtful remodels that transform tired spaces into modern ones.", icon: "Hammer" },
  { _id: "s5", title: "Metal Works", slug: "metal-works", shortDescription: "Steel structures, railings and architectural metalwork made in-house.", icon: "Warehouse" },
  { _id: "s6", title: "Wood Works", slug: "wood-works", shortDescription: "Joinery, millwork and custom timber features by master craftsmen.", icon: "Armchair" },
  { _id: "s7", title: "Kitchen & Cabinetry", slug: "kitchen-cabinetry", shortDescription: "Bespoke kitchens, wardrobes and cabinetry around your space.", icon: "UtensilsCrossed" },
  { _id: "s8", title: "Pools & Landscapes", slug: "pools-landscapes", shortDescription: "Pools, decks and gardens that turn outdoor areas into retreats.", icon: "Waves" },
];

export async function getServices(): Promise<ServiceCard[]> {
  try {
    const services: ServiceCard[] = await client.fetch(servicesQuery);
    if (services.length) return services;
  } catch {
    /* fall through */
  }
  return fallbackServices;
}

export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  try {
    const projects: ProjectCard[] = await client.fetch(featuredProjectsQuery);
    if (projects.length) return projects;
    const all = await getProjects();
    return all.slice(0, 4);
  } catch {
    return [];
  }
}

const fallbackProjects: ProjectCard[] = [
  { _id: "p1", title: "Harbour Office Tower", slug: "harbour-office-tower", clientName: "North Star Group", location: "Downtown", year: 2025, category: { title: "Commercial", slug: "commercial" } },
  { _id: "p2", title: "Oakwood Family Home", slug: "oakwood-family-home", clientName: "The D'Abreu Family", location: "Riverside", year: 2024, category: { title: "Residential", slug: "residential" } },
  { _id: "p3", title: "Cedar & Co. Restaurant", slug: "cedar-co-restaurant", clientName: "Cedar & Co.", location: "Oldtown", year: 2024, category: { title: "Commercial", slug: "commercial" } },
  { _id: "p4", title: "Bluewater Villa & Pool", slug: "bluewater-villa-pool", clientName: "Private Client", location: "Lakeside", year: 2023, category: { title: "Pools & Landscapes", slug: "pools-landscapes" } },
];

export async function getProjects(): Promise<ProjectCard[]> {
  try {
    const projects: ProjectCard[] = await client.fetch(allProjectsQuery);
    if (projects.length) return projects;
  } catch {
    /* fall through */
  }
  return fallbackProjects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (project) return project;
  } catch {
    /* fall through */
  }
  const card = fallbackProjects.find((p) => p.slug === slug);
  return card
    ? {
        ...card,
        description: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                marks: [],
                text: `${card.title} is one of Freeway Constructions' flagship projects. Delivered in ${card.location} in ${card.year}, it reflects our commitment to craft, coordination and on-time completion.`,
              },
            ],
          },
        ],
      }
    : null;
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  try {
    const service = await client.fetch(serviceBySlugQuery, { slug });
    if (service) return service;
  } catch {
    /* fall through */
  }
  const fallback = fallbackServices.find((s) => s.slug === slug);
  return fallback ? { ...fallback } : null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials: Testimonial[] = await client.fetch(testimonialsQuery);
    if (testimonials.length) return testimonials;
  } catch {
    /* fall through */
  }
  return [
    {
      _id: "t1",
      clientName: "Amelia Wright",
      companyLocation: "Director, Cedar & Co.",
      rating: 5,
      quote:
        "Freeway took our restaurant from a bare shell to a space guests talk about. They hit the schedule and the finish is immaculate.",
    },
    {
      _id: "t2",
      clientName: "Rohan Mehta",
      companyLocation: "Facilities Lead, North Star Group",
      rating: 5,
      quote:
        "Coordinating a 22-storey tower is chaos — but with Freeway it felt effortless. Clear reporting, zero surprises, ahead of schedule.",
    },
    {
      _id: "t3",
      clientName: "Sophie D'Abreu",
      companyLocation: "Homeowner, Riverside",
      rating: 5,
      quote:
        "The cabinetry is the first thing everyone comments on. You can tell every piece was made by someone who cares.",
    },
  ];
}

export async function getAboutPage(): Promise<AboutPage> {
  try {
    const data: AboutPage | null = await client.fetch(aboutPageQuery);
    if (data) return data;
  } catch {
    /* fall through */
  }
  return {
    _id: "about-fallback",
    heading: "Two decades of building trust",
    story: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            marks: [],
            text: "Founded in 2004, Freeway Constructions has grown from a small joinery workshop into a full-service design-build practice. We bring architecture, engineering and craft together under one roof so nothing gets lost between drawings and delivery.",
          },
        ],
      },
    ],
    values: [
      { title: "Craftsmanship", description: "Every joint, weld and finish meets a standard we're proud of.", icon: "Hammer" },
      { title: "Transparency", description: "Clear budgets, honest timelines and open communication.", icon: "Eye" },
      { title: "Reliability", description: "98% of projects complete on time — clients keep coming back.", icon: "Shield" },
    ],
    milestones: [
      { year: "2004", title: "Humble beginnings", description: "Started as a family joinery workshop." },
      { year: "2017", title: "Commercial expansion", description: "Delivered our first large commercial fit-out." },
      { year: "2023", title: "Design-build studio", description: "Launched an in-house design studio." },
    ],
    teamMembers: [
      { name: "Daniel Cross", role: "Founder & Director" },
      { name: "Maria Fernandes", role: "Lead Architect" },
      { name: "Omar Khalid", role: "Head of Construction" },
    ],
  };
}

export async function getContactPage(): Promise<ContactPage> {
  try {
    const data: ContactPage | null = await client.fetch(contactPageQuery);
    if (data) return data;
  } catch {
    /* fall through */
  }
  return {
    _id: "contact-fallback",
    heading: "Let's talk about your project",
    introText:
      "Whether it's a full build or a single kitchen, tell us what you have in mind and we'll take it from there.",
    businessHours: "Monday – Saturday, 9am – 6pm",
    successMessage:
      "Thanks — your message has been sent. We'll get back to you within one business day.",
  };
}

export type { SiteSettings };
export type { ServiceCard };