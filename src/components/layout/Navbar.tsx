'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header
        className={`pointer-events-auto transition-all duration-300 w-full max-w-5xl rounded-full border ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl shadow-lg border-white/20 py-3 text-ink' 
            : 'bg-black/20 backdrop-blur-md shadow-lg border-white/10 py-4 text-white'
        }`}
      >
        <div className="px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Freeway
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-accent transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-accent text-base text-white hover:bg-ink-light transition-transform hover:scale-105 duration-200"
            >
              Get a quote
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden ${isScrolled ? 'text-ink' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-[110%] left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl flex flex-col px-6 py-4 gap-4 md:hidden text-ink pointer-events-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium py-2 border-b border-border last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center mt-2 px-6 py-3 rounded-full bg-accent text-white font-medium"
            >
              Get a quote
            </Link>
          </div>
        )}
      </header>
    </div>
  )
}
