import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base px-5">
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] font-display text-[20rem] font-semibold text-divider/40">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Error
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-neutral">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on site.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-base transition-colors duration-300 hover:bg-accent"
        >
          Back home
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}