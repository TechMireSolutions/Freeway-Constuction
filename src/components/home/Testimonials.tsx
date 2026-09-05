"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SanityImage } from "@/components/ui/SanityImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/sanity";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[index];
  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="flex items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Client voices
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              What our clients say
            </h2>
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:bg-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:bg-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </RevealOnScroll>

        <div className="relative mt-12 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={current._id}
              initial={reduce ? false : { opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -48 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 md:flex-row md:items-center"
            >
              <div className="max-w-3xl">
                {current.rating ? (
                  <div className="mb-5 flex gap-1" role="img" aria-label={`${current.rating} out of 5 stars`}>
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" strokeWidth={1.5} />
                    ))}
                  </div>
                ) : null}
                <blockquote className="font-display text-xl font-medium leading-relaxed tracking-tight text-white md:text-2xl lg:text-3xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  {current.clientPhoto ? (
                    <SanityImage
                      image={current.clientPhoto}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent font-semibold text-white"
                      aria-hidden="true"
                    >
                      {current.clientName.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="font-medium text-white">{current.clientName}</p>
                    {current.companyLocation ? (
                      <p className="text-sm text-white/60">{current.companyLocation}</p>
                    ) : null}
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          {testimonials.map((t, i) => (
            <button
              key={t._id}
              type="button"
              onClick={() => setIndex(i)}
              className="flex h-12 w-12 -mx-2 items-center justify-center"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-white/30",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}