import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "introText", title: "Intro Text", type: "text" }),
    defineField({
      name: "officeLocations",
      title: "Office Locations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "address", title: "Address", type: "string" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "string",
      description: "e.g. 'Monday – Saturday, 9am – 6pm'",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map Embed URL",
      type: "url",
      description: "Optional embeddable map URL (Google Maps / OpenStreetMap).",
    }),
    defineField({
      name: "successMessage",
      title: "Contact Form Success Message",
      type: "text",
      description: "Message shown after a form is submitted successfully.",
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

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "service", title: "Service", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
});