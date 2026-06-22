import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/facturation2026/Hero'
import StatsBand from '@/components/sections/facturation2026/StatsBand'
import Offer from '@/components/sections/facturation2026/Offer'
import FirstStep from '@/components/sections/facturation2026/FirstStep'
import Accelerators from '@/components/sections/facturation2026/Accelerators'
import PaybackLaw from '@/components/sections/facturation2026/PaybackLaw'
import Why from '@/components/sections/facturation2026/Why'
import CountdownStrip from '@/components/sections/facturation2026/CountdownStrip'
import FAQ from '@/components/sections/facturation2026/FAQ'
import CTAFinal from '@/components/sections/facturation2026/CTAFinal'

export const metadata: Metadata = buildMetadata({
  title: 'Facturation électronique 2026 — Automatisez, libérez 20–30% de capacité',
  description:
    "Cabinets 5–50 collaborateurs : automatisez la facturation électronique avant le 1er septembre 2026. Flux Factur-X + PDP raccordée + formation équipe. À partir de 1 490 €, diagnostic gratuit.",
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Offer />
      <FirstStep />
      <Accelerators />
      <PaybackLaw />
      <Why />
      <CountdownStrip />
      <FAQ />
      <CTAFinal />
    </>
  )
}
