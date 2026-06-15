'use client'

import { ratioToPos, getPaybackLevel } from '@/lib/payback-calculations'

interface Props {
  ratio: number
  label?: string
}

const MARKERS = [
  { value: 0, label: '0' },
  { value: 0.5, label: '0.5' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 5, label: '5' },
]

const ZONES = [
  { label: 'danger', pos: ratioToPos(0.25), color: '#dc4a2b' },
  { label: 'survie', pos: ratioToPos(0.75), color: '#e85d2b' },
  { label: 'scale', pos: ratioToPos(1.5), color: '#e8a02b' },
  { label: 'domination', pos: ratioToPos(3.5), color: '#0a8f4a' },
]

const GRAD_0_5 = ratioToPos(0.5).toFixed(1)
const GRAD_1 = ratioToPos(1).toFixed(1)
const GRAD_2 = ratioToPos(2).toFixed(1)

export default function PaybackCursor({ ratio, label }: Props) {
  const pct = ratioToPos(ratio)
  const level = getPaybackLevel(ratio)

  return (
    <div className="w-full select-none">
      {label && (
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">{label}</div>
      )}

      {/* Value markers */}
      <div className="relative h-5 mb-1">
        {MARKERS.map(m => (
          <div
            key={m.value}
            className="absolute"
            style={{ left: `${ratioToPos(m.value)}%` }}
          >
            <span
              className="font-mono text-[10px] text-muted"
              style={{ display: 'inline-block', transform: 'translateX(-50%)' }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bar + cursor */}
      <div
        className="relative h-3 rounded-full"
        style={{
          background: `linear-gradient(90deg,
            #dc4a2b 0%, #dc4a2b ${GRAD_0_5}%,
            #e85d2b ${GRAD_0_5}%, #e85d2b ${GRAD_1}%,
            #e8a02b ${GRAD_1}%, #e8a02b ${GRAD_2}%,
            #0a8f4a ${GRAD_2}%, #0a8f4a 100%)`,
        }}
      >
        <div
          className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg"
          style={{
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            background: level.color,
            transition: 'left 0.5s ease',
          }}
        />
      </div>

      {/* Zone labels */}
      <div className="relative h-5 mt-1.5">
        {ZONES.map(z => (
          <div
            key={z.label}
            className="absolute"
            style={{ left: `${z.pos}%` }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-wide"
              style={{ color: z.color, display: 'inline-block', transform: 'translateX(-50%)' }}
            >
              {z.label}
            </span>
          </div>
        ))}
      </div>

      {/* Current value */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
          style={{ borderColor: level.color, background: `${level.color}12` }}
        >
          <span className="font-display font-bold text-[20px]" style={{ color: level.color }}>
            {ratio.toFixed(2)}
          </span>
          <span
            className="font-mono text-[11px] uppercase tracking-wider font-semibold"
            style={{ color: level.color }}
          >
            {level.label}
          </span>
        </div>
      </div>
    </div>
  )
}
