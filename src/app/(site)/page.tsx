import React from 'react'
import { client } from '@/lib/sanity/client'
import { homePageQuery, servicesQuery, featuredProjectsQuery, testimonialsQuery, aboutPageQuery } from '@/lib/sanity/queries'
import { VideoScrollHero } from '@/components/home/VideoScrollHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'

export const revalidate = 60

export default async function HomePage() {
  let homeData = null
  let services = []
  let projects = []
  let testimonials = []
  let aboutData = null

  try {
    if (client.config().projectId) {
      homeData = await client.fetch(homePageQuery)
      services = await client.fetch(servicesQuery)
      projects = await client.fetch(featuredProjectsQuery)
      testimonials = await client.fetch(testimonialsQuery)
      aboutData = await client.fetch(aboutPageQuery)
    }
  } catch (error) {
    console.error("Sanity fetch failed. Ensure project is configured.", error)
  }

  // Fallback data if Sanity is not connected
  const heroHeading = homeData?.heroHeading || "We Build Spaces That Last."
  const heroSubheading = homeData?.heroSubheading || "Premium construction and design-build services."
  const heroVideoUrl = homeData?.heroVideoUrl || "/sample-video.mp4"
  const stats = homeData?.stats || [
    { _key: '1', number: '3K+', label: 'Team Members' },
    { _key: '2', number: '1.9K+', label: 'Clients Are Happy' },
    { _key: '3', number: '2K+', label: 'Award Wins' },
  ]
  const ctaBanner = homeData?.ctaBanner || {
    heading: 'Ready to start your next project?',
    subheading: 'Contact us today for a free estimate.',
    buttonText: 'Get an Estimate'
  }
  
  const displayServices = services?.length > 0 ? services : [
    { _id: '1', title: 'General Construction', shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'Building' },
    { _id: '2', title: 'Architecture & Building', shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'PenTool' },
    { _id: '3', title: 'Interior Design', shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'Home' },
  ]

  const displayTestimonials = testimonials?.length > 0 ? testimonials : [
    { _id: 't1', clientName: 'Ali Rehman', companyLocation: 'UI/UX Designer', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { _id: 't2', clientName: 'Zobia Asif', companyLocation: 'UI/UX Designer', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ]

  const displayTeam = aboutData?.teamMembers?.length > 0 ? aboutData.teamMembers : [
    { name: 'Mishel March', role: 'Founder' },
    { name: 'John Halwik', role: 'Architecture' },
    { name: 'Alex Anfanito', role: 'Engineer' },
    { name: 'Richard March', role: 'Site Manager' },
  ]

  const displayProjects = projects?.length > 0 ? projects : [
    { _id: 'p1', title: 'Skyline Tower', slug: 'skyline-tower', clientName: 'Skyline Corp' },
    { _id: 'p2', title: 'Oakwood Residences', slug: 'oakwood-residences', clientName: 'Oakwood Dev' },
  ]

  return (
    <>
      <VideoScrollHero 
        videoUrl={heroVideoUrl} 
        heading={heroHeading} 
        subheading={heroSubheading} 
      />

      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="right">
              <div className="flex gap-4">
                <div className="w-1/2 rounded-2xl bg-gray-200 h-96 relative overflow-hidden">
                  <div className="absolute inset-0 bg-ink/10" />
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                  <div className="bg-accent text-white p-6 rounded-2xl flex flex-col justify-center items-center text-center h-44">
                    <span className="text-4xl font-bold">25+</span>
                    <span className="text-sm mt-2">Years Experience of Construction Company</span>
                  </div>
                  <div className="rounded-2xl bg-gray-200 h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-ink/10" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left">
              <div>
                <h3 className="text-accent font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-accent" />
                  About Us
                </h3>
                <h2 className="text-4xl md:text-6xl font-bold max-w-4xl tracking-tighter mb-6 leading-tight">
                  We're Always Think On Your Dream
                </h2>
                <p className="text-gray mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-base flex items-center justify-center shrink-0">
                      <Icons.Globe className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Worldwide Services</h4>
                      <p className="text-gray text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-base flex items-center justify-center shrink-0">
                      <Icons.Award className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Best Company Award Winners</h4>
                      <p className="text-gray text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 bg-base">
        <div className="container mx-auto px-6">
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="text-accent font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-accent" />
                  Our Project
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Building Your Dream Projects</h2>
              </div>
              <Link href="/services" className="hidden md:inline-flex items-center bg-accent/10 text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-full transition-colors font-medium uppercase text-sm tracking-wider">
                View All Projects &rarr;
              </Link>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service: any, index: number) => {
              // @ts-ignore
              const IconComponent = Icons[service.icon] || Icons.Briefcase
              return (
                <RevealOnScroll key={service._id} direction="up" delay={index * 0.1}>
                  <Link href={`/services/${service.slug || ''}`} className="block group">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all duration-300 h-full">
                      <div className="bg-base w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray">{service.shortDescription}</p>
                    </div>
                  </Link>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 bg-ink text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: any, index: number) => (
              <RevealOnScroll key={stat._key} direction="up" delay={index * 0.1}>
                <div className="text-center md:text-left">
                  <div className="text-5xl md:text-6xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-lg font-medium text-gray-300">{stat.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Featured Portfolio section placeholder */}
      {displayProjects?.length > 0 && (
        <AnimatedSection className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Featured Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayProjects.map((project: any, i: number) => (
                <RevealOnScroll key={project._id} direction="up" delay={i * 0.1}>
                  <Link href={`/portfolio/${project.slug}`} className="group block overflow-hidden rounded-2xl relative aspect-square md:aspect-[4/3]">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                      <h3 className="text-white text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                      <p className="text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.clientName}</p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Team Members Section */}
      {displayTeam?.length > 0 && (
        <AnimatedSection className="py-24 bg-ink text-white">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <h3 className="text-accent font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-4">
                  <span className="w-8 h-[2px] bg-accent" />
                  Team Members
                  <span className="w-8 h-[2px] bg-accent" />
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Our Professional Team</h2>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayTeam.map((member: any, i: number) => (
                <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-white/10 border-4 border-transparent hover:border-accent transition-all duration-300">
                      {member.photo ? (
                        <Image 
                          src={urlFor(member.photo).url()}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <Icons.User size={48} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-accent text-sm font-medium">{member.role}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Reviews / Testimonials Section */}
      {displayTestimonials?.length > 0 && (
        <AnimatedSection className="py-24 bg-base">
          <div className="container mx-auto px-6">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <h3 className="text-accent font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-4">
                  <span className="w-8 h-[2px] bg-accent" />
                  Reviews
                  <span className="w-8 h-[2px] bg-accent" />
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">What Our Client Say?</h2>
              </div>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayTestimonials.map((testimonial: any, i: number) => (
                <RevealOnScroll key={testimonial._id} direction="up" delay={i * 0.1}>
                  <div className="bg-[#B9A37E] rounded-[40px] rounded-tl-none p-10 flex flex-col md:flex-row gap-8 items-center text-white relative">
                    <div className="absolute -bottom-8 right-12 text-9xl text-white/20 font-serif leading-none">"</div>
                    <div className="w-32 h-32 shrink-0 rounded-full bg-white/20 overflow-hidden relative border-4 border-white/30">
                      {testimonial.clientPhoto ? (
                        <Image 
                          src={urlFor(testimonial.clientPhoto).url()} 
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/20">
                          <Icons.User size={32} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col relative z-10">
                      <p className="text-sm font-medium mb-6 leading-relaxed opacity-90 italic">
                        {testimonial.quote}
                      </p>
                      <div>
                        <h4 className="text-xl font-bold">{testimonial.clientName}</h4>
                        <p className="text-white/70 text-xs">{testimonial.companyLocation}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className="py-32 relative overflow-hidden bg-accent text-white">
        <div className="container mx-auto px-6 text-center relative z-10">
          <RevealOnScroll direction="up">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{ctaBanner.heading}</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">{ctaBanner.subheading}</p>
            <Link 
              href="/contact" 
              className="inline-block bg-ink text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-ink-light transition-transform hover:scale-105 duration-200"
            >
              {ctaBanner.buttonText}
            </Link>
          </RevealOnScroll>
        </div>
      </AnimatedSection>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GeneralContractor",
            "name": "Freeway Constructions",
            "url": "https://freewayconstructions.com",
            "logo": "https://freewayconstructions.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "customer service"
            }
          })
        }}
      />
    </>
  )
}
