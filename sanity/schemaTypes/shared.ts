import { defineField } from "sanity";

export const imageWithAlt = () => ({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alternative text", type: "string" }),
  ],
});
