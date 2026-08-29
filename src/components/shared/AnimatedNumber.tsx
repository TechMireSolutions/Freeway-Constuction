'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useInView, motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedNumberProps {
  value: string // e.g. "3K+", "150+"
  className?: string
}

export const AnimatedNumber = ({ value, className }: AnimatedNumberProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  // Parse the number and the suffix
  const numMatches = value.match(/[\d.]+/)
  const suffixMatch = value.match(/[^\d.]+$/)
  
  const endNumber = numMatches ? parseFloat(numMatches[0]) : 0
  const suffix = suffixMatch ? suffixMatch[0] : ""
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  })
  
  useEffect(() => {
    if (isInView) {
      springValue.set(endNumber)
    }
  }, [isInView, endNumber, springValue])
  
  const displayValue = useTransform(springValue, (current) => {
    // Determine decimal places based on original number
    const isFloat = endNumber % 1 !== 0
    if (isFloat) {
      return current.toFixed(1) + suffix
    }
    return Math.floor(current) + suffix
  })

  return (
    <motion.div ref={ref} className={className}>
      {displayValue}
    </motion.div>
  )
}
