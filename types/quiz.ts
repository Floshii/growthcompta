export type AnswerValue = 0 | 1 | 2 | 3

export interface QuizAnswer {
  questionId: string
  value: AnswerValue
  label: string
}

export type QuizCategory =
  | 'visibility'
  | 'positioning'
  | 'conversion'
  | 'acquisition'
  | 'content'
  | 'crm'
  | 'automation'
  | 'reputation'

export interface Question {
  id: string
  category: QuizCategory
  text: string
  options: { label: string; value: AnswerValue }[]
  isQualification?: boolean
  qualificationKey?: keyof LeadQualification
}

export interface LeadQualification {
  cabinetSize: string
  collaborators: string
  averageBasket: string
  mainNiche: string
  city: string
  currentAcquisition: string
  marketingBudget: string
  growthAmbition: string
}

export interface CategoryScores {
  visibility: number
  positioning: number
  conversion: number
  acquisition: number
  content: number
  crm: number
  automation: number
  reputation: number
}

export type GrowthLevel =
  | 'invisible'
  | 'traditional'
  | 'growing'
  | 'structured'
  | 'dominant'

export interface LevelConfig {
  id: GrowthLevel
  label: string
  range: [number, number]
  headline: string
  sub: string
  tone: 'red' | 'orange' | 'green' | 'blue'
}

export interface QuickWin {
  title: string
  description: string
  impact: 'high' | 'medium'
  speed: 'quick' | 'medium' | 'long'
}

export interface RoadmapAction {
  title: string
  period: '30' | '60' | '90'
}

export interface DiagnosticResult {
  globalScore: number
  categoryScores: CategoryScores
  level: GrowthLevel
  levelConfig: LevelConfig
  quickWins: QuickWin[]
  roadmap: RoadmapAction[]
  qualification: Partial<LeadQualification>
}

export interface LeadData {
  firstName: string
  email: string
  phone: string
  cabinetName: string
  city: string
}

export type QuizStage = 'landing' | 'quiz' | 'capture' | 'loading' | 'results'
