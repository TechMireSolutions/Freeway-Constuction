import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrolling } from '@/components/shared/SmoothScrolling'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SmoothScrolling>
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </SmoothScrolling>
      <Footer />
    </div>
  )
}
