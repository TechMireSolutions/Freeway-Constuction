import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      description: "Large headline shown in the hero section.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      description: "Supporting line shown under the hero headline.",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Background image for the hero section.",
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string" }),
      ],
    }),
    defineField({
      name: "introHeading",
      title: "Intro Heading",
      type: "string",
      description: "Bold statement for the intro strip.",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      description: "Supporting paragraph for the intro strip.",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      description: "Animated count-up numbers shown in the stats row.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "number",
              description: "The numeric value to count up to.",
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "Optional suffix, e.g. '+' or '%'.",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaBanner",
      title: "CTA Banner",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text" }),
        defineField({ name: "buttonText", title: "Button Text", type: "string" }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternative text", type: "string" }),
          ],
        }),
      ],
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
