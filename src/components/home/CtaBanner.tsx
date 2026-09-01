import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SanityImage } from "@/components/ui/SanityImage";
import type { CtaBanner as CtaBannerType } from "@/types/sanity";

interface CtaBannerProps {
  cta?: CtaBannerType;
  compact?: boolean;
}

export function CtaBanner({ cta, compact }: CtaBannerProps) {
  const heading = cta?.heading || "Let's build something great together.";
  const subheading =
    cta?.subheading ||
    "Tell us about your project and get a free, no-obligation estimate within 48 hours.";
  const buttonText = cta?.buttonText || "Get a Free Estimate";

  return (
    <section className={compact ? "bg-base" : "mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-28"}>
      <RevealOnScroll
        className={compact ? "" : "mt-0"}
      >
        <div
          className="relative overflow-hidden rounded-3xl bg-ink"
        >
          {cta?.backgroundImage ? (
            <div className="absolute inset-0">
              <SanityImage
                image={cta.backgroundImage}
                fill
                sizes="100vw"
                className="opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
            </div>
          ) : null}

          <div className="relative z-10 flex flex-col items-start gap-8 px-6 py-16 sm:px-12 md:flex-row md:items-center md:justify-between md:px-16 md:py-20">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {heading}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                {subheading}
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              {buttonText}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}