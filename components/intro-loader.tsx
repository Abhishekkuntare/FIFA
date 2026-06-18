"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

type Props = {
  onEnter: () => void
}

// Cinematic intro with a GSAP-driven loading counter, then a CTA to enter
// (the click also unlocks the Web Audio context).
export function IntroLoader({ onEnter }: Props) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const counterRef = useRef({ v: 0 })

  useEffect(() => {
    const obj = counterRef.current
    const tween = gsap.to(obj, {
      v: 100,
      duration: 2.6,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(obj.v)),
      onComplete: () => setReady(true),
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background grain"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <p className="mb-4 font-mono text-xs tracking-[0.5em] text-primary">
          FIFA WORLD CUP 2026
        </p>
        <h1 className="font-heading text-5xl font-extrabold leading-none tracking-tight text-foreground sm:text-7xl">
          ENTER THE
          <span className="block text-glow text-primary">ARENA</span>
        </h1>

        <div className="mt-10 w-64 max-w-[80vw]">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
            <span>LOADING WORLD</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary box-glow transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {ready && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onEnter}
            className="mt-10 rounded-full bg-primary px-10 py-4 font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground box-glow transition-transform hover:scale-105"
          >
            Kick Off
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
