'use client'

import type { Question } from '@/types/quiz'
import { CATEGORY_LABELS } from '@/data/quiz/questions'

interface Props {
  question: Question
  currentIndex: number
  total: number
  selectedValue: number | undefined
  onAnswer: (value: number) => void
  onBack: () => void
  simulatedScore: number | null
}

export default function QuizStep({
  question, currentIndex, total, selectedValue, onAnswer, onBack, simulatedScore
}: Props) {
  const letters = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-3 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
          <span className="font-mono text-[11px] text-ink shrink-0 tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {simulatedScore !== null && (
            <div className="shrink-0 flex items-center gap-1.5 bg-paper border border-line rounded-full px-3 py-1">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">Score</span>
              <span className="font-display font-bold text-[15px] text-ink leading-none">
                {simulatedScore}<span className="text-muted font-normal text-[11px]">/100</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-[680px] mx-auto w-full px-5 md:px-8 pt-24 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          {CATEGORY_LABELS[question.category] ?? question.category}
        </p>

        <h2
          className="font-display font-bold text-ink mb-8"
          style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', letterSpacing: '-0.025em', lineHeight: 1.15 }}
        >
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((opt, i) => {
            const selected = selectedValue === i
            return (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                className="flex items-center gap-4 w-full px-5 py-5 rounded-xl border text-left transition-all duration-150 group"
                style={{
                  background: selected ? 'var(--color-accent-soft, #fbe8de)' : '#fff',
                  borderColor: selected ? 'var(--color-accent)' : 'var(--color-line)',
                  boxShadow: selected ? '0 4px 16px -4px rgba(232,93,43,0.2)' : '0 1px 0 rgba(0,0,0,0.02)',
                }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-[12px] font-bold transition-all duration-150"
                  style={{
                    background: selected ? 'var(--color-accent)' : 'var(--color-paper)',
                    color: selected ? '#fff' : 'var(--color-ink)',
                  }}
                >
                  {selected ? '✓' : letters[i]}
                </span>
                <span className="font-sans text-[15px] leading-snug text-ink flex-1">{opt.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onBack}
            disabled={currentIndex === 0}
            className="font-mono text-[12px] text-muted hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            ← Précédent
          </button>
          <span className="font-mono text-[11px] text-muted flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
            Vos réponses sont confidentielles
          </span>
        </div>
      </div>
    </div>
  )
}
