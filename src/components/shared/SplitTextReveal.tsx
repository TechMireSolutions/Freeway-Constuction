'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import clsx from 'clsx'

interface SplitTextRevealProps {
  text: string
  className?: string
  delay?: number
}

export const SplitTextReveal = ({ text, className, delay = 0 }: SplitTextRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const words = text.split(" ")

  return (
    <h2 ref={ref} className={clsx("flex flex-wrap overflow-hidden", className)}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "110%", rotateZ: 5 }}
            animate={isInView ? { y: 0, rotateZ: 0 } : { y: "110%", rotateZ: 5 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Custom sleek spring-like cubic bezier
              delay: delay + i * 0.03,
            }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </h2>
  )
}
