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

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          Pourquoi GrowthCompta
        </p>
        <h2
          className="font-display font-bold text-ink mb-10"
          style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.96 }}
        >
          L&apos;angle que personne
          <br />
          d&apos;autre ne tient.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <p
            className="col-span-1 md:col-span-2 font-serif italic mb-2"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
            }}
          >
            Un interlocuteur qui parle{' '}
            <span
              className="not-italic"
              style={{
                background: 'linear-gradient(180deg, transparent 68%, var(--color-accent) 68%)',
                padding: '0 3px',
              }}
            >
              marge récupérable
            </span>{' '}
            et{' '}
            <span
              className="not-italic"
              style={{
                background: 'linear-gradient(180deg, transparent 68%, var(--color-accent) 68%)',
                padding: '0 3px',
              }}
            >
              coût d&apos;acquisition
            </span>{' '}
            dans la même conversation.
          </p>

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
                style={{ fontSize: 22, letterSpacing: '-0.02em' }}
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
