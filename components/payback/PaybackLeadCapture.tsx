'use client'

import { useState, type FormEvent } from 'react'
import type { PaybackLeadData } from '@/types/payback'

interface Props {
  onSubmit: (lead: PaybackLeadData) => Promise<void>
}

export default function PaybackLeadCapture({ onSubmit }: Props) {
  const [form, setForm] = useState<PaybackLeadData>({ firstName: '', email: '', phone: '', cabinetName: '' })
  const [submitting, setSubmitting] = useState(false)

  function set<K extends keyof PaybackLeadData>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    await onSubmit(form)
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-5">
      <div className="w-full max-w-[520px] bg-white rounded-2xl border border-line shadow-xl p-7 md:p-9">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted bg-paper border border-line rounded-full px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Diagnostic terminé — 8/8 étapes
        </span>

        <h2 className="font-display font-bold text-ink text-[24px] md:text-[28px] leading-tight tracking-display mb-2">
          Votre Payback Period est calculé.
        </h2>
        <p className="text-muted text-[14px] mb-6 leading-relaxed">
          Recevez votre résultat complet, votre niveau de maturité et vos 3 actions prioritaires personnalisées.
        </p>

        <div className="flex gap-3 mb-7 flex-wrap">
          {[
            { icon: '◎', label: 'Ratio Payback' },
            { icon: '⚡', label: '3 actions' },
            { icon: '→', label: 'Contrainte principale' },
          ].map(d => (
            <div key={d.label} className="flex items-center gap-1.5 bg-paper border border-line rounded-full px-3 py-1.5">
              <span className="text-accent text-[13px]">{d.icon}</span>
              <span className="font-mono text-[11px] text-ink uppercase tracking-wider">{d.label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Prénom *</span>
              <input
                required
                className="border border-line rounded-xl px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
                placeholder="Camille"
                value={form.firstName}
                onChange={e => set('firstName', e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Email pro *</span>
              <input
                required
                type="email"
                className="border border-line rounded-xl px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
                placeholder="c.martin@cabinet.fr"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Téléphone *</span>
            <input
              required
              type="tel"
              className="border border-line rounded-xl px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
              placeholder="06 12 34 56 78"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Nom du cabinet</span>
            <input
              className="border border-line rounded-xl px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
              placeholder="Cabinet Martin & Associés"
              value={form.cabinetName}
              onChange={e => set('cabinetName', e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-accent text-white font-medium text-[15px] px-6 py-4 rounded-full hover:bg-accent-deep transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
          >
            {submitting ? 'Génération en cours…' : 'Voir mes résultats →'}
          </button>

          <p className="text-center font-mono text-[11px] text-muted mt-1 leading-relaxed">
            🔒 Résultats affichés immédiatement — aucun spam.
          </p>
        </form>
      </div>
    </div>
  )
}
