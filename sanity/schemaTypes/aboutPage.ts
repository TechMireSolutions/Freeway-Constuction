import { defineType, defineField } from "sanity";
import { imageWithAlt } from "./shared";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "story",
      title: "Story / Mission",
      type: "array",
      of: [{ type: "block" }],
      description: "Company story and mission as rich text.",
    }),
    defineField({
      name: "introImage",
      title: "Intro Image",
      ...imageWithAlt(),
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Lucide icon name.",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "milestones",
      title: "Milestones / Timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
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
});