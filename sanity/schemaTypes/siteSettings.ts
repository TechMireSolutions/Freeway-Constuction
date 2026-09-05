import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "The name of the company, used across the site.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "A short company tagline shown in the header and hero.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Optional logo. If empty, a styled text wordmark is used.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Upload a favicon for the site. Recommended size: 32x32 pixels or SVG.",
      options: { accept: "image/x-icon,image/png,image/svg+xml" },
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "adminEmail",
      title: "Admin Email",
      type: "string",
      description: "Email address to receive contact form submissions.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "defaultSeoImage",
      title: "Default SEO / Open Graph image",
      type: "image",
      options: { hotspot: true },
      description: "Used as the fallback social share image for all pages.",
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string" }),
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "text",
      description: "Short text displayed in the footer.",
    }),
  ],
});
