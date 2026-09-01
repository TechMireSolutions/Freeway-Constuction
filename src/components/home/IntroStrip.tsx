"use client";

import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { HomePage } from "@/types/sanity";

export function IntroStrip({ home }: { home: HomePage }) {
  const heading = home.introHeading;
  const text = home.introText;

  if (!heading && !text) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <RevealOnScroll className="md:col-span-8">
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-5xl">
            {heading ||
              "We don't just construct buildings. We build what matters — homes, workspaces and legacies."}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15} className="md:col-span-4">
          <p className="border-l-2 border-accent pl-5 text-base leading-relaxed text-neutral">
            {text ||
              "For two decades, Freeway Constructions has delivered meticulous design-build projects across residential, commercial and bespoke living spaces."}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}