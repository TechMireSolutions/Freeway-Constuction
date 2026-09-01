import Link from "next/link";
import Image from "next/image";
import type { ClientSettings } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  settings: ClientSettings | null;
  light?: boolean;
}

export function Logo({ settings, light }: LogoProps) {
  const name = settings?.companyName || "Freeway Constructions";

  if (settings?.logo) {
    return (
      <Link href="/" className="flex items-center" aria-label={`${name} — home`}>
        <Image
          src={urlFor(settings.logo).auto("format").width(320).url()}
          alt={settings.logo.alt || name}
          width={320}
          height={80}
          priority
          className="h-10 w-auto object-contain"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${name} — home`}>
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full font-bold tracking-tight",
          light ? "bg-accent text-white" : "bg-ink text-base",
        )}
        aria-hidden="true"
      >
        F
      </span>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          light ? "text-white" : "text-ink",
        )}
      >
        {name}
      </span>
    </Link>
  );
}