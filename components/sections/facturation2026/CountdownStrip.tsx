'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { FE_CTA_LABEL } from './constants'

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
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  const units = [
    { label: 'jours', value: countdown?.days },
    { label: 'heures', value: countdown?.hours },
    { label: 'minutes', value: countdown?.minutes },
  ]

  return (
    <section className="bg-ink py-12 md:py-14">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Échéance · 1er septembre 2026
            </p>
            <div className="flex items-end gap-5">
              {units.map((u, i) => (
                <div key={u.label} className="flex items-end gap-5">
                  <div>
                    <p
                      className="font-display font-bold text-white leading-none"
                      style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.04em' }}
                    >
                      {u.value !== undefined ? String(u.value).padStart(2, '0') : '—'}
                    </p>
                    <p className="font-mono text-[11px] text-muted-2 mt-1.5">{u.label}</p>
                  </div>
                  {i < units.length - 1 && (
                    <p className="font-display font-bold text-muted pb-6" style={{ fontSize: 32 }}>:</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[15px] text-[#d6d4cf] mb-5 max-w-[340px] leading-relaxed">
              Chaque dossier migré sans repricing est du CA perdu pour 3 ans.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { source: 'countdown_strip', page: 'facturation-electronique-2026' })}
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[14px] px-[20px] py-[12px] rounded-full hover:bg-accent-deep transition-colors group"
            >
              {FE_CTA_LABEL}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
