'use client'

import { useState, useEffect } from 'react'

function useCountdown() {
  const [state, setState] = useState<{ days: number; hours: number; minutes: number } | null>(null)

  useEffect(() => {
    function calc() {
      const diff = new Date('2026-09-01T00:00:00').getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
      const totalMinutes = Math.floor(diff / 60_000)
      const days = Math.floor(totalMinutes / 1440)
      const hours = Math.floor((totalMinutes % 1440) / 60)
      const minutes = totalMinutes % 60
      return { days, hours, minutes }
    }
    setState(calc())
    const id = setInterval(() => setState(calc()), 30_000)
    return () => clearInterval(id)
  }, [])

  return state
}

export default function CountdownStrip() {
  const countdown = useCountdown()

  const units = [
    { label: 'jours', value: countdown?.days },
    { label: 'heures', value: countdown?.hours },
    { label: 'min', value: countdown?.minutes },
  ]

  return (
    <section className="bg-ink border-t border-white/10 py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-6 inline-flex items-center gap-2 justify-center">
          <span
            className="inline-block rounded-full"
            style={{
              width: 6,
              height: 6,
              background: 'var(--color-accent)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          Échéance · 1er septembre 2026
        </p>
        <div className="flex items-end justify-center gap-4">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-end gap-4">
              <div>
                <p
                  className="font-display font-bold text-white leading-none"
                  style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.04em' }}
                >
                  {u.value !== undefined ? String(u.value).padStart(2, '0') : '—'}
                </p>
                <p className="font-mono text-[11px] text-muted-2 mt-2 text-center">{u.label}</p>
              </div>
              {i < units.length - 1 && (
                <p
                  className="font-display font-bold text-muted-2"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', paddingBottom: 28 }}
                >
                  :
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
