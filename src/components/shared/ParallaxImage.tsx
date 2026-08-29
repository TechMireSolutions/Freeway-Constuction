'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  parallaxMultiplier?: number // Higher = more movement
}

export const ParallaxImage = ({ src, alt, className, parallaxMultiplier = 0.2 }: ParallaxImageProps) => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // We scale the image up slightly so we have room to move it without showing borders
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  // The actual movement range depends on how much padding we give it inside the overflow hidden container

  return (
    <div ref={containerRef} className={clsx("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image 
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  )
}
