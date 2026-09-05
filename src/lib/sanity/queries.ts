import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    logo,
    favicon,
    phone,
    email,
    adminEmail,
    address,
    socialLinks[] { label, url },
    defaultSeoImage,
    footerText
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    heroHeading,
    heroSubheading,
    heroBackgroundImage,
    introHeading,
    introText,
    stats[] { number, suffix, label },
    ctaBanner {
      heading,
      subheading,
      buttonText,
      backgroundImage
    },
    seo {
      title,
      description
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    heroImage
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true][0...4] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    location,
    year,
    coverImage,
    "category": category->{ title, "slug": slug.current }
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    location,
    year,
    coverImage,
    "category": category->{ title, "slug": slug.current }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    clientName,
    location,
    year,
    coverImage,
    gallery,
    beforeImages,
    afterImages,
    description,
    seo { title, description },
    "category": category->{ title, "slug": slug.current },
    "services": servicesUsed[]->{ title, "slug": slug.current }
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon,
    heroImage,
    galleryImages,
    "relatedProjects": relatedProjects[]->{
      _id,
      title,
      "slug": slug.current,
      coverImage,
      location,
      year
    }
  }
`;

export const allServiceSlugsQuery = groq`
  *[_type == "service"] { "slug": slug.current }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    clientName,
    clientPhoto,
    companyLocation,
    quote,
    rating,
    "project": relatedProject->{ title, "slug": slug.current }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    _id,
    heading,
    story,
    introImage,
    values[] { title, description, icon },
    milestones[] { year, title, description },
    "teamMembers": teamMembers[]->{ name, role, photo, bio },
    seo { title, description }
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    _id,
    heading,
    introText,
    officeLocations[] { name, address, phone },
    businessHours,
    mapEmbedUrl,
    successMessage,
    seo { title, description }
  }
`;