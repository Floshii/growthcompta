'use client'

import ScoreGauge from './ScoreGauge'

const DIMENSIONS = [
  { label: 'Visibilité Google', group: 'demand' },
  { label: 'Positionnement', group: 'demand' },
  { label: 'Site & Conversion', group: 'demand' },
  { label: 'Acquisition & Leads', group: 'demand' },
  { label: 'Contenu & Autorité', group: 'demand' },
  { label: 'CRM & Relance', group: 'demand' },
  { label: 'Automation & IA', group: 'demand' },
  { label: 'Réputation & Preuves', group: 'demand' },
  { label: 'Offre & Capacité', group: 'supply' },
]

interface Props {
  onStart: () => void
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="bg-paper">
      {/* HERO */}
      <section className="py-16 md:py-20 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted bg-white border border-line rounded-full px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
              Diagnostic Growth · Gratuit · 5 minutes
            </span>
            <h1
              className="font-display font-bold text-ink mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 76px)', letterSpacing: '-0.04em', lineHeight: 0.94 }}
            >
              Découvrez ce qui empêche votre cabinet de croître{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)', padding: '0 4px' }}>
                au-delà du bouche-à-oreille
              </span>
              .
            </h1>
            <p className="text-[17px] text-ink-2 leading-relaxed max-w-[500px] mb-8">
              10 questions. Un score sur 100. Vos 3 quick wins prioritaires et une roadmap 90 jours sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-7 py-4 rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
              >
                Lancer mon diagnostic gratuit
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-accent text-[14px]">★★★★★</span>
                <span className="font-mono text-[11px] text-muted">+50 cabinets diagnostiqués</span>
              </div>
            </div>
          </div>

          {/* Gauge teaser */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white border border-line rounded-2xl p-8 w-full max-w-[360px]">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />Votre score
                </p>
                <span className="font-mono text-[10px] text-muted">cabinet · 2026</span>
              </div>
              <div className="flex justify-center mb-4">
                <ScoreGauge score={72} size={280} animate={true} />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-line">
                {[{ label: 'Niveau', value: 'En croissance' }, { label: 'Position', value: 'Top 28%' }, { label: 'Actions', value: '3 prioritaires' }].map(m => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{m.label}</div>
                    <div className="font-display font-bold text-[13px] text-ink mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />À la fin du diagnostic
            </p>
            <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
              Ce que vous allez recevoir.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', icon: '◎', title: 'Votre score de croissance', desc: "Un score précis sur 100, calculé sur 9 dimensions — acquisition et capacité de votre cabinet." },
              { n: '02', icon: '⚡', title: '3 quick wins prioritaires', desc: 'Les actions à fort impact que vous pouvez lancer dès demain matin.' },
              { n: '03', icon: '⬡', title: 'Votre radar growth', desc: 'Un visuel clair de vos points forts et de vos angles morts.' },
              { n: '04', icon: '📅', title: 'Roadmap 30 / 60 / 90 jours', desc: "Un plan d'action séquencé pour transformer le diagnostic en résultats." },
            ].map(c => (
              <div key={c.n} className="bg-white rounded-xl p-6 border border-line hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(26,26,26,0.12)] transition-all duration-200 cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-muted">{c.n}</span>
                  <span className="text-accent text-[18px]">{c.icon}</span>
                </div>
                <div className="font-display font-bold text-[17px] text-ink mb-2 leading-tight">{c.title}</div>
                <div className="text-muted text-[14px] leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 DIMENSIONS */}
      <section className="py-14 md:py-16 bg-white border-y border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />Méthode GC
              </p>
              <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none mb-3">
                Les 9 dimensions analysées.
              </h2>
              <p className="text-muted text-[15px] max-w-[480px] leading-relaxed">
                8 dimensions d&apos;acquisition — et une 9e souvent ignorée : votre capacité à absorber de nouveaux clients. Parce qu&apos;augmenter l&apos;acquisition quand l&apos;offre ou les ressources sont saturées, ça ne fait qu&apos;accélérer les problèmes.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {DIMENSIONS.map((d, i) => (
              <div
                key={d.label}
                className={`rounded-xl px-4 py-4 border flex items-center gap-3 ${d.group === 'supply' ? 'border-accent/30 bg-accent/5' : 'bg-paper border-line'}`}
              >
                <span className="font-mono text-[10px] text-muted w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className={`text-[13px] font-medium leading-tight ${d.group === 'supply' ? 'text-accent' : 'text-ink'}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 bg-ink">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-4">5 minutes · 10 questions · Résultats immédiats</p>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Votre cabinet a sûrement un potentiel de croissance{' '}
              <span className="text-accent">inexploité</span>.
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed">
              7 cabinets sur 10 obtiennent un score inférieur à 55/100. Le diagnostic vous dit exactement où vous vous situez.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-7 py-4 rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
            >
              Lancer mon diagnostic
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
            </button>
            <div className="flex gap-4 flex-wrap">
              {['Gratuit', 'Sans engagement', 'Rapport PDF offert'].map(t => (
                <span key={t} className="font-mono text-[11px] text-white/50 flex items-center gap-1.5">
                  <span className="text-accent">✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
