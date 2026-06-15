'use client'

import { useMemo, type ChangeEvent } from 'react'
import type { PaybackInputs, PaymentModel, SpecializationLevel } from '@/types/payback'
import { computeMetrics, fmtEuro, getPaybackLevel } from '@/lib/payback-calculations'
import PaybackCursor from './PaybackCursor'

// ── Shared sub-components ─────────────────────────────────────────────────────

function NumInput({
  label, value, onChange, unit, placeholder, hint, defaultNote,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  unit?: string
  placeholder?: string
  hint?: string
  defaultNote?: string
}) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    onChange(raw === '' ? 0 : parseFloat(raw) || 0)
  }
  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{label}</span>
        {defaultNote && (
          <span className="font-mono text-[10px] text-muted/60 italic">{defaultNote}</span>
        )}
      </div>
      <div className="relative flex items-center">
        <input
          type="number"
          min="0"
          className="w-full border border-line rounded-xl px-4 py-3.5 text-[16px] text-ink bg-white outline-none focus:border-accent transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={value === 0 ? '' : value}
          placeholder={placeholder ?? '0'}
          onChange={handleChange}
        />
        {unit && (
          <span className="absolute right-4 font-mono text-[13px] text-muted pointer-events-none">{unit}</span>
        )}
      </div>
      {hint && <span className="font-mono text-[10px] text-muted/70 leading-relaxed">{hint}</span>}
    </label>
  )
}

function InsightBlock({ text }: { text: string }) {
  return (
    <div className="bg-ink rounded-xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-accent shrink-0 mt-0.5 text-[16px]">→</span>
        <p className="text-[13px] leading-relaxed text-white/75">{text}</p>
      </div>
    </div>
  )
}

function ComputedRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-line last:border-0">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{label}</span>
      <span
        className="font-display font-bold text-[20px]"
        style={{ color: accent ? 'var(--color-accent)' : 'var(--color-ink)' }}
      >
        {value}
      </span>
    </div>
  )
}

function RadioOption<T extends string>({
  value, selected, onSelect, label, desc,
}: {
  value: T
  selected: boolean
  onSelect: () => void
  label: string
  desc?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-start gap-3 text-left rounded-xl border px-4 py-3.5 w-full transition-all ${
        selected
          ? 'border-accent bg-accent/5'
          : 'border-line bg-white hover:border-accent/40'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5 ${
          selected ? 'border-accent' : 'border-muted'
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-accent" />}
      </div>
      <div>
        <div className="font-medium text-[14px] text-ink">{label}</div>
        {desc && <div className="text-[12px] text-muted mt-0.5">{desc}</div>}
      </div>
    </button>
  )
}

// ── Step metadata ─────────────────────────────────────────────────────────────

const MODULE_LABELS = ['MODULE 1', 'MODULE 1', 'MODULE 1', 'MODULE 1', 'MODULE 2', 'MODULE 2', 'MODULE 3', 'MODULE 3']
const MODULE_NAMES = [
  "L'économie du client",
  "L'économie du client",
  "L'économie du client",
  "L'économie du client",
  "Les leviers d'amélioration",
  "Les leviers d'amélioration",
  "L'économie de l'équipe",
  "L'économie de l'équipe",
]

const PAYMENT_OPTIONS: { value: PaymentModel; label: string; desc: string }[] = [
  { value: 'monthly-arrear', label: 'Mensuel à terme échu', desc: "Prélevé en fin de mois — vous encaissez 0€ le jour J" },
  { value: 'monthly-advance', label: 'Mensuel à l\'avance', desc: "Prélevé début de mois — vous encaissez 1 mois le jour J" },
  { value: 'quarterly', label: 'Trimestriel', desc: "Encaissement de 3 mois d'honoraires à J0" },
  { value: 'annual', label: 'Annuel upfront', desc: "Encaissement de 12 mois d'honoraires à J0" },
  { value: 'variable', label: 'Variable / selon mission', desc: "Encaissement irrégulier selon les missions" },
]

const SPEC_OPTIONS: { value: SpecializationLevel; label: string; desc: string }[] = [
  { value: 'generalist', label: 'Généraliste', desc: "Tous secteurs, toutes tailles — pas de niche définie" },
  { value: 'semi', label: 'Semi-spécialisé', desc: "Quelques secteurs de prédilection, mais pas encore de niche exclusive" },
  { value: 'specialized', label: 'Spécialisé', desc: "Une niche principale clairement définie et communiquée" },
  { value: 'ultra', label: 'Très spécialisé', desc: "Une niche exclusive avec pricing premium assumé" },
]

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  stepIndex: number
  inputs: PaybackInputs
  onUpdate: (updates: Partial<PaybackInputs>) => void
  onNext: () => void
  onBack: () => void
}

export default function PaybackStep({ stepIndex, inputs, onUpdate, onNext, onBack }: Props) {
  const metrics = useMemo(() => computeMetrics(inputs), [inputs])

  const isLastStep = stepIndex === 7
  const isFirstStep = stepIndex === 0
  const nextLabel = isLastStep ? 'Voir mes résultats →' : stepIndex === 3 ? 'Continuer — Module 2 →' : stepIndex === 5 ? 'Continuer — Module 3 →' : 'Continuer →'

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-line px-5 py-3">
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{MODULE_LABELS[stepIndex]}</span>
              <span className="font-mono text-[10px] text-muted"> · {MODULE_NAMES[stepIndex]}</span>
            </div>
            <span className="font-mono text-[10px] text-muted">Étape {stepIndex + 1} / 8</span>
          </div>
          <div className="h-1 bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${((stepIndex + 1) / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[680px] mx-auto px-5 py-10 md:py-14">
        <StepContent stepIndex={stepIndex} inputs={inputs} metrics={metrics} onUpdate={onUpdate} />

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-line">
          {!isFirstStep ? (
            <button
              type="button"
              onClick={onBack}
              className="font-mono text-[12px] text-muted hover:text-ink transition-colors flex items-center gap-1.5"
            >
              ← Retour
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 bg-accent text-white font-medium text-[15px] px-7 py-3.5 rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Per-step content ──────────────────────────────────────────────────────────

function StepContent({
  stepIndex, inputs, metrics, onUpdate,
}: {
  stepIndex: number
  inputs: PaybackInputs
  metrics: ReturnType<typeof computeMetrics>
  onUpdate: (u: Partial<PaybackInputs>) => void
}) {
  switch (stepIndex) {

    // ── ÉTAPE 1 — Flux actuel ─────────────────────────────────────────────────
    case 0:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Combien signez-vous de nouveaux clients par mois en moyenne ?
            </h2>
            <p className="text-muted text-[14px]">Étape 1 — Le flux actuel</p>
          </div>

          <NumInput
            label="Nouveaux clients signés / mois"
            value={inputs.newClientsPerMonth}
            onChange={v => onUpdate({ newClientsPerMonth: v || 1 })}
            placeholder="2"
            hint="Si vous avez des mois à 0 et des mois à 5, prenez la moyenne sur 3 à 6 mois."
            defaultNote="défaut : 2"
          />

          <InsightBlock text="Ce chiffre détermine l'échelle de votre moteur d'acquisition. Un cabinet à 2 clients/mois et un cabinet à 10 clients/mois n'ont pas les mêmes contraintes — mais ils partagent souvent le même problème : ils ne savent pas ce que chaque client leur coûte réellement." />
        </div>
      )

    // ── ÉTAPE 2 — CAC réel ────────────────────────────────────────────────────
    case 1:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Qu&apos;est-ce que vous dépensez pour trouver un nouveau client ?
            </h2>
            <p className="text-muted text-[14px]">Étape 2 — Le vrai coût d&apos;acquisition</p>
          </div>

          <div className="flex flex-col gap-4">
            <NumInput
              label="Budget marketing / mois"
              value={inputs.marketingBudget}
              onChange={v => onUpdate({ marketingBudget: v })}
              unit="€"
              placeholder="500"
              hint="Pub, outils, prestataires, abonnements dédiés à l'acquisition."
            />
            <NumInput
              label="Temps commercial / semaine"
              value={inputs.commercialHoursPerWeek}
              onChange={v => onUpdate({ commercialHoursPerWeek: v })}
              unit="h"
              placeholder="5"
              hint="RDV prospects, relances, réseautage, rédaction de propositions."
              defaultNote="défaut : 5h"
            />
            <NumInput
              label="Valeur horaire de votre temps"
              value={inputs.hourlyRate}
              onChange={v => onUpdate({ hourlyRate: v || 150 })}
              unit="€/h"
              placeholder="150"
              defaultNote="défaut : 150€"
            />
          </div>

          {/* Live result */}
          <div className="bg-white border border-line rounded-xl p-5">
            <ComputedRow label="Clients / mois" value={`${inputs.newClientsPerMonth}`} />
            <ComputedRow
              label="Budget mensuel"
              value={fmtEuro(inputs.marketingBudget)}
            />
            <ComputedRow
              label={`Temps × valeur (${inputs.commercialHoursPerWeek}h × 4.33 × ${inputs.hourlyRate}€)`}
              value={fmtEuro(inputs.commercialHoursPerWeek * 4.33 * inputs.hourlyRate)}
            />
            <ComputedRow
              label="→ Votre CAC réel"
              value={fmtEuro(metrics.cac)}
              accent
            />
          </div>

          <InsightBlock text="La plupart des cabinets sous-estiment leur CAC de 40 à 60% en oubliant la valeur de leur temps commercial. Un CAC de 150-300€ est sain pour un cabinet spécialisé. Au-delà de 500€, le Payback Period devient difficile à boucler sous 30 jours." />
        </div>
      )

    // ── ÉTAPE 3 — LTGP30 ─────────────────────────────────────────────────────
    case 2:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Quels sont vos honoraires mensuels et votre marge brute ?
            </h2>
            <p className="text-muted text-[14px]">Étape 3 — Ce que rapporte vraiment un client</p>
          </div>

          <div className="flex flex-col gap-4">
            <NumInput
              label="Honoraires mensuels moyens / client"
              value={inputs.monthlyFees}
              onChange={v => onUpdate({ monthlyFees: v })}
              unit="€"
              placeholder="1500"
              hint="Honoraires récurrents, hors missions ponctuelles."
            />
            <NumInput
              label="Marge brute (après charges directes)"
              value={inputs.grossMarginPct}
              onChange={v => onUpdate({ grossMarginPct: v || 55 })}
              unit="%"
              placeholder="55"
              hint="Charges directes = logiciels, sous-traitance, coût direct du collaborateur sur ce dossier."
              defaultNote="défaut : 55%"
            />
            <NumInput
              label="Coût d'onboarding / nouveau client"
              value={inputs.onboardingCost}
              onChange={v => onUpdate({ onboardingCost: v })}
              unit="€"
              placeholder="200"
              hint="Temps de mise en route + outils, estimé en coût réel."
              defaultNote="défaut : 200€"
            />
          </div>

          {/* Live result */}
          <div className="bg-white border border-line rounded-xl p-5">
            <ComputedRow
              label="→ LTGP30 (cash récupéré mois 1)"
              value={fmtEuro(metrics.ltgp30)}
              accent
            />
            <ComputedRow
              label="CAC (étape 2)"
              value={fmtEuro(metrics.cac)}
            />
            <ComputedRow
              label="Onboarding"
              value={fmtEuro(inputs.onboardingCost)}
            />
            <ComputedRow
              label="→ Coût total à l'entrée"
              value={fmtEuro(metrics.totalAcquisitionCost)}
              accent
            />
          </div>

          <InsightBlock text="Le LTGP30 est ce que vous récupérez dans les 30 premiers jours d'un nouveau client. C'est la métrique que personne ne calcule — et la seule qui détermine si votre croissance s'autofinance ou vous saigne." />
        </div>
      )

    // ── ÉTAPE 4 — Payback Period Client (computed) ────────────────────────────
    case 3:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-3">Résultat — Module 1</div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(26px, 4vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Votre Payback Period Client.
            </h2>
            <p className="text-muted text-[14px]">Calculé sur la base de vos réponses aux étapes 1, 2 et 3.</p>
          </div>

          {/* Ratio display */}
          <div className="bg-white border border-line rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2">
                LTGP30 / (CAC + Onboarding)
              </div>
              <div
                className="font-display font-bold mb-1"
                style={{ fontSize: 'clamp(48px, 8vw, 72px)', color: getPaybackLevel(metrics.paybackRatioClient).color, letterSpacing: '-0.04em' }}
              >
                {metrics.paybackRatioClient.toFixed(2)}
              </div>
              <div className="font-mono text-[12px] uppercase tracking-wider" style={{ color: getPaybackLevel(metrics.paybackRatioClient).color }}>
                {getPaybackLevel(metrics.paybackRatioClient).label}
              </div>
            </div>

            <PaybackCursor ratio={metrics.paybackRatioClient} />

            <p className="mt-6 text-[14px] text-muted leading-relaxed border-t border-line pt-4">
              {getPaybackLevel(metrics.paybackRatioClient).description}
            </p>
          </div>

          {/* Et si simulation */}
          {inputs.paymentModel !== 'annual' && (
            <div className="bg-paper border border-line rounded-xl p-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">Simulation — Facturation annuelle upfront</div>
              <p className="text-[13px] text-ink-2 mb-4">
                Que se passerait-il si vous passiez en facturation annuelle upfront ?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 border border-line text-center">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">LTGP30 actuel</div>
                  <div className="font-display font-bold text-[20px] text-ink">{fmtEuro(metrics.ltgp30)}</div>
                  <div className="font-mono text-[11px] text-muted mt-1">ratio : {metrics.paybackRatioClient.toFixed(2)}</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-accent/30 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">LTGP30 annuel upfront</div>
                  <div className="font-display font-bold text-[20px] text-accent">{fmtEuro(metrics.annualLtgp30)}</div>
                  <div className="font-mono text-[11px] text-accent mt-1">ratio : {metrics.annualPaybackRatio.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )

    // ── ÉTAPE 5 — Modèle de paiement ─────────────────────────────────────────
    case 4:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Comment encaissez-vous vos honoraires aujourd&apos;hui ?
            </h2>
            <p className="text-muted text-[14px]">Étape 5 — Le modèle de paiement</p>
          </div>

          <div className="flex flex-col gap-2">
            {PAYMENT_OPTIONS.map(opt => (
              <RadioOption
                key={opt.value}
                value={opt.value}
                selected={inputs.paymentModel === opt.value}
                onSelect={() => onUpdate({ paymentModel: opt.value })}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>

          {/* Live simulation */}
          <div className="bg-white border border-line rounded-xl p-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">Impact sur votre trésorerie à J0</div>
            <ComputedRow
              label="Cash encaissé à J0 (modèle actuel)"
              value={fmtEuro(metrics.j0CashCurrentModel)}
            />
            <ComputedRow
              label="Cash encaissé à J0 (annuel upfront)"
              value={fmtEuro(metrics.j0CashAnnual)}
            />
            <ComputedRow
              label="Payback Period (modèle actuel)"
              value={metrics.paybackWithCurrentModel.toFixed(2)}
              accent
            />
            <ComputedRow
              label="Payback Period (annuel upfront)"
              value={metrics.paybackWithAnnual.toFixed(2)}
              accent
            />
          </div>

          <InsightBlock text="Le modèle de paiement est le levier le plus rapide à activer. Il ne change pas votre offre, votre prix, ni votre acquisition — il change uniquement quand vous encaissez. Un cabinet qui passe en annuel upfront améliore son Payback Period sans acquérir un seul client supplémentaire." />
        </div>
      )

    // ── ÉTAPE 6 — Niche ───────────────────────────────────────────────────────
    case 5:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Comment décririez-vous le positionnement de votre cabinet ?
            </h2>
            <p className="text-muted text-[14px]">Étape 6 — La niche</p>
          </div>

          <div className="flex flex-col gap-2">
            {SPEC_OPTIONS.map(opt => (
              <RadioOption
                key={opt.value}
                value={opt.value}
                selected={inputs.specialization === opt.value}
                onSelect={() => onUpdate({ specialization: opt.value })}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>

          {/* Impact table */}
          <div className="bg-white border border-line rounded-xl p-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-4">Impact estimé selon votre niveau</div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left font-mono text-[10px] uppercase tracking-wider text-muted py-2 pr-4">Niveau</th>
                    <th className="text-right font-mono text-[10px] uppercase tracking-wider text-muted py-2 px-2">CAC</th>
                    <th className="text-right font-mono text-[10px] uppercase tracking-wider text-muted py-2 px-2">Pricing</th>
                    <th className="text-right font-mono text-[10px] uppercase tracking-wider text-muted py-2 pl-2">Payback</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { key: 'generalist', label: 'Généraliste', cac: '+40%', pricing: 'base', payback: metrics.paybackRatioClient },
                    { key: 'semi', label: 'Semi-spécialisé', cac: 'base', pricing: '+15%', payback: computeSpecPayback(inputs, 'semi') },
                    { key: 'specialized', label: 'Spécialisé', cac: '−25%', pricing: '+35%', payback: computeSpecPayback(inputs, 'specialized') },
                    { key: 'ultra', label: 'Très spécialisé', cac: '−40%', pricing: '+60%', payback: computeSpecPayback(inputs, 'ultra') },
                  ] as const).map(row => (
                    <tr
                      key={row.key}
                      className={`border-b border-line last:border-0 ${inputs.specialization === row.key ? 'bg-accent/5' : ''}`}
                    >
                      <td className={`py-2.5 pr-4 font-medium ${inputs.specialization === row.key ? 'text-accent' : 'text-ink'}`}>
                        {row.label}
                        {inputs.specialization === row.key && ' ←'}
                      </td>
                      <td className="text-right py-2.5 px-2 text-muted">{row.cac}</td>
                      <td className="text-right py-2.5 px-2 text-muted">{row.pricing}</td>
                      <td className={`text-right py-2.5 pl-2 font-bold ${row.payback >= 2 ? 'text-green-700' : row.payback >= 1 ? 'text-accent' : 'text-red-600'}`}>
                        {row.payback.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InsightBlock text="La spécialisation est le seul levier qui améliore simultanément toutes les variables de votre Payback Period — CAC, marge, pricing, taux de conversion. Ce n'est pas un choix marketing. C'est un choix financier." />
        </div>
      )

    // ── ÉTAPE 7 — Coût recrutement ────────────────────────────────────────────
    case 6:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Quand vous recrutez, combien ça vous coûte réellement ?
            </h2>
            <p className="text-muted text-[14px]">Étape 7 — Le coût d&apos;un recrutement</p>
          </div>

          <div className="flex flex-col gap-4">
            <NumInput
              label="Salaire mensuel brut chargé"
              value={inputs.grossMonthlySalary}
              onChange={v => onUpdate({ grossMonthlySalary: v })}
              unit="€"
              placeholder="3500"
              hint="Salaire brut + charges patronales. Si pas encore recruté, utilisez votre cible."
            />
            <NumInput
              label="Coût de recrutement"
              value={inputs.recruitmentCost}
              onChange={v => onUpdate({ recruitmentCost: v })}
              unit="€"
              placeholder="3000"
              hint="Annonces, temps passé à entretiens, éventuel cabinet RH."
              defaultNote="défaut : 3 000€"
            />
            <NumInput
              label="Semaines d'onboarding / formation"
              value={inputs.onboardingWeeks}
              onChange={v => onUpdate({ onboardingWeeks: v || 6 })}
              unit="sem."
              placeholder="6"
              defaultNote="défaut : 6 sem."
            />
            <NumInput
              label="Productivité estimée à 90 jours"
              value={inputs.productivity90d}
              onChange={v => onUpdate({ productivity90d: v || 60 })}
              unit="%"
              placeholder="60"
              hint="Par rapport à un collaborateur senior à pleine vitesse."
              defaultNote="défaut : 60%"
            />
          </div>

          {/* Live result */}
          <div className="bg-white border border-line rounded-xl p-5">
            <ComputedRow label="CPR (coût recrutement)" value={fmtEuro(metrics.cpr)} />
            <ComputedRow label={`C90 (salaire × 3)`} value={fmtEuro(metrics.c90)} />
            <ComputedRow label="→ Coût total sur 90 jours" value={fmtEuro(metrics.totalRecruitmentCost)} accent />
          </div>

          <InsightBlock text="Le vrai coût d'un recrutement n'est pas le salaire du premier mois — c'est le coût des 90 premiers jours pendant lesquels le collaborateur n'est pas encore rentable. Ce nombre détermine le GP90 minimum que vous devez attendre pour que le recrutement soit financièrement sain." />
        </div>
      )

    // ── ÉTAPE 8 — Payback Équipe ──────────────────────────────────────────────
    case 7:
      return (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display font-bold text-ink mb-2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Combien de dossiers gère-t-il à 90 jours, et à quel honoraire ?
            </h2>
            <p className="text-muted text-[14px]">Étape 8 — Le Payback Period Équipe</p>
          </div>

          <div className="flex flex-col gap-4">
            <NumInput
              label="Dossiers gérés à 90 jours"
              value={inputs.casesManagedAt90d}
              onChange={v => onUpdate({ casesManagedAt90d: v })}
              placeholder="30"
              hint="Nombre de dossiers dont il est responsable à plein régime au bout de 3 mois."
            />
            <NumInput
              label="Honoraires moyens / dossier / mois"
              value={inputs.avgFeesPerCase}
              onChange={v => onUpdate({ avgFeesPerCase: v })}
              unit="€"
              placeholder="250"
            />
          </div>

          {/* Live result */}
          <div className="bg-white border border-line rounded-xl p-5">
            <ComputedRow
              label={`GP90 (${inputs.casesManagedAt90d} doss × ${inputs.avgFeesPerCase}€ × 3 × ${inputs.grossMarginPct}%)`}
              value={fmtEuro(metrics.gp90)}
            />
            <ComputedRow label="Coût total recrutement" value={fmtEuro(metrics.totalRecruitmentCost)} />
            <ComputedRow label="→ Payback Period Équipe" value={metrics.paybackRatioTeam.toFixed(2)} accent />
          </div>

          {/* Cursor */}
          <div className="bg-white border border-line rounded-xl p-6">
            <PaybackCursor ratio={metrics.paybackRatioTeam} label="Payback Period Équipe" />
          </div>

          <InsightBlock text="Ce ratio répond à la vraie question du recrutement — pas 'est-ce qu'on peut se permettre de recruter' mais 'combien peut-on se permettre de payer pour attirer les meilleurs'. Si votre GP90 est élevé, vous pouvez surpayer les bons profils et les attirer avant vos concurrents." />
        </div>
      )

    default:
      return null
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function computeSpecPayback(inputs: PaybackInputs, spec: SpecializationLevel): number {
  const overridden = { ...inputs, specialization: spec }
  const m = computeMetrics(overridden)
  return m.adjustedPaybackRatio
}
