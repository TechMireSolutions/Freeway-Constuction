import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    logo,
    phone,
    email,
    address,
    socialLinks,
    defaultSeoImage,
    footerText
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeading,
    heroSubheading,
    heroBackgroundImage,
    stats,
    ctaBanner {
      heading,
      subheading,
      buttonText,
      backgroundImage
    }
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    heroImage
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true][0...4] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    location,
    year,
    coverImage,
    "services": servicesUsed[]->{ title, "slug": slug.current }
  }
`

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
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heading,
    story,
    teamMembers,
    values,
    milestones
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    heading,
    introText,
    officeLocations,
    mapCoordinates,
    successMessage
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    location,
    year,
    coverImage,
    "services": servicesUsed[]->{ title, "slug": slug.current }
  }
`

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
    "services": servicesUsed[]->{ title, "slug": slug.current }
  }
`

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
      coverImage
    }
  }
`
