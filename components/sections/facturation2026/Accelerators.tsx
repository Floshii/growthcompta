const cards = [
  {
    phase: 'Phase 02',
    tag: 'Sprint repricing',
    t: 'Récupérer la marge par dossier',
    d: 'On revoit votre grille et vos avenants quand la capacité est rendue. Le temps gagné se transforme en valeur facturée, sans perdre de client.',
    meta: '4 à 6 semaines · payé au résultat sur les avenants signés',
  },
  {
    phase: 'Phase 03',
    tag: "Machine d'acquisition",
    t: 'Attirer vos meilleurs clients',
    d: "Un moteur d'acquisition calibré sur le profil de vos dossiers les plus rentables. On construit, on opère, vous signez.",
    meta: 'Retainer calibré sur le profil de vos meilleurs clients',
  },
]

export default function Accelerators() {
  return (
    <section className="py-16 md:py-[88px] bg-ink text-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-12">
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Accélérateurs · phases suivantes
            </p>
            <h2
              className="font-display font-bold text-white m-0"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.96 }}
            >
              Ce que permet l&apos;automatisation,
              <br />
              <span
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                ensuite
              </span>
              .
            </h2>
          </div>
          <div className="md:w-[360px] flex-shrink-0">
            <p className="text-[16px] leading-relaxed" style={{ color: '#d6d4cf' }}>
              Ces deux accélérateurs viennent après l&apos;automatisation, uniquement pour les cabinets satisfaits. Ils se discutent sur l&apos;appel, pas sur cette page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {cards.map((c) => (
            <div
              key={c.phase}
              className="rounded-2xl relative overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '34px',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <div
                className="absolute font-mono uppercase inline-flex items-center"
                style={{
                  top: 26,
                  right: 28,
                  fontSize: 10.5,
                  letterSpacing: '0.1em',
                  color: 'var(--color-muted-2)',
                  gap: 7,
                }}
              >
                <span
                  className="inline-block rounded-full flex-shrink-0"
                  style={{ width: 6, height: 6, background: 'var(--color-muted-2)' }}
                />
                {c.phase}
              </div>

              <p
                className="font-mono uppercase mb-4"
                style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--color-accent)' }}
              >
                {c.tag}
              </p>

              <h3
                className="font-display font-semibold text-white mb-3"
                style={{ fontSize: 27, letterSpacing: '-0.025em' }}
              >
                {c.t}
              </h3>

              <p className="text-[15px] leading-relaxed mb-2" style={{ color: '#d6d4cf' }}>
                {c.d}
              </p>

              <p
                className="font-mono"
                style={{ fontSize: 11.5, color: 'var(--color-muted-2)', marginTop: 8 }}
              >
                {c.meta}
              </p>
            </div>
          ))}
        </div>

        <p
          className="font-mono leading-relaxed max-w-[720px]"
          style={{ fontSize: 12.5, color: 'var(--color-muted-2)', letterSpacing: '0.03em', lineHeight: 1.6 }}
        >
          <span className="text-white font-medium">À retenir.</span>{' '}Ces leviers ne sont jamais vendus sur cette page. Vous démarrez par l&apos;automatisation. Le repricing et l&apos;acquisition arrivent ensuite, sur décision commune, quand votre cabinet est prêt.
        </p>
      </div>
    </section>
  )
}
