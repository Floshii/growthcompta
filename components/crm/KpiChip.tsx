'use client'
import { useState, useEffect, useRef } from 'react'

// Animation easeOutCubic de 0 → target
function useCountUp(target: number, duration = 900): number {
  const [val, setVal] = useState(0)
  const rafRef = useRef<number>(0)
  const fromRef = useRef(0)

  useEffect(() => {
    const start = performance.now()
    const startVal = fromRef.current
    function tick(now: number) {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(startVal + (target - startVal) * eased)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return val
}

interface KpiChipProps {
  label: string
  target: number
  format?: (n: number) => string
  accent: string
  suffix?: string
  delta?: number | null
  big?: boolean
}

export default function KpiChip({ label, target, format, accent, suffix, delta, big }: KpiChipProps) {
  const v = useCountUp(target, 1000)
  const display = format ? format(v) : Math.round(v).toString()

  return (
    <div className="flex flex-col gap-2 bg-crm-surface px-[18px] py-[14px] min-w-0">
      {/* Label + delta */}
      <div className="flex items-center gap-[7px]">
        <span className="text-[11px] font-semibold tracking-[0.09em] uppercase text-crm-muted font-crm whitespace-nowrap">
          {label}
        </span>
        {delta != null && (
          <span
            className="font-crm-mono text-[10.5px] font-semibold px-1.5 py-px rounded-[5px]"
            style={{
              color: delta >= 0 ? '#22C55E' : '#EF4444',
              background: delta >= 0 ? 'rgba(34,197,94,0.13)' : 'rgba(239,68,68,0.10)',
            }}
          >
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
          </span>
        )}
      </div>
      {/* Nombre animé */}
      <div
        className="font-crm-mono font-bold leading-none tracking-[-0.03em] whitespace-nowrap"
        style={{
          fontSize: big ? 38 : 30,
          color: accent,
          textShadow: `0 0 26px ${accent}40`,
        }}
      >
        {display}
        {suffix && <span className="text-[14px] font-normal text-crm-muted ml-0.5">{suffix}</span>}
      </div>
    </div>
  )
}
