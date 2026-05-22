export type LeadMagnetType = "quiz" | "audit" | "calculator" | "guide"

export interface LeadMagnet {
  slug: string
  title: string
  description: string
  type: LeadMagnetType
  embedUrl?: string
  embedHeight?: number
  cta: string
  ogImage: string
  metaTitle: string
  metaDescription: string
}

export const leadMagnets: LeadMagnet[] = [
  {
    slug: "audit-acquisition",
    title: "Audit gratuit de votre acquisition",
    description:
      "Répondez à 10 questions et recevez un diagnostic personnalisé de votre système d'acquisition actuel avec les 3 priorités à adresser en premier.",
    type: "audit",
    embedUrl: undefined,
    embedHeight: 600,
    cta: "Faire mon audit gratuit",
    ogImage: "/images/outils/audit-acquisition.jpg",
    metaTitle: "Audit gratuit acquisition cabinet comptable | GrowthCompta",
    metaDescription:
      "Évaluez votre système d'acquisition en 10 questions. Recevez votre diagnostic personnalisé et les 3 priorités pour attirer plus de clients.",
  },
  {
    slug: "calculateur-croissance",
    title: "Calculateur de potentiel de croissance",
    description:
      "Estimez le chiffre d'affaires additionnel que vous pourriez générer avec un système d'acquisition optimisé pour votre cabinet.",
    type: "calculator",
    embedUrl: undefined,
    embedHeight: 500,
    cta: "Calculer mon potentiel",
    ogImage: "/images/outils/calculateur-croissance.jpg",
    metaTitle: "Calculateur croissance cabinet comptable | GrowthCompta",
    metaDescription:
      "Estimez le CA additionnel possible pour votre cabinet comptable avec un système d'acquisition optimisé.",
  },
  {
    slug: "guide-niche-comptable",
    title: "Guide : choisir sa niche comptable en 2025",
    description:
      "Les 15 niches les plus rentables pour se spécialiser en 2025, avec les critères de choix, les outils marketing et les premières actions à mener.",
    type: "guide",
    embedUrl: undefined,
    embedHeight: 400,
    cta: "Télécharger le guide gratuit",
    ogImage: "/images/outils/guide-niche.jpg",
    metaTitle: "Guide niches comptables 2025 | GrowthCompta",
    metaDescription:
      "Découvrez les 15 niches les plus rentables pour votre cabinet comptable en 2025. Guide complet avec critères et premières actions.",
  },
]
