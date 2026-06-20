'use client'

import { useState, useEffect } from 'react'

function useDaysUntilSept2026() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    function calc() {
      const target = new Date('2026-09-01T00:00:00')
      return Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86400000))
    }
    setDays(calc())
    const id = setInterval(() => setDays(calc()), 60_000)
    return () => clearInterval(id)
  }, [])
  return days
}

export default function StatsBand() {
  const days = useDaysUntilSept2026()

  const stats = [
    {
      idx: '/01',
      num: days !== null ? `J‑${days}` : '—',
      unit: null as string | null,
      lbl: "avant l'obligation de réception · 1er septembre 2026",
    },
    {
      idx: '/02',
      num: '151',
      unit: null as string | null,
      lbl: 'plateformes (PDP) agréées · une seule à raccorder pour votre cabinet',
    },
    {
      idx: '/03',
      num: '20–30',
      unit: '%' as string | null,
      lbl: "de capacité libérée par cabinet sur ce type d'automatisation",
    },
  ]

  return (
    <section className="bg-ink">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.idx}
              className="relative overflow-hidden"
              style={{
                padding: '56px 30px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <p
                className="font-mono absolute"
                style={{ top: 18, right: 18, fontSize: 11, color: 'var(--color-accent)' }}
              >
                {s.idx}
              </p>
              <p
                className="font-display font-bold text-white"
                style={{
                  fontSize: 'clamp(52px, 5.4vw, 84px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                }}
              >
                {s.num}
                {s.unit && (
                  <span style={{ color: 'var(--color-accent)', fontSize: '0.42em', marginLeft: '0.1em' }}>
                    {s.unit}
                  </span>
                )}
              </p>
              <p
                className="font-mono uppercase leading-snug max-w-[260px]"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: 'var(--color-muted-2)',
                  marginTop: 14,
                }}
              >
                {s.lbl}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
