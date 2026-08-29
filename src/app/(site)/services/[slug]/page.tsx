import React from 'react'
import { client } from '@/lib/sanity/client'
import { serviceBySlugQuery, servicesQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    if (!client.config().projectId) return []
    const services = await client.fetch(servicesQuery)
    return services.map((s: any) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  let service = null

  try {
    if (client.config().projectId) {
      service = await client.fetch(serviceBySlugQuery, { slug })
    }
  } catch (error) {
    console.error("Sanity fetch failed", error)
  }

  // Fallback for demo if Sanity not connected
  if (!service) {
    service = {
      title: 'Commercial Construction',
      shortDescription: 'Large scale commercial builds designed for the future.',
      fullDescription: [
        { _type: 'block', children: [{ _type: 'span', text: 'Our commercial construction division handles everything from office buildings to retail centers. We focus on sustainable, forward-thinking designs that stand the test of time.' }] }
      ],
      icon: 'Building',
      relatedProjects: [
        { _id: '1', title: 'Tech Hub Alpha', slug: 'tech-hub-alpha' }
      ]
    }
  }

  // @ts-ignore
  const IconComponent = Icons[service.icon] || Icons.Briefcase

  return (
    <>
      <AnimatedSection className="pt-40 pb-24 bg-ink text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <RevealOnScroll direction="up">
            <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full mb-8 text-accent font-medium">
              <IconComponent size={20} />
              <span>Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{service.title}</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed">
              {service.shortDescription}
            </p>
          </RevealOnScroll>
        </div>
      </AnimatedSection>

      {service.heroImage && (
        <div className="w-full h-[50vh] relative bg-base">
          <Image 
            src={urlFor(service.heroImage).url()}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <RevealOnScroll direction="up">
            <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight max-w-none prose-a:text-accent">
              <PortableText value={service.fullDescription} />
            </div>
          </RevealOnScroll>
        </div>
      </AnimatedSection>

      {service.galleryImages && service.galleryImages.length > 0 && (
        <AnimatedSection className="py-24 bg-base">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <h2 className="text-4xl font-bold tracking-tighter mb-12 text-center">Gallery</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.galleryImages.map((img: any, i: number) => (
                <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden group">
                    <Image 
                      src={urlFor(img).width(600).height(600).url()} 
                      alt="Gallery image"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <AnimatedSection className="py-24 bg-white border-t border-border">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <h2 className="text-4xl font-bold tracking-tighter mb-12">Related Projects</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.relatedProjects.map((project: any, i: number) => (
                <RevealOnScroll key={project._id} direction="up" delay={i * 0.1}>
                  <Link href={`/portfolio/${project.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-base">
                      {project.coverImage && (
                        <Image 
                          src={urlFor(project.coverImage).width(600).height(450).url()}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className="py-32 bg-accent text-white text-center">
        <div className="container mx-auto px-6">
          <RevealOnScroll direction="up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Need this service for your next project?</h2>
            <Link 
              href="/contact" 
              className="inline-block bg-ink text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-ink-light transition-transform hover:scale-105 duration-200 mt-6"
            >
              Get an Estimate
            </Link>
          </RevealOnScroll>
        </div>
      </AnimatedSection>
    </>
  )
}
