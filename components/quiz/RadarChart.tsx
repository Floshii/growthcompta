'use client'

interface DataPoint {
  label: string
  value: number // 0-100
}

interface Props {
  data: DataPoint[]
  size?: number
}

export default function RadarChart({ data, size = 360 }: Props) {
  const n = data.length || 8
  const cx = size / 2
  const cy = size / 2
  const rMax = size * 0.34
  const angleAt = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2
  const ptAt = (i: number, v: number) => ({
    x: cx + (rMax * v / 100) * Math.cos(angleAt(i)),
    y: cy + (rMax * v / 100) * Math.sin(angleAt(i)),
  })

  const gridPath = (v: number) =>
    data.map((_, i) => {
      const p = { x: cx + (rMax * v / 100) * Math.cos(angleAt(i)), y: cy + (rMax * v / 100) * Math.sin(angleAt(i)) }
      return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    }).join(' ') + ' Z'

  const dataPath = data.map((d, i) => {
    const p = ptAt(i, d.value)
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  }).join(' ') + ' Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      {[25, 50, 75, 100].map((v, i) => (
        <path key={i} d={gridPath(v)} fill={i === 3 ? '#faf8f1' : 'none'} stroke="#e6e1d3" strokeWidth={i === 3 ? 1.5 : 1} />
      ))}
      {data.map((_, i) => {
        const p = { x: cx + rMax * Math.cos(angleAt(i)), y: cy + rMax * Math.sin(angleAt(i)) }
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e6e1d3" strokeWidth="1" />
      })}
      <path d={dataPath} fill="rgba(232,93,43,0.18)" stroke="#e85d2b" strokeWidth="2" strokeLinejoin="round" />
      {data.map((d, i) => {
        const p = ptAt(i, d.value)
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#e85d2b" stroke="#fff" strokeWidth="1.5" />
      })}
      {data.map((d, i) => {
        const a = angleAt(i)
        const lp = { x: cx + (rMax + 28) * Math.cos(a), y: cy + (rMax + 28) * Math.sin(a) }
        const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'
        const dy = Math.sin(a) > 0.5 ? 12 : Math.sin(a) < -0.5 ? -4 : 4
        return (
          <g key={i}>
            <text x={lp.x} y={lp.y + dy} textAnchor={anchor}
              style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', fill: '#1a1a1a', fontWeight: 600 }}>
              {d.label}
            </text>
            <text x={lp.x} y={lp.y + dy + 13} textAnchor={anchor}
              style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10, fill: '#6b6b66' }}>
              {d.value}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
