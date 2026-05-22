export interface Stat {
  value: string
  label: string
  description?: string
}

export const stats: Stat[] = [
  { value: "2x", label: "Plus de rendez-vous qualifiés", description: "En moyenne après 90 jours d'accompagnement" },
  { value: "+67%", label: "Augmentation du panier moyen", description: "Grâce au positionnement de niche" },
  { value: "90j", label: "Pour voir les premiers résultats", description: "Premiers leads SEO dès 3 mois" },
  { value: "50+", label: "Cabinets accompagnés", description: "Partout en France" },
]
