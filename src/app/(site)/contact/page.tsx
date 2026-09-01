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

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />

      <section className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 md:pt-44">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Contact
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
            {contact?.heading || "Let's talk about your project"}
          </h1>
          {contact?.introText ? (
            <p className="mt-5 max-w-xl text-lg text-neutral">{contact.introText}</p>
          ) : null}
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-7">
            <div className="rounded-2xl border border-divider bg-surface p-6 sm:p-8 md:p-10">
              <ContactForm
                services={services}
                successMessage={contact?.successMessage}
              />
            </div>
          </RevealOnScroll>

          <aside className="lg:col-span-5">
            <RevealOnScroll delay={0.1}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                  {settings?.phone ? (
                    <a
                      href={`tel:${settings.phone}`}
                      className="group flex items-center gap-4"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-base transition-colors duration-300 group-hover:bg-accent">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral">Phone</p>
                        <p className="font-medium text-ink">{settings.phone}</p>
                      </div>
                    </a>
                  ) : null}

                  {settings?.email ? (
                    <a
                      href={`mailto:${settings.email}`}
                      className="group flex items-center gap-4"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-base transition-colors duration-300 group-hover:bg-accent">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral">Email</p>
                        <p className="font-medium text-ink">{settings.email}</p>
                      </div>
                    </a>
                  ) : null}

                  {settings?.address ? (
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-base">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral">Address</p>
                        <p className="font-medium text-ink">{settings.address}</p>
                      </div>
                    </div>
                  ) : null}

                  {contact?.businessHours ? (
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-base">
                        <Clock className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral">Hours</p>
                        <p className="font-medium text-ink">{contact.businessHours}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                {contact?.officeLocations?.length ? (
                  <div className="space-y-4">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral">
                      Office locations
                    </h2>
                    {contact.officeLocations.map((location: OfficeLocation) => (
                      <div
                        key={location.name}
                        className="rounded-xl border border-divider bg-surface p-5"
                      >
                        <p className="font-medium text-ink">{location.name}</p>
                        <p className="mt-1 text-sm text-neutral">{location.address}</p>
                        {location.phone ? (
                          <p className="mt-1 text-sm text-neutral">{location.phone}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </RevealOnScroll>
          </aside>
        </div>

        {contact?.mapEmbedUrl ? (
          <RevealOnScroll className="mt-16">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl border border-divider">
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