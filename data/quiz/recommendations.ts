import type { CategoryScores, QuickWin, RoadmapAction, LeadQualification, Quadrant } from '@/types/quiz'
import { CATEGORY_MAX } from './questions'

// ── Quick wins per dimension ──────────────────────────────────────────────────

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
    title: 'Clarifier le message de votre homepage',
    description: "En 5 secondes, un prospect doit comprendre ce que vous faites, pour qui, et quelle action prendre. Retravailler le hero de votre site.",
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
  supply: {
    title: 'Cartographier votre capacité réelle',
    description: "Calculer le nombre de clients par collaborateur et identifier votre seuil de saturation. Sans ce chiffre, vous pilotez à l'aveugle et risquez la dégradation qualité.",
    impact: 'high',
    speed: 'quick',
  },
}

// ── Roadmaps per quadrant ─────────────────────────────────────────────────────

const ROADMAPS: Record<Quadrant, RoadmapAction[]> = {
  'scale-ready': [
    { title: 'Identifier vos 2 segments clients les plus profitables et structurer une offre premium', period: '30' },
    { title: 'Mettre en place un tableau de bord acquisition (coût par lead, taux de closing)', period: '30' },
    { title: 'Déléguer 3 tâches chronophages et automatiser l\'onboarding client', period: '60' },
    { title: 'Industrialiser un canal d\'acquisition (SEO ou Ads) avec budget récurrent', period: '60' },
    { title: 'Viser +30% de CA sur votre segment le plus rentable', period: '90' },
    { title: 'Construire un système de referral structuré avec vos clients ambassadeurs', period: '90' },
  ],
  'supply-constrained': [
    { title: 'Auditer la charge par collaborateur — identifier ce qui peut être délégué ou supprimé', period: '30' },
    { title: 'Documenter les 5 process les plus chronophages et chercher à les automatiser', period: '30' },
    { title: 'Lancer un recrutement ciblé ou structurer des relations avec des sous-traitants', period: '60' },
    { title: 'Revoir les prix à la hausse pour réduire la pression volume sans sacrifier le CA', period: '60' },
    { title: 'Une fois la capa sécurisée, activer un seul canal d\'acquisition maîtrisé', period: '90' },
    { title: 'Mettre en place des indicateurs de saturation pour anticiper les prochains plafonds', period: '90' },
  ],
  'demand-constrained': [
    { title: 'Optimiser votre Google Business Profile et lancer 2 pages niche SEO prioritaires', period: '30' },
    { title: 'Définir votre ICP exact et rédiger 3 templates de prospection LinkedIn', period: '30' },
    { title: 'Lancer une campagne Ads Google ou une séquence outbound LinkedIn sur 4 semaines', period: '60' },
    { title: 'Installer un CRM et mettre en place un suivi systématique des leads entrants', period: '60' },
    { title: 'Construire une séquence de nurturing email pour les prospects non-décidés', period: '90' },
    { title: 'Tester un second canal d\'acquisition et mesurer le coût par RDV qualifié', period: '90' },
  ],
  'restructure': [
    { title: 'Sonder vos clients perdus des 6 derniers mois — comprendre le vrai motif de départ', period: '30' },
    { title: 'Stabiliser l\'équipe : entretien individuel avec chaque collaborateur, plan de rétention', period: '30' },
    { title: 'Simplifier l\'offre : réduire à 1-2 segments rentables, augmenter les prix', period: '60' },
    { title: 'Documenter et standardiser les 3 process clients les plus critiques', period: '60' },
    { title: 'Repositionner la communication sur votre segment le plus rentable', period: '90' },
    { title: 'Lancer un premier test acquisition ciblé uniquement une fois les fondations stables', period: '90' },
  ],
}

// ── Main function ─────────────────────────────────────────────────────────────

export function generateRecommendations(
  scores: CategoryScores,
  _qualification: Partial<LeadQualification>,
  quadrant: Quadrant
): { quickWins: QuickWin[]; roadmap: RoadmapAction[] } {
  // Find 3 weakest dimensions (supply included)
  const percents = (Object.entries(scores) as [string, number][]).map(([cat, score]) => ({
    cat,
    pct: score / (CATEGORY_MAX[cat] ?? 10),
  }))
  const weakest = percents.sort((a, b) => a.pct - b.pct).slice(0, 3)

  const quickWins: QuickWin[] = weakest
    .map(w => QUICK_WIN_MAP[w.cat])
    .filter(Boolean)

  const roadmap = ROADMAPS[quadrant]

  return { quickWins, roadmap }
}
