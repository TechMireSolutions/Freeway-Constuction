import React from 'react'
import { client } from '@/lib/sanity/client'
import { contactPageQuery, servicesQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { ContactForm } from '@/components/contact/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const revalidate = 60

export default async function ContactPage() {
  let contactData = null
  let services = []

  try {
    if (client.config().projectId) {
      contactData = await client.fetch(contactPageQuery)
      services = await client.fetch(servicesQuery)
    }
  } catch (error) {
    console.error("Sanity fetch failed", error)
  }

  // Fallbacks
  const heading = contactData?.heading || "Let's Build Something Great."
  const introText = contactData?.introText || "We're ready to bring your vision to life. Fill out the form below and our team will get back to you within 24 hours."
  const officeLocations = contactData?.officeLocations || [
    { name: 'Headquarters', address: '123 Builder Lane, Construct City, TX 75001', phone: '+1 (555) 123-4567', email: 'hello@freewayconstructions.com' }
  ]

  return (
    <>
      <AnimatedSection className="pt-40 pb-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <RevealOnScroll direction="right">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{heading}</h1>
                <p className="text-xl text-gray mb-12 max-w-lg leading-relaxed">
                  {introText}
                </p>

                <div className="space-y-12">
                  {officeLocations.map((office: any, i: number) => (
                    <div key={i} className="flex flex-col gap-4">
                      <h3 className="text-2xl font-bold">{office.name}</h3>
                      <div className="flex items-start gap-4">
                        <MapPin className="text-accent shrink-0 mt-1" />
                        <p className="text-gray-800">{office.address}</p>
                      </div>
                      {office.phone && (
                        <div className="flex items-center gap-4">
                          <Phone className="text-accent shrink-0" />
                          <p className="text-gray-800">{office.phone}</p>
                        </div>
                      )}
                      {office.email && (
                        <div className="flex items-center gap-4">
                          <Mail className="text-accent shrink-0" />
                          <p className="text-gray-800">{office.email}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-8 border-t border-border flex flex-col gap-4">
                    <h3 className="text-2xl font-bold">Business Hours</h3>
                    <div className="flex items-center gap-4">
                      <Clock className="text-accent shrink-0" />
                      <div>
                        <p className="text-gray-800">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-gray-800">Saturday: By Appointment</p>
                        <p className="text-gray-800">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Contact Form */}
            <RevealOnScroll direction="left" delay={0.2}>
              <div className="bg-white rounded-3xl shadow-xl border border-border p-8 md:p-12">
                <h2 className="text-3xl font-bold tracking-tighter mb-8">Send us a message</h2>
                <ContactForm services={services} />
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </AnimatedSection>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Freeway Constructions",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Builder Lane",
              "addressLocality": "Construct City",
              "addressRegion": "TX",
              "postalCode": "75001",
              "addressCountry": "US"
            },
            "telephone": "+1-555-123-4567"
          })
        }}
      />
    </>
  )
}
