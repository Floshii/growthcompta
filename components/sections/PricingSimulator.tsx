'use client'

import { useState } from 'react'

// ── Config ────────────────────────────────────────────────────────────────────

const MIN_DAYS = 30
const MAX_DAYS = 180

// Price anchors — update these to match your real pricing
const PRICE_ANCHORS = {
  easy: { fire: { min: 900,   max: 1_800 }, engine: { min: 700,   max: 1_400 } },
  hard: { fire: { min: 1_800, max: 3_500 }, engine: { min: 1_300, max: 2_600 } },
} as const

// ── Helpers ───────────────────────────────────────────────────────────────────

type Niche = 'easy' | 'hard'

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * Math.max(0, Math.min(1, t)))
}

function fmt(n: number) {
  return n.toLocaleString('fr-FR') + ' €'
}

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
  const t    = (days - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)
  const p    = PRICE_ANCHORS[niche]
  const zone = getZone(days)

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
    tagline:  "Atteindre des décideurs difficiles d'accès, vite.",
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
      "Premiers contenus d'autorité sectorielle",
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

// ── Question 01 — Niche ───────────────────────────────────────────────────────

function NicheQuestion({ value, onChange }: { value: Niche | null; onChange: (v: Niche) => void }) {
  const options: { value: Niche; label: string; sub: string }[] = [
    {
      value: 'easy',
      label: 'Accessible en ligne',
      sub:   'LMNP, médecins, e-commerçants, freelances — Facebook Ads & SEO fonctionnent bien.',
    },
    {
      value: 'hard',
      label: 'Difficile à atteindre',
      sub:   "PME industrielles, B2B niche, dirigeants offline — l'outbound ciblé est plus efficace.",
    },
  ]

  return (
    <div className="bg-white border border-line rounded-[18px] p-5 md:p-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted mb-1">Question 01</p>
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

// ── Question 02 — Velocity slider ─────────────────────────────────────────────

function VelocitySliderCard({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct         = ((value - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)) * 100
  const labelOffset = 10 - pct * 0.2
  const zone        = getZone(value)
  const zoneColor   = zone === 'fire' ? '#e85d2b' : zone === 'hybrid' ? '#c47a1e' : '#0a8f4a'
  const zoneLabel   = zone === 'fire' ? 'FIRE' : zone === 'hybrid' ? 'FIRE + ENGINE' : 'ENGINE'

  return (
    <div className="bg-white border border-line rounded-[18px] p-5 md:p-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted mb-1">Question 02</p>
      <p className="font-display font-semibold text-ink text-[16px] leading-[1.3] tracking-[-0.02em] mb-4">
        Dans combien de jours les premiers résultats&nbsp;?
      </p>

      {/* Value + zone badge inline */}
      <div className="flex items-baseline gap-2.5 mb-4">
        <span
          className="font-display font-bold text-ink"
          style={{ fontSize: 38, letterSpacing: '-0.04em', lineHeight: 1 }}
        >
          {value}
        </span>
        <span className="font-mono text-[13px] text-muted">jours</span>
        <span
          className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
          style={{ background: zoneColor + '18', color: zoneColor, border: `1px solid ${zoneColor}40` }}
        >
          {zoneLabel}
        </span>
      </div>

      {/* Track + invisible range overlay */}
      <div className="relative mb-2">
        <div
          className="absolute -top-6 transform -translate-x-1/2 font-mono text-[10px] text-white px-1.5 py-0.5 rounded-full pointer-events-none"
          style={{
            left:       `calc(${pct}% + ${labelOffset}px)`,
            background: zoneColor,
            transition: 'left .05s ease',
          }}
        >
          {value}j
        </div>
        <div
          className="relative h-2 rounded-full"
          style={{ background: 'var(--color-line)' }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-[width_.05s_ease,background_.3s_ease]"
            style={{ width: `${pct}%`, background: zoneColor }}
          />
        </div>
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

      <div className="flex justify-between font-mono text-[10px] text-muted uppercase tracking-[0.08em] mb-3">
        <span>{MIN_DAYS} jours</span>
        <span>{MAX_DAYS} jours</span>
      </div>

      {/* Zone legend */}
      <div className="flex gap-1 text-[10.5px] font-mono">
        {([
          { z: 'fire',   label: '30–60j · FIRE',     color: '#e85d2b' },
          { z: 'hybrid', label: '60–100j · Hybride',  color: '#c47a1e' },
          { z: 'engine', label: '100–180j · ENGINE',  color: '#0a8f4a' },
        ] as const).map(({ z, label, color }) => (
          <div
            key={z}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full transition-all"
            style={{
              background: zone === z ? color + '18' : 'transparent',
              color:      zone === z ? color : 'var(--color-muted)',
              border:     zone === z ? `1px solid ${color}40` : '1px solid transparent',
              fontWeight: zone === z ? 600 : 400,
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

// ── Result panel (right column) ───────────────────────────────────────────────

function ResultPanel({ s, calendlyUrl }: { s: Scenario; calendlyUrl: string }) {
  return (
    <div className="relative bg-ink rounded-[20px] overflow-hidden animate-[fadeIn_.4s_ease_both]">

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset:      'auto -10% -60% -10%',
          height:     '80%',
          background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.18), transparent 60%)',
        }}
      />

      <div className="relative p-6 md:p-7 flex flex-col gap-5">

        {/* Badge + price */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block font-mono text-[10px] text-accent uppercase tracking-[0.14em] mb-2">
              Approche recommandée
            </span>
            <p className="font-display font-bold text-white text-[20px] tracking-[-0.025em] leading-[1.2]">
              {s.badge}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#a8a8a0] mb-1">/ mois</p>
            <p
              className="font-display font-bold text-accent leading-none tracking-[-0.03em]"
              style={{ fontSize: 20 }}
            >
              {fmt(s.priceMin)} – {fmt(s.priceMax)}
            </p>
            <p className="font-mono text-[10px] text-[#a8a8a0] mt-1">{s.commitment}</p>
          </div>
        </div>

        {/* Tagline + approach */}
        <div>
          <p className="font-display font-semibold text-white text-[17px] leading-[1.25] tracking-[-0.02em] mb-1.5">
            {s.tagline}
          </p>
          <p className="text-[13px] text-[#a8a8a0] leading-[1.5]">
            {s.approach}
          </p>
        </div>

        {/* Divider */}
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

        {/* Note */}
        <p className="text-[11.5px] text-[#a8a8a0] leading-[1.55] bg-white/[0.04] rounded-[10px] px-3.5 py-2.5">
          Budget media ads (Meta, Google) en sus. Fourchette affinée lors de l&apos;appel de 30 min.
        </p>

        {/* CTA */}
        <a
          href={calendlyUrl}
          className="flex items-center justify-center gap-2 bg-accent text-white font-medium text-[14px] px-6 py-3 rounded-full hover:bg-accent-deep transition-colors group w-full"
        >
          Réserver mon audit gratuit
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </div>
  )
}

// ── Placeholder (before Q1 is answered) ──────────────────────────────────────

function Placeholder() {
  return (
    <div className="border-2 border-dashed border-line rounded-[20px] p-8 flex flex-col items-center justify-center text-center min-h-[320px] lg:min-h-full">
      <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center mb-4 text-muted">
        →
      </div>
      <p className="font-display font-semibold text-ink text-[15px] tracking-[-0.015em] mb-1.5">
        Votre recommandation apparaîtra ici
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
        Répondez à la question 01
      </p>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PricingSimulator() {
  const [niche, setNiche] = useState<Niche | null>(null)
  const [days,  setDays]  = useState(75)

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.com/cabinet-growth-score'
  const scenario    = niche ? computeScenario(niche, days) : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

      {/* Left — Questions */}
      <div className="flex flex-col gap-4">
        <NicheQuestion value={niche} onChange={setNiche} />
        <VelocitySliderCard value={days} onChange={setDays} />
      </div>

      {/* Right — Result (sticky) */}
      <div className="lg:sticky lg:top-[88px]">
        {scenario
          ? <ResultPanel s={scenario} calendlyUrl={calendlyUrl} />
          : <Placeholder />
        }
      </div>

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
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
