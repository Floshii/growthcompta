const stats = [
  { num: '27', unit: '', label: 'cabinets accompagnés', idx: '/01' },
  { num: '2,3', unit: '×', label: 'leads qualifiés en 6 mois', idx: '/02' },
  { num: '+180', unit: 'k€', label: 'CA additionnel moyen', idx: '/03' },
  { num: '94', unit: '%', label: 'de re-signature à 12 mois', idx: '/04' },
]

export default function StatsSection() {
  return (
    <section className="bg-ink text-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.idx}
              className="relative px-7 py-[52px]"
              style={{
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : undefined,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="absolute top-[18px] right-[18px] font-mono text-[11px] text-white/30 tracking-[0.1em]">
                {s.idx}
              </span>
              <div
                className="font-display font-bold text-white flex items-baseline gap-1 leading-[0.9]"
                style={{ fontSize: 'clamp(56px, 5.8vw, 88px)', letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}
              >
                {s.num}
                {s.unit && (
                  <span className="text-accent" style={{ fontSize: '0.4em', marginLeft: 2 }}>
                    {s.unit}
                  </span>
                )}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2 mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
