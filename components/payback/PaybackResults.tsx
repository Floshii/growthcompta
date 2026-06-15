'use client'

import Link from 'next/link'
import type { PaybackResult, PaybackLeadData } from '@/types/payback'
import { fmtEuro } from '@/lib/payback-calculations'
import PaybackCursor from './PaybackCursor'

interface Props {
  result: PaybackResult
  lead: PaybackLeadData
  onReset: () => void
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/growthcompta/audit'

const MATURITY_CONFIGS = {
  1: {
    label: 'Niveau 1 — Fondations',
    desc: 'Les mécaniques d\'acquisition et de recrutement ne sont pas encore autofinancées. C\'est le moment de poser les bases avant d\'accélérer.',
    color: '#dc4a2b',
  },
  2: {
    label: 'Niveau 2 — En construction',
    desc: 'Votre acquisition commence à s\'autofinancer. Les fondamentaux sont posés — le prochain levier est la vitesse.',
    color: '#e85d2b',
  },
  3: {
    label: 'Niveau 3 — Scale',
    desc: 'Vos deux moteurs (clients et équipe) s\'autofinancent. Vous êtes en position d\'accélérer sans fragiliser votre trésorerie.',
    color: '#0a8f4a',
  },
} as const

const CONSTRAINT_MESSAGES: Record<string, string> = {
  danger: "Votre contrainte principale est l'acquisition — chaque nouveau client coûte plus qu'il ne rapporte sur 30 jours. Avant de scaler, vous devez soit réduire le CAC, soit augmenter ce que rapporte le premier mois (pricing, facturation annuelle, marge).",
  survie: "Votre acquisition est partiellement autofinancée — vous récupérez entre 50% et 100% de votre coût à la fin du premier mois. La priorité : franchir le seuil 1.0 via le modèle de paiement ou la spécialisation.",
  seuil: "Vous êtes au seuil de viabilité — votre acquisition s'autofinance exactement. Le prochain pas est de pousser le ratio au-dessus de 2.0 pour pouvoir accélérer sans contrainte de trésorerie.",
  scale: "Votre acquisition est saine — vous pouvez investir en croissance. Le focus passe maintenant sur l'équipe : peut-elle absorber la demande que vous allez générer ?",
  domination: "Votre mécanique est exceptionnelle. La trésorerie n'est plus votre contrainte — votre seule limite est la capacité d'exécution de votre équipe.",
}

export default function PaybackResults({ result, lead, onReset }: Props) {
  const { metrics, clientLevel, teamLevel, maturityLevel, actions } = result
  const maturity = MATURITY_CONFIGS[maturityLevel]
  const weakerZone = metrics.paybackRatioClient <= metrics.paybackRatioTeam
    ? clientLevel.zone
    : teamLevel.zone
  const constraintMsg = CONSTRAINT_MESSAGES[weakerZone] ?? CONSTRAINT_MESSAGES['seuil']

  return (
    <div className="bg-paper min-h-screen pb-24 md:pb-0">

      {/* HERO */}
      <section className="bg-white border-b border-line">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Payback Period Diagnostic · {lead.cabinetName || lead.firstName}
          </p>
          <h1
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
          >
            Votre Payback Period :{' '}
            <span style={{ color: maturity.color }}>{maturity.label}</span>
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px] mb-8">{maturity.desc}</p>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Payback Client', value: metrics.paybackRatioClient.toFixed(2), color: clientLevel.color },
              { label: 'Payback Équipe', value: metrics.paybackRatioTeam.toFixed(2), color: teamLevel.color },
              { label: 'CAC réel', value: fmtEuro(metrics.cac) },
              { label: 'LTGP30', value: fmtEuro(metrics.ltgp30) },
            ].map(b => (
              <div key={b.label} className="bg-paper border border-line rounded-xl px-4 py-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{b.label}</div>
                <div
                  className="font-display font-bold text-[20px] mt-0.5"
                  style={{ color: b.color ?? 'var(--color-ink)' }}
                >
                  {b.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATIOS */}
      <section className="py-12 md:py-14 border-b border-line">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Vos deux ratios
            </p>
            <h2 className="font-display font-bold text-ink text-[28px] md:text-[36px] tracking-display leading-none">
              Client vs Équipe.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Client */}
            <div className="bg-white border border-line rounded-xl p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">Module 1 — Client</div>
              <div className="font-display font-bold text-[13px] text-ink mb-5">Économie du client</div>
              <PaybackCursor ratio={metrics.paybackRatioClient} label="Payback Period Client" />
              <div className="mt-5 pt-4 border-t border-line text-[13px] text-muted leading-relaxed">
                {clientLevel.description}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted">CAC réel</div>
                  <div className="font-display font-bold text-[16px] text-ink">{fmtEuro(metrics.cac)}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted">LTGP30</div>
                  <div className="font-display font-bold text-[16px] text-ink">{fmtEuro(metrics.ltgp30)}</div>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-white border border-line rounded-xl p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">Module 3 — Équipe</div>
              <div className="font-display font-bold text-[13px] text-ink mb-5">Économie de l&apos;équipe</div>
              <PaybackCursor ratio={metrics.paybackRatioTeam} label="Payback Period Équipe" />
              <div className="mt-5 pt-4 border-t border-line text-[13px] text-muted leading-relaxed">
                {teamLevel.description}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted">Coût recrutement</div>
                  <div className="font-display font-bold text-[16px] text-ink">{fmtEuro(metrics.totalRecruitmentCost)}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted">GP90</div>
                  <div className="font-display font-bold text-[16px] text-ink">{fmtEuro(metrics.gp90)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSTRAINT */}
      <section className="py-12 md:py-14 bg-white border-b border-line">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          <div className="max-w-[680px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Votre contrainte principale
            </p>
            <h2 className="font-display font-bold text-ink text-[28px] md:text-[36px] tracking-display leading-none mb-6">
              Où est le vrai blocage.
            </h2>
            <div className="bg-ink rounded-xl p-6">
              <p className="text-white/80 text-[15px] leading-relaxed">{constraintMsg}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="py-12 md:py-14 border-b border-line">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />À lancer en priorité
            </p>
            <h2 className="font-display font-bold text-ink text-[28px] md:text-[36px] tracking-display leading-none">
              Vos 3 actions prioritaires.
            </h2>
            <p className="text-muted text-[14px] mt-2 max-w-[480px] leading-relaxed">
              Générées sur la base de vos inputs — pas génériques.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {actions.map((action, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-line flex gap-4">
                <div className="font-mono text-[11px] text-accent font-bold shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[14px] text-ink-2 leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-ink">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-4">Étape suivante</p>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Votre Payback Period est calculé.{' '}
              <span className="text-accent">La prochaine étape : le pousser vers 2, puis vers 5.</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-[420px]">
              En 30 minutes, on construit avec vous le système qui améliore votre ratio —
              modèle de paiement, niche, acquisition, recrutement.
              Basé sur vos résultats, pas sur des généralités.
            </p>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-7 py-4 rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
            >
              Obtenir mon audit de croissance
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
            <div className="flex gap-4 mt-4 flex-wrap">
              {['Gratuit', '30 minutes', 'Roadmap 90 jours'].map(t => (
                <span key={t} className="font-mono text-[11px] text-white/50 flex items-center gap-1.5">
                  <span className="text-accent">✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-5">Récapitulatif</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Payback Client', value: `${metrics.paybackRatioClient.toFixed(2)} — ${clientLevel.label}`, color: clientLevel.color },
                { label: 'Payback Équipe', value: `${metrics.paybackRatioTeam.toFixed(2)} — ${teamLevel.label}`, color: teamLevel.color },
                { label: 'Maturité', value: maturity.label, color: maturity.color },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">{r.label}</span>
                  <span className="font-mono text-[12px] font-semibold" style={{ color: r.color }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <div className="bg-white border-t border-line py-4 px-5">
        <div className="max-w-[960px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[13px] text-ink-2">
            <span>📧</span>
            <span>Résultats pour <strong>{lead.firstName}</strong> — {lead.email}</span>
          </div>
          <button
            onClick={onReset}
            className="font-mono text-[12px] text-muted hover:text-ink transition-colors border border-line rounded-full px-4 py-1.5"
          >
            Refaire le diagnostic
          </button>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-line p-4 z-40">
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-accent text-white font-medium text-[15px] py-4 rounded-full"
        >
          Obtenir mon audit ↗
        </Link>
      </div>
    </div>
  )
}
