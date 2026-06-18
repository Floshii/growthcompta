import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/facturation2026/Hero'
import StatsBand from '@/components/sections/facturation2026/StatsBand'
import PaybackLaw from '@/components/sections/facturation2026/PaybackLaw'
import Offer from '@/components/sections/facturation2026/Offer'
import FirstStep from '@/components/sections/facturation2026/FirstStep'
import Accelerators from '@/components/sections/facturation2026/Accelerators'
import Why from '@/components/sections/facturation2026/Why'
import FAQ from '@/components/sections/facturation2026/FAQ'
import CTAFinal from '@/components/sections/facturation2026/CTAFinal'
import CountdownStrip from '@/components/sections/facturation2026/CountdownStrip'

export const metadata: Metadata = buildMetadata({
  title: 'Facturation électronique 2026 — Automatisez, libérez 20–30% de capacité',
  description:
    "Cabinets 5–50 collaborateurs : automatisez la facturation électronique avant le 1er septembre 2026. Flux Factur-X + PDP raccordée + formation équipe. À partir de 1 490 €, diagnostic gratuit.",
  path: '/facturation-electronique-2026',
})

export default function FacturationElectronique2026Page() {
  return (
    <>
      <Hero />
      <StatsBand />
      <PaybackLaw />
      <Offer />
      <FirstStep />
      <Accelerators />
      <Why />
      <FAQ />
      <CTAFinal />
      <CountdownStrip />
    </>
  )
}
