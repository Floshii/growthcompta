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
              style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
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
          <div className="md:w-[360px]">
            <p className="text-[16px] text-[#d6d4cf] leading-relaxed">
              Ces deux accélérateurs viennent après l&apos;automatisation, uniquement pour les cabinets satisfaits. Ils se discutent sur l&apos;appel, pas sur cette page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {cards.map((c) => (
            <div key={c.phase} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="font-mono text-[11px] text-muted-2 mb-2">{c.phase}</p>
              <span className="inline-block font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-[#d6d4cf] mb-4">
                {c.tag}
              </span>
              <h3
                className="font-display font-semibold text-white mb-2"
                style={{ fontSize: 20, letterSpacing: '-0.03em' }}
              >
                {c.t}
              </h3>
              <p className="text-[14.5px] text-[#d6d4cf] leading-relaxed mb-4">{c.d}</p>
              <p className="font-mono text-[11px] text-muted-2">{c.meta}</p>
            </div>
          ))}
        </div>

        <p className="text-[14.5px] text-[#d6d4cf] leading-relaxed max-w-[700px]">
          <strong className="text-white">À retenir.</strong> Ces leviers ne sont jamais vendus sur cette page. Vous démarrez par l&apos;automatisation. Le repricing et l&apos;acquisition arrivent ensuite, sur décision commune, quand votre cabinet est prêt.
        </p>
      </div>
    </section>
  )
}
