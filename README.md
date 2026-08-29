# Freeway Constructions

A premium, modern marketing website for Freeway Constructions built with Next.js 14+ (App Router), Tailwind CSS v4, Framer Motion, and Sanity CMS.

## Features

- **Next.js App Router**: Server components, static generation, and API routes.
- **Tailwind CSS**: Custom, minimalistic design system (off-white base, charcoal ink, burnt orange accent).
- **Framer Motion**: Smooth scroll-triggered animations and page transitions.
- **Sanity CMS**: Embedded studio at `/studio` for full content management.
- **Custom Contact Form**: Validated with Zod and React Hook Form, saves leads directly to Sanity and sends email notifications via SMTP.
- **SEO Optimized**: Dynamic sitemaps, robots.txt, and JSON-LD structured data.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in the required values:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (e.g., from [sanity.io/manage](https://www.sanity.io/manage)).
- `NEXT_PUBLIC_SANITY_DATASET`: Usually `production`.
- `SANITY_API_TOKEN`: A Sanity editor/write token for saving contact form submissions.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_EMAIL`: Credentials for your mail server to receive contact form notifications.

### 3. Initialize Sanity (If not already created)

If you haven't created a Sanity project yet, you can initialize one or connect to an existing one via the Sanity CLI. Once connected, update the Project ID in your `.env.local` and in `sanity/sanity.config.ts`.

### 4. Seed Placeholder Content

To populate the CMS with the initial set of realistic placeholder content (services, homepage data, etc.):

```bash
node sanity/seed.js
```
*(Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_TOKEN` are set in your environment).*

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site, and [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Architecture & Content Management

- **Sanity Schemas** are located in the `sanity/schemaTypes/` folder.
- **Studio Configuration** is in `sanity/sanity.config.ts` and `sanity/structure.ts`.
- **Pages & Components**: The main application lives in `src/app/(site)/`. Reusable components are in `src/components/`.

### Updating the Logo

Currently, the Navbar and Footer use a clean text wordmark for the logo. To add a real image logo:
1. Upload the logo image to the `Site Settings` document in the Sanity Studio.
2. Update `src/components/layout/Navbar.tsx` and `src/components/layout/Footer.tsx` to fetch and display the `siteSettings.logo` image using `next/image` and `urlFor()`.

### Updating the Hero Video

The homepage features a custom scroll-scrubbed video hero.
1. Upload an MP4 video to the `Home Page` document in the Sanity Studio (`Hero Video` field).
2. The `VideoScrollHero` component will automatically fetch and preload the video to ensure smooth scrolling.

## Deployment

This project is optimized for deployment on Vercel:
1. Push the code to a GitHub repository.
2. Import the project into Vercel.
3. Add all the Environment Variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `SMTP_*`, etc.) in the Vercel dashboard.
4. Deploy.

Ensure that your Vercel deployment URL is added to the **CORS Origins** in your Sanity project settings ([sanity.io/manage](https://www.sanity.io/manage)) to allow the Studio and the frontend to fetch data.
