"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SanityImage } from "@/components/ui/SanityImage";
import type { ServiceCard } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface ServicesShowcaseProps {
  services: ServiceCard[];  
}

export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number } | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 40 });

  if (!services.length) return null;

  const activeService = hovered !== null ? services[hovered] : null;

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow that follows hovered service */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="glow"
            className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              x: smoothX,
              y: smoothY,
              background:
                "radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        {/* Header */}
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              What we do
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Services built on craft
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
              From ground-up builds to bespoke joinery — every service delivered
              under one roof, with one team.
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-accent hover:text-accent"
          >
            All services
            <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>

        {/* Main layout */}
        <div
          ref={containerRef}
          className="relative mt-16 md:mt-24"
          onMouseEnter={() => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              rectRef.current = {
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY,
              };
            }
          }}
          onMouseMove={(e) => {
            if (rectRef.current) {
              mouseX.set(e.pageX - rectRef.current.left - 300);
              mouseY.set(e.pageY - rectRef.current.top - 300);
            }
          }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Service list */}
            <div className="col-span-1 flex flex-col lg:col-span-7" role="list">
              {services.map((service, index) => (
                <RevealOnScroll key={service._id} delay={0.05 * index}>
                  <div role="listitem">
                    <Link
                      href={`/services/${service.slug}`}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative flex items-center gap-5 border-b border-white/10 py-6 transition-colors duration-300 md:py-7"
                    >
                      {/* Animated left accent bar */}
                      <motion.span
                        className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                        animate={{
                          height: hovered === index ? "60%" : "0%",
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden="true"
                      />

                      {/* Number */}
                      <span className="w-8 shrink-0 pl-4 font-display text-xs font-medium tabular-nums text-white/25 transition-colors duration-300 group-hover:text-accent/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Icon bubble */}
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                          hovered === index
                            ? "border-accent/40 bg-accent/10 text-accent"
                            : "border-white/10 bg-white/5 text-white/40",
                        )}
                      >
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>

                      {/* Title + description */}
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <h3
                          className={cn(
                            "font-display text-lg font-semibold tracking-tight transition-colors duration-300 sm:text-xl md:text-2xl",
                            hovered === index ? "text-white" : "text-white/80",
                          )}
                        >
                          {service.title}
                        </h3>
                        <AnimatePresence>
                          {hovered === index && service.shortDescription && (
                            <motion.p
                              initial={
                                reduce ? false : { opacity: 0, height: 0 }
                              }
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden text-sm leading-relaxed text-white/50"
                            >
                              {service.shortDescription}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Arrow */}
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          hovered === index
                            ? "border-accent bg-accent text-white"
                            : "border-white/10 bg-transparent text-white/30",
                        )}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Sticky image preview panel (desktop only) */}
            <div className="col-span-1 hidden lg:col-span-5 lg:block">
              <div className="sticky top-28">
                <div className="relative h-[480px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <AnimatePresence mode="wait">
                    {activeService?.heroImage ? (
                      <motion.div
                        key={activeService._id + "-img"}
                        className="absolute inset-0"
                        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <SanityImage
                          image={activeService.heroImage}
                          fill
                          sizes="42vw"
                          className="rounded-2xl object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                        {/* Service name overlay */}
                        <motion.div
                          key={activeService._id + "-label"}
                          className="absolute bottom-0 inset-x-0 p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
                            <Icon name={activeService.icon} className="h-3.5 w-3.5" />
                            {activeService.title}
                          </span>
                          {activeService.shortDescription && (
                            <p className="mt-3 text-sm leading-relaxed text-white/70">
                              {activeService.shortDescription}
                            </p>
                          )}
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Decorative placeholder */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/20">
                          {activeService ? (
                            <Icon name={activeService.icon} className="h-10 w-10" />
                          ) : (
                            <svg
                              className="h-10 w-10"
                              viewBox="0 0 40 40"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1}
                            >
                              <rect x="4" y="4" width="32" height="32" rx="4" />
                              <path d="M4 16h32M16 4v32" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-white/25">
                          Hover a service to preview
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Service count pill */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <span className="text-sm text-white/40">Total services</span>
                  <span className="font-display text-2xl font-semibold text-white">
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}