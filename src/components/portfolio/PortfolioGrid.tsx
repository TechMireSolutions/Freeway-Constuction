"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import type { ProjectCard, ServiceCard } from "@/types/sanity";

interface PortfolioGridProps {
  projects: ProjectCard[];
  services: ServiceCard[];
}

export function PortfolioGrid({ projects, services }: PortfolioGridProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("All");

  const categorySlugs = services
    .map((s) => s.slug)
    .filter((slug, i, arr) => arr.indexOf(slug) === i);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category?.slug === active);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {["All", ...categorySlugs].map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300",
              active === filter
                ? "border-ink bg-ink text-base"
                : "border-divider text-neutral hover:border-ink hover:text-ink",
            )}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project._id}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {!filtered.length ? (
        <p className="mt-16 text-center text-neutral">
          No projects in this category yet.
        </p>
      ) : null}
    </div>
  );
}

function PortfolioCard({ project }: { project: ProjectCard }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-ink"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.coverImage ? (
          <SanityImage
            image={project.coverImage}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="h-full w-full bg-divider/50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.category?.title || project.location || "Project"}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-white/60">
            {project.location}
            {project.year ? ` · ${project.year}` : ""}
          </p>
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:bg-accent">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}