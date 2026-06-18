"use client"

import { motion } from "framer-motion"
import { Users, Calendar, MapPin } from "lucide-react"
import { STADIUMS, type Stadium } from "@/lib/stadiums"

type Props = {
  stadium: Stadium
  onSelect: (s: Stadium) => void
}

export function StadiumExplorer({ stadium, onSelect }: Props) {
  return (
    <>
      {/* Info card */}
      <div className="pointer-events-none fixed inset-x-0 top-24 z-20 flex justify-center px-4">
        <motion.div
          key={stadium.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto w-full max-w-lg rounded-2xl border border-border bg-card/70 p-5 text-center backdrop-blur-xl"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
            Stadium Exploration
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-foreground">
            {stadium.name}
          </h2>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {stadium.city}, {stadium.country}
          </p>
          <p className="mx-auto mt-3 max-w-md text-pretty text-xs leading-relaxed text-muted-foreground">
            {stadium.blurb}
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="flex items-center gap-1.5 text-xs text-foreground">
              <Users className="h-3.5 w-3.5 text-primary" />
              {stadium.capacity.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Opened {stadium.opened}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stadium picker */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex justify-center px-4 md:bottom-8">
        <div className="pointer-events-auto flex max-w-full gap-2 overflow-x-auto rounded-full border border-border bg-card/70 p-1.5 backdrop-blur-xl">
          {STADIUMS.map((s) => {
            const active = s.id === stadium.id
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                className={`shrink-0 rounded-full px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wider transition-all ${
                  active
                    ? "bg-primary text-primary-foreground box-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.name.split(" ")[0]}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
