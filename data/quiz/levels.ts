import type { LevelConfig, GrowthLevel } from '@/types/quiz'

export const LEVELS: LevelConfig[] = [
  {
    id: 'invisible',
    label: 'Cabinet invisible',
    range: [0, 35],
    headline: "Votre cabinet est en mode survie — 100% dépendant du bouche-à-oreille.",
    sub: "C'est la situation de 7 cabinets sur 10. La bonne nouvelle : il y a énormément à gagner, vite.",
    tone: 'red',
  },
  {
    id: 'traditional',
    label: 'Cabinet émergent',
    range: [36, 55],
    headline: "Vous avez les fondations — il manque le moteur d'acquisition.",
    sub: "Quelques signaux positifs, mais rien de prévisible. Avec les bons leviers, vous pouvez doubler vos leads en 90 jours.",
    tone: 'orange',
  },
  {
    id: 'growing',
    label: 'Cabinet en croissance',
    range: [56, 75],
    headline: "Bonnes bases. Vous laissez quand même de la croissance sur la table.",
    sub: "Vous êtes au-dessus du marché — mais 2 ou 3 leviers non exploités peuvent transformer votre pipeline.",
    tone: 'green',
  },
  {
    id: 'structured',
    label: 'Cabinet structuré',
    range: [76, 90],
    headline: "Vous avez un vrai système. Il reste à l'industrialiser.",
    sub: "Top 15% des cabinets sur l'acquisition. La prochaine étape : automatiser et déléguer pour scaler.",
    tone: 'blue',
  },
  {
    id: 'dominant',
    label: 'Cabinet leader',
    range: [91, 100],
    headline: "Vous êtes dans le top 10% des cabinets sur la croissance.",
    sub: "Reste à défendre votre avance et identifier les prochains leviers de scale.",
    tone: 'blue',
  },
]

export function getLevelConfig(score: number): LevelConfig {
  return LEVELS.find(l => score >= l.range[0] && score <= l.range[1]) ?? LEVELS[0]
}

export function getLevelId(score: number): GrowthLevel {
  return getLevelConfig(score).id
}
