'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function RevealOnScroll({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up' 
}: RevealOnScrollProps) {
  const getInitialY = () => {
    if (direction === 'up') return 50
    if (direction === 'down') return -50
    return 0
  }

  const getInitialX = () => {
    if (direction === 'left') return 50
    if (direction === 'right') return -50
    return 0
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: getInitialY(),
        x: getInitialX()
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
