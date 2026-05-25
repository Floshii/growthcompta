interface Stat {
  prefix?: string
  num: string
  unit: string
  label: string
  idx: string
}

const stats: Stat[] = [
  { num: '17', unit: '', label: 'cabinets accompagnés', idx: '/01' },
  { prefix: '<', num: '15', unit: 'j', label: 'pour les premiers leads', idx: '/02' },
  { num: '+120', unit: 'k€', label: 'CA additionnel moyen', idx: '/03' },
  { num: '87', unit: '€', label: "coût d'acquisition client moyen", idx: '/04' },
]

export default function StatsSection() {
  return (
    <section className="bg-ink text-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.idx}
              className="relative px-5 md:px-7 py-10 md:py-[52px]"
              style={{
                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.1)' : undefined,
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
                {s.prefix && (
                  <span className="text-accent" style={{ fontSize: '0.55em' }}>{s.prefix}</span>
                )}
                {s.num}
                {s.unit && (
                  <span className="text-accent" style={{ fontSize: '0.42em', marginLeft: 2 }}>
                    {s.unit}
                  </span>
                )}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2 mt-3 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
