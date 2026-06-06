'use client'

import { useState } from 'react'

// ── Config ────────────────────────────────────────────────────────────────────

const MIN_DAYS = 30
const MAX_DAYS = 180

// Price anchors — update these to match your real pricing
// At 30j (FIRE) and 180j (ENGINE), prices are interpolated between these two points
const PRICE_ANCHORS = {
  easy:  { fire: { min: 900,  max: 1_800 }, engine: { min: 700,  max: 1_400 } },
  hard:  { fire: { min: 1_800, max: 3_500 }, engine: { min: 1_300, max: 2_600 } },
} as const

// ── Helpers ───────────────────────────────────────────────────────────────────

type Niche = 'easy' | 'hard'

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * Math.max(0, Math.min(1, t)))
}

function fmt(n: number) {
  return n.toLocaleString('fr-FR') + ' €'
}

// Zone based on days
function getZone(days: number): 'fire' | 'hybrid' | 'engine' {
  if (days <= 60)  return 'fire'
  if (days <= 100) return 'hybrid'
  return 'engine'
}

interface Scenario {
  zone:       'fire' | 'hybrid' | 'engine'
  badge:      string
  approach:   string
  tagline:    string
  includes:   string[]
  priceMin:   number
  priceMax:   number
  commitment: string
}

function computeScenario(niche: Niche, days: number): Scenario {
  const t     = (days - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)
  const p     = PRICE_ANCHORS[niche]
  const zone  = getZone(days)

  const priceMin = lerp(p.fire.min, p.engine.min, t)
  const priceMax = lerp(p.fire.max, p.engine.max, t)

  const commitment = days <= 60 ? 'Engagement 3 mois'
    : days <= 100 ? 'Engagement 4 mois'
    : 'Engagement 6 mois'

  if (niche === 'easy') {
    if (zone === 'fire') return {
      zone, badge: '🔥 FIRE', priceMin, priceMax, commitment,
      approach: 'Paid ads Meta & Google + Sales automation',
      tagline:  'Les premiers leads sous 30 jours.',
      includes: [
        'Campagnes Meta Ads & Google Ads ciblées sur votre ICP',
        'Lead magnets + landing pages de conversion',
        'CRM + séquences de nurturing automatisées',
        'Reporting hebdomadaire et optimisation continue',
      ],
    }
    if (zone === 'hybrid') return {
      zone, badge: '🔥⚙️ FIRE + ENGINE', priceMin, priceMax, commitment,
      approach: 'Paid ads actifs + fondations SEO en parallèle',
      tagline:  'Résultats rapides et machine organique en construction.',
      includes: [
        'Campagnes paid pour les leads immédiats',
        'SEO local et contenu déployés en parallèle',
        'Automation du nurturing et du suivi prospects',
        'Reporting combiné paid + organique',
      ],
    }
    return {
      zone, badge: '⚙️ ENGINE', priceMin, priceMax, commitment,
      approach: 'SEO programmatique + Content + Brand positioning',
      tagline:  'Une machine organique qui tourne seule.',
      includes: [
        'SEO local : pages ville × verticale indexées',
        'Content sales : guides, comparateurs, articles cibles',
        'Positionnement et identité visuelle de niche',
        'Reporting mensuel sur la progression organique',
      ],
    }
  }

  // hard niche
  if (zone === 'fire') return {
    zone, badge: '🔥 FIRE CUSTOM', priceMin, priceMax, commitment,
    approach: 'LinkedIn outbound + ABM + Cold email ciblé',
    tagline:  'Atteindre des décideurs difficiles d\'accès, vite.',
    includes: [
      'Stratégie Account-Based Marketing personnalisée',
      'Séquences LinkedIn outbound sur profils décideurs',
      'Cold emailing avec personnalisation forte',
      'Qualification et scoring des réponses entrantes',
    ],
  }
  if (zone === 'hybrid') return {
    zone, badge: '🔥⚙️ FIRE CUSTOM + ENGINE', priceMin, priceMax, commitment,
    approach: 'Outbound ciblé + thought leadership en construction',
    tagline:  'Leads immédiats et autorité sectorielle en parallèle.',
    includes: [
      'Outbound LinkedIn et cold email sur votre cible',
      'Premiers contenus d\'autorité sectorielle',
      'SEO de niche déployé en parallèle',
      'Suivi et qualification du pipeline entrant',
    ],
  }
  return {
    zone, badge: '⚙️ ENGINE CUSTOM', priceMin, priceMax, commitment,
    approach: 'Thought leadership + SEO de niche + Personal brand',
    tagline:  'Devenir la référence de votre niche.',
    includes: [
      'Positionnement expert et proposition de valeur verticale',
      'Contenu long-format : études, benchmarks, guides sectoriels',
      'SEO et présence sur les canaux fréquentés par votre niche',
      'Personal brand du dirigeant sur LinkedIn',
    ],
  }
}

// ── Slider component ──────────────────────────────────────────────────────────

function VelocitySlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = ((value - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)) * 100

  // Thumb is ~20px wide; offset keeps label centered over it
  const labelOffset = 10 - pct * 0.2

  const zone = getZone(value)
  const zoneColor = zone === 'fire' ? '#e85d2b' : zone === 'hybrid' ? '#c47a1e' : '#0a8f4a'
  const zoneLabel = zone === 'fire' ? 'FIRE' : zone === 'hybrid' ? 'FIRE + ENGINE' : 'ENGINE'

  return (
    <div>
      {/* Value + zone label */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span
            className="font-display font-bold text-ink"
            style={{ fontSize: 48, letterSpacing: '-0.04em', lineHeight: 1 }}
          >
            {value}
          </span>
          <span className="font-mono text-[14px] text-muted ml-2">jours</span>
        </div>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full"
          style={{ background: zoneColor + '18', color: zoneColor, border: `1px solid ${zoneColor}40` }}
        >
          {zoneLabel}
        </span>
      </div>

      {/* Floating label above thumb */}
      <div className="relative mb-2">
        <div
          className="absolute -top-7 transform -translate-x-1/2 font-mono text-[11px] text-white px-2 py-0.5 rounded-full pointer-events-none"
          style={{
            left:       `calc(${pct}% + ${labelOffset}px)`,
            background: zoneColor,
            transition: 'left .05s ease',
          }}
        >
          {value}j
        </div>

        {/* Track + filled portion */}
        <div
          className="relative h-2 rounded-full"
          style={{ background: 'var(--color-line)' }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-[width_.05s_ease,background_.3s_ease]"
            style={{ width: `${pct}%`, background: zoneColor }}
          />
        </div>

        {/* Range input (invisible, sits on top) */}
        <input
          type="range"
          min={MIN_DAYS}
          max={MAX_DAYS}
          step={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-range"
        />
      </div>

      {/* Min / max labels */}
      <div className="flex justify-between font-mono text-[10.5px] text-muted uppercase tracking-[0.08em]">
        <span>{MIN_DAYS} jours</span>
        <span>{MAX_DAYS} jours</span>
      </div>

      {/* Zone legend */}
      <div className="flex gap-1 mt-4 text-[11px] font-mono">
        {([
          { z: 'fire',   label: '30–60j · FIRE',         color: '#e85d2b' },
          { z: 'hybrid', label: '60–100j · Hybride',      color: '#c47a1e' },
          { z: 'engine', label: '100–180j · ENGINE',      color: '#0a8f4a' },
        ] as const).map(({ z, label, color }) => (
          <div
            key={z}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all"
            style={{
              background:    zone === z ? color + '18' : 'transparent',
              color:         zone === z ? color : 'var(--color-muted)',
              border:        zone === z ? `1px solid ${color}40` : '1px solid transparent',
              fontWeight:    zone === z ? 600 : 400,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: zone === z ? color : 'var(--color-line)' }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Result card ───────────────────────────────────────────────────────────────

function ResultCard({ s, calendlyUrl }: { s: Scenario; calendlyUrl: string }) {
  return (
    <div className="animate-[fadeIn_.4s_ease_both]">

      {/* Package header */}
      <div className="bg-ink rounded-[18px] px-8 md:px-10 py-8 mb-4 relative overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{ inset: 'auto -10% -60% -10%', height: '80%', background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.2), transparent 60%)' }}
        />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="inline-block font-mono text-[11px] text-accent uppercase tracking-[0.14em] mb-3">
              Approche recommandée
            </span>
            <p className="font-display font-bold text-white text-[22px] tracking-[-0.025em] mb-1">
              {s.badge}
            </p>
            <p className="font-display font-semibold text-white text-[18px] leading-[1.2] tracking-[-0.02em] mb-2">
              {s.tagline}
            </p>
            <p className="text-[13.5px] text-[#a8a8a0] leading-[1.55]">
              {s.approach}
            </p>
          </div>

          {/* Price — updates live */}
          <div className="flex-shrink-0 bg-white/[0.06] border border-white/10 rounded-[14px] px-7 py-5 text-center min-w-[200px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#a8a8a0] mb-2">
              Investissement / mois
            </p>
            <p className="font-display font-bold text-accent leading-none tracking-[-0.03em] mb-1.5" style={{ fontSize: 26 }}>
              {fmt(s.priceMin)} – {fmt(s.priceMax)}
            </p>
            <p className="font-mono text-[10.5px] text-[#a8a8a0]">
              {s.commitment}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Includes */}
        <div className="bg-white border border-line rounded-[18px] p-6 md:p-7">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted mb-4">
            Ce qu&apos;on active
          </p>
          <ul className="flex flex-col gap-2.5">
            {s.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-ink-2 leading-[1.5]">
                <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <div className="bg-paper border border-line rounded-[18px] p-6 md:p-7 flex-1">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted mb-3">
              À noter
            </p>
            <p className="text-[13.5px] text-ink-2 leading-[1.6]">
              La fourchette est indicative. Elle est affinée en 30 min d&apos;appel selon votre marché exact, votre point de départ et vos objectifs. Le budget media ads (Meta, Google) est en dehors des honoraires.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border border-line rounded-[18px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="font-display font-semibold text-ink text-[17px] tracking-[-0.02em] mb-1">
            On affine ça ensemble&nbsp;?
          </p>
          <p className="text-[13.5px] text-muted">
            30 min · Gratuit · Basé sur votre situation réelle
          </p>
        </div>
        <a
          href={calendlyUrl}
          className="flex-shrink-0 inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[14.5px] px-7 py-3.5 rounded-full hover:bg-accent-deep transition-colors group"
        >
          Réserver mon audit gratuit
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>

    </div>
  )
}

// ── Niche question ────────────────────────────────────────────────────────────

function NicheQuestion({ value, onChange }: { value: Niche | null; onChange: (v: Niche) => void }) {
  const options: { value: Niche; label: string; sub: string; examples: string }[] = [
    {
      value:    'easy',
      label:    'Accessible — ma cible est sur les réseaux et cherche en ligne',
      sub:      'Facebook Ads, Google Ads et SEO fonctionnent bien sur ce profil.',
      examples: 'LMNP, e-commerçants, médecins libéraux, restaurateurs, freelances',
    },
    {
      value:    'hard',
      label:    'Difficile à atteindre — décideurs offline ou très niches',
      sub:      'L\'outbound ciblé et le thought leadership sont plus efficaces que les ads.',
      examples: 'Dirigeants de PME industrielles, transporteurs maritimes, groupes familiaux',
    },
  ]

  return (
    <div className="bg-white border border-line rounded-[18px] p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-1">Question 01</p>
      <p className="font-display font-semibold text-ink text-[18px] leading-[1.25] tracking-[-0.02em] mb-5">
        Votre cible est-elle facilement accessible en ligne&nbsp;?
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
                  ? 'border-accent bg-[rgba(232,93,43,.06)] shadow-[inset_0_0_0_1px_var(--color-accent)]'
                  : 'border-line bg-paper hover:border-accent hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`font-display font-semibold text-[15px] tracking-[-0.015em] mb-0.5 ${active ? 'text-accent-deep' : 'text-ink'}`}>
                    {opt.label}
                  </p>
                  <p className="text-[13px] text-muted leading-[1.4] mb-2">{opt.sub}</p>
                  <p className="font-mono text-[11px] text-muted leading-[1.4] opacity-70">Ex&nbsp;: {opt.examples}</p>
                </div>
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  active ? 'border-accent bg-accent' : 'border-line'
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

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PricingSimulator() {
  const [niche, setNiche] = useState<Niche | null>(null)
  const [days,  setDays]  = useState(75)  // default: middle of the range

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.com/cabinet-growth-score'
  const scenario    = niche ? computeScenario(niche, days) : null

  return (
    <div className="max-w-[860px] mx-auto">

      {/* Q1 — Niche */}
      <div className="mb-4">
        <NicheQuestion value={niche} onChange={setNiche} />
      </div>

      {/* Q2 — Velocity slider */}
      <div className="bg-white border border-line rounded-[18px] p-6 md:p-8 mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-1">Question 02</p>
        <p className="font-display font-semibold text-ink text-[18px] leading-[1.25] tracking-[-0.02em] mb-6">
          Dans combien de jours voulez-vous les premiers résultats&nbsp;?
        </p>
        <VelocitySlider value={days} onChange={setDays} />
      </div>

      {/* Result — visible once niche is picked */}
      {scenario ? (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Votre approche recommandée
            </span>
            <div className="flex-1 h-px bg-line" />
          </div>
          <ResultCard s={scenario} calendlyUrl={calendlyUrl} />
        </>
      ) : (
        <div className="border-2 border-dashed border-line rounded-[18px] px-8 py-12 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            ↑ Répondez à la question 01 pour voir votre approche
          </p>
        </div>
      )}

      <style>{`
        .slider-range {
          position: absolute;
          inset: -8px 0;
          width: 100%;
          opacity: 0;
          cursor: pointer;
          height: 24px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
