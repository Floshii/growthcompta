'use client'

import { useSyncExternalStore } from 'react'

// Échéance légale : 1er septembre 2026 (réception facture électronique, toutes entreprises)
const TARGET = new Date('2026-09-01T00:00:00+02:00').getTime()
// Début de la fenêtre de repricing (année calendaire)
const WINDOW_START = new Date('2026-01-01T00:00:00+01:00').getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  progress: number
  done: boolean
}

function computeTimeLeft(): TimeLeft {
  const now = Date.now()
  const diff = Math.max(0, TARGET - now)
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1_000)
  const progress = Math.min(100, Math.max(0, ((now - WINDOW_START) / (TARGET - WINDOW_START)) * 100))
  return { days, hours, minutes, seconds, progress, done: diff <= 0 }
}

let cachedTime: TimeLeft | null = null
let cachedSecond = -1

function getSnapshot(): TimeLeft | null {
  const second = Math.floor(Date.now() / 1000)
  if (cachedTime === null || second !== cachedSecond) {
    cachedSecond = second
    cachedTime = computeTimeLeft()
  }
  return cachedTime
}

function getServerSnapshot(): TimeLeft | null {
  return null
}

function subscribe(callback: () => void): () => void {
  const interval = setInterval(callback, 1000)
  return () => clearInterval(interval)
}

export function useCountdown(): TimeLeft | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Texte "J-XX" — utilisé en ligne dans le hero / CTA final */
export function CountdownDays({ className = '' }: { className?: string }) {
  const time = useCountdown()
  return <span className={className}>{time ? `J-${time.days}` : 'J-…'}</span>
}

/** Nombre de jours restants, sans préfixe — pour les gros chiffres de stats bar */
export function CountdownDaysValue() {
  const time = useCountdown()
  return <>{time ? time.days : '–'}</>
}

/** Bloc complet jours / heures / min / sec */
export function CountdownDigits({ dark = false }: { dark?: boolean }) {
  const time = useCountdown()
  const units: { label: string; value: number | null }[] = [
    { label: 'Jours', value: time?.days ?? null },
    { label: 'Heures', value: time?.hours ?? null },
    { label: 'Min', value: time?.minutes ?? null },
    { label: 'Sec', value: time?.seconds ?? null },
  ]

  return (
    <div className="flex items-center justify-center gap-2.5 md:gap-4">
      {units.map((u) => (
        <div
          key={u.label}
          className={`flex flex-col items-center justify-center rounded-2xl w-[68px] md:w-[84px] py-3 md:py-4 ${
            dark ? 'bg-white/[0.04] border border-white/10' : 'bg-paper border border-line'
          }`}
        >
          <span
            className={`font-display font-bold tabular-nums leading-none ${dark ? 'text-white' : 'text-ink'}`}
            style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em' }}
          >
            {u.value === null ? '–' : String(u.value).padStart(2, '0')}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-[0.12em] mt-1.5 ${dark ? 'text-muted-2' : 'text-muted'}`}>
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Barre de progression de la fenêtre de repricing 2026 */
export function CountdownBar({ dark = false }: { dark?: boolean }) {
  const time = useCountdown()
  const progress = time?.progress ?? 0

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className={`h-1.5 w-full rounded-full overflow-hidden ${dark ? 'bg-white/10' : 'bg-line'}`}>
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={`flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] mt-2 ${dark ? 'text-muted-2' : 'text-muted'}`}>
        <span>1er janvier 2026</span>
        <span>1er septembre 2026 · échéance légale</span>
      </div>
    </div>
  )
}
