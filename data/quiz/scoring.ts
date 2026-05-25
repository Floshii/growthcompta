import type { CategoryScores, DiagnosticResult, LeadQualification } from '@/types/quiz'
import { QUESTIONS, CATEGORY_MAX } from './questions'
import { getLevelConfig, getLevelId } from './levels'
import { generateRecommendations } from './recommendations'

export function calculateCategoryScore(
  category: string,
  answers: Record<string, number>
): number {
  const qs = QUESTIONS.filter(q => q.category === category && !q.isQualification)
  if (qs.length === 0) return 0

  const answered = qs.reduce((sum, q) => {
    const idx = answers[q.id]
    return sum + (idx !== undefined ? (q.options[idx]?.value ?? 0) : 0)
  }, 0)
  const maxPossible = qs.length * 3
  const max = CATEGORY_MAX[category] ?? 10
  return Math.round((answered / maxPossible) * max)
}

export function calculateGlobalScore(scores: CategoryScores): number {
  return Object.values(scores).reduce((s, v) => s + v, 0)
}

export function buildDiagnosticResult(
  answers: Record<string, number>,
  qualification: Partial<LeadQualification>
): DiagnosticResult {
  const categoryScores: CategoryScores = {
    visibility:  calculateCategoryScore('visibility', answers),
    positioning: calculateCategoryScore('positioning', answers),
    conversion:  calculateCategoryScore('conversion', answers),
    acquisition: calculateCategoryScore('acquisition', answers),
    content:     calculateCategoryScore('content', answers),
    crm:         calculateCategoryScore('crm', answers),
    automation:  calculateCategoryScore('automation', answers),
    reputation:  calculateCategoryScore('reputation', answers),
  }

  const globalScore = calculateGlobalScore(categoryScores)
  const level = getLevelId(globalScore)
  const levelConfig = getLevelConfig(globalScore)
  const { quickWins, roadmap } = generateRecommendations(categoryScores, qualification)

  return { globalScore, categoryScores, level, levelConfig, quickWins, roadmap, qualification }
}

export function getSimulatedScore(answers: Record<string, number>): number | null {
  const scoredQuestions = QUESTIONS.filter(q => !q.isQualification)
  const answeredScored = scoredQuestions.filter(q => answers[q.id] !== undefined)
  if (answeredScored.length === 0) return null

  const total = answeredScored.reduce((sum, q) => {
    const idx = answers[q.id]
    return sum + (idx !== undefined ? (q.options[idx]?.value ?? 0) : 0)
  }, 0)
  const max = answeredScored.length * 3
  return Math.round((total / max) * 100)
}
