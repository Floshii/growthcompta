'use client'

import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Situation = 'fast' | 'long' | 'both'
type Niche     = 'easy' | 'medium' | 'hard'

// ── Pricing constants ─────────────────────────────────────────────────────────

const FIRE_PRICING = "1 000 € d'activation · 8 leads qualifiés inclus · 100 % à la performance ensuite"

const ENGINE_FLOOR: Record<Niche, string> = {
  easy:   'Setup à partir de 5 000 € · FUEL à partir de 1 500 €/mois',
  medium: 'Setup à partir de 6 000 € · FUEL à partir de 1 800 €/mois',
  hard:   'Setup à partir de 7 000 € · FUEL à partir de 2 200 €/mois',
}

// ── Phase chips meta ──────────────────────────────────────────────────────────

const PHASE_META: Record<'FIRE' | 'ENGINE' | 'FUEL', { color: string; detail: string }> = {
  FIRE:   { color: '#e85d2b', detail: 'Sprint · 30 j' },
  ENGINE: { color: '#2563eb', detail: 'Setup · 3 mois' },
  FUEL:   { color: '#0a8f4a', detail: 'Retainer · ∞' },
}

// ── Scenario ──────────────────────────────────────────────────────────────────

interface Scenario {
  badge:      string
  tagline:    string
  approach:   string
  includes:   string[]
  phases:     ('FIRE' | 'ENGINE' | 'FUEL')[]
  priceLine:  string
  commitment: string
}

function computeScenario(situation: Situation, niche: Niche): Scenario {
  const commitment =
    situation === 'fast' ? 'Sans engagement minimum — payé à la performance'
    : situation === 'long' ? 'Engagement 6 mois minimum'
    : 'FIRE sans engagement · ENGINE 6 mois'

  // ── FAST (FIRE) ─────────────────────────────────────────────────────────────
  if (situation === 'fast') {
    if (niche === 'easy') return {
      phases: ['FIRE', 'FUEL'],
      badge:  '🔥 FIRE',
      priceLine: FIRE_PRICING,
      commitment,
      approach:  'Paid ads Meta & Google + Sales automation',
      tagline:   'Les premiers leads en moins de 30 jours. Zéro risque.',
      includes: [
        'Campagnes Meta Ads & Google Ads ciblées sur votre ICP',
        'Lead magnets + landing page de conversion dédiée',
        'CRM + séquences de nurturing automatisées',
        'Reporting hebdomadaire coût/lead · coût/RDV · taux de signature',
      ],
    }
    if (niche === 'medium') return {
      phases: ['FIRE', 'FUEL'],
      badge:  '🔥 FIRE MIX',
      priceLine: FIRE_PRICING,
      commitment,
      approach:  'Paid ads ciblés + LinkedIn outbound en parallèle',
      tagline:   'Aller chercher votre cible sur les deux canaux où elle se trouve.',
      includes: [
        'Campagnes Meta ou Google Ads sur les segments accessibles en ligne',
        'Séquences LinkedIn outbound sur les profils moins actifs sur le web',
        'Landing page de qualification + CRM de suivi',
        'Reporting hebdomadaire et arbitrage canal',
      ],
    }
    return {
      phases: ['FIRE', 'FUEL'],
      badge:  '🔥 FIRE CUSTOM',
      priceLine: FIRE_PRICING,
      commitment,
      approach:  'LinkedIn outbound + ABM + Cold email personnalisé',
      tagline:   'Atteindre les décideurs difficiles d\'accès, vite.',
      includes: [
        'Stratégie Account-Based Marketing sur vos cibles prioritaires',
        'Séquences LinkedIn outbound sur profils décideurs',
        'Cold emailing avec personnalisation forte par segment',
        'Qualification et scoring des réponses entrantes',
      ],
    }
  }

  // ── LONG (ENGINE + FUEL) ────────────────────────────────────────────────────
  if (situation === 'long') {
    if (niche === 'easy') return {
      phases: ['ENGINE', 'FUEL'],
      badge:  '⚙️ ENGINE + FUEL',
      priceLine: ENGINE_FLOOR.easy,
      commitment,
      approach:  'SEO programmatique + Content + Brand positioning',
      tagline:   'Une machine organique qui génère des leads en continu.',
      includes: [
        'SEO local : pages ville × verticale indexées et optimisées',
        'Content sales : guides, comparateurs, articles ciblés niche',
        'Positionnement et identité visuelle de niche',
        'Reporting mensuel sur la progression organique et le pipeline',
      ],
    }
    if (niche === 'medium') return {
      phases: ['ENGINE', 'FUEL'],
      badge:  '⚙️ ENGINE MIX + FUEL',
      priceLine: ENGINE_FLOOR.medium,
      commitment,
      approach:  'SEO de niche + Content + positionnement expert',
      tagline:   'Créer la demande là où votre cible cherche des réponses.',
      includes: [
        'SEO local et pages de niche sectorielles',
        'Contenu éducatif ciblé pour les acheteurs partiellement en ligne',
        'Positionnement expert et personal brand discret',
        'Reporting mensuel sur la progression et le pipeline',
      ],
    }
    return {
      phases: ['ENGINE', 'FUEL'],
      badge:  '⚙️ ENGINE CUSTOM + FUEL',
      priceLine: ENGINE_FLOOR.hard,
      commitment,
      approach:  'Thought leadership + SEO de niche + Personal brand',
      tagline:   'Devenir la référence incontournable de votre niche.',
      includes: [
        'Positionnement expert et proposition de valeur verticale',
        'Contenu long-format : études, benchmarks, guides sectoriels',
        'SEO et présence sur les canaux fréquentés par votre niche',
        'Personal brand du dirigeant sur LinkedIn',
      ],
    }
  }

  // ── BOTH (FIRE → ENGINE → FUEL) ─────────────────────────────────────────────
  if (niche === 'easy') return {
    phases: ['FIRE', 'ENGINE', 'FUEL'],
    badge:  '🔥⚙️ FIRE → ENGINE → FUEL',
    priceLine: `FIRE : ${FIRE_PRICING} · puis ${ENGINE_FLOOR.easy}`,
    commitment,
    approach:  'Sprint d\'activation, puis construction du moteur organique',
    tagline:   'Des résultats dès le mois 1 — et une machine qui tourne seule ensuite.',
    includes: [
      'Phase FIRE : paid ads + funnel de qualification dès J+7',
      'Phase ENGINE : SEO, content, automatisation — le tout intégré',
      'Setup ENGINE déduit si upsell dans les 30 j du sprint FIRE',
      'FUEL : retainer mensuel pour alimenter et optimiser en continu',
    ],
  }
  if (niche === 'medium') return {
    phases: ['FIRE', 'ENGINE', 'FUEL'],
    badge:  '🔥⚙️ FIRE MIX → ENGINE → FUEL',
    priceLine: `FIRE : ${FIRE_PRICING} · puis ${ENGINE_FLOOR.medium}`,
    commitment,
    approach:  'Outreach multi-canal, puis construction de l\'autorité sectorielle',
    tagline:   'Les premiers leads vite — puis une autorité qui attire.',
    includes: [
      'Phase FIRE : paid ads + LinkedIn outbound en parallèle',
      'Phase ENGINE : contenu expert, SEO de niche, positionnement',
      'Setup ENGINE déduit si upsell dans les 30 j du sprint FIRE',
      'FUEL : retainer mensuel pour maintenir et amplifier',
    ],
  }
  return {
    phases: ['FIRE', 'ENGINE', 'FUEL'],
    badge:  '🔥⚙️ FIRE CUSTOM → ENGINE → FUEL',
    priceLine: `FIRE : ${FIRE_PRICING} · puis ${ENGINE_FLOOR.hard}`,
    commitment,
    approach:  'Outbound ciblé, puis thought leadership et SEO de niche',
    tagline:   'Décideurs contactés dès J+7 — référence sectorielle à 6 mois.',
    includes: [
      'Phase FIRE : LinkedIn outbound + ABM + cold email',
      'Phase ENGINE : thought leadership, SEO, personal brand dirigeant',
      'Setup ENGINE déduit si upsell dans les 30 j du sprint FIRE',
      'FUEL : retainer mensuel pour la croissance compoundée',
    ],
  }
}

// ── Phase chips ───────────────────────────────────────────────────────────────

function PhaseChips({ phases }: { phases: ('FIRE' | 'ENGINE' | 'FUEL')[] }) {
  return (
    <a href="/#method" className="flex flex-wrap gap-2 group/chips" title="Voir les packages et tarifs détaillés">
      {phases.map((p, i) => {
        const m = PHASE_META[p]
        return (
          <span key={p} className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full transition-opacity group-hover/chips:opacity-75"
              style={{ background: m.color + '20', color: m.color, border: `1px solid ${m.color}40` }}
            >
              {p}
              <span className="opacity-60 normal-case tracking-normal text-[10px]">{m.detail}</span>
            </span>
            {i < phases.length - 1 && (
              <span className="text-[#a8a8a0] text-[11px]">→</span>
            )}
          </span>
        )
      })}
    </a>
  )
}

// ── Result panel ──────────────────────────────────────────────────────────────

function ResultPanel({ s, calendlyUrl }: { s: Scenario; calendlyUrl: string }) {
  return (
    <div className="relative bg-ink rounded-[20px] overflow-hidden animate-[fadeIn_.4s_ease_both]">
      <div
        className="absolute pointer-events-none"
        style={{
          inset:      'auto -10% -60% -10%',
          height:     '80%',
          background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.18), transparent 60%)',
        }}
      />

      <div className="relative p-6 md:p-7 flex flex-col gap-5">

        {/* Badge + phases */}
        <div>
          <span className="inline-block font-mono text-[10px] text-accent uppercase tracking-[0.14em] mb-2">
            Approche recommandée
          </span>
          <p className="font-display font-bold text-white text-[19px] tracking-[-0.025em] leading-[1.2] mb-3">
            {s.badge}
          </p>
          <PhaseChips phases={s.phases} />
        </div>

        {/* Tagline + approach */}
        <div>
          <p className="font-display font-semibold text-white text-[16px] leading-[1.3] tracking-[-0.02em] mb-1.5">
            {s.tagline}
          </p>
          <p className="text-[13px] text-[#a8a8a0] leading-[1.5]">{s.approach}</p>
        </div>

        <div className="h-px bg-white/[0.08]" />

        {/* Includes */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#a8a8a0] mb-3">
            Ce qu&apos;on active
          </p>
          <ul className="flex flex-col gap-2">
            {s.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[#d4d4cc] leading-[1.45]">
                <span className="text-accent mt-0.5 flex-shrink-0 text-[11px]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing + commitment */}
        <div className="bg-white/[0.05] border border-white/10 rounded-[12px] px-4 py-3.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#a8a8a0] mb-1.5">
            Investissement
          </p>
          <p className="text-[13px] text-white/90 leading-[1.6]">{s.priceLine}</p>
          <p className="font-mono text-[10.5px] text-accent mt-2">· {s.commitment}</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          <a
            href={calendlyUrl}
            className="flex items-center justify-center gap-2 bg-accent text-white font-medium text-[14px] px-6 py-3 rounded-full hover:bg-accent-deep transition-colors group w-full"
          >
            Réserver mon audit gratuit
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
          <a
            href="/#method"
            className="flex items-center justify-center gap-2 bg-white/[0.06] text-white/70 font-medium text-[13px] px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors border border-white/10 w-full"
          >
            Voir les packages en détail
            <span className="text-[11px] opacity-60">↓</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Question 01 — Situation ───────────────────────────────────────────────────

function SituationQuestion({ value, onChange }: { value: Situation | null; onChange: (v: Situation) => void }) {
  const options: { value: Situation; label: string; sub: string; tag: string }[] = [
    {
      value: 'fast',
      tag:   '🔥 FIRE',
      label: 'J\'ai besoin de clients maintenant',
      sub:   'Priorité aux résultats rapides. On active ce qui convertit le plus vite sur votre marché.',
    },
    {
      value: 'long',
      tag:   '⚙️ ENGINE + FUEL',
      label: 'Je veux bâtir une acquisition durable',
      sub:   'Priorité à la machine long terme : SEO, contenu, autorité. Des leads qui arrivent seuls.',
    },
    {
      value: 'both',
      tag:   '🔥⚙️ Full journey',
      label: 'Je veux les deux — vite, puis en mode machine',
      sub:   'Sprint d\'activation pour prouver la valeur, puis construction du moteur organique.',
    },
  ]

  return (
    <div className="bg-white border border-line rounded-[18px] p-5 md:p-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted mb-1">Question 01</p>
      <p className="font-display font-semibold text-ink text-[16px] leading-[1.3] tracking-[-0.02em] mb-4">
        Quelle est votre priorité&nbsp;?
      </p>
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`w-full text-left px-4 py-3.5 rounded-[12px] border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                active
                  ? 'border-accent bg-[rgba(232,93,43,.06)]'
                  : 'border-line bg-paper hover:border-accent hover:bg-white'
              }`}
            >
              <div
                className={`mt-0.5 w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  active ? 'border-accent bg-accent' : 'border-line'
                }`}
              >
                {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`font-display font-semibold text-[14px] tracking-[-0.015em] ${active ? 'text-accent-deep' : 'text-ink'}`}>
                    {opt.label}
                  </p>
                  <span className="font-mono text-[10px] text-muted">{opt.tag}</span>
                </div>
                <p className="text-[12.5px] text-muted leading-[1.4]">{opt.sub}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Question 02 — Niche ───────────────────────────────────────────────────────

function NicheQuestion({ value, onChange }: { value: Niche | null; onChange: (v: Niche) => void }) {
  const options: { value: Niche; label: string; sub: string }[] = [
    {
      value: 'easy',
      label: 'Accessible en ligne',
      sub:   'LMNP, médecins, e-commerçants, freelances — Facebook Ads & SEO fonctionnent bien.',
    },
    {
      value: 'medium',
      label: 'Modérément accessible',
      sub:   'Avocats, artisans, TPE locales, professions B2B partiellement en ligne — approche mixte.',
    },
    {
      value: 'hard',
      label: 'Difficile à atteindre',
      sub:   "PME industrielles, B2B niche, dirigeants offline — l'outbound ciblé est plus efficace.",
    },
  ]

  return (
    <div className="bg-white border border-line rounded-[18px] p-5 md:p-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted mb-1">Question 02</p>
      <p className="font-display font-semibold text-ink text-[16px] leading-[1.3] tracking-[-0.02em] mb-4">
        Votre cible est-elle accessible en ligne&nbsp;?
      </p>
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`w-full text-left px-4 py-3.5 rounded-[12px] border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                active
                  ? 'border-accent bg-[rgba(232,93,43,.06)]'
                  : 'border-line bg-paper hover:border-accent hover:bg-white'
              }`}
            >
              <div
                className={`mt-0.5 w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  active ? 'border-accent bg-accent' : 'border-line'
                }`}
              >
                {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <p className={`font-display font-semibold text-[14px] tracking-[-0.015em] mb-0.5 ${active ? 'text-accent-deep' : 'text-ink'}`}>
                  {opt.label}
                </p>
                <p className="text-[12.5px] text-muted leading-[1.4]">{opt.sub}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Placeholder ───────────────────────────────────────────────────────────────

function Placeholder({ situation }: { situation: Situation | null }) {
  const msg = !situation
    ? 'Répondez à la question 01 pour voir votre approche'
    : 'Répondez à la question 02 pour affiner la recommandation'

  return (
    <div className="border-2 border-dashed border-line rounded-[20px] p-8 flex flex-col items-center justify-center text-center min-h-[320px] lg:min-h-full">
      <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center mb-4 text-muted">
        →
      </div>
      <p className="font-display font-semibold text-ink text-[15px] tracking-[-0.015em] mb-1.5">
        Votre recommandation apparaîtra ici
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{msg}</p>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PricingSimulator() {
  const [situation, setSituation] = useState<Situation | null>(null)
  const [niche,     setNiche]     = useState<Niche | null>(null)

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.com/cabinet-growth-score'
  const scenario    = situation && niche ? computeScenario(situation, niche) : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

      {/* Left — Questions */}
      <div className="flex flex-col gap-4">
        <SituationQuestion value={situation} onChange={setSituation} />
        <NicheQuestion     value={niche}     onChange={setNiche} />
      </div>

      {/* Right — Result (sticky) */}
      <div className="lg:sticky lg:top-[88px]">
        {scenario
          ? <ResultPanel s={scenario} calendlyUrl={calendlyUrl} />
          : <Placeholder situation={situation} />
        }
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
