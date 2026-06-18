"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX, Globe2 } from "lucide-react"
import type { ViewMode } from "@/components/three/scene"

const NAV: { id: ViewMode; label: string }[] = [
  { id: "hero", label: "Kickoff" },
  { id: "players", label: "Players" },
  { id: "stadium", label: "Stadiums" },
]

type Props = {
  view: ViewMode
  onView: (v: ViewMode) => void
  muted: boolean
  onToggleMute: () => void
}

export function TopBar({ view, onView, muted, onToggleMute }: Props) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-8"
    >
      <div className="pointer-events-auto flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 box-glow">
          <Globe2 className="h-5 w-5 text-primary" />
        </div>
        <div className="leading-none">
          <p className="font-heading text-sm font-extrabold tracking-[0.2em] text-foreground">
            WORLD CUP
          </p>
          <p className="font-mono text-[10px] tracking-[0.4em] text-primary">
            2026 · 3D
          </p>
        </div>
      </div>

      <nav className="pointer-events-auto hidden items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur-md md:flex">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => onView(n.id)}
            className="relative rounded-full px-5 py-2 font-heading text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            {view === n.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-primary box-glow"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${view === n.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {n.label}
            </span>
          </button>
        ))}
      </nav>

      <button
        onClick={onToggleMute}
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </motion.header>
  )
}

export function MobileNav({
  view,
  onView,
}: {
  view: ViewMode
  onView: (v: ViewMode) => void
}) {
  return (
    <nav className="pointer-events-auto fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[calc(100%-2rem)] max-w-sm items-center justify-around rounded-full border border-border bg-card/70 p-1 backdrop-blur-md md:hidden">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => onView(n.id)}
          className={`flex-1 rounded-full px-3 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-widest transition-colors ${
            view === n.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          {n.label}
        </button>
      ))}
    </nav>
  )
}
