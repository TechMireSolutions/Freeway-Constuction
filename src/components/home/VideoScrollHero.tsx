'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { SplitTextReveal } from '../shared/SplitTextReveal'

interface VideoScrollHeroProps {
  videoUrl: string
  heading: string
  subheading: string
}

export function VideoScrollHero({ videoUrl, heading, subheading }: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Independent text animations
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8])

  useEffect(() => {
    let objectUrl: string | null = null
    let abortController = new AbortController()

    const loadVideo = async () => {
      try {
        const response = await fetch(videoUrl, { signal: abortController.signal })
        const contentLength = response.headers.get('content-length')
        const total = contentLength ? parseInt(contentLength, 10) : 0
        
        let loaded = 0
        const reader = response.body?.getReader()
        if (!reader) return

        const chunks: Uint8Array[] = []
        
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          if (value) {
            chunks.push(value)
            loaded += value.length
            if (total) {
              setProgress(Math.round((loaded / total) * 100))
            }
          }
        }
        
        const blob = new Blob(chunks as any[], { type: 'video/mp4' })
        objectUrl = URL.createObjectURL(blob)
        setVideoSrc(objectUrl)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Failed to load video:', err)
        }
      }
    }

    loadVideo()

    return () => {
      abortController.abort()
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [videoUrl])

  useEffect(() => {
    let rafId: number
    let lastTime = -1

    const updateVideoTime = () => {
      if (videoRef.current && isReady) {
        const duration = videoRef.current.duration
        if (!isNaN(duration) && duration > 0) {
          const targetTime = scrollYProgress.get() * duration
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.0015) {
            videoRef.current.currentTime = targetTime
          }
        }
      }
      rafId = requestAnimationFrame(updateVideoTime)
    }

    rafId = requestAnimationFrame(updateVideoTime)
    
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isReady, scrollYProgress])

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        
        {!isReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink text-white">
            <Loader2 className="animate-spin mb-4" size={48} />
            <div className="text-xl font-medium mb-2">Loading Experience</div>
            <div className="w-64 h-1 bg-ink-light rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isReady ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            playsInline
            preload="auto"
            onCanPlayThrough={() => setIsReady(true)}
          />
        )}

        <motion.div 
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/80 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-20"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full border-[0.5px] border-white/30 bg-transparent text-xs font-bold text-white uppercase tracking-[0.3em]"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Premium Design-Build
          </motion.div>

          <div className="text-white text-center mb-8 max-w-6xl drop-shadow-2xl">
            <SplitTextReveal 
              text={heading}
              className="text-6xl md:text-7xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] justify-center"
              delay={0.5}
            />
          </div>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="text-xl md:text-3xl text-gray-200 max-w-3xl font-light leading-relaxed drop-shadow-md"
          >
            {subheading}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: textOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        >
          <span className="text-white/60 text-sm tracking-[0.2em] uppercase font-medium">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
