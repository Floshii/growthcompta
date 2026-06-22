import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import MethodSection from '@/components/sections/MethodSection'
import SimulateurSection from '@/components/sections/SimulateurSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FitSection from '@/components/sections/FitSection'
import FAQSection from '@/components/sections/FAQSection'
import CTABanner from '@/components/sections/CTABanner'
import StructuredData from '@/components/seo/StructuredData'

export const metadata: Metadata = buildMetadata({
  title: "Système d'acquisition — GrowthCompta",
  description:
    "Le système d'acquisition pensé pour les cabinets comptables ambitieux : leads qualifiés, clients premium, sortir de la dépendance au bouche-à-oreille.",
  path: '/acquisition',
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrowthCompta',
  url: 'https://growthcompta.com',
  description: "Le système d'acquisition pour cabinets comptables ambitieux — leads qualifiés, clients premium, croissance compoundée.",
}

export default function AcquisitionPage() {
  return (
    <>
      <StructuredData data={[organizationSchema]} />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <MethodSection />
      <SimulateurSection />
      <TestimonialsSection />
      <FitSection />
      <FAQSection />
      <CTABanner />
    </>
  )
}
