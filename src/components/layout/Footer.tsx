import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import type { ClientSettings } from "@/types/sanity";
import { navigation } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

const socialIcons: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  Linkedin,
};

export function Footer({ settings }: { settings: ClientSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-base">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo settings={settings} light />
            {settings?.footerText ? (
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                {settings.footerText}
              </p>
            ) : null}
            {settings?.socialLinks?.length ? (
              <div className="mt-6 flex gap-3">
                {settings.socialLinks.map((social) => {
                  const Icon = socialIcons[social.label] || LinkIcon;
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="md:col-span-2" />
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Pages
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {settings?.address ? (
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  {settings.address}
                </li>
              ) : null}
              {settings?.phone ? (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <a href={`tel:${settings.phone}`} className="transition-colors hover:text-white">
                    {settings.phone}
                  </a>
                </li>
              ) : null}
              {settings?.email ? (
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <a href={`mailto:${settings.email}`} className="transition-colors hover:text-white">
                    {settings.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            © {year} {settings?.companyName || "Freeway Constructions"}. All rights reserved.
          </p>
          <Link
            href="/studio"
            className="text-xs text-white/50 transition-colors hover:text-white"
          >
            CMS Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

function LinkIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      strokeWidth={strokeWidth}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}