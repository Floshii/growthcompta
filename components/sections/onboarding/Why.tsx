const cards = [
  {
    n: '01',
    t: 'On connaît Pennylane de l’intérieur',
    d: 'Le portail n’est pas un outil générique bolté sur votre stack. Il est construit pour s’intégrer à Pennylane : création de dossier, exercice, imports, organisation documentaire. Rien à reformater à la fin.',
  },
  {
    n: '02',
    t: 'Marque blanche totale',
    d: 'Votre logo, votre domaine, vos couleurs. Votre client ne sait pas qu’on existe. Il vit une expérience à vos couleurs du premier email au handoff final.',
  },
  {
    n: '03',
    t: 'On parle rentabilité, pas outil',
    d: 'On ne vend pas un logiciel. On vend 3 h économisées par client et un dossier prêt à produire en 10 jours. Si ce n’est pas le cas après 5 dossiers, on rembourse.',
  },
]

export default function Why() {
  return (
    <section className="py-16 md:py-[88px] bg-paper" id="pourquoi">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          Pourquoi GrowthCompta
        </p>
        <h2
          className="font-display font-bold text-ink mb-10"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.98 }}
        >
          L&apos;angle que personne d&apos;autre ne tient.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {cards.map((c) => (
            <div
              key={c.n}
              className="rounded-2xl border border-line bg-white flex flex-col gap-3"
              style={{ padding: 32 }}
            >
              <p
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--color-accent)' }}
              >
                {c.n}
              </p>
              <h3
                className="font-display font-semibold text-ink"
                style={{ fontSize: 21, letterSpacing: '-0.02em' }}
              >
                {c.t}
              </h3>
              <p className="text-[14.5px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
