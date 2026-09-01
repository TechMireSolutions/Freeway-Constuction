import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getContactPage, getServices } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import type { OfficeLocation } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [settings, contact] = await Promise.all([
    getSiteSettings(),
    getContactPage(),
  ]);
  return buildSeo(
    {
      title: contact?.seo?.title || "Contact Us",
      description: contact?.seo?.description,
      path: "/contact",
    },
    buildSeoBase(settings),
  );
}

export default async function ContactPage() {
  const [settings, contact, services] = await Promise.all([
    getSiteSettings(),
    getContactPage(),
    getServices(),
  ]);

  const contactItems = [
    settings?.phone && {
      icon: Phone,
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone}`,
    },
    settings?.email && {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    settings?.address && {
      icon: MapPin,
      label: "Address",
      value: settings.address,
      href: null,
    },
    contact?.businessHours && {
      icon: Clock,
      label: "Hours",
      value: contact.businessHours,
      href: null,
    },
  ].filter(Boolean) as {
    icon: typeof Phone;
    label: string;
    value: string;
    href: string | null;
  }[];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />

      {/* ── Dark page hero ── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <RevealOnScroll>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Contact
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Let&apos;s talk about
              <br />
              <span className="text-white/35">your project.</span>
            </h1>
            {contact?.introText && (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/45">
                {contact.introText}
              </p>
            )}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Form + contact info ── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* Contact form */}
          <RevealOnScroll className="lg:col-span-7">
            <div className="rounded-2xl border border-divider bg-surface p-6 shadow-sm sm:p-8 md:p-10">
              <ContactForm
                services={services}
                successMessage={contact?.successMessage}
              />
            </div>
          </RevealOnScroll>

          {/* Contact info sidebar */}
          <aside className="lg:col-span-5">
            <RevealOnScroll delay={0.1}>
              <div className="flex flex-col gap-3">

                {/* Info cards */}
                {contactItems.map(({ icon: IconComp, label, value, href }) => {
                  const content = (
                    <div className="group flex items-center gap-4 rounded-2xl border border-divider bg-surface px-5 py-4 transition-all duration-300 hover:border-ink/20 hover:shadow-md">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-divider bg-base text-ink transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent">
                        <IconComp className="h-4.5 w-4.5" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral/60">
                          {label}
                        </p>
                        <p className="mt-0.5 truncate font-medium text-ink">
                          {value}
                        </p>
                      </div>
                    </div>
                  );

                  return href ? (
                    <a key={label} href={href}>
                      {content}
                    </a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}

                {/* Office locations */}
                {contact?.officeLocations?.length ? (
                  <div className="mt-2 space-y-3">
                    <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral/60">
                      Office locations
                    </p>
                    {contact.officeLocations.map((location: OfficeLocation) => (
                      <div
                        key={location.name}
                        className="rounded-2xl border border-divider bg-surface p-5"
                      >
                        <p className="font-semibold text-ink">{location.name}</p>
                        <p className="mt-1 text-sm text-neutral">{location.address}</p>
                        {location.phone && (
                          <p className="mt-1 text-sm text-neutral">{location.phone}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </RevealOnScroll>
          </aside>
        </div>

        {/* Map */}
        {contact?.mapEmbedUrl ? (
          <RevealOnScroll className="mt-16">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl border border-divider shadow-sm">
              <iframe
                src={contact.mapEmbedUrl}
                title="Map"
                loading="lazy"
                className="h-full w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealOnScroll>
        ) : null}
      </section>
    </>
  );
}