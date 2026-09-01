import type { Metadata } from "next";
import { getAboutPage } from "@/lib/sanity/data";
import { buildSeo, buildSeoBase, getSiteSettings } from "@/lib/seo";
import { RichText } from "@/components/shared/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Icon } from "@/components/ui/Icon";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import type { Value, Milestone, TeamMember } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [settings, about] = await Promise.all([
    getSiteSettings(),
    getAboutPage(),
  ]);
  return buildSeo(
    {
      title: about?.seo?.title || "About Us",
      description: about?.seo?.description,
      path: "/about",
      image: about?.introImage,
    },
    buildSeoBase(settings),
  );
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", href: "/about" }]} />

      {/* ── Dark page hero ── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <RevealOnScroll>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              About Freeway
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Two decades of
              <br />
              <span className="text-white/35">building trust.</span>
            </h1>
            {about?.heading && (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/45">
                {about.heading}
              </p>
            )}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Story + image ── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-5">
            {about?.introImage ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <SanityImage
                  image={about.introImage}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-col justify-center lg:col-span-7">
            <RichText content={about?.story} className="max-w-2xl text-lg" />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Values — dark section ── */}
      {about?.values?.length ? (
        <section className="bg-ink">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                Our values
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                What we stand for
              </h2>
            </RevealOnScroll>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {about.values.map((value: Value, i: number) => (
                <RevealOnScroll key={value.title} delay={i * 0.08}>
                  <div className="group flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.06]">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                      <Icon name={value.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {value.title}
                    </h3>
                    {value.description ? (
                      <p className="text-sm leading-relaxed text-white/50">
                        {value.description}
                      </p>
                    ) : null}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Milestones ── */}
      {about?.milestones?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              History
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Our journey
            </h2>
          </RevealOnScroll>
          <div className="mt-12 flex flex-col">
            {about.milestones.map((milestone: Milestone, i: number) => (
              <RevealOnScroll key={i} delay={0.05 * i}>
                <div className="group grid grid-cols-1 gap-4 border-b border-divider py-8 transition-colors duration-300 hover:border-ink/30 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-2">
                    <span className="font-display text-3xl font-semibold text-accent">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-accent">
                      {milestone.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    {milestone.description ? (
                      <p className="leading-relaxed text-neutral">
                        {milestone.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Team ── */}
      {about?.teamMembers?.length ? (
        <section className="border-t border-divider bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                The people
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Meet the team
              </h2>
            </RevealOnScroll>
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {about.teamMembers.map((member: TeamMember, i: number) => (
                <RevealOnScroll key={member.name} delay={i * 0.08}>
                  <div className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-divider/40">
                      {member.photo ? (
                        <SanityImage
                          image={member.photo}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="font-display text-5xl font-semibold text-neutral/30">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-accent">
                      {member.role}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}