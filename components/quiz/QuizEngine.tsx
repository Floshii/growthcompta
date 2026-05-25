'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import type { LeadData, DiagnosticResult, QuizStage } from '@/types/quiz'
import { QUESTIONS } from '@/data/quiz/questions'
import { buildDiagnosticResult, getSimulatedScore } from '@/data/quiz/scoring'
import LandingPage from './LandingPage'
import QuizStep from './QuizStep'
import LeadCaptureModal from './LeadCaptureModal'
import ResultsPage from './ResultsPage'

const SESSION_KEY = 'gs_quiz_answers'

function loadFromSession(): Record<string, number> {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return {}
}

function saveToSession(answers: Record<string, number>) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(answers)) } catch {}
}

function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY) } catch {}
}

export default function QuizEngine() {
  const [stage, setStage] = useState<QuizStage>('landing')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [lead, setLead] = useState<LeadData | null>(null)

  // Restore from sessionStorage on mount
  useEffect(() => {
    const saved = loadFromSession()
    if (Object.keys(saved).length > 0) {
      setAnswers(saved)
    }
  }, [])

  const simulatedScore = useMemo(() => getSimulatedScore(answers), [answers])

  const handleStart = useCallback(() => {
    setStage('quiz')
    window.scrollTo(0, 0)
  }, [])

  const handleAnswer = useCallback((value: number) => {
    const question = QUESTIONS[currentIdx]
    const next = { ...answers, [question.id]: value }
    setAnswers(next)
    saveToSession(next)

    setTimeout(() => {
      if (currentIdx + 1 < QUESTIONS.length) {
        setCurrentIdx(i => i + 1)
      } else {
        setStage('loading')
        window.scrollTo(0, 0)
        setTimeout(() => {
          setStage('capture')
          window.scrollTo(0, 0)
        }, 2000)
      }
    }, 340)
  }, [currentIdx, answers])

  const handleBack = useCallback(() => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1)
  }, [currentIdx])

  const handleSubmitLead = useCallback(async (leadData: LeadData) => {
    const qualification: Record<string, string> = {}
    QUESTIONS.filter(q => q.isQualification && q.qualificationKey).forEach(q => {
      const val = answers[q.id]
      if (val !== undefined) {
        qualification[q.qualificationKey!] = q.options[val]?.label ?? String(val)
      }
    })

    const diagnostic = buildDiagnosticResult(answers, qualification)

    fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead: leadData, result: diagnostic }),
    }).catch(err => console.warn('[QuizEngine] submit-lead failed:', err))

    clearSession()
    setLead(leadData)
    setResult(diagnostic)
    setStage('results')
    window.scrollTo(0, 0)
  }, [answers])

  const handleReset = useCallback(() => {
    clearSession()
    setStage('landing')
    setAnswers({})
    setCurrentIdx(0)
    setResult(null)
    setLead(null)
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
            Analyse en cours…
          </p>
          <p className="text-muted text-[14px] leading-relaxed">
            On calcule votre score sur 8 dimensions et on prépare vos recommandations personnalisées.
          </p>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
      </div>
    )
  }

  if (stage === 'results' && result && lead) {
    return <ResultsPage result={result} lead={lead} onReset={handleReset} />
  }

  return (
    <>
      {stage === 'landing' && <LandingPage onStart={handleStart} />}

      {(stage === 'quiz' || stage === 'capture') && (
        <QuizStep
          question={QUESTIONS[currentIdx]}
          currentIndex={currentIdx}
          total={QUESTIONS.length}
          selectedValue={answers[QUESTIONS[currentIdx].id]}
          onAnswer={handleAnswer}
          onBack={handleBack}
          simulatedScore={stage === 'quiz' ? simulatedScore : null}
        />
      )}

      {stage === 'capture' && (
        <LeadCaptureModal
          score={simulatedScore ?? 0}
          onSubmit={handleSubmitLead}
        />
      )}
    </>
  )
}
