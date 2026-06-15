'use client'

import { useState, useCallback } from 'react'
import type { PaybackStage, PaybackInputs, PaybackLeadData, PaybackResult } from '@/types/payback'
import { DEFAULT_INPUTS, buildPaybackResult } from '@/lib/payback-calculations'
import { trackEvent } from '@/lib/analytics'
import PaybackLanding from './PaybackLanding'
import PaybackStep from './PaybackStep'
import PaybackLeadCapture from './PaybackLeadCapture'
import PaybackResults from './PaybackResults'

export default function PaybackEngine() {
  const [stage, setStage] = useState<PaybackStage>('landing')
  const [step, setStep] = useState(0)
  const [inputs, setInputs] = useState<PaybackInputs>(DEFAULT_INPUTS)
  const [lead, setLead] = useState<PaybackLeadData | null>(null)
  const [result, setResult] = useState<PaybackResult | null>(null)

  const handleStart = useCallback(() => {
    trackEvent('payback_quiz_started')
    setStage('quiz')
    setStep(0)
    window.scrollTo(0, 0)
  }, [])

  const handleUpdate = useCallback((updates: Partial<PaybackInputs>) => {
    setInputs(prev => ({ ...prev, ...updates }))
  }, [])

  const handleNext = useCallback(() => {
    if (step < 7) {
      trackEvent('payback_step_completed', { step: step + 1 })
      setStep(s => s + 1)
      window.scrollTo(0, 0)
    } else {
      trackEvent('payback_quiz_completed')
      setStage('loading')
      window.scrollTo(0, 0)
      setTimeout(() => {
        setStage('capture')
        window.scrollTo(0, 0)
      }, 1800)
    }
  }, [step])

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep(s => s - 1)
      window.scrollTo(0, 0)
    } else {
      setStage('landing')
      window.scrollTo(0, 0)
    }
  }, [step])

  const handleSubmitLead = useCallback(async (leadData: PaybackLeadData) => {
    const computed = buildPaybackResult(inputs, leadData)

    trackEvent('payback_lead_submitted', {
      payback_client: computed.metrics.paybackRatioClient,
      payback_team: computed.metrics.paybackRatioTeam,
      maturity: computed.maturityLevel,
    })

    fetch('/api/submit-payback-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead: leadData, result: computed }),
    }).catch(() => {})

    setLead(leadData)
    setResult(computed)
    setStage('results')
    window.scrollTo(0, 0)
  }, [inputs])

  const handleReset = useCallback(() => {
    setStage('landing')
    setStep(0)
    setInputs(DEFAULT_INPUTS)
    setLead(null)
    setResult(null)
    window.scrollTo(0, 0)
  }, [])

  if (stage === 'loading') {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-8 px-5">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-accent"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
        <div className="text-center max-w-[380px]">
          <p className="font-display font-bold text-ink text-[22px] tracking-display leading-tight mb-2">
            Calcul en cours…
          </p>
          <p className="text-muted text-[14px] leading-relaxed">
            On finalise votre Payback Period et on génère vos actions prioritaires.
          </p>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
      </div>
    )
  }

  if (stage === 'results' && result && lead) {
    return <PaybackResults result={result} lead={lead} onReset={handleReset} />
  }

  if (stage === 'capture') {
    return <PaybackLeadCapture onSubmit={handleSubmitLead} />
  }

  if (stage === 'quiz') {
    return (
      <PaybackStep
        stepIndex={step}
        inputs={inputs}
        onUpdate={handleUpdate}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  return <PaybackLanding onStart={handleStart} />
}
