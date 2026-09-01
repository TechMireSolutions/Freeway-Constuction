"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SanityImage } from "@/components/ui/SanityImage";
import type { ServiceCard } from "@/types/sanity";

interface ServicesShowcaseProps {
  services: ServiceCard[];
}

export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  if (!services.length) return null;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              What we do
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
              Services built on craft
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            All services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </RevealOnScroll>

        <div className="relative mt-14 md:mt-20">
          <div
            className="pointer-events-none absolute right-0 top-0 hidden h-[320px] w-[420px] overflow-hidden rounded-2xl lg:block"
            aria-hidden="true"
          >
            <AnimatePresence>
              {hovered !== null && services[hovered]?.heroImage ? (
                <motion.div
                  key={services[hovered]._id}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <SanityImage
                    image={services[hovered].heroImage}
                    fill
                    sizes="420px"
                    className="rounded-2xl"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <ul className="flex flex-col border-t border-divider lg:max-w-[60%]">
            {services.map((service, index) => (
              <li key={service._id} className="border-b border-divider">
                <Link
                  href={`/services/${service.slug}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex items-center gap-4 py-6 transition-colors md:gap-8 md:py-7"
                >
                  <span className="font-display text-sm font-medium text-neutral/60 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-accent">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="flex-1 font-display text-xl font-semibold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl md:text-3xl">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-neutral opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}