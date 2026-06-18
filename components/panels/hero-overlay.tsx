"use client"

import { motion } from "framer-motion"
import { ArrowRight, Hand } from "lucide-react"
import type { Nation } from "@/lib/nations"
import type { ViewMode } from "@/components/three/scene"

type Props = {
  nation: Nation
  onView: (v: ViewMode) => void
}

export function HeroOverlay({ nation, onView }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-center px-4 sm:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-primary"
        >
          <span className="h-px w-10 bg-primary" />
          USA · MEXICO · CANADA — JUNE 2026
        </motion.p>

        <h1 className="font-heading text-[16vw] font-extrabold leading-[0.82] tracking-tight text-foreground sm:text-[12vw] lg:text-[10rem]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block text-balance"
          >
            THE GAME
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="block text-glow text-primary"
          >
            REIMAGINED
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          An immersive, real-time 3D journey through the FIFA World Cup. Explore
          all 48 nations, step inside legendary stadiums, and meet the stars in a
          cinematic WebGL experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => onView("players")}
            className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-primary-foreground box-glow transition-transform hover:scale-[1.03]"
          >
            Meet {nation.code}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onView("stadium")}
            className="rounded-full border border-border bg-card/50 px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary"
          >
            Explore Stadiums
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground"
        >
          <Hand className="h-3.5 w-3.5" />
          DRAG TO ROTATE THE MODEL
        </motion.p>
      </div>
    </div>
  )
}
