const phases = [
  {
    n: 'Phase 01',
    badge: 'VOUS ÊTES ICI',
    t: 'Automatisation',
    d: 'On fiabilise et on automatise vos flux de facturation. Conformité 2026 réglée, capacité libérée. La base de tout le reste.',
    current: true,
  },
  {
    n: 'Phase 02',
    badge: 'ENSUITE',
    t: 'Repricing',
    d: "Une fois la capacité rendue, on regarde votre marge par dossier. Le temps gagné devient de la valeur facturée.",
    current: false,
  },
  {
    n: 'Phase 03',
    badge: 'ENFIN',
    t: 'Acquisition',
    d: "Avec des marges saines et de la capacité, on construit un moteur d'acquisition calibré sur vos meilleurs clients.",
    current: false,
  },
]

export default function FirstStep() {
  return (
    <section className="py-16 md:py-[88px]" id="parcours">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Positionnement · parcours en 3 phases
            </p>
            <h2
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.96 }}
            >
              Vous n&apos;achetez pas un outil.
              <br />
              Vous achetez la{' '}
              <span
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                première étape
              </span>
              .
            </h2>
          </div>
          <div className="md:w-[360px] flex-shrink-0">
            <p className="text-[16px] text-ink-2 leading-relaxed">
              L&apos;automatisation est le point de départ logique. Elle libère la capacité sur laquelle reposent les deux phases suivantes. Une étape à la fois, dans l&apos;ordre.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((p, i) => (
            <div
              key={p.n}
              className="rounded-2xl relative"
              style={{
                background: p.current ? 'var(--color-ink)' : 'white',
                border: `1px solid ${p.current ? 'var(--color-ink)' : 'var(--color-line)'}`,
                padding: '30px',
                minHeight: '280px',
              }}
            >
              <p
                className="font-mono text-[11px] mb-3"
                style={{ color: p.current ? 'var(--color-accent)' : 'var(--color-muted-2)' }}
              >
                {p.n}
              </p>

              <span
                className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-5"
                style={
                  p.current
                    ? { background: 'var(--color-accent)', color: '#fff' }
                    : { border: '1px solid var(--color-line)', color: 'var(--color-muted)' }
                }
              >
                {p.badge}
              </span>

              <h3
                className="font-display font-bold mb-3"
                style={{
                  fontSize: 30,
                  letterSpacing: '-0.03em',
                  color: p.current ? '#fff' : 'var(--color-ink)',
                }}
              >
                {p.t}
              </h3>

              <p
                className="text-[14.5px] leading-relaxed"
                style={{ color: p.current ? '#d6d4cf' : 'var(--color-muted)' }}
              >
                {p.d}
              </p>

              {i < phases.length - 1 && (
                <div
                  className="hidden md:grid place-items-center absolute"
                  style={{
                    top: '50%',
                    right: '-16px',
                    zIndex: 2,
                    width: 28,
                    height: 28,
                    borderRadius: '99px',
                    background: 'white',
                    border: '1px solid var(--color-line)',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-muted)',
                    fontSize: 13,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
