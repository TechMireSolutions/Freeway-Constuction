import { defineType, defineField } from "sanity";
import { imageWithAlt } from "./shared";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "clientName", title: "Client Name", type: "string" }),
    defineField({
      name: "clientPhoto",
      title: "Client Photo",
      ...imageWithAlt(),
    }),
    defineField({ name: "companyLocation", title: "Company / Location", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      description: "Star rating from 1 to 5.",
    }),
    defineField({
      name: "relatedProject",
      title: "Related Project",
      type: "reference",
      to: [{ type: "project" }],
      description: "Optional project this testimonial relates to.",
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "companyLocation",
      media: "clientPhoto",
    },
  },
});