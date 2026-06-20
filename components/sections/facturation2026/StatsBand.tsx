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
      lbl: "avant l'obligation de réception · 1er septembre 2026",
    },
    {
      idx: '/02',
      num: '151',
      lbl: 'plateformes (PDP) agréées · une seule à raccorder pour votre cabinet',
    },
    {
      idx: '/03',
      num: '20–30 %',
      lbl: "de capacité libérée par cabinet sur ce type d'automatisation",
    },
  ]

  return (
    <section className="bg-ink py-14 md:py-16">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.idx} className="py-8 md:py-4 md:px-10 first:md:pl-0 last:md:pr-0">
              <p className="font-mono text-[11px] text-accent mb-3">{s.idx}</p>
              <p
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1 }}
              >
                {s.num}
              </p>
              <p className="font-mono text-[12px] text-muted-2 mt-3 leading-snug max-w-[260px]">{s.lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
