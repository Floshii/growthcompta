const stats = [
  { idx: '/01', num: '+15', unit: null as string | null, lbl: 'emails en moyenne pour onboarder un client aujourd’hui' },
  { idx: '/02', num: '4–6', unit: 'sem.' as string | null, lbl: 'avant le premier acte facturable sur un nouveau dossier' },
  { idx: '/03', num: '3', unit: 'h' as string | null, lbl: 'internes économisées par dossier · garanties' },
  { idx: '/04', num: '5–10', unit: 'j.' as string | null, lbl: 'ouvrés pour un dossier prêt à produire' },
]

export default function StatsBand() {
  return (
    <section className="bg-ink">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.idx}
              className="relative overflow-hidden"
              style={{
                padding: '56px 26px',
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
                  fontSize: 'clamp(44px, 4.6vw, 68px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                }}
              >
                {s.num}
                {s.unit && (
                  <span style={{ color: 'var(--color-accent)', fontSize: '0.42em', marginLeft: '0.12em' }}>
                    {s.unit}
                  </span>
                )}
              </p>
              <p
                className="font-mono uppercase leading-snug max-w-[260px]"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.1em',
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
