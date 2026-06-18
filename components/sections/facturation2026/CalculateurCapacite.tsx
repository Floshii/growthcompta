'use client'

import { useState, useMemo } from 'react'
import { trackEvent } from '@/lib/analytics'
import { FE_CTA_LABEL } from './constants'

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n)
}

export default function CalculateurCapacite() {
  const [collabs, setCollabs] = useState('')
  const [hSaisie, setHSaisie] = useState('')
  const [factures, setFactures] = useState('')
  const [outils, setOutils] = useState('3')
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  const result = useMemo(() => {
    const nb = parseFloat(collabs)
    const h = parseFloat(hSaisie)
    const f = parseFloat(factures)
    const o = parseInt(outils, 10)
    if (!nb || !h || !f || nb <= 0 || h <= 0 || f <= 0) return null

    const hMoisParCollab = h * 4.33
    const hTotal = hMoisParCollab * nb
    const volBonus = f > 500 ? 0.15 : f > 200 ? 0.08 : 0
    const outilOverhead = Math.max(0, o - 2) * 0.10
    const hAjuste = hTotal * (1 + volBonus + outilOverhead)
    const hSupprimables = Math.round(hAjuste * 0.70)
    const etpLibere = hSupprimables / 151
    const valeur = Math.round(etpLibere * 4200)

    return { hSupprimables, etpLibere, valeur }
  }, [collabs, hSaisie, factures, outils])

  const hasInputs = collabs && hSaisie && factures

  function handleCTA() {
    if (result) {
      trackEvent('calculateur_cta_click', {
        source: 'calculateur_capacite',
        page: 'facturation-electronique-2026',
        h_supprimables: result.hSupprimables,
        etp: Math.round(result.etpLibere * 10) / 10,
      })
    } else {
      trackEvent('cta_click', { source: 'calculateur_capacite', page: 'facturation-electronique-2026' })
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-6 md:p-7 mt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-2 inline-flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
        calculateur · capacité libérée
      </p>
      <h3
        className="font-display font-bold text-ink mb-1"
        style={{ fontSize: 20, letterSpacing: '-0.03em' }}
      >
        Estimez votre gisement en 2 minutes
      </h3>
      <p className="text-[13.5px] text-ink-2 mb-6">
        En 3 minutes, calculez combien d&apos;heures par mois votre cabinet pourrait récupérer grâce à l&apos;automatisation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em]">Collaborateurs en prod</span>
          <input
            type="number"
            min="1"
            max="200"
            placeholder="ex. 8"
            value={collabs}
            onChange={(e) => setCollabs(e.target.value)}
            className="border border-line rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white focus:outline-none focus:border-accent transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em]">Heures de saisie / semaine / collab</span>
          <input
            type="number"
            min="0.5"
            max="20"
            step="0.5"
            placeholder="ex. 3"
            value={hSaisie}
            onChange={(e) => setHSaisie(e.target.value)}
            className="border border-line rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white focus:outline-none focus:border-accent transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em]">Factures émises / mois</span>
          <input
            type="number"
            min="1"
            placeholder="ex. 300"
            value={factures}
            onChange={(e) => setFactures(e.target.value)}
            className="border border-line rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white focus:outline-none focus:border-accent transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em]">Outils dans la stack</span>
          <select
            value={outils}
            onChange={(e) => setOutils(e.target.value)}
            className="border border-line rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
          >
            <option value="2">2 outils</option>
            <option value="3">3 outils</option>
            <option value="4">4 outils</option>
            <option value="5">5 outils ou plus</option>
          </select>
        </label>
      </div>

      {hasInputs && result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-5 rounded-xl bg-white border border-line">
          <div>
            <p className="font-mono text-[11px] text-muted mb-1">/01 · h/mois récupérables</p>
            <p
              className="font-display font-bold text-ink"
              style={{ fontSize: 32, letterSpacing: '-0.04em' }}
            >
              {fmt(result.hSupprimables)}
              <span className="text-[16px] ml-1 font-normal text-ink-2">h</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted mb-1">/02 · ETP libéré</p>
            <p
              className="font-display font-bold text-ink"
              style={{ fontSize: 32, letterSpacing: '-0.04em' }}
            >
              {result.etpLibere.toFixed(1).replace('.', ',')}
              <span className="text-[16px] ml-1 font-normal text-ink-2">ETP</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted mb-1">/03 · valeur € potentielle</p>
            <p
              className="font-display font-bold text-accent"
              style={{ fontSize: 32, letterSpacing: '-0.04em' }}
            >
              {fmt(result.valeur)}
              <span className="text-[16px] ml-1 font-normal text-accent">€</span>
            </p>
          </div>
        </div>
      )}

      {hasInputs && result && (
        <p className="text-[12px] text-muted mb-5 leading-relaxed">
          Ordre de grandeur basé sur les mesures terrain. Chiffre exact estimé pendant l&apos;audit sur votre stack réelle (Pennylane, ACD, Cegid, MyUnisoft…).
        </p>
      )}

      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCTA}
        className="inline-flex items-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[11px] rounded-full hover:bg-accent-deep transition-colors group"
      >
        {result
          ? 'Vérifier et affiner ces chiffres sur votre stack réelle'
          : FE_CTA_LABEL}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </div>
  )
}
