# PROJECT BRIEF — Freeway Constructions Website

You are building a production-grade marketing website for **Freeway Constructions**, a construction & design-build company. Build this end-to-end, in the phases defined below. Do not skip phases. After each phase, verify the build compiles and the app runs before moving to the next.

---

## 1. Tech Stack (mandatory)

- **Framework:** Next.js 14+ (App Router, TypeScript, `src/` directory)
- **CMS:** Sanity.io (v3 embedded Studio at `/studio`, or separate `sanity/` project — decide and document your choice in the README)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (`motion` package if using the latest API)
- **Icons:** `lucide-react` ONLY. No emojis anywhere in UI, code comments excluded. No Font Awesome unless a specific icon is missing from Lucide — Lucide is the default.
- **Forms:** React Hook Form + Zod validation for the Contact form
- **Images:** `next/image` everywhere, sourced from Sanity's image pipeline (`@sanity/image-url`), no raw `<img>` tags
- **Fonts:** Use `next/font` with a modern, minimal sans-serif (e.g. a variable font like "General Sans", "Inter Tight", or "Geist"). Avoid default system fonts — pick something with character so it doesn't read as a template.
- **Deployment target:** Vercel

---

## 2. Design Direction

**Reference mood (do not clone the layout — this is a tone reference only):** clean white/off-white base, near-black charcoal accent cards, one confident warm accent color (burnt orange / amber), pill-shaped buttons, generous whitespace, bold oversized headline type, rounded-corner imagery, minimal borders, soft shadows instead of hard lines.

**Freeway Constructions palette:**
- Base: `#FAFAF8` (warm off-white) and `#FFFFFF`
- Ink: `#141414` / `#1C1C1C` (near-black, used for dark cards & footer)
- Accent: `#E85C2B` (burnt orange — adjust tone slightly if needed, but keep it warm/terracotta, not neon)
- Neutral grays: `#6B6B6B` (secondary text), `#E5E3DE` (dividers/borders)
- Define all of these as CSS variables / Tailwind theme tokens — never hardcode hex values in components.

**Design principles:**
1. **Highly minimalistic** — large type, lots of negative space, max 1 accent color, no gradients-for-the-sake-of-it, no generic "AI slop" stock icon grids in circles.
2. **Highly animated but purposeful** — scroll-triggered reveals (fade/slide up on enter viewport via `whileInView`), smooth page transitions, hover micro-interactions on cards/buttons/links (magnetic buttons, underline draws, image scale-on-hover), a sticky scroll-scrubbed video hero (spec in Section 5).
3. **Must NOT look AI-generated:** avoid perfectly symmetric 3-column icon-in-circle feature grids as the *default* solution everywhere, avoid purple/blue default gradients, avoid generic Unsplash-construction-worker-in-hardhat clichés for every image, avoid centered-everything layouts, avoid Bootstrap-y card shadows. Introduce asymmetry, varied section layouts, real typographic hierarchy, and editorial-style compositions (overlapping images, offset grids, marquee text, split-screen sections).
4. Use **lucide-react** icons at consistent stroke-width (1.5 or 1.75), never mixed with emoji.

---

## 3. Sanity CMS — Content Model

Every section of every page must be **CMS-driven** so the client can edit content after design approval — no hardcoded copy in components except true UI labels (e.g. "Submit"). Build these schemas:

### Singletons (Site-wide)
- `siteSettings` — company name, tagline, logo (image, nullable — we don't have one yet, so component must gracefully handle logo-as-text fallback), phone, email, address, social links, default SEO image, footer text
- `homePage` — hero heading, hero subheading, hero video (Sanity `file` asset), stats block (repeatable: number, label, icon name), CTA banner content
- `aboutPage` — heading, story/mission rich text, team members (array of {name, role, photo}), values (array of {title, description, icon}), milestones/timeline (array of {year, title, description})
- `contactPage` — heading, intro text, office locations (array), map embed lat/long, contact form success message

### Document types (repeatable)
- `service` — title, slug, short description, full description (Portable Text), icon (string — Lucide icon name), hero image, gallery images, order (number for manual sorting), relatedProjects (reference array → `project`)
- `project` (Portfolio) — title, slug, client name, location, year, category (reference → `service` or a `category` taxonomy), servicesUsed (array of references → `service`), coverImage, gallery (array of images), beforeImages (array), afterImages (array), description (Portable Text), featured (boolean, for homepage highlight)
- `testimonial` — client name, client photo, company/location, quote, rating (number), relatedProject (reference, optional)
- `teamMember` — (if not embedded in aboutPage) name, role, photo, bio
- `page` (optional generic) — for any future flexible page using a modular `pageBuilder` array of section blocks (hero, textBlock, imageGrid, statsRow, ctaBanner, testimonialSlider) — recommended so the client can rearrange sections without a dev

### Field conventions
- Every image field: use Sanity's `hotspot: true` for smart cropping.
- Every rich text: Portable Text, not plain string, so client can bold/link/list.
- Add `orderRank` or a manual `order` number field to any list content (services, team, gallery) so client can reorder in Studio (use `@sanity/orderable-document-list` plugin if time allows).
- Write clear `title`/`description` metadata on every field in the schema so Sanity Studio itself is self-explanatory for a non-technical client.

---

## 4. Pages & Sections

### Home
1. **Video-scroll hero** (see Section 5 spec) — full-bleed construction footage, headline overlay: "We Build [X] That Lasts." style, animated on scroll.
2. **Intro/mission strip** — short bold statement + supporting line, asymmetric layout (not centered).
3. **Services overview** — the 8 services as an interactive list/accordion or hover-expand grid (inspired by the dark expandable-card pattern in the reference, reimagined) with Lucide icons:
   - Design & Construction Consultancy
   - Commercial
   - Residential
   - Renovations
   - Metal Works
   - Wood Works
   - Kitchen & Cabinetry
   - Pools & Landscapes
4. **Stats row** — animated count-up numbers (projects completed, happy clients, years of experience, satisfaction %) pulled from `homePage.stats`.
5. **Featured Portfolio** — 3–5 featured projects, asymmetric bento-style grid, image hover zoom + project title reveal.
6. **Testimonials** — draggable/auto-advancing slider.
7. **CTA banner** — "Get a Free Estimate" with background image + pill button.
8. **Footer.**

### Services (index + `/services/[slug]`)
- Index: full grid/list of all 8 services, each linking to a detail page.
- Detail page: hero image, full Portable Text description, gallery, related portfolio projects (pulled via `relatedProjects`), CTA to contact.

### Portfolio (index + `/portfolio/[slug]`)
- Index: filterable grid by category/service (client-side filter, animated layout reflow with Framer Motion `layout` prop).
- Detail page: client, location, year, services used (tags), full gallery, optional before/after slider component, description, next/prev project navigation.

### About Us
- Story/mission section, values grid, timeline/milestones (animated scroll progression), team grid (graceful empty-state if no team photos yet), stats repeat if desired.

### Contact Us
- Contact form (name, email, phone, service interested in — dropdown from `service` documents, message) with Zod validation + success/error states.
- Office info, map (use a simple embed or a static styled map — no API key dependency required unless you want to wire Google Maps).
- Social links, business hours.

### Global
- Sticky/animated navbar (transparent over hero → solid on scroll, mobile: animated slide-in drawer menu).
- Footer with sitemap links, services list, contact info, social icons.
- 404 page styled consistently.

---

## 5. Signature Component — Video-Scroll Hero (build exactly to this spec)

Client Component, Next.js App Router + Tailwind + Framer Motion.

- Outer wrapper: `h-[400vh]` to create scroll room.
- Inner: `sticky top-0 h-screen w-full overflow-hidden` holding the video + text overlays.
- **Do not stream the video directly.** On mount (`useEffect`), `fetch()` the video fully into a `Blob`, create an `Object URL`, and show a full-screen loading overlay with a live percentage progress bar while downloading (read progress via `response.body.getReader()` and `Content-Length`).
- Only reveal/play the video once the `canplaythrough` event fires on the `<video>` element.
- For zero-lag scroll scrubbing: use `useScroll` from Framer Motion to get `scrollYProgress`, but do **not** drive the video via `useTransform`. Instead run a `requestAnimationFrame` loop that reads the current scroll progress every frame, computes the target time as `progress * video.duration`, and only sets `video.currentTime = targetTime` when the delta exceeds `0.0015` seconds (avoid seeking spam).
- Clean up the rAF loop and revoke the Object URL on unmount.
- Video source comes from Sanity (`homePage.heroVideo` asset URL) — pass it in as a prop, don't hardcode.
- Overlay text (headline/subheading) should have its own scroll-linked motion (e.g. fade/parallax) independent of the video scrub logic.

---

## 6. Animation Guidelines

- Section reveals: `whileInView` + `viewport={{ once: true, margin: "-100px" }}`, staggered children for lists/grids.
- Buttons: subtle scale/translate on hover, pill shape, accent color fill transition.
- Nav links: underline-draw or letter-spacing shift on hover.
- Images: slight scale (1.03–1.08) + overflow-hidden container on hover for portfolio/service cards.
- Page/route transitions: optional but nice — wrap in a shared layout transition using Framer Motion's `AnimatePresence`.
- Respect `prefers-reduced-motion` — provide a reduced-motion fallback (disable heavy parallax/video-scrub, keep simple fades) for accessibility.
- Keep animations performant: prefer `transform`/`opacity` only, avoid animating layout-triggering properties at scale.

---

## 7. SEO Requirements

- Use the Next.js Metadata API (`generateMetadata`) per page, pulling title/description/OG image dynamically from Sanity where possible (fallback to `siteSettings` defaults).
- Add `sitemap.ts` and `robots.ts` (Next.js file conventions).
- Add JSON-LD structured data: `LocalBusiness`/`GeneralContractor` schema on the homepage/contact page, `BreadcrumbList` on inner pages, `Article`-style or `CreativeWork` schema optionally for portfolio detail pages.
- Semantic HTML: proper `<h1>`–`<h3>` hierarchy per page, `<nav>`, `<main>`, `<footer>`, `alt` text on every image (pull from Sanity image alt field — add `alt` field to all image schemas).
- Optimize Core Web Vitals: `next/image` with proper `sizes`, lazy-load below-the-fold images, priority-load the hero's first frame/poster image, avoid layout shift (reserve aspect ratios).
- Canonical URLs, Open Graph + Twitter card meta on every page.

---

## 8. Responsiveness

- Mobile-first Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).
- Test breakpoints explicitly: 375px, 768px, 1024px, 1440px+.
- Mobile nav: animated drawer/full-screen overlay menu, not a cramped hamburger dropdown.
- Video hero on mobile: consider swapping to a lighter poster-image + shorter clip or reduced scroll height (`200vh` instead of `400vh`) to avoid excessive scroll distance on small screens — make this a responsive prop/config, not hardcoded.
- Touch-friendly tap targets (min 44px), no hover-only interactions for critical actions on touch devices.

---

## 9. File Structure (clean, consistent — follow this convention)

```
freeway-constructions/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── page.tsx                 # Home
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── not-found.tsx
│   │   ├── studio/[[...tool]]/page.tsx  # embedded Sanity Studio (if embedded)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── layout.tsx                   # root layout, fonts, providers
│   ├── components/
│   │   ├── ui/                          # buttons, pill-links, icon-wrapper, etc (small atoms)
│   │   ├── layout/                      # Navbar, Footer, MobileDrawer
│   │   ├── home/                        # VideoScrollHero, ServicesShowcase, StatsRow, FeaturedPortfolio, TestimonialSlider, CtaBanner
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── about/
│   │   ├── contact/
│   │   └── shared/                      # AnimatedSection, RevealOnScroll, SectionHeading
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── image.ts                 # urlFor helper
│   │   │   └── queries.ts               # all GROQ queries, centralized
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── types/                           # TypeScript types, ideally generated/matching Sanity schemas
│   ├── hooks/                           # useScrollVideo, useMediaQuery, etc.
│   └── styles/globals.css
├── sanity/
│   ├── schemaTypes/
│   │   ├── siteSettings.ts
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   ├── contactPage.ts
│   │   ├── service.ts
│   │   ├── project.ts
│   │   ├── testimonial.ts
│   │   └── index.ts
│   ├── sanity.config.ts
│   └── structure.ts                     # custom Studio desk structure (singletons pinned, docs grouped)
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

- No default `Home.module.css` leftovers, no unused boilerplate files.
- Every component: typed props, no `any`.
- Centralize all GROQ queries in `lib/sanity/queries.ts` — no inline query strings scattered in page files.
- Consistent naming: PascalCase components, camelCase functions/hooks, kebab-case file/folder names except component files (PascalCase.tsx is fine — pick one convention and stay consistent throughout).

---

## 10. Build Phases (execute in order, verify build after each)

**Phase 1 — Foundation**
- Init Next.js (TS, App Router, Tailwind, ESLint).
- Set up Sanity project + Studio route, connect env vars (`.env.local.example` included).
- Configure fonts, Tailwind theme tokens (colors, spacing, type scale) matching Section 2.
- Build base layout shell: Navbar (placeholder text logo "Freeway Constructions" since no logo asset yet — style it as a clean wordmark, but structure the component so a real logo image can drop in later without refactor), Footer.

**Phase 2 — Sanity Schema & Studio**
- Build all schemas from Section 3.
- Configure custom Studio `structure.ts` grouping singletons vs. collections for a non-technical client.
- Seed realistic placeholder content for Freeway Constructions across all 8 services, 4–6 sample portfolio projects (with client/location/year/services-used/before-after images), 3–4 testimonials, about/team content, site settings — all placeholder but realistic and on-brand (construction industry tone), not lorem ipsum.

**Phase 3 — Core Components**
- Build the Video-Scroll Hero exactly to Section 5 spec (use a royalty-free placeholder construction video URL or a local sample file for now, wired via a prop from Sanity data).
- Build shared animation primitives (`RevealOnScroll`, `AnimatedSection`) reused across all pages.
- Build Navbar (scroll-aware transparency + mobile drawer), Footer.

**Phase 4 — Page Assembly**
- Build Home, Services (index + detail), Portfolio (index + detail, with filtering), About, Contact — wiring all Sanity queries via `lib/sanity/queries.ts` and Next.js data fetching (server components + `fetch`/Sanity client, ISR revalidation e.g. `revalidate: 60`).
- Build the Contact form with validation + submit handling (route handler or Sanity mutation/email service stub — document which in README).

**Phase 5 — Animation & Polish Pass**
- Apply full animation guidelines (Section 6) across all sections.
- Add hover/micro-interactions, reduced-motion fallbacks.
- Visual QA against the "not AI-generated" checklist (Section 2, point 3) — introduce asymmetry/editorial touches where things feel too template-y.

**Phase 6 — SEO & Performance**
- Implement metadata, sitemap, robots, JSON-LD (Section 7).
- Run Lighthouse; fix any Core Web Vitals / accessibility issues (contrast, alt text, focus states, tab order).
- Confirm full responsiveness at all breakpoints (Section 8).

**Phase 7 — QA & Handoff**
- Cross-browser check (Chrome, Safari, Firefox), mobile device check.
- Write README: setup instructions, env vars needed, how to add content in Studio, how to swap in the real logo and hero video later, deployment steps (Vercel + Sanity project linking).
- Final build check: `next build` with zero errors/warnings, no console errors in browser.

---

## 11. Notes for the Builder

- No company logo exists yet — every place a logo would go must be built so a real image asset can be dropped in via Sanity later with zero component refactor (i.e. build a `<Logo />` component now that renders a styled text wordmark, sourcing from `siteSettings.logo` if present, falling back to text if not).
- All copy should be realistic placeholder text (professional, construction-industry tone, Freeway Constructions branded) — not "Lorem ipsum" — since it's all editable in Sanity afterward anyway per the field structure in Section 3.
- Prioritize a build that feels custom-designed and premium over one that is merely "complete" — restraint and typographic confidence over decorative filler.

---
*End of brief. Build phase by phase, and confirm each phase compiles cleanly before proceeding to the next.*
