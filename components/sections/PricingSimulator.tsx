'use client'

import { useState } from 'react'

// ── Pricing data — update ranges here ────────────────────────────────────────
// Each scenario maps to niche (easy|hard) × velocity (30|120)

const SCENARIOS = {
  'easy-30': {
    badge: '🔥 FIRE',
    headline: 'Les premiers leads sous 30 jours.',
    sub: 'Votre niche est accessible en ligne — on active les canaux payants immédiatement. Pipeline opérationnel en quelques semaines.',
    approach: 'Paid ads Meta & Google + Sales automation',
    includes: [
      'Campagnes Meta Ads & Google Ads ciblées sur votre ICP',
      'Lead magnets + landing pages de conversion',
      'CRM + séquences de nurturing automatisées',
      'Reporting hebdomadaire et optimisation continue',
    ],
    range: '900 – 1 800 €',
    rangeNote: 'par mois · engagement 3 mois',
    cac: '~240 €',
    cacNote: 'coût d\'acquisition estimé',
  },
  'easy-120': {
    badge: '⚙️ ENGINE',
    headline: 'Une machine organique qui tourne seule.',
    sub: 'Votre niche est bien documentée en ligne — on construit des actifs durables. Dans 4 mois, votre cabinet capte des leads sans effort.',
    approach: 'SEO programmatique + Content + Brand positioning',
    includes: [
      'SEO local : pages ville × verticale indexées',
      'Content sales : guides, comparateurs, articles cibles',
      'Positionnement et identité visuelle de niche',
      'Reporting mensuel sur la progression organique',
    ],
    range: '800 – 1 500 €',
    rangeNote: 'par mois · engagement 6 mois',
    cac: '~180 €',
    cacNote: 'coût d\'acquisition estimé (mois 6)',
  },
  'hard-30': {
    badge: '🔥 FIRE CUSTOM',
    headline: 'Atteindre des décideurs difficiles d\'accès, vite.',
    sub: 'Votre cible n\'est pas sur Facebook. On déploie une stratégie outbound sur-mesure : LinkedIn, cold email ciblé, et activation réseau.',
    approach: 'LinkedIn outbound + ABM + Cold email ciblé',
    includes: [
      'Stratégie Account-Based Marketing personnalisée',
      'Séquences LinkedIn outbound sur profils décideurs',
      'Cold emailing avec personnalisation forte',
      'Qualification et scoring des réponses entrantes',
    ],
    range: '1 800 – 3 500 €',
    rangeNote: 'par mois · engagement 3 mois',
    cac: '~380 €',
    cacNote: 'coût d\'acquisition estimé (niche complexe)',
  },
  'hard-120': {
    badge: '⚙️ ENGINE CUSTOM',
    headline: 'Devenir la référence de votre niche.',
    sub: 'L\'outbound seul ne suffit pas pour les niches fermées. On construit une autorité sectorielle qui fait venir les prospects à vous.',
    approach: 'Thought leadership + SEO de niche + Positionnement expert',
    includes: [
      'Positionnement expert et proposition de valeur verticale',
      'Contenu long-format : études, benchmarks, guides sectoriels',
      'SEO et présence sur les canaux fréquentés par votre niche',
      'Personal brand du dirigeant sur LinkedIn',
    ],
    range: '1 500 – 2 800 €',
    rangeNote: 'par mois · engagement 6 mois',
    cac: '~280 €',
    cacNote: 'coût d\'acquisition estimé (mois 6)',
  },
} as const

type ScenarioKey = keyof typeof SCENARIOS
type Niche = 'easy' | 'hard'
type Velocity = '30' | '120'

// ── Sub-components ────────────────────────────────────────────────────────────

function QuestionCard({
  number, question, options, value, onChange,
}: {
  number: string
  question: string
  options: { value: string; label: string; sub: string; examples: string }[]
  value: string | null
  onChange: (v: string) => void
}) {
  return (
    <div className="bg-white border border-[var(--color-line)] rounded-[18px] p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-1">
        Question {number}
      </p>
      <p className="font-display font-semibold text-[var(--color-ink)] text-[18px] leading-[1.25] tracking-[-0.02em] mb-5">
        {question}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`w-full text-left px-5 py-4 rounded-[14px] border transition-all duration-200 cursor-pointer ${
                active
                  ? 'border-[var(--color-accent)] bg-[rgba(232,93,43,.06)] shadow-[inset_0_0_0_1px_var(--color-accent)]'
                  : 'border-[var(--color-line)] bg-[var(--color-paper)] hover:border-[var(--color-accent)] hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`font-display font-semibold text-[15px] tracking-[-0.015em] mb-0.5 ${active ? 'text-[var(--color-accent-deep)]' : 'text-[var(--color-ink)]'}`}>
                    {opt.label}
                  </p>
                  <p className="text-[13px] text-[var(--color-muted)] leading-[1.4] mb-2">
                    {opt.sub}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--color-muted)] leading-[1.4] opacity-70">
                    Ex&nbsp;: {opt.examples}
                  </p>
                </div>
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  active ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-line)]'
                }`}>
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResultCard({
  scenarioKey, calendlyUrl,
}: {
  scenarioKey: ScenarioKey
  calendlyUrl: string
}) {
  const s = SCENARIOS[scenarioKey]

  return (
    <div className="animate-[fadeIn_.5s_ease_both]">

      {/* Package header */}
      <div className="bg-[var(--color-ink)] rounded-[18px] px-8 md:px-10 py-8 mb-4 relative overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{ inset: 'auto -10% -60% -10%', height: '80%', background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.2), transparent 60%)' }}
        />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="inline-block font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-[0.14em] mb-3">
              Approche recommandée
            </span>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-display font-bold text-white text-[22px] tracking-[-0.025em]">
                {s.badge}
              </span>
            </div>
            <p className="font-display font-semibold text-white text-[20px] leading-[1.2] tracking-[-0.02em] mb-2">
              {s.headline}
            </p>
            <p className="text-[14px] text-[#a8a8a0] leading-[1.55] max-w-[460px]">
              {s.sub}
            </p>
          </div>

          {/* Investment range */}
          <div className="flex-shrink-0 bg-white/[0.06] border border-white/10 rounded-[14px] px-7 py-5 text-center min-w-[200px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#a8a8a0] mb-2">
              Investissement
            </p>
            <p className="font-display font-bold text-[var(--color-accent)] text-[28px] leading-none tracking-[-0.03em] mb-1">
              {s.range}
            </p>
            <p className="font-mono text-[10.5px] text-[#a8a8a0] leading-[1.4]">
              {s.rangeNote}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Approach & includes */}
        <div className="bg-white border border-[var(--color-line)] rounded-[18px] p-6 md:p-7">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
            Ce qu&apos;on active
          </p>
          <p className="font-display font-semibold text-[var(--color-ink)] text-[15px] tracking-[-0.015em] mb-4 pb-4 border-b border-[var(--color-line)]">
            {s.approach}
          </p>
          <ul className="flex flex-col gap-2.5">
            {s.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[var(--color-ink-2)] leading-[1.5]">
                <span className="text-[var(--color-accent)] mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CAC + note */}
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[18px] p-6 md:p-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3">
              Coût d&apos;acquisition client estimé
            </p>
            <p className="font-display font-bold text-[var(--color-ink)] text-[36px] leading-none tracking-[-0.035em] mb-1">
              {s.cac}
            </p>
            <p className="font-mono text-[11px] text-[var(--color-muted)]">
              {s.cacNote}
            </p>
          </div>

          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[18px] p-6 md:p-7 flex-1">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3">
              À retenir
            </p>
            <p className="text-[13.5px] text-[var(--color-ink-2)] leading-[1.6]">
              La fourchette est indicative — elle est affinée lors de l&apos;appel de 30 min en fonction de votre situation exacte, votre marché, et votre point de départ.
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-white border border-[var(--color-line)] rounded-[18px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="font-display font-semibold text-[var(--color-ink)] text-[17px] tracking-[-0.02em] mb-1">
            On affine ça ensemble&nbsp;?
          </p>
          <p className="text-[13.5px] text-[var(--color-muted)]">
            30 min · Gratuit · Basé sur votre situation réelle
          </p>
        </div>
        <a
          href={calendlyUrl}
          className="flex-shrink-0 inline-flex items-center gap-2.5 bg-[var(--color-accent)] text-white font-medium text-[14.5px] px-7 py-3.5 rounded-full hover:bg-[var(--color-accent-deep)] transition-colors group"
        >
          Réserver mon audit gratuit
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>

    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PricingSimulator() {
  const [niche, setNiche]       = useState<Niche | null>(null)
  const [velocity, setVelocity] = useState<Velocity | null>(null)

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.com/cabinet-growth-score'
  const scenarioKey: ScenarioKey | null = niche && velocity ? `${niche}-${velocity}` : null

  return (
    <div className="max-w-[860px] mx-auto">

      {/* Questions */}
      <div className="flex flex-col gap-4 mb-8">

        <QuestionCard
          number="01"
          question="Votre cible est-elle facilement accessible en ligne ?"
          value={niche}
          onChange={(v) => setNiche(v as Niche)}
          options={[
            {
              value: 'easy',
              label: 'Accessible — elle est sur les réseaux et cherche en ligne',
              sub: 'Facebook Ads, Google Ads et SEO fonctionnent bien sur ce profil.',
              examples: 'LMNP, e-commerçants, médecins libéraux, restaurateurs, freelances',
            },
            {
              value: 'hard',
              label: 'Difficile à atteindre — décideurs offline ou très niches',
              sub: 'L\'outbound ciblé et le thought leadership sont plus efficaces que les ads.',
              examples: 'Dirigeants de PME industrielles, transporteurs maritimes, groupes familiaux',
            },
          ]}
        />

        <QuestionCard
          number="02"
          question="Dans quel délai voulez-vous les premiers résultats ?"
          value={velocity}
          onChange={(v) => setVelocity(v as Velocity)}
          options={[
            {
              value: '30',
              label: '30 jours — je veux des leads rapidement',
              sub: 'On active les canaux les plus rapides en priorité. Résultats mesurables sous 4 semaines.',
              examples: 'Cabinet qui a besoin de remplir son pipeline maintenant',
            },
            {
              value: '120',
              label: '120 jours — je veux un système durable',
              sub: 'On construit des actifs organiques qui travaillent seuls dans la durée.',
              examples: 'Cabinet qui mise sur le long terme et l\'indépendance vis-à-vis des ads',
            },
          ]}
        />
      </div>

      {/* Divider + result */}
      {scenarioKey && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--color-line)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Votre approche recommandée
            </span>
            <div className="flex-1 h-px bg-[var(--color-line)]" />
          </div>
          <ResultCard scenarioKey={scenarioKey} calendlyUrl={calendlyUrl} />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
