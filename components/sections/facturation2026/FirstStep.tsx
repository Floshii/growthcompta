const phases = [
  {
    n: 'Phase 01',
    badge: 'Vous êtes ici',
    t: 'Automatisation',
    d: 'On fiabilise et on automatise vos flux de facturation. Conformité 2026 réglée, capacité libérée. La base de tout le reste.',
    current: true,
  },
  {
    n: 'Phase 02',
    badge: 'Ensuite',
    t: 'Repricing',
    d: "Une fois la capacité rendue, on regarde votre marge par dossier. Le temps gagné devient de la valeur facturée.",
    current: false,
  },
  {
    n: 'Phase 03',
    badge: 'Enfin',
    t: 'Acquisition',
    d: "Avec des marges saines et de la capacité, on construit un moteur d'acquisition calibré sur vos meilleurs clients.",
    current: false,
  },
]

export default function FirstStep() {
  return (
    <section className="py-16 md:py-[88px]" id="parcours">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-12">
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Positionnement · parcours en 3 phases
            </p>
            <h2
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
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
          <div className="md:w-[360px]">
            <p className="text-[16px] text-ink-2 leading-relaxed">
              L&apos;automatisation est le point de départ logique. Elle libère la capacité sur laquelle reposent les deux phases suivantes. Une étape à la fois, dans l&apos;ordre.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {phases.map((p) => (
            <div
              key={p.n}
              className={`rounded-2xl border p-6 relative ${
                p.current ? 'border-accent bg-paper' : 'border-line bg-white'
              }`}
            >
              <p className="font-mono text-[11px] text-muted mb-2">{p.n}</p>
              <span
                className={`inline-block font-mono text-[11px] px-2.5 py-0.5 rounded-full mb-4 ${
                  p.current
                    ? 'bg-accent text-white'
                    : 'bg-paper border border-line text-ink-2'
                }`}
              >
                {p.badge}
              </span>
              <h3
                className="font-display font-bold text-ink mb-2"
                style={{ fontSize: 22, letterSpacing: '-0.03em' }}
              >
                {p.t}
              </h3>
              <p className="text-[14.5px] text-ink-2 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
