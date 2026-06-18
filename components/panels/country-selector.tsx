"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, Search } from "lucide-react"
import { NATIONS, CONFEDERATIONS, type Nation } from "@/lib/nations"
import { Flag } from "@/components/flag"

type Props = {
  selected: Nation
  onSelect: (n: Nation) => void
}

export function CountrySelector({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(true)
  const [filter, setFilter] = useState<string>("ALL")
  const [query, setQuery] = useState("")

  const nations = NATIONS.filter((n) => {
    const matchConf = filter === "ALL" || n.confederation === filter
    const matchQuery =
      query.trim() === "" ||
      n.name.toLowerCase().includes(query.toLowerCase()) ||
      n.code.toLowerCase().includes(query.toLowerCase())
    return matchConf && matchQuery
  })

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="pointer-events-auto fixed inset-x-3 bottom-20 z-30 mx-auto max-w-5xl md:inset-x-auto md:bottom-8 md:left-8 md:max-w-md"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-xl">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <span className="flex items-center gap-2">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Select Nation
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {NATIONS.length} teams
            </span>
          </span>
          <motion.span animate={{ rotate: open ? 0 : 180 }}>
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {/* Search */}
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Confederation filter */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {["ALL", ...CONFEDERATIONS].map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider transition-colors ${
                        filter === c
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div className="grid max-h-[38vh] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
                  {nations.map((n) => {
                    const active = n.code === selected.code
                    return (
                      <button
                        key={n.code}
                        onClick={() => onSelect(n)}
                        className={`group flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                          active
                            ? "border-primary bg-primary/10 box-glow"
                            : "border-border bg-background/40 hover:border-primary/40"
                        }`}
                      >
                        <Flag
                          colors={n.flag}
                          className="h-6 w-9 shrink-0 rounded-sm border border-border"
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-heading text-xs font-semibold text-foreground">
                            {n.code}
                          </span>
                          <span className="block truncate text-[10px] text-muted-foreground">
                            {n.name}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                  {nations.length === 0 && (
                    <p className="col-span-full py-6 text-center text-xs text-muted-foreground">
                      No nations found.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}
