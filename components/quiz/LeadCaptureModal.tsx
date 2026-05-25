'use client'

import { useState, FormEvent } from 'react'
import type { LeadData } from '@/types/quiz'
import ScoreGauge from './ScoreGauge'

interface Props {
  score: number
  onSubmit: (lead: LeadData) => Promise<void>
}

export default function LeadCaptureModal({ score, onSubmit }: Props) {
  const [form, setForm] = useState<LeadData>({ firstName: '', email: '', phone: '', cabinetName: '', city: '' })
  const [submitting, setSubmitting] = useState(false)

  function set<K extends keyof LeadData>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    await onSubmit(form)
    // component unmounts when stage → results
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Blurred fake results behind */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(244,239,230,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <ScoreGauge score={score} size={320} animate={false} />
      </div>

      {/* Card */}
      <div
        className="relative w-full max-w-[520px] bg-white rounded-2xl border border-line shadow-xl overflow-auto"
        style={{ maxHeight: 'calc(100vh - 48px)' }}
      >
        <div className="p-7 md:p-9">
          {/* Header */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted bg-paper border border-line rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Diagnostic terminé
            </span>
            <h2 className="font-display font-bold text-ink text-[22px] md:text-[26px] leading-tight tracking-display">
              Votre diagnostic est prêt.
            </h2>
            <p className="text-muted text-[14px] mt-2 leading-relaxed">
              Recevez votre score complet, votre radar de croissance, vos quick wins et votre roadmap personnalisée — par email.
            </p>
          </div>

          {/* Preview deliverables */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {[
              { icon: '◎', label: `Score ${score}/100` },
              { icon: '⬡', label: 'Radar 8 axes' },
              { icon: '↓', label: 'Rapport PDF' },
            ].map(d => (
              <div key={d.label} className="flex items-center gap-1.5 bg-paper border border-line rounded-full px-3 py-1.5">
                <span className="text-accent text-[13px]">{d.icon}</span>
                <span className="font-mono text-[11px] text-ink uppercase tracking-wider">{d.label}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Prénom *</span>
                <input
                  required
                  className="border border-line rounded-lg px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
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
                  className="border border-line rounded-lg px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
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
                className="border border-line rounded-lg px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
                placeholder="06 12 34 56 78"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Cabinet</span>
                <input
                  className="border border-line rounded-lg px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
                  placeholder="Cabinet Martin & Co"
                  value={form.cabinetName}
                  onChange={e => set('cabinetName', e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Ville</span>
                <input
                  className="border border-line rounded-lg px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
                  placeholder="Lyon"
                  value={form.city}
                  onChange={e => set('city', e.target.value)}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-accent text-white font-medium text-[15px] px-6 py-4 rounded-full border border-transparent hover:bg-accent-deep transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
            >
              {submitting ? (
                'Génération de votre rapport…'
              ) : (
                <>Voir mes résultats <span className="text-[16px]">→</span></>
              )}
            </button>

            <p className="text-center font-mono text-[11px] text-muted mt-1">
              🔒 Résultats envoyés par email. Aucun spam, jamais.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
