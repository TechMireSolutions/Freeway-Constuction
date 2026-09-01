import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SanityImage } from "@/components/ui/SanityImage";
import { Icon } from "@/components/ui/Icon";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import type { ServiceCard } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildSeo(
    {
      title: "Services",
      description:
        "Explore Freeway Constructions' design-build services — commercial, residential, renovations, metal & wood work, kitchens and pools.",
      path: "/services",
    },
    buildSeoBase(settings),
  );
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <div className="pt-32 md:pt-40" />
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Our services"
            title="What we build and how we build it"
            description="From ground-up commercial builds to bespoke residential cabinetry, every discipline lives under one roof — so nothing gets lost in translation."
          />
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service: ServiceCard, index: number) => (
            <RevealOnScroll key={service._id} delay={(index % 3) * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-divider bg-surface transition-colors duration-300 hover:border-ink"
              >
                <div className="relative h-52 overflow-hidden">
                  {service.heroImage ? (
                    <SanityImage
                      image={service.heroImage}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-divider/50">
                      <Icon name={service.icon} className="h-12 w-12 text-neutral/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-base text-ink">
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-neutral transition-all duration-300 group-hover:text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  {service.shortDescription ? (
                    <p className="text-sm leading-relaxed text-neutral">
                      {service.shortDescription}
                    </p>
                  ) : null}
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <div className="pt-20 md:pt-28">
        <CtaBanner />
      </div>

      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }]} />
    </>
  );
}