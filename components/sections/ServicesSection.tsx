const services = [
  {
    n: '01', t: 'SEO programmatique',
    d: 'Des centaines de pages locales (ville × verticale) optimisées pour capter la demande qualifiée. On indexe, on classe, on convertit.',
    sv: '×312', sl: 'trafic organique · cabinet mercier',
  },
  {
    n: '02', t: 'Paid ads · Meta + Google',
    d: 'Campagnes ciblées par persona dirigeant (e-comm, BTP, médical…). Lead magnets calibrés, retargeting tight, attribution propre.',
    sv: '38€', sl: 'CPL moyen · sept. 2025',
  },
  {
    n: '03', t: 'Content sales',
    d: 'On écrit ce qui convertit : guides verticaux, comparateurs, calculateurs. Optimisé pour les recherches "expert-comptable + X".',
    sv: '4,7%', sl: 'taux de conversion blog',
  },
  {
    n: '04', t: 'Sales ops & automation',
    d: 'CRM, séquences de nurturing, scoring leads, intégration aux outils comptables. On qualifie avant que vous décrochiez.',
    sv: '38%', sl: 'SQL ratio moyen',
  },
  {
    n: '05', t: 'Brand & positioning',
    d: 'Pour sortir du lot "expert-comptable généraliste" : positionnement vertical, naming, identité visuelle, site refonte.',
    sv: '6sem', sl: 'go-live moyen',
  },
  {
    n: '06', t: 'Growth audit + roadmap',
    d: 'Diagnostic complet : trafic, conversion, retention, pricing. Roadmap 6 mois priorisée. Livré sous 14 jours.',
    sv: '14j', sl: 'livraison · gratuit',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-[100px]" id="services">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-12 mb-14 flex-wrap">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Services · stack growth complète
            </p>
            <h2
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, maxWidth: 720 }}
            >
              On ne fait pas{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                tout
              </span>
              .<br />On fait ce qui amène des clients.
            </h2>
          </div>
          <p className="text-[15px] text-ink-2 max-w-[360px] leading-relaxed">
            6 leviers que l&apos;on assemble selon votre cabinet, votre marché, vos verticales cibles. Pas de retainer générique — on commit sur un résultat.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid border border-line rounded-2xl overflow-hidden bg-line"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}
        >
          {services.map((s) => (
            <div
              key={s.n}
              className="bg-white p-9 flex flex-col gap-[18px] min-h-[320px] hover:bg-paper transition-colors duration-200 cursor-pointer relative group"
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
                style={{ fontSize: 26, letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                {s.t}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-muted m-0">{s.d}</p>
              <div className="mt-auto pt-[18px] border-t border-line flex items-baseline justify-between">
                <span
                  className="font-display font-bold text-ink"
                  style={{ fontSize: 28, letterSpacing: '-0.025em' }}
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
    </section>
  )
}
