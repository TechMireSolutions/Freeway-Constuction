import React from 'react'
import { client } from '@/lib/sanity/client'
import { allProjectsQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
// Note: In a real app, filtering would be client-side with Framer Motion layout animations.
// We are building a basic version here that can be enhanced.

export const revalidate = 60

export default async function PortfolioPage() {
  let projects = []
  
  try {
    if (client.config().projectId) {
      projects = await client.fetch(allProjectsQuery)
    }
  } catch (error) {
    console.error("Sanity fetch failed", error)
  }

  const displayProjects = projects?.length > 0 ? projects : [
    { _id: '1', title: 'Tech Hub Alpha', slug: 'tech-hub-alpha', clientName: 'Innovate Corp', year: '2025', services: [{ title: 'Commercial' }] },
    { _id: '2', title: 'Luxury Villa Marina', slug: 'luxury-villa-marina', clientName: 'Private Client', year: '2024', services: [{ title: 'Residential' }] },
    { _id: '3', title: 'Downtown Revitalization', slug: 'downtown-revitalization', clientName: 'City Council', year: '2023', services: [{ title: 'Renovations' }] },
    { _id: '4', title: 'Modern Medical Center', slug: 'modern-medical', clientName: 'Health First', year: '2023', services: [{ title: 'Commercial' }] },
  ]

  return (
    <>
      <AnimatedSection className="pt-40 pb-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealOnScroll direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Portfolio</h1>
            <p className="text-xl text-gray max-w-2xl">
              Explore our latest projects across commercial and residential sectors.
            </p>
          </RevealOnScroll>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 bg-base pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayProjects.map((project: any, i: number) => (
              <RevealOnScroll key={project._id} direction="up" delay={i * 0.1}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white">
                    {project.coverImage ? (
                      <Image 
                        src={urlFor(project.coverImage).width(800).height(600).url()}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-gray mt-1">{project.clientName} &mdash; {project.year}</p>
                    </div>
                    {project.services && project.services.length > 0 && (
                      <div className="text-sm font-medium px-3 py-1 bg-white border border-border rounded-full">
                        {project.services[0].title}
                      </div>
                    )}
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
