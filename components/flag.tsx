type Props = {
  colors: string[]
  className?: string
  vertical?: boolean
}

// Lightweight stripe-based flag, themed to each nation's palette.
export function Flag({ colors, className = "", vertical = true }: Props) {
  return (
    <div
      className={`flex overflow-hidden ${vertical ? "flex-row" : "flex-col"} ${className}`}
      aria-hidden="true"
    >
      {colors.map((c, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  )
}
