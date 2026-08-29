import React from 'react'
import { client } from '@/lib/sanity/client'
import { servicesQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

export default async function ServicesPage() {
  let services = []
  
  try {
    if (client.config().projectId) {
      services = await client.fetch(servicesQuery)
    }
  } catch (error) {
    console.error("Sanity fetch failed", error)
  }

  const displayServices = services?.length > 0 ? services : [
    { _id: '1', title: 'Commercial', slug: 'commercial', shortDescription: 'Large scale commercial builds.', icon: 'Building' },
    { _id: '2', title: 'Residential', slug: 'residential', shortDescription: 'Custom luxury homes.', icon: 'Home' },
    { _id: '3', title: 'Renovations', slug: 'renovations', shortDescription: 'Modern transformations.', icon: 'Hammer' },
    { _id: '4', title: 'Design Build', slug: 'design-build', shortDescription: 'End-to-end solutions.', icon: 'PenTool' },
  ]

  return (
    <>
      <AnimatedSection className="pt-40 pb-24 bg-base">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Our Services</h1>
            <p className="text-xl text-gray max-w-2xl mx-auto">
              Comprehensive construction and design-build solutions tailored to your unique vision.
            </p>
          </RevealOnScroll>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 bg-white pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service: any, index: number) => {
              // @ts-ignore
              const IconComponent = Icons[service.icon] || Icons.Briefcase
              return (
                <RevealOnScroll key={service._id} direction="up" delay={index * 0.1}>
                  <Link href={`/services/${service.slug}`} className="block group">
                    <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                      {service.heroImage && (
                        <div className="relative h-64 overflow-hidden">
                          <Image 
                            src={urlFor(service.heroImage).width(600).height(400).url()} 
                            alt={service.title} 
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="bg-base w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                          <IconComponent size={20} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                        <p className="text-gray flex-grow">{service.shortDescription}</p>
                        <div className="mt-6 flex items-center text-accent font-medium">
                          Learn More <Icons.ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
