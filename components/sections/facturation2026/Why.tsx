const cards = [
  {
    n: '01',
    t: 'Un seul interlocuteur',
    d: "Pas un éditeur logiciel d'un côté et une agence de l'autre. Une équipe qui tient le flux technique et la logique économique en même temps.",
  },
  {
    n: '02',
    t: 'On parle marge récupérable',
    d: "Le temps gagné n'est pas une fin. C'est de la marge que l'on sait remettre dans votre grille, dossier par dossier, sans casser la relation client.",
  },
  {
    n: '03',
    t: "On parle coût d'acquisition",
    d: "On sait ce que coûte un client et ce qu'il rapporte. La loi du payback guide chaque décision : automatiser, repricer, puis acquérir.",
  },
  {
    n: '04',
    t: 'On connaît vos outils',
    d: "Pennylane, ACD, Cegid, MyUnisoft. On part de votre stack, on ne vous impose pas la nôtre. L'automatisation s'adapte à votre cabinet.",
  },
]

export default function Why() {
  return (
    <section className="py-16 md:py-[88px] bg-paper" id="pourquoi">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Pourquoi GrowthCompta
          </p>
          <h2
            className="font-display font-bold text-ink m-0"
            style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            L&apos;angle que personne
            <br />
            d&apos;autre ne tient.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr] gap-5 items-start">
          <p className="md:col-span-1 text-[17px] text-ink-2 leading-relaxed md:pr-4">
            Un interlocuteur qui parle{' '}
            <span className="font-semibold text-ink">marge récupérable</span> et{' '}
            <span className="font-semibold text-ink">coût d&apos;acquisition</span> dans la même conversation.
          </p>
          {cards.map((c) => (
            <div key={c.n} className="rounded-2xl border border-line bg-white p-5">
              <p className="font-mono text-[11px] text-muted mb-3">{c.n}</p>
              <h3
                className="font-display font-semibold text-ink mb-2"
                style={{ fontSize: 17, letterSpacing: '-0.025em' }}
              >
                {c.t}
              </h3>
              <p className="text-[14px] text-ink-2 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
