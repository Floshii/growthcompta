'use client'

import { useEffect, useState } from 'react'

interface Props {
  score: number
  size?: number
  animate?: boolean
}

export default function ScoreGauge({ score, size = 280, animate = true }: Props) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score)

  useEffect(() => {
    if (!animate) { setDisplayed(score); return }
    let cancelled = false
    const start = performance.now()
    const dur = 1400
    const tick = (t: number) => {
      if (cancelled) return
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayed(Math.round(score * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    const fb = setTimeout(() => { if (!cancelled) setDisplayed(score) }, dur + 250)
    return () => { cancelled = true; clearTimeout(fb) }
  }, [score, animate])

  const r = 100; const cx = 120; const cy = 120
  const arcStart = -225 * (Math.PI / 180)
  const arcEnd = 45 * (Math.PI / 180)
  const pct = displayed / 100
  const totalArcLength = r * (270 * Math.PI / 180) // arc spans 270°

  const ptAt = (t: number) => ({
    x: cx + r * Math.cos(arcStart + (arcEnd - arcStart) * t),
    y: cy + r * Math.sin(arcStart + (arcEnd - arcStart) * t),
  })

  const bgPath = (() => {
    const a = ptAt(0); const b = ptAt(1)
    return `M ${a.x} ${a.y} A ${r} ${r} 0 1 1 ${b.x} ${b.y}`
  })()

  const color = displayed >= 76 ? '#0a5fbf' : displayed >= 56 ? '#0a8f4a' : displayed >= 36 ? '#e85d2b' : '#dc4a2b'

  return (
    <div style={{ width: size, height: size * 0.85, position: 'relative' }}>
      <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <path d={bgPath} fill="none" stroke="#e6e1d3" strokeWidth="18" strokeLinecap="round" />
        {pct > 0 && (
          <path
            d={bgPath}
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${pct * totalArcLength} ${totalArcLength}`}
            style={{ filter: 'drop-shadow(0 4px 12px rgba(232,93,43,0.25))' }}
          />
        )}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const p1 = { x: cx + (r + 14) * Math.cos(arcStart + (arcEnd - arcStart) * t), y: cy + (r + 14) * Math.sin(arcStart + (arcEnd - arcStart) * t) }
          const p2 = { x: cx + (r + 22) * Math.cos(arcStart + (arcEnd - arcStart) * t), y: cy + (r + 22) * Math.sin(arcStart + (arcEnd - arcStart) * t) }
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#c8c3b3" strokeWidth="1.5" />
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        paddingTop: 30,
      }}>
        <div
          className="font-display font-bold"
          style={{ fontSize: size * 0.32, lineHeight: 0.9, letterSpacing: '-0.04em', color: '#1a1a1a' }}
        >
          {displayed}
        </div>
        <div className="font-mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}>
          / 100 pts
        </div>
      </div>
    </div>
  )
}
