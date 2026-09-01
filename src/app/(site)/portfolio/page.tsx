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
      {/* ── Dark page hero ── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Portfolio
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Our work,
            <br />
            <span className="text-white/35">in detail.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <PortfolioGrid projects={projects} services={services} />
      </section>

      <div className="pt-20 md:pt-28">
        <CtaBanner />
      </div>

      <BreadcrumbJsonLd items={[{ name: "Portfolio", href: "/portfolio" }]} />
    </>
  );
}