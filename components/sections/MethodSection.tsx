const steps = [
  {
    n: 'STEP 01', t: 'Audit growth',
    d: 'On diagnostique votre acquisition, conversion, retention. Benchmarking vs cabinets comparables. Identification des 3 leviers prioritaires.',
    meta: 'Semaine 1–2 · gratuit',
  },
  {
    n: 'STEP 02', t: 'Roadmap & quick wins',
    d: 'Plan 6 mois priorisé par ROI. On déploie les quick wins en parallèle (Google Business, landing principale, tracking propre).',
    meta: 'Semaine 3–4',
  },
  {
    n: 'STEP 03', t: 'Build · SEO + paid',
    d: 'Génération des pages programmatiques, lancement des campagnes, mise en place du CRM et des automations.',
    meta: 'Mois 2–3',
  },
  {
    n: 'STEP 04', t: 'Opérer & itérer',
    d: 'On opère le moteur, on rapporte chaque mois, on ajuste. Vous prenez les rendez-vous, on génère les leads.',
    meta: 'Mois 4+',
  },
]

export default function MethodSection() {
  return (
    <section className="py-[100px] bg-ink text-white" id="method">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-12 mb-14 flex-wrap">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-2 mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Méthode · 4 étapes · 4 mois
            </p>
            <h2
              className="font-display font-bold text-white m-0"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Pas une agence.<br />
              Un{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                moteur
              </span>{' '}
              que l&apos;on installe.
            </h2>
          </div>
          <p className="text-[15px] text-[#d6d4cf] max-w-[360px] leading-relaxed">
            On ne vend pas des heures. On vend un système d&apos;acquisition qui tourne après nous, opéré pendant les 6 premiers mois.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="grid gap-10 py-8 hover:bg-white/3 transition-colors duration-200 cursor-pointer px-4 -mx-4 rounded-lg"
              style={{
                gridTemplateColumns: '80px 1fr 1fr 200px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                ...(i === steps.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}),
              }}
            >
              <div className="font-mono text-[13px] text-accent tracking-[0.08em]">{s.n}</div>
              <h3
                className="font-display font-semibold text-white m-0"
                style={{ fontSize: 28, letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                {s.t}
              </h3>
              <div className="text-[15px] leading-[1.55] text-[#d6d4cf]">{s.d}</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
