import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
import { RichText } from "@/components/shared/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import type { ProjectCard } from "@/types/sanity";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [settings, service] = await Promise.all([
    getSiteSettings(),
    getServiceBySlug(slug),
  ]);

  if (!service) return {};

  return buildSeo(
    {
      title: service.title,
      description: service.shortDescription,
      path: `/services/${service.slug}`,
      image: service.heroImage,
    },
    buildSeoBase(settings),
  );
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink">
        {service.heroImage ? (
          <div className="absolute inset-0">
            <SanityImage
              image={service.heroImage}
              fill
              priority
              sizes="100vw"
              className="opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
          </div>
        ) : null}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
          <RevealOnScroll>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Services
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            {service.shortDescription ? (
              <p className="mt-5 max-w-xl text-lg text-white/70">
                {service.shortDescription}
              </p>
            ) : null}
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-7">
            <RichText
              content={service.fullDescription}
              className="max-w-2xl text-lg"
            />
          </RevealOnScroll>

          <div className="lg:col-span-5">
            {service.galleryImages?.length ? (
              <div className="grid grid-cols-2 gap-4">
                {service.galleryImages.slice(0, 4).map(
                  (image: { alt?: string; asset?: { _ref?: string } }, i: number) => (
                  <RevealOnScroll key={i} delay={i * 0.06}>
                    <div className="aspect-[4/3] overflow-hidden rounded-xl">
                      <SanityImage
                        image={image}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="transition-transform duration-700 hover:scale-[1.04]"
                      />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {service.relatedProjects?.length ? (
          <RevealOnScroll className="mt-24 border-t border-divider pt-14">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Related projects
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedProjects.map((project: ProjectCard) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug}`}
                  className="group overflow-hidden rounded-xl bg-surface"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.coverImage ? (
                      <SanityImage
                        image={project.coverImage}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="h-full w-full bg-divider/50" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-medium text-ink">{project.title}</h3>
                      <p className="text-sm text-neutral">
                        {project.location}
                        {project.year ? ` · ${project.year}` : ""}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-neutral transition-colors group-hover:text-accent" />
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        ) : null}
      </section>

      <CtaBanner />
    </>
  );
}