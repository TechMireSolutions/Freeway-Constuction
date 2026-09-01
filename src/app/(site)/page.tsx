import type { Metadata } from "next";
import {
  getSiteSettings,
  getHomePage,
  getServices,
  getFeaturedProjects,
  getTestimonials,
} from "@/lib/sanity/data";
import { buildSeo, buildSeoBase } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { IntroStrip } from "@/components/home/IntroStrip";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { StatsRow } from "@/components/home/StatsRow";
import { FeaturedPortfolio } from "@/components/home/FeaturedPortfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";
import { OrganizationJsonLd } from "@/components/shared/JsonLd";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [settings, home] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
  ]);
  return buildSeo(
    {
      title: home?.seo?.title,
      description: home?.seo?.description,
      path: "/",
    },
    buildSeoBase(settings),
  );
}

export default async function HomePage() {
  const [settings, home, services, projects, testimonials] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getServices(),
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero home={home} />
      <IntroStrip home={home} />
      <ServicesShowcase services={services} />
      <StatsRow stats={home.stats} />
      <FeaturedPortfolio projects={projects} />
      <Testimonials testimonials={testimonials} />
      <CtaBanner cta={home.ctaBanner} />
      <OrganizationJsonLd settings={settings} />
    </>
  );
}