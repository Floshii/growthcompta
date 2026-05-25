interface ServiceCard {
  n: string
  t: string
  d: string
  sv: string
  sl: string
}

interface Timeline {
  horizon: string
  period: string
  description: string
  services: ServiceCard[]
}

const timelines: Timeline[] = [
  {
    horizon: 'Court terme',
    period: '0–30j',
    description: 'Des leads qualifiés rapidement, sans attendre.',
    services: [
      {
        n: '01', t: 'Paid ads · Meta + Google',
        d: 'Campagnes ciblées par persona dirigeant (e-comm, BTP, médical…). Lead magnets calibrés, retargeting tight, attribution propre.',
        sv: '38€', sl: 'CPL moyen · sept. 2025',
      },
      {
        n: '02', t: 'Sales ops & automation',
        d: 'CRM, séquences de nurturing, scoring leads, intégration aux outils comptables. On qualifie avant que vous décrochiez.',
        sv: '38%', sl: 'SQL ratio moyen',
      },
    ],
  },
  {
    horizon: 'Moyen terme',
    period: '1–3 mois',
    description: 'Des fondations solides pour convertir durablement.',
    services: [
      {
        n: '03', t: 'Content sales',
        d: 'On écrit ce qui convertit : guides verticaux, comparateurs, calculateurs. Optimisé pour les recherches "expert-comptable + X".',
        sv: '4,7%', sl: 'taux de conversion blog',
      },
      {
        n: '04', t: 'Brand & positioning',
        d: 'Pour sortir du lot "expert-comptable généraliste" : positionnement vertical, naming, identité visuelle, site refonte.',
        sv: '6sem', sl: 'go-live moyen',
      },
    ],
  },
  {
    horizon: 'Long terme',
    period: '3–12 mois',
    description: 'Des actifs organiques qui travaillent pour vous en continu.',
    services: [
      {
        n: '05', t: 'SEO programmatique',
        d: 'Des centaines de pages locales (ville × verticale) optimisées pour capter la demande qualifiée. On indexe, on classe, on convertit.',
        sv: '×312', sl: 'trafic organique · cabinet mercier',
      },
      {
        n: '06', t: 'Growth audit + roadmap',
        d: 'Diagnostic complet : trafic, conversion, retention, pricing. Roadmap 6 mois priorisée. Livré sous 14 jours.',
        sv: '14j', sl: 'livraison · gratuit',
      },
    ],
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-[100px]" id="services">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Services · stack growth complète
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
            <h2
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Des RDV pour{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                vous
              </span>{' '}
              en continu.
            </h2>
            <p className="text-[15px] text-ink-2 md:max-w-[360px] leading-relaxed md:text-right">
              De nouveaux clients sous 30J garantis. 90 jours pour installer la machine complète.
            </p>
          </div>
        </div>

        {/* Timeline groups */}
        <div className="flex flex-col gap-10 md:gap-14">
          {timelines.map((group) => (
            <div key={group.horizon}>
              {/* Group header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-5 md:mb-6">
                <span className="inline-flex items-center gap-2 bg-ink text-white font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {group.horizon} · {group.period}
                </span>
                <span className="text-[13px] text-muted">{group.description}</span>
              </div>

              {/* Cards grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 border border-line rounded-2xl overflow-hidden bg-line"
                style={{ gap: 1 }}
              >
                {group.services.map((s) => (
                  <div
                    key={s.n}
                    className="bg-white p-7 md:p-9 flex flex-col gap-4 hover:bg-paper transition-colors duration-200 cursor-pointer relative group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[11px] tracking-[0.12em] px-2.5 py-1 bg-accent text-white rounded-full uppercase">
                        {s.n}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block">
                        ↗
                      </span>
                    </div>
                    <h3
                      className="font-display font-semibold text-ink m-0"
                      style={{ fontSize: 22, letterSpacing: '-0.025em', lineHeight: 1.1 }}
                    >
                      {s.t}
                    </h3>
                    <p className="text-[14.5px] leading-[1.55] text-muted m-0">{s.d}</p>
                    <div className="mt-auto pt-4 border-t border-line flex items-baseline justify-between">
                      <span
                        className="font-display font-bold text-ink"
                        style={{ fontSize: 26, letterSpacing: '-0.025em' }}
                      >
                        {s.sv}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted text-right max-w-[140px] leading-snug">
                        {s.sl}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
