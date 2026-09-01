import { defineType, defineField } from "sanity";
import { imageWithAlt } from "./shared";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      ...imageWithAlt(),
    }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});