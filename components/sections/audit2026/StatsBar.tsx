import { CountdownDaysValue } from './Countdown'

const stats = [
  {
    idx: '/01',
    render: () => <CountdownDaysValue />,
    unit: '',
    label: 'jours avant l\'obligation légale · 1er sept. 2026',
    accentValue: false,
  },
  {
    idx: '/02',
    render: () => '+12 à 30',
    unit: '%',
    label: 'de CA / client captable pendant la migration',
    accentValue: false,
  },
  {
    idx: '/03',
    render: () => '0',
    unit: '€',
    label: 'si on ne vous fait rien gagner — Étage 1, payé au résultat',
    accentValue: false,
  },
]

export default function StatsBar() {
  return (
    <section className="bg-ink text-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.idx}
              className="relative px-5 md:px-7 py-10 md:py-[52px]"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : undefined,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="absolute top-[14px] right-[14px] font-mono text-[10px] text-white/30 tracking-[0.1em]">
                {s.idx}
              </span>
              <div
                className="font-display font-bold text-white flex items-baseline gap-0.5 leading-[0.9]"
                style={{ fontSize: 'clamp(44px, 5vw, 80px)', letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}
              >
                {s.render()}
                {s.unit && (
                  <span className="text-accent" style={{ fontSize: '0.42em', marginLeft: 2 }}>
                    {s.unit}
                  </span>
                )}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2 mt-3 leading-snug max-w-[280px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
