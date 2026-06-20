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
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  const result = useMemo(() => {
    const nb = parseFloat(collabs)
    const h = parseFloat(hSaisie)
    if (!nb || !h || nb <= 0 || h <= 0) return null

    const hMoisParCollab = h * 4.33
    const hTotal = hMoisParCollab * nb
    const hSupprimables = Math.round(hTotal * 0.70)
    const etpLibere = hSupprimables / 151
    const valeur = Math.round(etpLibere * 4200)

    return { hSupprimables, etpLibere, valeur }
  }, [collabs, hSaisie])

  const hasInputs = collabs && hSaisie

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
    <div className="rounded-2xl border border-line bg-white p-6 md:p-7 mt-6">
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
      <p className="text-[13.5px] text-ink-2 mb-5">
        Entrez vos chiffres, obtenez une estimation du temps récupérable.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-5">
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
          <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em]">Heures saisie / sem. / collab</span>
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
      </div>

      {hasInputs && result && (
        <>
          <div
            className="rounded-xl overflow-hidden mb-4"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-line)', border: '1px solid var(--color-line)' }}
          >
            {[
              { idx: '/01', label: 'h/mois récup.', value: fmt(result.hSupprimables), unit: 'h', accent: false },
              { idx: '/02', label: 'ETP libéré', value: result.etpLibere.toFixed(1).replace('.', ','), unit: 'ETP', accent: false },
              { idx: '/03', label: 'valeur €/mois', value: fmt(result.valeur), unit: '€', accent: true },
            ].map((r) => (
              <div key={r.idx} className="bg-white px-4 py-4">
                <p className="font-mono text-[10px] text-muted mb-2 leading-tight">{r.idx} · {r.label}</p>
                <p
                  className="font-display font-bold leading-none"
                  style={{ fontSize: 26, letterSpacing: '-0.04em', color: r.accent ? 'var(--color-accent)' : 'var(--color-ink)' }}
                >
                  {r.value}
                  <span
                    className="font-normal"
                    style={{ fontSize: 13, marginLeft: 3, color: r.accent ? 'var(--color-accent)' : 'var(--color-muted)' }}
                  >
                    {r.unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11.5px] text-muted mb-4 leading-relaxed">
            Ordre de grandeur basé sur les mesures terrain. Chiffre exact estimé pendant l&apos;audit sur votre stack réelle.
          </p>
        </>
      )}

      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCTA}
        className="inline-flex items-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[11px] rounded-full hover:bg-accent-deep transition-colors group"
      >
        {result ? 'Vérifier ces chiffres sur votre stack réelle' : FE_CTA_LABEL}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </div>
  )
}
