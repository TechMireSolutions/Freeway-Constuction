import { defineType, defineField } from "sanity";
import { imageWithAlt } from "./shared";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "clientName", title: "Client", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Year the project was completed.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "service" }],
      description: "Primary service category for filtering.",
    }),
    defineField({
      name: "servicesUsed",
      title: "Services Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      ...imageWithAlt(),
      description: "Primary image shown on cards and the detail hero.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [imageWithAlt()],
    }),
    defineField({
      name: "beforeImages",
      title: "Before Images",
      type: "array",
      of: [imageWithAlt()],
    }),
    defineField({
      name: "afterImages",
      title: "After Images",
      type: "array",
      of: [imageWithAlt()],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this project on the homepage featured grid.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage",
    },
  },
});
