import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
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
      {/* ── Page hero ── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <RevealOnScroll>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Our services
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              What we build
              <br />
              <span className="text-white/35">&amp; how we do it.</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.14}>
            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-white/50">
                Every discipline under one roof — from ground-up builds to
                bespoke cabinetry — so nothing gets lost in translation.
              </p>
              <div className="flex shrink-0 items-center gap-6 divide-x divide-white/10">
                <div className="text-right">
                  <p className="font-display text-2xl font-semibold text-white">
                    {String(services.length).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-white/35">
                    Services
                  </p>
                </div>
                <div className="pl-6 text-right">
                  <p className="font-display text-2xl font-semibold text-white">
                    20+
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-white/35">
                    Years exp.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Service cards on white/light background ── */}
      <section className="bg-base">
        <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 sm:px-8 md:pb-36 md:pt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: ServiceCard, index: number) => (
              <RevealOnScroll key={service._id} delay={(index % 3) * 0.07}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-divider bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-divider/40">
                    {service.heroImage ? (
                      <SanityImage
                        image={service.heroImage}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon
                          name={service.icon}
                          className="h-14 w-14 text-neutral/20"
                        />
                      </div>
                    )}
                    {/* Dark scrim on hover */}
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />

                    {/* Index badge */}
                    <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 font-display text-[11px] font-semibold tabular-nums text-ink backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    {/* Top row — icon + arrow */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-divider bg-base text-ink transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-divider text-neutral transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Text */}
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">
                      {service.title}
                    </h3>
                    {service.shortDescription ? (
                      <p className="mt-2 text-sm leading-relaxed text-neutral">
                        {service.shortDescription}
                      </p>
                    ) : null}

                    {/* Explore link */}
                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Explore service
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />

      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }]} />
    </>
  );
}