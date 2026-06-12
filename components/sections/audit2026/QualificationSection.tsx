'use client'

import { useEffect, useMemo, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

const CALENDLY_URL = 'https://calendly.com/florent-19/audit-septembre-2026-12-a-30-d-honoraires'

const CA_OPTIONS = ['< 500 k€', '500 k€ – 1 M€', '1 M€ – 2 M€', '> 2 M€']
const BASE_OPTIONS = ['< 150 dossiers', '150 – 300 dossiers', '300 – 600 dossiers', '> 600 dossiers']
const EINVOICE_OPTIONS = [
  'Pas encore démarré',
  'Pilote en cours sur quelques clients',
  'Déploiement en cours sur une partie de la base',
  '> 50% des clients déjà migrés',
]
const BLOCKER_OPTIONS = [
  'Peur de la réaction des clients',
  'Manque de temps / équipe saturée',
  'Pas de méthode claire pour repricer',
  'Autre',
]

const BLOCKER_ADVICE: Record<string, string> = {
  'Peur de la réaction des clients':
    "On vous donne les scripts et on cadre le narratif (« la loi change, notre accompagnement évolue avec elle ») pendant l'audit — c'est l'objection la plus fréquente, et la plus facile à lever avec le bon angle.",
  'Manque de temps / équipe saturée':
    "C'est exactement pour ça que l'Étage 1 est piloté avec vous, pas par vous : on prépare la segmentation, les grilles et les scripts, vous gardez juste les 20 conversations clés.",
  'Pas de méthode claire pour repricer':
    "C'est le cœur de l'audit : segmentation de votre base par rentabilité réelle + grille de repricing en 3 paliers, prête à l'emploi.",
  Autre:
    "On en parle directement pendant l'audit — 45 minutes pour poser votre situation et voir ce qui débloque le mouvement.",
}

interface Answers {
  ca: string | null
  base: string | null
  einvoice: string | null
  intent: number
  blocker: string | null
  blockerOther: string
}

const initialAnswers: Answers = {
  ca: null,
  base: null,
  einvoice: null,
  intent: 5,
  blocker: null,
  blockerOther: '',
}

type StepId = 'ca' | 'base' | 'einvoice' | 'intent' | 'blocker' | 'reveal'

export default function QualificationSection() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [step, setStep] = useState(0)

  const steps = useMemo<StepId[]>(() => {
    const base: StepId[] = ['ca', 'base', 'einvoice', 'intent']
    if (answers.intent < 7) base.push('blocker')
    base.push('reveal')
    return base
  }, [answers.intent])

  const current = steps[Math.min(step, steps.length - 1)]
  const isQuestionStep = current !== 'reveal'
  const questionIndex = steps.indexOf(current) + 1
  const totalQuestions = steps.length - 1

  useEffect(() => {
    if (current === 'reveal') {
      trackEvent('audit2026_qualification_completed', {
        ca: answers.ca ?? '',
        base: answers.base ?? '',
        einvoice: answers.einvoice ?? '',
        intent: answers.intent,
        blocker: answers.blocker ?? '',
      })
    }
  }, [current, answers])

  function selectAndAdvance(key: 'ca' | 'base' | 'einvoice' | 'blocker', value: string) {
    setAnswers((a) => ({ ...a, [key]: value }))
    setTimeout(() => setStep((s) => s + 1), 180)
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1))
  }

  const isPriority =
    (answers.ca === '1 M€ – 2 M€' || answers.ca === '> 2 M€') &&
    (answers.base === '300 – 600 dossiers' || answers.base === '> 600 dossiers')

  return (
    <section className="py-16 md:py-[100px] bg-white" id="audit">
      <div className="max-w-[680px] mx-auto px-5 md:px-8">

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2 justify-center text-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          Avant de réserver
        </p>
        <h2
          className="font-display font-bold text-ink m-0 mb-3 text-center"
          style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          3 minutes pour qualifier votre dossier.
        </h2>
        <p className="text-[15px] text-ink-2 leading-relaxed text-center mb-10 max-w-[480px] mx-auto">
          Quatre questions rapides pour préparer votre Audit Septembre 2026 — puis vous réservez votre créneau.
        </p>

        <div className="rounded-2xl border border-line bg-paper p-7 md:p-10">

          {isQuestionStep && (
            <div className="flex items-center gap-3 mb-7">
              <div className="h-1.5 flex-1 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-300"
                  style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-muted tracking-[0.08em] whitespace-nowrap">
                {questionIndex}/{totalQuestions}
              </span>
            </div>
          )}

          {current === 'ca' && (
            <QuestionStep
              eyebrow="Taille du cabinet"
              question="Quel est votre montant annuel d'honoraires (approx.) ?"
              options={CA_OPTIONS}
              onSelect={(v) => selectAndAdvance('ca', v)}
            />
          )}

          {current === 'base' && (
            <QuestionStep
              eyebrow="Base à repricer"
              question="Combien de dossiers clients récurrents suivez-vous aujourd'hui (approx.) ?"
              options={BASE_OPTIONS}
              onSelect={(v) => selectAndAdvance('base', v)}
              onBack={goBack}
            />
          )}

          {current === 'einvoice' && (
            <QuestionStep
              eyebrow="Facturation électronique"
              question="Où en êtes-vous sur la facturation électronique (Factur-X / PDP / outils) ?"
              options={EINVOICE_OPTIONS}
              onSelect={(v) => selectAndAdvance('einvoice', v)}
              onBack={goBack}
            />
          )}

          {current === 'intent' && (
            <IntentStep
              value={answers.intent}
              onChange={(v) => setAnswers((a) => ({ ...a, intent: v }))}
              onContinue={() => setStep((s) => s + 1)}
              onBack={goBack}
            />
          )}

          {current === 'blocker' && (
            <BlockerStep
              value={answers.blocker}
              other={answers.blockerOther}
              onOtherChange={(v) => setAnswers((a) => ({ ...a, blockerOther: v }))}
              onSelect={(v) => selectAndAdvance('blocker', v)}
              onBack={goBack}
            />
          )}

          {current === 'reveal' && (
            <RevealStep isPriority={isPriority} answers={answers} />
          )}

        </div>

      </div>
    </section>
  )
}

// ── Sub-components ──────────────────────────────────────────────

function QuestionStep({
  eyebrow,
  question,
  options,
  onSelect,
  onBack,
}: {
  eyebrow: string
  question: string
  options: string[]
  onSelect: (value: string) => void
  onBack?: () => void
}) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{eyebrow}</span>
      <h3 className="font-display font-semibold text-ink text-[19px] md:text-[21px] leading-snug mt-2 mb-5">
        {question}
      </h3>
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className="text-left border border-line bg-white rounded-xl px-4 py-3.5 text-[15px] text-ink hover:border-accent hover:bg-white transition-colors duration-150"
          >
            {opt}
          </button>
        ))}
      </div>
      {onBack && (
        <button type="button" onClick={onBack} className="mt-5 font-mono text-[11px] text-muted hover:text-ink tracking-[0.08em] transition-colors">
          ← Retour
        </button>
      )}
    </div>
  )
}

function IntentStep({
  value,
  onChange,
  onContinue,
  onBack,
}: {
  value: number
  onChange: (v: number) => void
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">Votre intention</span>
      <h3 className="font-display font-semibold text-ink text-[19px] md:text-[21px] leading-snug mt-2 mb-7">
        Sur une échelle de 1 à 10, à quel point voulez-vous profiter de l&apos;échéance de septembre 2026 pour
        réajuster vos honoraires (à effectif constant) ?
      </h3>
      <div className="flex flex-col items-center gap-4 mb-3">
        <div
          className="font-display font-bold text-accent leading-none"
          style={{ fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.02em' }}
        >
          {value}
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-[var(--color-accent)]"
        />
        <div className="flex justify-between w-full font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          <span>Pas vraiment</span>
          <span>Absolument, dès que possible</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-accent text-white font-medium text-[15px] px-6 py-4 rounded-full border border-transparent hover:bg-accent-deep transition-all duration-200"
      >
        Continuer →
      </button>
      <button type="button" onClick={onBack} className="mt-4 font-mono text-[11px] text-muted hover:text-ink tracking-[0.08em] transition-colors">
        ← Retour
      </button>
    </div>
  )
}

function BlockerStep({
  value,
  other,
  onOtherChange,
  onSelect,
  onBack,
}: {
  value: string | null
  other: string
  onOtherChange: (v: string) => void
  onSelect: (value: string) => void
  onBack: () => void
}) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">Le frein principal</span>
      <h3 className="font-display font-semibold text-ink text-[19px] md:text-[21px] leading-snug mt-2 mb-5">
        Qu&apos;est-ce qui vous freine le plus aujourd&apos;hui ?
      </h3>
      <div className="flex flex-col gap-2.5">
        {BLOCKER_OPTIONS.map((opt) => (
          <div key={opt}>
            <button
              type="button"
              onClick={() => onSelect(opt)}
              className={`text-left w-full border rounded-xl px-4 py-3.5 text-[15px] text-ink bg-white hover:border-accent transition-colors duration-150 ${
                value === opt ? 'border-accent' : 'border-line'
              }`}
            >
              {opt}
            </button>
            {opt === 'Autre' && value === 'Autre' && (
              <input
                autoFocus
                type="text"
                value={other}
                onChange={(e) => onOtherChange(e.target.value)}
                placeholder="Précisez…"
                className="mt-2 w-full border border-line rounded-xl px-4 py-3 text-[15px] text-ink bg-white outline-none focus:border-accent transition-colors"
              />
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={onBack} className="mt-5 font-mono text-[11px] text-muted hover:text-ink tracking-[0.08em] transition-colors">
        ← Retour
      </button>
    </div>
  )
}

function RevealStep({ isPriority, answers }: { isPriority: boolean; answers: Answers }) {
  const advice = answers.blocker ? BLOCKER_ADVICE[answers.blocker] : null

  return (
    <div className="text-center">
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted bg-white border border-line rounded-full px-3 py-1 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        {isPriority ? 'Profil prioritaire pour l\'Étage 1' : 'Profil éligible à l\'audit'}
      </span>
      <h3 className="font-display font-bold text-ink text-[22px] md:text-[26px] leading-tight tracking-display mb-3">
        Votre Audit Septembre 2026 vous attend.
      </h3>
      {advice && (
        <p className="text-[14.5px] text-ink-2 leading-relaxed mb-5 max-w-[460px] mx-auto">{advice}</p>
      )}
      <p className="text-[14.5px] text-ink-2 leading-relaxed mb-7 max-w-[460px] mx-auto">
        45 min · gratuit · vous repartez avec votre chiffre de CA dormant et la grille de repricing — quel que soit
        votre choix ensuite.
      </p>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('audit2026_calendly_click', { ca: answers.ca ?? '', base: answers.base ?? '' })}
        className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[26px] py-[16px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
      >
        Réserver mon créneau — Audit Septembre 2026
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </div>
  )
}
