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

      <section className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 md:pt-44">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <RevealOnScroll className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              About Freeway
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
              {about?.heading || "Two decades of building trust"}
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-5">
            {about?.introImage ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <SanityImage image={about.introImage} fill sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            ) : null}
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="lg:col-span-7">
            <RichText content={about?.story} className="max-w-2xl text-lg" />
          </RevealOnScroll>
        </div>
      </section>

      {about?.values?.length ? (
        <section className="border-y border-divider bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <RevealOnScroll>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                What we stand for
              </h2>
            </RevealOnScroll>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {about.values.map((value: Value, i: number) => (
                <RevealOnScroll key={value.title} delay={i * 0.08}>
                  <div className="group flex flex-col gap-4 rounded-2xl border border-divider bg-base p-7 transition-colors duration-300 hover:border-ink">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-base transition-colors duration-300 group-hover:bg-accent">
                      <Icon name={value.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {value.title}
                    </h3>
                    {value.description ? (
                      <p className="text-sm leading-relaxed text-neutral">
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

      {about?.milestones?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <RevealOnScroll>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Our journey
            </h2>
          </RevealOnScroll>
          <div className="mt-12 flex flex-col">
            {about.milestones.map((milestone: Milestone, i: number) => (
              <RevealOnScroll key={i} delay={0.05 * i}>
                <div className="grid grid-cols-1 gap-4 border-b border-divider py-8 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-2">
                    <span className="font-display text-3xl font-semibold text-accent">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {milestone.title}
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    {milestone.description ? (
                      <p className="leading-relaxed text-neutral">{milestone.description}</p>
                    ) : null}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      ) : null}

      {about?.teamMembers?.length ? (
        <section className="border-t border-divider">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <RevealOnScroll>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Meet the team
              </h2>
            </RevealOnScroll>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {about.teamMembers.map((member: TeamMember, i: number) => (
                <RevealOnScroll key={member.name} delay={i * 0.08}>
                  <div className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                      {member.photo ? (
                        <SanityImage
                          image={member.photo}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-divider/50">
                          <span className="text-5xl font-semibold text-neutral/30">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-accent">{member.role}</p>
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