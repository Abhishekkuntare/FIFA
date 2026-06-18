"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence, motion } from "framer-motion"
import { NATIONS, type Nation } from "@/lib/nations"
import { STADIUMS, type Stadium } from "@/lib/stadiums"
import { getSound } from "@/lib/sound"
import type { ViewMode } from "@/components/three/scene"
import { IntroLoader } from "@/components/intro-loader"
import { TopBar, MobileNav } from "@/components/hud/top-bar"
import { HeroOverlay } from "@/components/panels/hero-overlay"
import { CountrySelector } from "@/components/panels/country-selector"
import { PlayerShowcase } from "@/components/panels/player-showcase"
import { StadiumExplorer } from "@/components/panels/stadium-explorer"

const Scene = dynamic(
  () => import("@/components/three/scene").then((m) => m.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  },
)

export function WorldCupExperience() {
  const [entered, setEntered] = useState(false)
  const [view, setView] = useState<ViewMode>("hero")
  const [nation, setNation] = useState<Nation>(NATIONS[0])
  const [stadium, setStadium] = useState<Stadium>(STADIUMS[0])
  const [muted, setMuted] = useState(true)

  // drag-to-rotate state
  const [rotation, setRotation] = useState(0)
  const dragging = useRef(false)
  const lastX = useRef(0)

  const tint = view === "stadium" ? stadium.tint : nation.primary

  const handleEnter = useCallback(() => {
    const sound = getSound()
    sound?.unlock()
    sound?.setMuted(false)
    setMuted(false)
    setEntered(true)
  }, [])

  const toggleMute = useCallback(() => {
    const sound = getSound()
    const next = sound?.toggleMute() ?? true
    setMuted(next)
  }, [])

  const changeView = useCallback((v: ViewMode) => {
    setView(v)
    getSound()?.blip(v === "stadium" ? 520 : 720)
  }, [])

  const selectNation = useCallback((n: Nation) => {
    setNation(n)
    const s = getSound()
    s?.blip(680)
    s?.roar()
  }, [])

  const selectStadium = useCallback((s: Stadium) => {
    setStadium(s)
    getSound()?.whistle()
  }, [])

  // pointer drag handlers (work for mouse + touch)
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    lastX.current = e.clientX
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    setRotation((r) => r + dx * 0.01)
  }
  const endDrag = () => {
    dragging.current = false
  }

  // gentle auto-spin nudge when idle on player view handled in scene animation
  useEffect(() => {
    if (view !== "players") return
  }, [view])

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* 3D layer + drag surface */}
      <div
        className="absolute inset-0 touch-none"
        style={{ cursor: dragging.current ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {entered && (
          <Scene
            nation={nation}
            view={view}
            tint={tint}
            playerRotation={rotation}
          />
        )}
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7))]" />

      {/* UI */}
      {entered && (
        <>
          <TopBar
            view={view}
            onView={changeView}
            muted={muted}
            onToggleMute={toggleMute}
          />
          <MobileNav view={view} onView={changeView} />

          <AnimatePresence mode="wait">
            {view === "hero" && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <HeroOverlay nation={nation} onView={changeView} />
              </motion.div>
            )}
            {view === "players" && (
              <motion.div
                key="players"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PlayerShowcase nation={nation} />
              </motion.div>
            )}
            {view === "stadium" && (
              <motion.div
                key="stadium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <StadiumExplorer stadium={stadium} onSelect={selectStadium} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Country selector available on hero + players views */}
          {view !== "stadium" && (
            <CountrySelector selected={nation} onSelect={selectNation} />
          )}
        </>
      )}

      {/* Intro */}
      <AnimatePresence>
        {!entered && <IntroLoader onEnter={handleEnter} />}
      </AnimatePresence>
    </main>
  )
}
