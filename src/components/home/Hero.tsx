"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { HomePage } from "@/types/sanity";
import { SanityImage } from "@/components/ui/SanityImage";

export function Hero({ home }: { home: HomePage }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <div ref={imageRef} className="absolute inset-0">
        {home.heroBackgroundImage ? (
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SanityImage
              image={home.heroBackgroundImage}
              fill
              priority
              quality={40}
              sizes="100vw"
              className="opacity-50"
            />
          </motion.div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-20 pt-32 sm:px-8 md:pb-24">
        <div
          className="max-w-4xl opacity-0 animate-hero-text motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transform-none"
        >
          <p className="mb-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-white/60">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {home.heroSubheading?.split(".")[0] || "Design · Build · Deliver"}
          </p>

          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {home.heroHeading || "We build spaces that last."}
          </h1>

          {home.heroSubheading ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {home.heroSubheading}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto mt-16 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/30 p-1.5">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-white/70"
              animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}