import type { CategoryScores, QuickWin, RoadmapAction, LeadQualification } from '@/types/quiz'
import { CATEGORY_MAX } from './questions'

const QUICK_WIN_MAP: Record<string, QuickWin> = {
  visibility: {
    title: 'Optimiser votre Google Business Profile',
    description: "Compléter, vérifier et activer la prise de RDV directement sur Google Maps. Impact immédiat sur la visibilité locale.",
    impact: 'high',
    speed: 'quick',
  },
  positioning: {
    title: 'Créer une page de niche dédiée',
    description: "Une page SEO spécialisée pour votre secteur cible (ex : « Expert-comptable e-commerce »). Différenciation + trafic qualifié.",
    impact: 'high',
    speed: 'medium',
  },
  conversion: {
    title: 'Ajouter un CTA de prise de RDV en ligne',
    description: "Intégrer un Calendly ou un formulaire simplifié sur votre homepage. Moins de friction = plus de leads.",
    impact: 'high',
    speed: 'quick',
  },
  acquisition: {
    title: 'Lancer une séquence LinkedIn outbound',
    description: "5 messages ciblés par semaine vers votre ICP. La prospection la plus ROIste pour un cabinet en croissance.",
    impact: 'high',
    speed: 'medium',
  },
  content: {
    title: 'Publier 1 contenu LinkedIn par semaine',
    description: "Un post court sur un conseil fiscal pour votre niche. Construit l'autorité et génère des leads entrants.",
    impact: 'medium',
    speed: 'quick',
  },
  crm: {
    title: 'Mettre en place un suivi de prospects simple',
    description: "Un pipeline dans Notion ou HubSpot Free. Vous ne perdrez plus de leads entre les mailles.",
    impact: 'high',
    speed: 'quick',
  },
  automation: {
    title: "Automatiser l'email de bienvenue client",
    description: "Un email automatique au nouvel client avec checklist onboarding. Professionnalisme immédiat, temps économisé.",
    impact: 'medium',
    speed: 'quick',
  },
  reputation: {
    title: "Lancer une campagne de collecte d'avis Google",
    description: "Envoyer un lien direct à vos 10 meilleurs clients actuels. Objectif : +10 avis en 2 semaines.",
    impact: 'high',
    speed: 'quick',
  },
}

export function generateRecommendations(
  scores: CategoryScores,
  _qualification: Partial<LeadQualification>
): { quickWins: QuickWin[]; roadmap: RoadmapAction[] } {
  // Compute relative percentages and find 3 weakest
  const percents = Object.entries(scores).map(([cat, score]) => ({
    cat,
    pct: score / (CATEGORY_MAX[cat] ?? 10),
  }))
  const weakest = percents.sort((a, b) => a.pct - b.pct).slice(0, 3)

  const quickWins: QuickWin[] = weakest
    .map(w => QUICK_WIN_MAP[w.cat])
    .filter(Boolean)

  const roadmap: RoadmapAction[] = [
    ...quickWins.slice(0, 2).map(qw => ({ title: qw.title, period: '30' as const })),
    { title: 'Lancer les premières campagnes Google Ads', period: '60' },
    { title: 'Créer 2 pages niche optimisées SEO', period: '60' },
    { title: 'Mettre en place une séquence de nurturing email', period: '90' },
    { title: 'Installer un système de tracking et reporting mensuel', period: '90' },
  ]

  return { quickWins, roadmap }
}
