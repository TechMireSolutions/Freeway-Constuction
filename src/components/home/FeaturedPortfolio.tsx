import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SanityImage } from "@/components/ui/SanityImage";
import type { ProjectCard } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface FeaturedPortfolioProps {
  projects: ProjectCard[];
}

export function FeaturedPortfolio({ projects }: FeaturedPortfolioProps) {
  if (!projects.length) return null;

  const [first, ...rest] = projects;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
      <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Selected work
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Featured projects
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          View all projects
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </RevealOnScroll>

      <div className="mt-14 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        <RevealOnScroll className="min-w-0 md:col-span-7">
          <ProjectCardView project={first} large />  
        </RevealOnScroll>

        <div className="grid min-w-0 grid-cols-1 gap-5 md:col-span-5 md:grid-cols-2 md:gap-6">
          {rest.slice(0, 3).map((project, index) => (
            <RevealOnScroll
              key={project._id}
              delay={0.08 * (index + 1)}
              className={cn("min-w-0", index === 2 && "md:col-span-2")}
            >
              <ProjectCardView
                project={project}
                wide={index === 2}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardView({
  project,
  large,
  wide,
}: {
  project: ProjectCard;
  large?: boolean;
  wide?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group relative block min-w-0 overflow-hidden rounded-2xl bg-ink",
        large ? "min-h-[420px] md:min-h-[560px]" : "aspect-[4/3]",
        wide && "md:aspect-[16/7]",
      )}
    >
      {project.coverImage ? (
        <SanityImage
          image={project.coverImage}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 40vw"}
          className="opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.category?.title || project.location || "Project"}
          </p>
          <h3
            className={cn(
              "mt-2 font-display font-semibold tracking-tight text-white",
              large ? "text-2xl md:text-3xl" : "text-lg",
            )}
          >
            {project.title}
          </h3>
          {project.location ? (
            <p className="mt-1 text-sm text-white/60">
              {project.location}
              {project.year ? ` · ${project.year}` : ""}
            </p>
          ) : null}
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:bg-accent">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}