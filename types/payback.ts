export type PaymentModel = 'monthly-arrear' | 'monthly-advance' | 'quarterly' | 'annual' | 'variable'
export type SpecializationLevel = 'generalist' | 'semi' | 'specialized' | 'ultra'
export type PaybackStage = 'landing' | 'quiz' | 'capture' | 'loading' | 'results'
export type PaybackZone = 'danger' | 'survie' | 'seuil' | 'scale' | 'domination'

export interface PaybackInputs {
  newClientsPerMonth: number
  marketingBudget: number
  commercialHoursPerWeek: number
  hourlyRate: number
  monthlyFees: number
  grossMarginPct: number
  onboardingCost: number
  paymentModel: PaymentModel
  specialization: SpecializationLevel
  grossMonthlySalary: number
  recruitmentCost: number
  onboardingWeeks: number
  productivity90d: number
  casesManagedAt90d: number
  avgFeesPerCase: number
}

export interface PaybackMetrics {
  cac: number
  ltgp30: number
  totalAcquisitionCost: number
  paybackRatioClient: number
  annualLtgp30: number
  annualPaybackRatio: number
  j0CashCurrentModel: number
  j0CashAnnual: number
  paybackWithCurrentModel: number
  paybackWithAnnual: number
  adjustedCAC: number
  adjustedMonthlyFees: number
  adjustedPaybackRatio: number
  c90: number
  cpr: number
  totalRecruitmentCost: number
  gp90: number
  paybackRatioTeam: number
}

export interface PaybackLevel {
  label: string
  description: string
  color: string
  zone: PaybackZone
}

export interface PaybackLeadData {
  firstName: string
  email: string
  phone: string
  cabinetName: string
}

export interface PaybackResult {
  inputs: PaybackInputs
  metrics: PaybackMetrics
  clientLevel: PaybackLevel
  teamLevel: PaybackLevel
  maturityLevel: 1 | 2 | 3
  actions: string[]
}
