import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import SimulateurFactureElectronique from '@/components/simulateurs/SimulateurFactureElectronique'

export const metadata: Metadata = buildMetadata({
  title: 'Simulateur facturation électronique 2027 — Combien ça va te coûter ou te rapporter',
  description:
    "Entre le nombre de clients TPE/PME de ton cabinet et découvre combien de clients migrer avant le 1er septembre 2027, la charge de travail estimée, et le CA récurrent potentiel si tu factures l'accompagnement.",
  path: '/outils/simulateur-facture-electronique',
})

export default function SimulateurFactureElectroniquePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Outils', href: '/outils/simulateur-facture-electronique' },
        { name: 'Simulateur facturation électronique', href: '/outils/simulateur-facture-electronique' },
      ]} />
      <SimulateurFactureElectronique />
    </>
  )
}
