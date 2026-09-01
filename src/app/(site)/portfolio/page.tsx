import type { Metadata } from "next";
import { getProjects, getServices } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildSeo(
    {
      title: "Portfolio",
      description:
        "A selection of completed construction and design-build projects by Freeway Constructions.",
      path: "/portfolio",
    },
    buildSeoBase(settings),
  );
}

export default async function PortfolioPage() {
  const [projects, services] = await Promise.all([
    getProjects(),
    getServices(),
  ]);

  return (
    <>
      <div className="pt-32 md:pt-44" />
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Portfolio
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Our work, in detail
            </h1>
          </div>
        </div>

        <PortfolioGrid projects={projects} services={services} />
      </section>

      <div className="pt-20 md:pt-28">
        <CtaBanner />
      </div>

      <BreadcrumbJsonLd items={[{ name: "Portfolio", href: "/portfolio" }]} />
    </>
  );
}