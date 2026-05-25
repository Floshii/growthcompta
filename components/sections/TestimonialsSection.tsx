const testis = [
  {
    q: "On était sceptiques. 6 mois après, on refuse des clients.",
    who: "Sylvain Mercier", role: "Associé · Cabinet Mercier", initials: "SM",
  },
  {
    q: "Première équipe growth qui comprend vraiment notre métier. On parle même langue.",
    who: "Camille Dorel", role: "Directrice · Fiducia & Co", initials: "CD",
  },
  {
    q: "Le SEO programmatique nous a sorti d'un plateau de 3 ans en 4 mois.",
    who: "Antoine Bréchet", role: "Fondateur · Audit-Lab", initials: "AB",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-[100px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Témoignages · associés & dirigeants
            </p>
            <h2
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Ce qu&apos;ils{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                disent
              </span>
              .
            </h2>
          </div>
          <p className="text-[15px] text-ink-2 md:max-w-[360px] leading-relaxed">
            17 cabinets nous ont fait confiance depuis 2023. Réfs disponibles sur demande après le premier call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testis.map((t) => (
            <div
              key={t.initials}
              className="bg-paper border border-line rounded-[18px] p-8 flex flex-col gap-6"
            >
              <p
                className="font-serif italic text-ink m-0"
                style={{ fontSize: 26, lineHeight: 1.25 }}
              >
                « {t.q} »
              </p>
              <div className="flex items-center gap-3.5 mt-auto">
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 grid place-items-center text-white font-mono font-semibold text-sm"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-ink) 100%)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{t.who}</div>
                  <div className="font-mono text-[11px] text-muted mt-0.5 tracking-[0.05em]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
