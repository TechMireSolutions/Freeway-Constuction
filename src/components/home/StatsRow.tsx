"use client";

import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types/sanity";

interface StatsRowProps {
  stats: Stat[] | undefined;
  dark?: boolean;
}

export function StatsRow({ stats, dark }: StatsRowProps) {
  if (!stats?.length) return null;

  return (
    <section
      className={cn(
        "border-y py-16 md:py-20",
        dark ? "border-white/10 bg-ink text-white" : "border-divider bg-base",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <RevealOnScroll key={stat.label} delay={index * 0.08}>
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  "font-display text-5xl font-semibold tracking-tight md:text-6xl",
                  dark ? "text-white" : "text-ink",
                )}
              >
                <AnimatedNumber value={stat.number} />
                {stat.suffix ? <span className="text-accent">{stat.suffix}</span> : null}
              </span>
              <span
                className={cn(
                  "text-sm font-medium tracking-wide",
                  dark ? "text-white/60" : "text-neutral",
                )}
              >
                {stat.label}
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}