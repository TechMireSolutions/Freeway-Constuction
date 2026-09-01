import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
import { RichText } from "@/components/shared/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [settings, project] = await Promise.all([
    getSiteSettings(),
    getProjectBySlug(slug),
  ]);

  if (!project) return {};

  return buildSeo(
    {
      title: project.title,
      description: project.description
        ? undefined
        : `Case study — ${project.title} by Freeway Constructions.`,
      path: `/portfolio/${project.slug}`,
      image: project.coverImage,
      type: "article",
    },
    buildSeoBase(settings),
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Portfolio", href: "/portfolio" },
          { name: project.title, href: `/portfolio/${project.slug}` },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 md:pt-44">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <RevealOnScroll>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
            </RevealOnScroll>
          </div>
          <div className="md:col-span-4">
            <RevealOnScroll delay={0.1}>
              <dl className="flex flex-col gap-4 border-t border-divider pt-6">
                {project.clientName ? (
                  <ProjectMeta label="Client" value={project.clientName} />
                ) : null}
                {project.location ? (
                  <ProjectMeta label="Location" value={project.location} />
                ) : null}
                {project.year ? <ProjectMeta label="Year" value={String(project.year)} /> : null}
                {project.category?.title ? (
                  <ProjectMeta label="Category" value={project.category.title} />
                ) : null}
              </dl>
            </RevealOnScroll>
          </div>
        </div>

        <RevealOnScroll className="mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            {project.coverImage ? (
              <SanityImage image={project.coverImage} fill priority sizes="100vw" />
            ) : (
              <div className="h-full w-full bg-divider/50" />
            )}
          </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <RevealOnScroll className="lg:col-span-2">
            <RichText content={project.description} className="max-w-2xl text-lg" />
          </RevealOnScroll>

          <div className="lg:col-span-1">
            {project.services?.length ? (
              <RevealOnScroll>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral">
                  Services used
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.services.map((service: { title: string; slug: string }) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="rounded-full border border-divider px-4 py-1.5 text-sm text-ink transition-colors hover:border-ink"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </RevealOnScroll>
            ) : null}
          </div>
        </div>

        {project.gallery?.length ? (
          <RevealOnScroll className="mt-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {project.gallery.map(
                (image: { alt?: string; asset?: { _ref?: string } }, i: number) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl ${
                    i % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <SanityImage
                    image={image}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </RevealOnScroll>
        ) : null}

        {project.beforeImages?.length && project.afterImages?.length ? (
          <RevealOnScroll className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Before & after
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-5">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <SanityImage image={project.beforeImages[0]} fill sizes="50vw" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <SanityImage image={project.afterImages[0]} fill sizes="50vw" />
              </div>
            </div>
          </RevealOnScroll>
        ) : null}
      </section>

      <CtaBanner />

      <PrevNextNav slug={slug} />
    </>
  );
}

function ProjectMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral">
        {label}
      </dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

async function PrevNextNav({ slug }: { slug: string }) {
  const all = await getProjects();
  const index = all.findIndex((p: { slug: string }) => p.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return (
    <nav className="border-t border-divider">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-divider sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group flex items-center justify-between gap-4 bg-base px-5 py-8 transition-colors hover:bg-surface sm:px-8"
          >
            <ArrowLeft className="h-5 w-5 text-neutral transition-colors group-hover:text-accent" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral">Previous</p>
              <p className="font-medium text-ink">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/portfolio/${next.slug}`}
            className="group flex items-center justify-between gap-4 bg-base px-5 py-8 transition-colors hover:bg-surface sm:px-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral">Next</p>
              <p className="font-medium text-ink">{next.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-neutral transition-colors group-hover:text-accent" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}