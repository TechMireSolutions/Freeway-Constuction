# Freeway Constructions

A modern, minimal, production-grade marketing website for **Freeway Constructions**, built with **Next.js 16** (App Router, TypeScript) and **Sanity CMS**.

## Tech stack

- **Framework** — Next.js 16 (App Router, server components, Turbopack)
- **CMS** — Sanity v6, embedded Studio at `/studio`
- **Styling** —- Tailwind v4 with `@theme` directive in `src/app/globals.css`.
- Semantic tokens: `--color-base`, `--color-ink`, `--color-accent` (`#FCB816`).
- Uses `lucide-react` for iconography (`strokeWidth={1.5}`).ng
- **Forms** — React Hook Form + Zod, saved to Sanity via `/api/contact`
- **Images** — `next/image` with Sanity's image pipeline (`@sanity/image-url`)
- **Icons** — `lucide-react`
- **SEO** — Metadata API, JSON-LD, sitemap, robots

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your values
npm run dev
```

Open http://localhost:3000 for the site and http://localhost:3000/studio for the CMS.

### Environment variables

| Variable                       | Description                                                            |
| ------------------------------ | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`| Your Sanity project ID                                                 |
| `NEXT_PUBLIC_SANITY_DATASET`   | Dataset name, usually `production`                                     |
| `SANITY_API_TOKEN`             | Read/write token for Sanity (used by the contact form)                 |
| `NEXT_PUBLIC_SITE_URL`         | Canonical site URL (used for SEO/sitemap)                              |

> If Sanity is not reachable (unconfigured project, no network), the site still builds and renders **realistic placeholder content** so the design can be reviewed before the CMS is connected. Data comes back the moment the CMS is configured.

## Seeding the CMS

The seed script creates realistic content — site settings, home page, 8 services, 4 featured projects, testimonials, team and the about/contact pages.

```bash
# add SANITY_API_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local first
npm run seed
```

> **Heads up:** `testimonial.relatedProject`, `project.category` and `project.servicesUsed` are **references**. The seed creates them correctly, but if you edit seed content you'll need a Sanity dataset that resolves those `_ref`s.

## Managing content in Studio

The Studio is organised for a non-technical client:

- **Site Settings** — company name, tagline, logo, contact details, social links, default SEO image
- **Home Page** — hero, intro, stats, CTA banner
- **About Page** — story, values, milestones, team references
- **Contact Page** — locations, hours, map embed, success message
- **Services / Projects / Testimonials / Team Members** — the collections

To swap in a real **logo**: upload it in *Site Settings → Logo*. The `<Logo />` component automatically uses the image and falls back to a styled wordmark otherwise.

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Production build                     |
| `npm run start`   | Serve the production build           |
| `npm run lint`    | ESLint                               |
| `npm run typecheck` | TypeScript type checking           |
| `npm run seed`    | Seed Sanity with placeholder content |

## Project structure

```
├── sanity/
│   ├── schemaTypes/          # Sanity document schemas
│   ├── sanity.config.ts      # Studio configuration
│   ├── structure.ts          # Studio desk structure (singletons pinned)
│   └── seed.js               # Content seed script
└── src/
    ├── app/
    │   ├── (site)/           # Pages: home, services, portfolio, about, contact
    │   ├── studio/           # Embedded Sanity Studio
    │   ├── api/contact/      # Form submission route
    │   ├── sitemap.ts        # Sitemap
    │   ├── robots.ts         # Robots
    │   └── globals.css       # Tailwind v4 theme tokens
    ├── components/
    │   ├── layout/           # Navbar, Footer
    │   ├── home/             # Hero, services, stats, portfolio, testimonials, CTA
    │   ├── portfolio/        # Filterable project grid
    │   ├── contact/          # Contact form
    │   ├── shared/           # Reveal animations, RichText, JSON-LD
    │   └── ui/               # Pill, SectionHeading, SanityImage, Icon, Logo
    ├── lib/
    │   ├── sanity/           # client, image helpers, queries, data layer
    │   ├── seo.ts            # Metadata builders
    │   ├── constants.ts      # Nav links, site URL
    │   └── utils.ts
    └── types/sanity.ts       # Shared TS types matching schemas
```

## Design system

- **Base** `#FAFAF8` · **Surface** `#FFFFFF` · **Ink** `#141414` · **Accent** `#E85C2B` (burnt orange) · **Neutral** `#6B6B6B` · **Divider** `#E5E3DE`
- Display font: **Manrope** · Body: **Inter Tight**
- All color/type tokens live in the Tailwind v4 `@theme` block — never hardcode hex values in components.

## Deployment

1. **Sanity** — create a project at sanity.io, note the project ID, create a write token.
2. **Vercel** — import the repo, add the env vars above, deploy. `next build` is the build command.

## Contact form

`src/app/api/contact/route.ts` writes submissions as `contactSubmission` documents in Sanity. It requires `SANITY_API_TOKEN`. To wire real email instead, swap the route body with nodemailer/Resend — the schema and form are already in place.