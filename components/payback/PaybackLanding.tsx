'use client'

interface Props {
  onStart: () => void
}

const MODULES = [
  {
    n: '01',
    title: "L'économie du client",
    question: "Est-ce que votre acquisition est autofinancée ?",
    steps: ['Flux actuel', 'CAC réel', 'LTGP30', 'Payback Period Client'],
  },
  {
    n: '02',
    title: 'Les leviers d\'amélioration',
    question: 'Où est le vrai blocage ?',
    steps: ['Modèle de paiement', 'Niche & positionnement'],
  },
  {
    n: '03',
    title: "L'économie de l'équipe",
    question: 'Pouvez-vous recruter sans vous fragiliser ?',
    steps: ['Coût d\'un recrutement', 'Payback Period Équipe'],
  },
]

export default function PaybackLanding({ onStart }: Props) {
  return (
    <div className="bg-paper">
      {/* HERO */}
      <section className="py-16 md:py-24 border-b border-line">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted bg-white border border-line rounded-full px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
            Diagnostic · Gratuit · 8 minutes
          </span>

          <h1
            className="font-display font-bold text-ink mb-6"
            style={{ fontSize: 'clamp(38px, 5.5vw, 80px)', letterSpacing: '-0.04em', lineHeight: 0.93 }}
          >
            Calculez votre{' '}
            <span style={{ background: 'linear-gradient(180deg, transparent 62%, var(--color-accent) 62%)', padding: '0 4px' }}>
              Payback Period
            </span>
            .
          </h1>

          <p className="text-[17px] text-ink-2 leading-relaxed max-w-[560px] mb-4">
            La plupart des cabinets pensent avoir un problème de clients.
            En réalité, ils ont un problème de mécanique.
          </p>
          <p className="text-[15px] text-muted leading-relaxed max-w-[540px] mb-10">
            Ce diagnostic calcule votre Payback Period — la métrique que les cabinets qui dominent
            leur marché mesurent, et que les autres ignorent.
            3 modules. 8 étapes. Un résultat que vous pourrez utiliser demain matin.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-8 py-4 rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
            >
              Calculer mon Payback Period
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
            </button>
            <div className="flex gap-4 flex-wrap">
              {['Gratuit', '8 minutes', 'Sans engagement'].map(t => (
                <span key={t} className="font-mono text-[11px] text-muted flex items-center gap-1.5">
                  <span className="text-accent">✓</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Ratio preview */}
          <div className="grid grid-cols-3 gap-3 max-w-[480px]">
            {[
              { label: 'Modules', value: '3' },
              { label: 'Étapes', value: '8' },
              { label: 'Output', value: 'Ratio + Actions' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-line rounded-xl px-4 py-4 text-center">
                <div className="font-display font-bold text-[22px] text-ink">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-14 md:py-18">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Structure du diagnostic
            </p>
            <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
              3 modules. 8 étapes.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {MODULES.map(m => (
              <div key={m.n} className="bg-white rounded-xl p-6 border border-line">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] text-accent font-bold">MODULE {m.n}</span>
                </div>
                <h3 className="font-display font-bold text-[18px] text-ink leading-tight mb-1">{m.title}</h3>
                <p className="text-muted text-[13px] italic mb-5">&ldquo;{m.question}&rdquo;</p>
                <ul className="flex flex-col gap-2">
                  {m.steps.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] text-ink-2">
                      <span className="font-mono text-[10px] text-muted w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-14 bg-white border-y border-line">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Résultat
            </p>
            <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
              Ce que vous obtenez.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '◎',
                title: 'Votre Payback Period',
                desc: "Deux ratios calculés : client et équipe. Avec le niveau de maturité associé.",
              },
              {
                icon: '⚡',
                title: '3 actions prioritaires',
                desc: "Générées dynamiquement selon vos inputs — pas génériques, calibrées sur votre situation.",
              },
              {
                icon: '→',
                title: 'Votre contrainte principale',
                desc: "Le diagnostic identifie où se cache le vrai blocage — acquisition, pricing, modèle ou recrutement.",
              },
            ].map(c => (
              <div key={c.title} className="bg-paper rounded-xl p-6 border border-line">
                <span className="text-accent text-[22px] block mb-4">{c.icon}</span>
                <h3 className="font-display font-bold text-[17px] text-ink leading-tight mb-2">{c.title}</h3>
                <p className="text-muted text-[13px] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 md:py-20 bg-ink">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2
              className="font-display font-bold text-white mb-3"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Votre cabinet a un <span className="text-accent">Payback Period</span>.{' '}
              La question c&apos;est combien.
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-[460px]">
              3 modules · 8 étapes · Un résultat actionnables demain matin.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-8 py-4 rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group whitespace-nowrap"
            >
              Lancer le diagnostic
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
