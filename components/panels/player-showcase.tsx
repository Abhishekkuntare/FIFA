"use client"

import { motion } from "framer-motion"
import { Trophy, Hash, MapPin } from "lucide-react"
import type { Nation } from "@/lib/nations"
import { Flag } from "@/components/flag"

type Props = {
  nation: Nation
}

export function PlayerShowcase({ nation }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-end justify-end px-4 pb-24 sm:px-10 md:items-center md:pb-0">
      <motion.div
        key={nation.code}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-auto w-full max-w-sm rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <Flag
            colors={nation.flag}
            className="h-10 w-14 rounded-md border border-border"
          />
          <div>
            <h2 className="font-heading text-2xl font-extrabold leading-none text-foreground">
              {nation.name}
            </h2>
            <p className="mt-1 font-mono text-xs tracking-widest text-primary">
              {nation.nickname}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat label="FIFA Rank" value={`#${nation.rank}`} />
          <Stat label="Titles" value={`${nation.titles}`} />
          <Stat label="Confed." value={nation.confederation} />
        </div>

        {/* Star player */}
        <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Star Player
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-xl font-bold text-foreground">
                {nation.star.name}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {nation.star.pos}
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" /> {nation.star.num}
                </span>
              </div>
            </div>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full font-heading text-2xl font-extrabold text-primary-foreground box-glow"
              style={{ backgroundColor: nation.primary }}
            >
              {nation.star.num}
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Trophy className="h-3.5 w-3.5 text-[var(--gold)]" />
          {nation.titles > 0
            ? `${nation.titles}-time World Cup champions.`
            : "Chasing a first-ever World Cup crown."}
        </p>
      </motion.div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 py-2.5">
      <p className="font-heading text-base font-bold text-foreground">{value}</p>
      <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
