const steps = [
  {
    letter: 'A',
    t: 'Audit',
    d: "Diagnostic complet de votre acquisition en 14 jours. Trafic, conversion, positionnement, pricing. On identifie les 3 leviers à activer en priorité — et on vous remet une roadmap claire.",
  },
  {
    letter: 'R',
    t: 'Run',
    d: "On installe le système. Pages programmatiques, campagnes, CRM, automations. Chaque levier est déployé selon votre marché et vos verticales cibles. Premiers résultats sous 30 jours.",
  },
  {
    letter: 'C',
    t: 'Capitaliser',
    d: "On opère le moteur. Reporting mensuel, ajustement des leviers, optimisation continue. Vous prenez les rendez-vous — on génère les leads. Vous pilotez, on fait tourner.",
  },
]

export default function MethodSection() {
  return (
    <section className="py-16 md:py-[100px] bg-ink text-white" id="method">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-14 md:mb-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Méthode ARC · Propriétaire
            </p>
            <h2
              className="font-display font-bold text-white m-0"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Pas une agence.<br />
              Un{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                moteur
              </span>{' '}
              que l&apos;on installe.
            </h2>
          </div>
          <p className="text-[15px] text-[#d6d4cf] md:max-w-[360px] leading-relaxed">
            De nouveaux clients sous 30J garantis. 90 jours pour installer la machine complète.
          </p>
        </div>

        {/* ARC Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.letter} className="bg-ink p-8 md:p-10 flex flex-col gap-5">
              <div
                className="font-display font-bold text-accent leading-none"
                style={{ fontSize: 'clamp(64px, 7vw, 96px)', letterSpacing: '-0.05em' }}
              >
                {s.letter}
              </div>
              <h3
                className="font-display font-semibold text-white m-0"
                style={{ fontSize: 26, letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                {s.t}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#d6d4cf] m-0">
                {s.d}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
