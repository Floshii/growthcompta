const problems = [
  {
    n: 'Problème 01',
    title: 'Vos collaborateurs courent après des pièces au lieu de produire',
    body: 'Kbis, statuts, bénéficiaires effectifs, lettre de mission, mandats, accès fiscaux, bancaires, sociaux. Chaque nouveau client génère 50 emails et 4 relances avant que le dossier soit monté. Le temps part en collecte, pas en facturable.',
    cost: 'jusqu’à 4–6 semaines de délai avant premier euro',
  },
  {
    n: 'Problème 02',
    title: 'Un dossier mal monté à l’entrée crée une dette pour des années',
    body: 'Une pièce manquante, un accès non récupéré, une information jamais formalisée. Ça se paye en corrections non facturables tout au long de la vie du dossier. L’onboarding est le fondement — s’il est bancal, tout l’est.',
    cost: 'dette opérationnelle invisible, jamais rattrapée',
  },
  {
    n: 'Problème 03',
    title: 'L’expérience client ressemble à une préfecture',
    body: 'Votre client reçoit un email Word, une liste de pièces en vrac, des relances successives. L’écart entre l’expérience qu’il a vue chez Qonto ou Captain Contrat et ce qu’il vit chez vous fragilise la relation dès le départ.',
    cost: 'première impression déterminante sur la rétention',
  },
]

export default function Frictions() {
  return (
    <section className="py-16 md:py-[88px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="mb-12 max-w-[680px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Frictions
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.98 }}
          >
            Trois frictions qui détruisent votre payback client.
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1px', background: 'var(--color-line)', border: '1px solid var(--color-line)' }}
        >
          {problems.map((p) => (
            <div
              key={p.n}
              className="bg-white flex flex-col"
              style={{ padding: '34px', minHeight: '260px', gap: 14 }}
            >
              <p
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--color-muted)' }}
              >
                {p.n}
              </p>
              <h3
                className="font-semibold"
                style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.14, color: 'var(--color-ink)' }}
              >
                {p.title}
              </h3>
              <p className="flex-1" style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--color-muted)' }}>
                {p.body}
              </p>
              <p className="font-mono" style={{ fontSize: 11, color: 'var(--color-accent-deep)' }}>
                → {p.cost}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
