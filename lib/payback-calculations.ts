import type { PaybackInputs, PaybackMetrics, PaybackLevel, PaybackResult, PaybackZone } from '@/types/payback'

export const DEFAULT_INPUTS: PaybackInputs = {
  newClientsPerMonth: 2,
  marketingBudget: 0,
  commercialHoursPerWeek: 5,
  hourlyRate: 150,
  monthlyFees: 1500,
  grossMarginPct: 55,
  onboardingCost: 200,
  paymentModel: 'monthly-arrear',
  specialization: 'generalist',
  grossMonthlySalary: 3500,
  recruitmentCost: 3000,
  onboardingWeeks: 6,
  productivity90d: 60,
  casesManagedAt90d: 30,
  avgFeesPerCase: 250,
}

const J0_MULTIPLIERS: Record<string, number> = {
  'monthly-arrear': 0,
  'monthly-advance': 1,
  'quarterly': 3,
  'annual': 12,
  'variable': 1,
}

const CAC_MULTIPLIERS: Record<string, number> = {
  'generalist': 1.4,
  'semi': 1.0,
  'specialized': 0.75,
  'ultra': 0.6,
}

const PRICING_MULTIPLIERS: Record<string, number> = {
  'generalist': 1.0,
  'semi': 1.15,
  'specialized': 1.35,
  'ultra': 1.6,
}

export function computeMetrics(inputs: PaybackInputs): PaybackMetrics {
  const {
    newClientsPerMonth, marketingBudget, commercialHoursPerWeek, hourlyRate,
    monthlyFees, grossMarginPct, onboardingCost, paymentModel, specialization,
    grossMonthlySalary, recruitmentCost, casesManagedAt90d, avgFeesPerCase,
  } = inputs

  const margin = grossMarginPct / 100
  const clients = Math.max(newClientsPerMonth, 0.01)

  // Module 1
  const cac = (marketingBudget + commercialHoursPerWeek * 4.33 * hourlyRate) / clients
  const ltgp30 = monthlyFees * margin
  const totalAcquisitionCost = cac + onboardingCost
  const paybackRatioClient = totalAcquisitionCost > 0 ? ltgp30 / totalAcquisitionCost : 0

  // Annual upfront simulation
  const annualLtgp30 = monthlyFees * 12 * margin
  const annualPaybackRatio = totalAcquisitionCost > 0 ? annualLtgp30 / totalAcquisitionCost : 0

  // Payment model
  const j0Mult = J0_MULTIPLIERS[paymentModel] ?? 1
  const j0CashCurrentModel = monthlyFees * j0Mult * margin
  const j0CashAnnual = monthlyFees * 12 * margin
  const paybackWithCurrentModel = totalAcquisitionCost > 0 ? j0CashCurrentModel / totalAcquisitionCost : 0
  const paybackWithAnnual = totalAcquisitionCost > 0 ? j0CashAnnual / totalAcquisitionCost : 0

  // Specialization
  const adjustedCAC = cac * (CAC_MULTIPLIERS[specialization] ?? 1)
  const adjustedMonthlyFees = monthlyFees * (PRICING_MULTIPLIERS[specialization] ?? 1)
  const adjustedLTGP30 = adjustedMonthlyFees * margin
  const adjustedTotalCost = adjustedCAC + onboardingCost
  const adjustedPaybackRatio = adjustedTotalCost > 0 ? adjustedLTGP30 / adjustedTotalCost : 0

  // Module 3
  const c90 = grossMonthlySalary * 3
  const cpr = recruitmentCost
  const totalRecruitmentCost = c90 + cpr
  const gp90 = casesManagedAt90d * avgFeesPerCase * 3 * margin
  const paybackRatioTeam = totalRecruitmentCost > 0 ? gp90 / totalRecruitmentCost : 0

  return {
    cac, ltgp30, totalAcquisitionCost, paybackRatioClient,
    annualLtgp30, annualPaybackRatio,
    j0CashCurrentModel, j0CashAnnual, paybackWithCurrentModel, paybackWithAnnual,
    adjustedCAC, adjustedMonthlyFees, adjustedPaybackRatio,
    c90, cpr, totalRecruitmentCost, gp90, paybackRatioTeam,
  }
}

export function getPaybackZone(ratio: number): PaybackZone {
  if (ratio >= 5) return 'domination'
  if (ratio >= 2) return 'scale'
  if (ratio >= 1) return 'seuil'
  if (ratio >= 0.5) return 'survie'
  return 'danger'
}

export function getPaybackLevel(ratio: number): PaybackLevel {
  const zone = getPaybackZone(ratio)
  const configs: Record<PaybackZone, PaybackLevel> = {
    domination: {
      label: 'Domination',
      description: "La trésorerie n'est plus une contrainte. Votre seule limite est le marché.",
      color: '#0a8f4a',
      zone: 'domination',
    },
    scale: {
      label: 'Scale',
      description: "Un client finance le suivant. Vous pouvez investir agressivement en acquisition.",
      color: '#0a8f4a',
      zone: 'scale',
    },
    seuil: {
      label: 'Seuil de survie',
      description: "Votre acquisition commence à s'autofinancer. Vous pouvez scaler prudemment.",
      color: '#e85d2b',
      zone: 'seuil',
    },
    survie: {
      label: 'Survie',
      description: "Vous récupérez partiellement. La croissance consomme du cash plus vite qu'elle n'en génère.",
      color: '#e85d2b',
      zone: 'survie',
    },
    danger: {
      label: 'Danger',
      description: "Chaque client signé fragilise votre trésorerie. Votre acquisition n'est pas viable à l'échelle.",
      color: '#dc4a2b',
      zone: 'danger',
    },
  }
  return configs[zone]
}

export function getMaturityLevel(clientRatio: number, teamRatio: number): 1 | 2 | 3 {
  if (clientRatio >= 2 && teamRatio >= 2) return 3
  if (clientRatio >= 1 && teamRatio >= 1) return 2
  return 1
}

export function generateActions(inputs: PaybackInputs, metrics: PaybackMetrics): string[] {
  const { paybackRatioClient, paybackRatioTeam, cac } = metrics
  const { paymentModel, specialization } = inputs
  const actions: string[] = []

  if (paybackRatioClient < 1 && paymentModel === 'monthly-arrear') {
    actions.push(
      `Tester la facturation annuelle upfront — votre ratio passerait de ${paybackRatioClient.toFixed(2)} à ${metrics.annualPaybackRatio.toFixed(2)}, sans changer un seul client.`
    )
  }
  if (paybackRatioClient < 1.5 && (specialization === 'generalist' || specialization === 'semi')) {
    actions.push(
      "Définir une niche principale — réduction CAC estimée 25-40%, hausse pricing 35-60%. C'est le levier qui améliore toutes les variables simultanément."
    )
  }
  if (cac > 400 && paybackRatioClient < 2) {
    actions.push(
      "Réduire le CAC via un système de recommandation structuré — objectif : passer sous 250-300€ en activant vos clients existants comme prescripteurs."
    )
  }
  if (paybackRatioTeam < 1) {
    actions.push(
      "Recalculer votre budget recrutement maximal — avec votre GP90 actuel, le coût total dépasse la valeur générée. Réduire le C90 (onboarding plus rapide) ou augmenter la charge dossiers à 90j."
    )
  }
  if (paymentModel !== 'annual' && paybackRatioClient >= 2) {
    actions.push(
      "Passer en facturation annuelle upfront sur vos nouveaux clients — votre ratio est déjà fort, ce levier le rendrait exceptionnel et financerait votre prochain recrutement."
    )
  }
  if (paybackRatioClient >= 2 && paybackRatioTeam >= 2) {
    actions.push(
      "Doubler le budget acquisition — votre mécanique est saine, chaque euro investi se rembourse en moins d'un mois. C'est le moment d'accélérer."
    )
  }

  // Fallback
  while (actions.length < 3) {
    const fallbacks = [
      "Structurer un processus de recommandation — transformer vos clients satisfaits en prescripteurs actifs réduit le CAC de 40 à 70%.",
      "Réduire le coût d'onboarding — automatiser les étapes répétitives (collecte de documents, lettres de mission) libère du temps et baisse le coût réel d'entrée.",
      "Tester un positionnement de niche pendant 90 jours — un seul secteur, une seule promesse, un seul canal. Mesurer l'impact sur le taux de conversion.",
    ]
    const f = fallbacks[actions.length]
    if (f && !actions.includes(f)) actions.push(f)
    else break
  }

  return actions.slice(0, 3)
}

export function buildPaybackResult(inputs: PaybackInputs, lead: { firstName: string }): PaybackResult {
  const metrics = computeMetrics(inputs)
  const clientLevel = getPaybackLevel(metrics.paybackRatioClient)
  const teamLevel = getPaybackLevel(metrics.paybackRatioTeam)
  const maturityLevel = getMaturityLevel(metrics.paybackRatioClient, metrics.paybackRatioTeam)
  const actions = generateActions(inputs, metrics)
  void lead
  return { inputs, metrics, clientLevel, teamLevel, maturityLevel, actions }
}

export function fmtEuro(n: number): string {
  return Math.round(n).toLocaleString('fr-FR') + ' €'
}

export function ratioToPos(ratio: number): number {
  const capped = Math.min(ratio, 5.99)
  return Math.log(1 + capped) / Math.log(7) * 100
}
