/* eslint-disable */
/**
 * Seed script for Freeway Constructions.
 * Creates realistic placeholder content in your Sanity dataset.
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN (a write token)
 *
 * Run: npm run seed
 */
const { createClient } = require("@sanity/client");
require("dotenv").config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-06-01",
  useCdn: false,
  token,
});

function block(children) {
  return [
    {
      _type: "block",
      style: "normal",
      children: [{ _type: "span", marks: [], text: children }],
    },
  ];
}

async function clear(type) {
  const docs = await client.fetch(`*[_type == $type]._id`, { type });
  for (const id of docs) {
    await client.delete(id);
  }
  if (docs.length) console.log(`Cleared ${docs.length} ${type}`);
}

async function main() {
  const types = [
    "siteSettings",
    "homePage",
    "aboutPage",
    "contactPage",
    "contactSubmission",
    "service",
    "project",
    "testimonial",
    "teamMember",
  ];
  for (const type of types) {
    await clear(type);
  }

  console.log("Creating siteSettings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Freeway Constructions",
    tagline:
      "A full-service design-build company crafting commercial, residential and bespoke living spaces that last.",
    phone: "+1 555 010 2233",
    email: "hello@freewayconstructions.com",
    address: "200 Harbour Drive, Sector 12, Newtown",
    footerText:
      "Freeway Constructions — design, build and deliver. Premium joinery, metals and construction under one roof.",
    socialLinks: [
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Facebook", url: "https://facebook.com/" },
      { label: "Linkedin", url: "https://linkedin.com/" },
    ],
  });

  console.log("Creating homePage...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeading: "We build spaces that last.",
    heroSubheading:
      "Premium construction and design-build services. From ground-up commercial builds to bespoke homes and cabinetry.",
    introHeading:
      "We don't just construct buildings. We build what matters — homes, workspaces and legacies that endure.",
    introText:
      "For two decades, Freeway Constructions has delivered meticulous design-build projects across residential, commercial and bespoke living spaces.",
    stats: [
      { number: 250, suffix: "+", label: "Projects delivered" },
      { number: 180, suffix: "+", label: "Happy clients" },
      { number: 20, suffix: " yrs", label: "Experience" },
      { number: 98, suffix: "%", label: "On-time completion" },
    ],
    ctaBanner: {
      heading: "Ready to start your next project?",
      subheading:
        "Tell us about your build and get a free, no-obligation estimate within 48 hours.",
      buttonText: "Get a Free Estimate",
    },
    seo: {
      title: "Freeway Constructions",
      description:
        "Premium construction and design-build company. Commercial, residential, renovations, metal & wood work, kitchens and pools.",
    },
  });

  console.log("Creating aboutPage...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "Two decades of building trust",
    story: block(
      "Founded in 2004, Freeway Constructions has grown from a small joinery workshop into a full-service design-build practice. We bring architecture, engineering and craft together under one roof so nothing gets lost between drawings and delivery.\n\nOur approach is simple: build it once, build it right. We pair a single point of responsibility with a rigorous attention to detail — the result is projects that arrive on time, on budget, and built to last for generations.",
    ),
    values: [
      {
        title: "Craftsmanship",
        description:
          "Every joint, every weld and every finish meets a standard we're proud to stand behind.",
        icon: "Hammer",
      },
      {
        title: "Transparency",
        description:
          "Clear budgets, honest timelines and open communication from first sketch to final snag.",
        icon: "Eye",
      },
      {
        title: "Sustainability",
        description:
          "Responsibly sourced timber, energy-efficient systems and minimal waste on every site.",
        icon: "TreePine",
      },
      {
        title: "Collaboration",
        description:
          "We work as an extension of your team — architects, designers and in-house craftsmen together.",
        icon: "Users",
      },
      {
        title: "Reliability",
        description:
          "98% of our projects complete on time, which is why clients keep coming back.",
        icon: "Shield",
      },
      {
        title: "Innovation",
        description:
          "Modern building techniques, digital design and smarter material choices.",
        icon: "Lightbulb",
      },
    ],
    milestones: [
      {
        year: "2004",
        title: "Humble beginnings",
        description: "Started as a family joinery workshop with three craftsmen.",
      },
      {
        year: "2011",
        title: "Going full-service",
        description: "Added site build and general contracting to joinery work.",
      },
      {
        year: "2017",
        title: "Commercial expansion",
        description: "Delivered our first large commercial tower fit-out.",
      },
      {
        year: "2023",
        title: "Design-build studio",
        description: "Launched an in-house design studio for end-to-end projects.",
      },
    ],
    teamMembers: [],
    seo: {
      title: "About Us",
      description:
        "Learn about Freeway Constructions — our story, values and the team behind two decades of design-build work.",
    },
  });

  console.log("Creating contactPage...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heading: "Let's talk about your project",
    introText:
      "Whether it's a full build or a single kitchen, tell us what you have in mind and we'll take it from there.",
    officeLocations: [
      {
        name: "Head Office",
        address: "200 Harbour Drive, Sector 12, Newtown",
        phone: "+1 555 010 2233",
      },
      {
        name: "Joinery Workshop",
        address: "45 Timber Lane, Industrial Park, Oldtown",
        phone: "+1 555 010 4455",
      },
    ],
    businessHours: "Monday – Saturday, 9am – 6pm",
    successMessage:
      "Thanks — your message has been sent. We'll get back to you within one business day.",
    seo: {
      title: "Contact Us",
      description:
        "Get in touch with Freeway Constructions for a free estimate on your next build.",
    },
  });

  console.log("Creating services...");
  const serviceDefs = [
    {
      title: "Design & Construction Consultancy",
      slug: "design-construction-consultancy",
      icon: "Lightbulb",
      short:
        "Early-stage advice, feasibility studies and design-build coordination from day one.",
      full:
        "Our consultancy team helps you make the right decisions before a brick is laid. We review feasibility, work within planning constraints, coordinate architects and engineers, and define a realistic scope and budget.\n\nFrom concept and design development to value engineering and contractor selection, we keep the whole path mapped so there are no surprises downstream.",
    },
    {
      title: "Commercial",
      slug: "commercial",
      icon: "Building2",
      short:
        "Offices, retail, hospitality and mixed-use spaces built for the way you work.",
      full:
        "We build commercial environments that balance brand, function and flow. Our teams deliver office fit-outs, retail interiors, hospitality venues and full mixed-use developments.\n\nWorking to demanding schedules and safety standards, we coordinate every trade in-house to keep commercial projects moving and tenants happy.",
    },
    {
      title: "Residential",
      slug: "residential",
      icon: "Home",
      short:
        "New homes and extensions crafted around the way you actually live.",
      full:
        "From single-storey homes to multi-level residences, we design and build spaces that fit your family and your site.\n\nWith in-house architecture and construction, we manage the whole process — planning, structure, interiors and landscaping — so your home is delivered as one coherent vision.",
    },
    {
      title: "Renovations",
      slug: "renovations",
      icon: "Hammer",
      short:
        "Thoughtful remodels that transform tired spaces into modern, functional ones.",
      full:
        "Renovating an existing building is different to building new. We understand structure, sequencing and the constraints of working in a live space.\n\nFrom kitchen and bathroom remodels to full-house transformations, we bring precision and care to every renovation, minimising disruption and maximising the finished result.",
    },
    {
      title: "Metal Works",
      slug: "metal-works",
      icon: "Warehouse",
      short:
        "Steel structures, railings, gates and architectural metalwork fabricated in-house.",
      full:
        "Our dedicated metal workshop fabricates structural steel, handrails, balustrades, gates and bespoke architectural metalwork.\n\nWith CNC precision and finishing options ranging from powder-coat to brass, we produce metalwork that's both strong and beautifully detailed.",
    },
    {
      title: "Wood Works",
      slug: "wood-works",
      icon: "Armchair",
      short:
        "Joinery, millwork, flooring and custom timber features built by master craftsmen.",
      full:
        "Timber is at the heart of what we do. Our joinery workshop produces custom doors, windows, stairs, wall panelling and feature timber elements.\n\nEvery piece is made to measure, sustainably sourced and finished to a furniture-grade standard.",
    },
    {
      title: "Kitchen & Cabinetry",
      slug: "kitchen-cabinetry",
      icon: "UtensilsCrossed",
      short:
        "Bespoke kitchens, wardrobes and cabinetry designed and built around your space.",
      full:
        "The kitchen is the heart of the home, and we treat it that way. We design and build bespoke kitchens, walk-in wardrobes, media units and storage solutions.\n\nFrom handleless modern minimal to classic shaker, our cabinetry is engineered for daily life and finished to perfection.",
    },
    {
      title: "Pools & Landscapes",
      slug: "pools-landscapes",
      icon: "Waves",
      short:
        "Pools, decks, hardscaping and gardens that turn outdoor areas into retreats.",
      full:
        "We turn outdoor spaces into extensions of your home. Our teams design and construct swimming pools, pool houses, decks, patios, pergolas and full landscape schemes.\n\nWorking alongside our construction and joinery teams means your indoor and outdoor space are designed as one.",
    },
  ];

  const serviceIds = [];
  for (let i = 0; i < serviceDefs.length; i++) {
    const def = serviceDefs[i];
    const doc = await client.create({
      _type: "service",
      title: def.title,
      slug: { _type: "slug", current: def.slug },
      shortDescription: def.short,
      fullDescription: block(def.full),
      icon: def.icon,
      order: i,
    });
    serviceIds.push(doc._id);
  }
  console.log(`Created ${serviceIds.length} services`);

  console.log("Creating projects...");
  const projectDefs = [
    {
      title: "Harbour Office Tower",
      slug: "harbour-office-tower",
      clientName: "North Star Group",
      location: "Downtown",
      year: 2025,
      category: 1,
      featured: true,
      desc:
        "A 22-storey office tower delivered on a tight site. We coordinated the reinforced concrete structure, full curtain-wall glazing and premium lobby fit-out.\n\nThe project was completed three weeks ahead of schedule and achieved the client's LEED Gold target.",
    },
    {
      title: "Oakwood Family Home",
      slug: "oakwood-family-home",
      clientName: "The D'Abreu Family",
      location: "Riverside",
      year: 2024,
      category: 2,
      featured: true,
      desc:
        "A 5-bedroom family home featuring an open-plan kitchen, walnut wall panelling and a glazed garden elevation.\n\nEvery piece of cabinetry and millwork was fabricated in our own workshop and installed with zero tolerance.",
    },
    {
      title: "Cedar & Co. Restaurant",
      slug: "cedar-co-restaurant",
      clientName: "Cedar & Co.",
      location: "Oldtown",
      year: 2024,
      category: 1,
      featured: true,
      desc:
        "A full fit-out of a 120-seat restaurant — custom timber cladding, a dramatic steel stair and a chef's table with brass detailing.\n\nWe delivered the entire interior in 11 weeks, allowing the client to open exactly on schedule.",
    },
    {
      title: "Bluewater Villa & Pool",
      slug: "bluewater-villa-pool",
      clientName: "Private Client",
      location: "Lakeside",
      year: 2023,
      category: 7,
      featured: true,
      desc:
        "A modern villa with an infinity-edge pool, cedar deck and fully landscaped gardens.\n\nOur teams built the structure, pool and landscape as one coordinated project, blurring the boundary between inside and out.",
    },
  ];

  const projectIds = [];
  for (const def of projectDefs) {
    const doc = await client.create({
      _type: "project",
      title: def.title,
      slug: { _type: "slug", current: def.slug },
      clientName: def.clientName,
      location: def.location,
      year: def.year,
      category: { _type: "reference", _ref: serviceIds[def.category] },
      servicesUsed: [
        { _type: "reference", _ref: serviceIds[def.category] },
      ],
      description: block(def.desc),
      featured: def.featured,
    });
    projectIds.push(doc._id);
  }
  console.log(`Created ${projectIds.length} projects`);

  console.log("Creating testimonials...");
  const testimonialDefs = [
    {
      clientName: "Amelia Wright",
      companyLocation: "Director, Cedar & Co.",
      rating: 5,
      quote:
        "Freeway took our restaurant from a bare shell to a space guests talk about. They hit the schedule and the finish is immaculate.",
      project: 2,
    },
    {
      clientName: "Rohan Mehta",
      companyLocation: "Facilities Lead, North Star Group",
      rating: 5,
      quote:
        "Coordinating a 22-storey tower is chaos — but with Freeway it felt effortless. Clear reporting, zero surprises, ahead of schedule.",
      project: 0,
    },
    {
      clientName: "Sophie D'Abreu",
      companyLocation: "Homeowner, Riverside",
      rating: 5,
      quote:
        "The cabinetry is the first thing everyone comments on. You can tell every piece was made by someone who cares.",
      project: 1,
    },
  ];

  for (const def of testimonialDefs) {
    await client.create({
      _type: "testimonial",
      clientName: def.clientName,
      companyLocation: def.companyLocation,
      rating: def.rating,
      quote: def.quote,
      relatedProject: { _type: "reference", _ref: projectIds[def.project] },
    });
  }
  console.log(`Created ${testimonialDefs.length} testimonials`);

  console.log("Creating team members...");
  const teamDefs = [
    { name: "Daniel Cross", role: "Founder & Director" },
    { name: "Maria Fernandes", role: "Lead Architect" },
    { name: "Omar Khalid", role: "Head of Construction" },
    { name: "Priya Nair", role: "Joinery Workshop Lead" },
  ];
  for (const member of teamDefs) {
    await client.create({
      _type: "teamMember",
      name: member.name,
      role: member.role,
    });
  }
  console.log(`Created ${teamDefs.length} team members`);

  console.log("\n✅ Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});