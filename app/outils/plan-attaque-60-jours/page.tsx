import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import PlanAttaque60Jours from '@/components/simulateurs/PlanAttaque60Jours'

export const metadata: Metadata = buildMetadata({
  title: 'Plan d\'attaque 60 jours — Facturation électronique avant le 1er septembre 2026',
  description:
    "La roadmap semaine par semaine pour transformer l'obligation de facturation électronique en campagne de repricing avant le 1er septembre 2026, datée automatiquement selon le jour où tu la consultes.",
  path: '/outils/plan-attaque-60-jours',
})

export default function PlanAttaque60JoursPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Outils', href: '/outils/plan-attaque-60-jours' },
        { name: "Plan d'attaque 60 jours", href: '/outils/plan-attaque-60-jours' },
      ]} />
      <PlanAttaque60Jours />
    </>
  )
}
