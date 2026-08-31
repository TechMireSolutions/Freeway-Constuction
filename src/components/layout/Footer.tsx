import React from 'react'
import Link from 'next/link'
// Social icons have been replaced with text


export function Footer() {
  return (
    <footer className="bg-ink text-base py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            Freeway
          </Link>
          <p className="text-gray mt-2 max-w-sm">
            Building spaces that last. Premium construction and design-build services.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold mb-2">Services</h4>
          <Link href="/services/commercial" className="text-gray hover:text-accent transition-colors">Commercial</Link>
          <Link href="/services/residential" className="text-gray hover:text-accent transition-colors">Residential</Link>
          <Link href="/services/renovations" className="text-gray hover:text-accent transition-colors">Renovations</Link>
          <Link href="/services" className="text-gray hover:text-accent transition-colors">View All &rarr;</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <Link href="/portfolio" className="text-gray hover:text-accent transition-colors">Portfolio</Link>
          <Link href="/about" className="text-gray hover:text-accent transition-colors">About Us</Link>
          <Link href="/contact" className="text-gray hover:text-accent transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold mb-2">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="text-gray hover:text-accent transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray hover:text-accent transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray hover:text-accent transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray hover:text-accent transition-colors">
              LinkedIn
            </a>
          </div>
          <div className="mt-4 text-gray text-sm">
            <p>123 Builder Lane</p>
            <p>Construct City, TX 75001</p>
            <p className="mt-2">hello@freewayconstructions.com</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-ink-light flex flex-col md:flex-row justify-between items-center text-sm text-gray">
        <p>&copy; {new Date().getFullYear()} Freeway Constructions. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
