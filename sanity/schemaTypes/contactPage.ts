import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    }),
    defineField({
      name: 'officeLocations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Location Name', type: 'string' },
            { name: 'address', title: 'Address', type: 'text' },
            { name: 'phone', title: 'Phone', type: 'string' },
            { name: 'email', title: 'Email', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'mapCoordinates',
      title: 'Map Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'string' },
        { name: 'lng', title: 'Longitude', type: 'string' },
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Form Success Message',
      type: 'string',
    }),
  ],
})
