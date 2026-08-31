'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <div className="absolute top-12 left-4 right-4 z-50 flex justify-between items-center px-8 md:px-16 container mx-auto pointer-events-none">
      {/* Logo */}
      <Link href="/" className="pointer-events-auto text-2xl md:text-3xl font-bold tracking-tight text-white flex-shrink-0">
        novadesign
      </Link>

      {/* Desktop Nav */}
      <nav className="pointer-events-auto hidden lg:flex items-center gap-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-8 py-3.5 text-white text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-white/70 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right CTA */}
      <Link
        href="/contact"
        className="pointer-events-auto hidden lg:flex px-7 py-3.5 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition-colors flex-shrink-0"
      >
        Get a Quote
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden pointer-events-auto text-white bg-black/20 backdrop-blur-md p-2 rounded-full"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[120%] left-4 right-4 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl flex flex-col px-6 py-6 gap-4 lg:hidden text-black pointer-events-auto border border-black/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium py-2 border-b border-black/5 last:border-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center mt-2 px-6 py-4 rounded-full bg-black text-white font-medium"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </div>
  )
}
