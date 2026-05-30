import type { Quadrant, QuadrantConfig } from '@/types/quiz'

export const QUADRANTS: QuadrantConfig[] = [
  {
    id: 'scale-ready',
    label: 'Scale Ready',
    tagline: "Vous avez les deux moteurs — il est temps d'accélérer.",
    description: "Votre acquisition fonctionne et votre capacité opérationnelle suit. Vous êtes dans le top 15% des cabinets. La prochaine étape : automatiser, industrialiser et défendre votre avance.",
    color: '#0a8f4a',
  },
  {
    id: 'supply-constrained',
    label: 'Moteur en surchauffe',
    tagline: 'Votre acquisition fonctionne. Votre capacité est le prochain frein.',
    description: "Vous savez attirer des clients — mais votre opérationnel ne suit pas. Pousser l'acquisition maintenant risque de dégrader la qualité de service et de déclencher du churn. Sécurisez la capa d'abord.",
    color: '#e85d2b',
  },
  {
    id: 'demand-constrained',
    label: 'Capacité sous-exploitée',
    tagline: 'Vous avez la place. Il manque le pipeline.',
    description: "Vos process et votre équipe peuvent absorber plus de clients. Le problème est en amont : pas assez de leads qualifiés qui entrent. C'est là que tout se joue pour vous.",
    color: '#0a5fbf',
  },
  {
    id: 'restructure',
    label: 'Restructurer d\'abord',
    tagline: "Solidifier les fondations avant d'appuyer sur l'accélérateur.",
    description: "Les deux dimensions demandent de l'attention. Chercher à scaler maintenant amplifierait les problèmes existants. Le bon move : stabiliser, simplifier, puis activer la croissance.",
    color: '#dc4a2b',
  },
]

export function getQuadrantConfig(demandScore: number, supplyScore: number): QuadrantConfig {
  if (demandScore >= 50 && supplyScore >= 50) return QUADRANTS[0] // scale-ready
  if (demandScore >= 50 && supplyScore <  50) return QUADRANTS[1] // supply-constrained
  if (demandScore <  50 && supplyScore >= 50) return QUADRANTS[2] // demand-constrained
  return QUADRANTS[3]                                              // restructure
}

export function getQuadrantId(demandScore: number, supplyScore: number): Quadrant {
  return getQuadrantConfig(demandScore, supplyScore).id
}
