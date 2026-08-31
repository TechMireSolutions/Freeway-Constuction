import React from 'react'
import { client } from '@/lib/sanity/client'
import { homePageQuery, servicesQuery, featuredProjectsQuery, testimonialsQuery, aboutPageQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'
import { SplitTextReveal } from '@/components/shared/SplitTextReveal'
import { ParallaxImage } from '@/components/shared/ParallaxImage'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

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
  const heroBackgroundImage = homeData?.heroBackgroundImage || null
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
      <section className="relative min-h-[calc(100vh-2rem)] m-4 rounded-[2.5rem] flex items-center overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroBackgroundImage ? urlFor(heroBackgroundImage).url() : "/placeholder-1.jpg"} 
            alt="Interior Background" 
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-8 md:px-16 relative z-10 w-full flex flex-col md:flex-row justify-between items-end pb-16 pt-40 gap-16">
          <div className="w-full md:w-[55%]">
            <h1 className="text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] font-normal text-white leading-[0.95] tracking-tight">
              BUILDING<br />
              SPACES,<br />
              SHAPING<br />
              FUTURES
            </h1>
          </div>
          <div className="w-full md:w-[45%] flex flex-col gap-8 pb-2">
            <p className="text-lg md:text-[1.35rem] text-white/95 font-normal leading-relaxed max-w-lg">
              At Novadesign, we combine innovative design with exceptional craftsmanship to create homes, offices, and commercial spaces that inspire. From concept to completion, we turn your vision into reality with precision, style, and a personal touch.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-3.5 rounded-full bg-black text-white font-medium text-[13px] hover:bg-black/80 transition-colors"
              >
                Get a Quote
              </Link>
              <Link 
                href="/portfolio" 
                className="px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-[13px] hover:bg-white/20 transition-colors"
              >
                View Our Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="right">
              <div className="flex gap-4">
                <div className="w-1/2 rounded-[2rem] rounded-bl-none bg-gray-200 h-96 relative overflow-hidden">
                  <Image src="/placeholder-2.jpg" alt="Construction Worker" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                  <div className="bg-accent text-white p-8 rounded-[2rem] rounded-tr-none flex flex-col justify-center items-center text-center h-44 shadow-xl relative -ml-12 z-10 mt-12">
                    <span className="text-5xl font-bold"><AnimatedNumber value="25+" /></span>
                    <span className="text-sm mt-2 font-medium">Years Experience</span>
                  </div>
                  <div className="rounded-[2rem] rounded-br-none bg-gray-200 h-48 relative overflow-hidden mt-4">
                    <Image src="/placeholder-1.jpg" alt="Construction Site" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left">
              <div>
                <h3 className="text-accent font-bold uppercase mb-4 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-accent" />
                  The Largest Privately Held Real Estate Investors And Managers In The World
                </h3>
                <SplitTextReveal 
                  text="We're Always Think On Your Dream"
                  className="text-4xl md:text-6xl font-bold max-w-4xl tracking-tighter mb-8 leading-[1.1]"
                />
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Icons.Globe className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Worldwide Services</h4>
                      <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Icons.Award className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Best Company Award Winners</h4>
                      <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 bg-[#0a0a0a] text-white rounded-[3rem]">
        <div className="container mx-auto px-6">
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="mb-12">
              <h3 className="text-accent font-bold uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-accent" />
                Services
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-xl">Construction Service To Our Clients</h2>
            </div>
          </RevealOnScroll>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {displayServices.slice(0, 4).map((service: any, index: number) => {
                return (
                  <RevealOnScroll key={service._id} direction="up" delay={index * 0.1}>
                    <Link href={`/services/${service.slug || ''}`} className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${index === 1 ? 'bg-accent border-accent text-white' : 'bg-transparent border-white/10 text-gray-300 hover:border-white/30 hover:text-white'}`}>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                      <Icons.ArrowUpRight className={index === 1 ? 'text-white' : 'text-gray-500'} />
                    </Link>
                  </RevealOnScroll>
                )
              })}
            </div>
            <div className="w-full md:w-1/2">
               <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden">
                  <Image 
                    src="/placeholder-2.jpg" 
                    alt="Commercial Construction" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Commercial Construction</h3>
                    <p className="text-gray-300 text-sm">We provide high-quality commercial construction services focusing on innovation and sustainability.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((stat: any, index: number) => (
              <RevealOnScroll key={stat._key} direction="up" delay={index * 0.1} className="w-full md:w-1/4">
                <div className="text-center group py-4 md:py-0">
                  <AnimatedNumber 
                    value={stat.number} 
                    className="text-5xl md:text-6xl font-bold mb-2 transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="text-sm font-medium uppercase text-gray-500">{stat.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Featured Portfolio section */}
      {displayProjects?.length > 0 && (
        <AnimatedSection className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-accent font-bold uppercase mb-4 flex items-center justify-center gap-4">
                <span className="w-12 h-[2px] bg-accent" />
                Projects
                <span className="w-12 h-[2px] bg-accent" />
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">We Provide Effective<br/>Solution In Construction</h2>
            </div>
            <div className="flex flex-col gap-16 max-w-5xl mx-auto">
              {displayProjects.map((project: any, i: number) => (
                <RevealOnScroll key={project._id} direction="up" delay={i * 0.1}>
                  <Link href={`/portfolio/${project.slug}`} className="group block relative">
                    <div className={`relative aspect-[21/9] overflow-hidden shadow-2xl ${i % 2 === 0 ? 'rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl' : 'rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl'}`}>
                      {project.coverImage ? (
                        <Image 
                          src={urlFor(project.coverImage).width(1200).height(600).url()} 
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <Image src={`/placeholder-${(i % 2) + 1}.jpg`} alt={project.title} fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      )}
                      
                      {/* Floating Card inside */}
                      <div className={`absolute ${i % 2 === 0 ? 'bottom-8 left-8' : 'bottom-8 right-8'} bg-white p-6 rounded-2xl shadow-xl max-w-sm`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">{project.clientName}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-ink mb-2">{project.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2">Premium construction delivering high quality standards and modern aesthetics for {project.clientName}.</p>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                           <Icons.ArrowUpRight className="text-white" />
                        </div>
                      </div>
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
                <h3 className="text-accent font-bold uppercase mb-4 flex items-center justify-center gap-4">
                  <span className="w-8 h-[2px] bg-accent" />
                  Team Members
                  <span className="w-8 h-[2px] bg-accent" />
                </h3>
                <SplitTextReveal 
                  text="Our Professional Team"
                  className="text-5xl md:text-7xl font-bold tracking-tighter justify-center"
                />
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayTeam.map((member: any, i: number) => (
                <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                  <div className="text-center group">
                    <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-white/10 border-4 border-transparent hover:border-accent transition-all duration-300">
                      {member.photo ? (
                        <Image 
                          src={urlFor(member.photo).url()}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <Image src={`/placeholder-${(i % 2) + 1}.jpg`} alt={member.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-accent text-sm font-medium mt-1">{member.role}</p>
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
                <h3 className="text-accent font-bold uppercase mb-4 flex items-center justify-center gap-4">
                  <span className="w-8 h-[2px] bg-accent" />
                  Reviews
                  <span className="w-8 h-[2px] bg-accent" />
                </h3>
                <SplitTextReveal 
                  text="What Our Client Say"
                  className="text-4xl md:text-6xl font-bold tracking-tighter justify-center"
                />
              </div>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {displayTestimonials.map((testimonial: any, i: number) => (
                <RevealOnScroll key={testimonial._id} direction="up" delay={i * 0.1}>
                  <div className="bg-white rounded-3xl p-10 md:p-14 relative shadow-lg">
                    <div className="absolute top-10 right-10 opacity-10">
                      <Icons.Quote size={80} className="text-accent" />
                    </div>
                    <p className="text-xl md:text-2xl font-medium mb-10 leading-relaxed text-ink relative z-10 max-w-xl">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden relative shadow-md">
                        {testimonial.clientPhoto ? (
                          <Image 
                            src={urlFor(testimonial.clientPhoto).url()} 
                            alt={testimonial.clientName}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <Image src={`/placeholder-${(i % 2) + 1}.jpg`} alt={testimonial.clientName} fill sizes="64px" className="object-cover" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{testimonial.clientName}</h4>
                        <p className="text-accent font-medium text-sm">{testimonial.companyLocation}</p>
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
