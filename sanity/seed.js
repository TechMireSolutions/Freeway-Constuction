import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in environment variables.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2023-05-03',
})

async function seed() {
  console.log('Seeding Freeway Constructions placeholder content...')

  // Seed Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Freeway Constructions',
    tagline: 'We Build What Lasts.',
    phone: '+1 (555) 123-4567',
    email: 'hello@freewayconstructions.com',
    address: '123 Builder Lane, Construct City, TX 75001',
    footerText: 'Premium construction and design-build services.',
  })

  // Seed Home Page
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroHeading: 'We Build Spaces That Last.',
    heroSubheading: 'Premium construction and design-build services for commercial and residential clients.',
    stats: [
      { _key: '1', number: '150+', label: 'Projects Completed', icon: 'check-circle' },
      { _key: '2', number: '25+', label: 'Years Experience', icon: 'clock' },
      { _key: '3', number: '100%', label: 'Client Satisfaction', icon: 'thumbs-up' },
    ],
    ctaBanner: {
      heading: 'Ready to start your next project?',
      subheading: 'Contact us today for a free estimate.',
      buttonText: 'Get an Estimate',
    },
  })

  // Seed Services
  const services = [
    { title: 'Design & Construction Consultancy', slug: { _type: 'slug', current: 'consultancy' }, order: 1 },
    { title: 'Commercial', slug: { _type: 'slug', current: 'commercial' }, order: 2 },
    { title: 'Residential', slug: { _type: 'slug', current: 'residential' }, order: 3 },
    { title: 'Renovations', slug: { _type: 'slug', current: 'renovations' }, order: 4 },
    { title: 'Metal Works', slug: { _type: 'slug', current: 'metal-works' }, order: 5 },
    { title: 'Wood Works', slug: { _type: 'slug', current: 'wood-works' }, order: 6 },
    { title: 'Kitchen & Cabinetry', slug: { _type: 'slug', current: 'kitchen-cabinetry' }, order: 7 },
    { title: 'Pools & Landscapes', slug: { _type: 'slug', current: 'pools-landscapes' }, order: 8 },
  ]

  for (const s of services) {
    await client.create({
      _type: 'service',
      title: s.title,
      slug: s.slug,
      shortDescription: `Premium ${s.title.toLowerCase()} services for your next project.`,
      order: s.order,
      icon: 'briefcase',
    })
  }

  console.log('Seed completed successfully!')
}

seed().catch(console.error)
