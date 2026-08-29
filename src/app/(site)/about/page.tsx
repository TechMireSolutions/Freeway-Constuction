import React from 'react'
import { client } from '@/lib/sanity/client'
import { aboutPageQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import * as Icons from 'lucide-react'

export const revalidate = 60

export default async function AboutPage() {
  let aboutData = null
  
  try {
    if (client.config().projectId) {
      aboutData = await client.fetch(aboutPageQuery)
    }
  } catch (error) {
    console.error("Sanity fetch failed", error)
  }

  // Fallbacks
  const heading = aboutData?.heading || "Building a better tomorrow."
  const story = aboutData?.story || [
    { _type: 'block', children: [{ _type: 'span', text: 'Since our founding, Freeway Constructions has been dedicated to delivering uncompromising quality and innovative design. We believe that every structure we build is an opportunity to shape the future of our communities.' }] }
  ]
  const values = aboutData?.values || [
    { title: 'Integrity', description: 'Honesty and transparency in every interaction.', icon: 'Shield' },
    { title: 'Excellence', description: 'Uncompromising standards of quality.', icon: 'Star' },
    { title: 'Safety', description: 'Protecting our team and clients above all else.', icon: 'HardHat' },
  ]
  const teamMembers = aboutData?.teamMembers?.length > 0 ? aboutData.teamMembers : [
    { name: 'John Doe', role: 'CEO', bio: '20+ years of construction experience.' },
    { name: 'Jane Smith', role: 'Chief Architect', bio: 'Award-winning architectural designer.' },
  ]
  const milestones = aboutData?.milestones || [
    { year: '2010', title: 'Founded', description: 'Freeway Constructions was established.' },
    { year: '2015', title: 'Commercial Expansion', description: 'Expanded into large-scale commercial builds.' },
    { year: '2020', title: 'Award Winning Design', description: 'Recognized for our innovative design-build approach.' },
  ]

  return (
    <>
      <AnimatedSection className="pt-40 pb-24 bg-base">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto">
              {heading}
            </h1>
            <div className="prose prose-xl prose-a:text-accent max-w-3xl mx-auto text-gray">
              <PortableText value={story} />
            </div>
          </RevealOnScroll>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealOnScroll direction="up">
            <h2 className="text-4xl font-bold tracking-tighter mb-16 text-center">Our Core Values</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value: any, i: number) => {
              // @ts-ignore
              const IconComponent = Icons[value.icon] || Icons.CheckCircle
              return (
                <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                  <div className="text-center p-8 bg-base rounded-3xl h-full">
                    <div className="bg-ink w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                      <IconComponent size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray">{value.description}</p>
                  </div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {teamMembers.length > 0 && (
        <AnimatedSection className="py-24 bg-ink text-white">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <h2 className="text-4xl font-bold tracking-tighter mb-16 text-center">Leadership Team</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member: any, i: number) => (
                <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-white/10">
                      {member.photo && (
                        <Image 
                          src={urlFor(member.photo).url()}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-accent font-medium mb-4">{member.role}</p>
                    <p className="text-sm text-gray-400">{member.bio}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className="py-24 bg-base border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <RevealOnScroll direction="up">
            <h2 className="text-4xl font-bold tracking-tighter mb-16 text-center">Our Journey</h2>
          </RevealOnScroll>
          <div className="space-y-12">
            {milestones.map((milestone: any, i: number) => (
              <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start relative">
                  <div className="md:w-1/4 text-3xl font-bold text-accent shrink-0">
                    {milestone.year}
                  </div>
                  <div className="md:w-3/4 pb-12 md:border-l-2 md:border-border md:pl-12 relative">
                    <div className="hidden md:block absolute w-4 h-4 rounded-full bg-ink -left-[9px] top-2" />
                    <h3 className="text-2xl font-bold mb-3">{milestone.title}</h3>
                    <p className="text-gray text-lg">{milestone.description}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
