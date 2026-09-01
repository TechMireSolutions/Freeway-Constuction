# AGENTS.md — Freeway Constructions

## Project
Next.js 16 (App Router, TypeScript, `src/`) + Sanity CMS marketing site for a construction company.

## Commands
- `npm run dev` — development
- `npm run build` — production build (type-checks + lints)
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run seed` — seed Sanity with placeholder content

## Conventions
- **Components**: PascalCase files (`Hero.tsx`), typed props, no `any`.
- **Client vs server**: pages and data fetching are server components; add `"use client"` only where interactivity/animation is needed.
- **Data**: all Sanity access goes through `src/lib/sanity/data.ts` (resilient wrappers with placeholder fallbacks when the CMS is unreachable). Do NOT call `client.fetch` directly in pages — use the data layer.
- **Queries**: all GROQ lives in `src/lib/sanity/queries.ts`. No inline query strings in pages.
- **Styling**: Tailwind v4, design tokens in `src/app/globals.css` (`@theme`). Use semantic tokens (`bg-base`, `text-ink`, `bg-accent`, `text-neutral`, `border-divider`, `font-display`). Never hardcode hex.
- **Icons**: `lucide-react` only, `strokeWidth={1.5}`. No emojis.
- **Images**: `next/image` via `SanityImage` (`src/components/ui/SanityImage.tsx`) — never raw `<img>`.
- **Animation**: prefers `transform`/`opacity`, respect `prefers-reduced-motion`.
- **SEO**: per-page `generateMetadata` via `buildSeo`/`buildSeoBase` in `src/lib/seo.ts`. Keep JSON-LD, sitemap and robots updated if pages change.

## Notes
- `.env.local` is gitignored; provide `.env.local.example` for reference vars.
- The build must succeed even when Sanity is unreachable (fallbacks in `data.ts`).