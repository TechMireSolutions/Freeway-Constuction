import React from 'react'
import { client } from '@/lib/sanity/client'
import { projectBySlugQuery, allProjectsQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    if (!client.config().projectId) return []
    const projects = await client.fetch(allProjectsQuery)
    return projects.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  let project = null

  try {
    if (client.config().projectId) {
      project = await client.fetch(projectBySlugQuery, { slug })
    }
  } catch (error) {
    console.error("Sanity fetch failed", error)
  }

  if (!project) {
    project = {
      title: 'Tech Hub Alpha',
      clientName: 'Innovate Corp',
      location: 'Austin, TX',
      year: '2025',
      services: [{ title: 'Commercial Design-Build' }],
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'A state-of-the-art tech hub designed to foster innovation.' }] }
      ]
    }
  }

  return (
    <>
      <AnimatedSection className="pt-40 pb-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <RevealOnScroll direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">{project.title}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
              <div>
                <div className="text-sm text-gray font-medium mb-1">Client</div>
                <div className="font-semibold">{project.clientName}</div>
              </div>
              <div>
                <div className="text-sm text-gray font-medium mb-1">Location</div>
                <div className="font-semibold">{project.location}</div>
              </div>
              <div>
                <div className="text-sm text-gray font-medium mb-1">Year</div>
                <div className="font-semibold">{project.year}</div>
              </div>
              <div>
                <div className="text-sm text-gray font-medium mb-1">Services</div>
                <div className="font-semibold">
                  {project.services?.map((s: any) => s.title).join(', ')}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </AnimatedSection>

      {project.coverImage && (
        <AnimatedSection className="pb-24 bg-white">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <div className="relative w-full h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden bg-base">
                <Image 
                  src={urlFor(project.coverImage).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
        </AnimatedSection>
      )}

      {project.description && (
        <AnimatedSection className="py-24 bg-base">
          <div className="container mx-auto px-6 max-w-3xl">
            <RevealOnScroll direction="up">
              <h2 className="text-3xl font-bold mb-8 tracking-tighter">About the Project</h2>
              <div className="prose prose-lg prose-a:text-accent max-w-none text-gray-800">
                <PortableText value={project.description} />
              </div>
            </RevealOnScroll>
          </div>
        </AnimatedSection>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <AnimatedSection className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <h2 className="text-3xl font-bold mb-12 tracking-tighter text-center">Project Gallery</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img: any, i: number) => (
                <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-base">
                    <Image 
                      src={urlFor(img).width(1200).url()} 
                      alt="Project gallery image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  )
}
