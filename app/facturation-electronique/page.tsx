import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import StructuredData from '@/components/seo/StructuredData'
import Hero from '@/components/sections/audit2026/Hero'
import StatsBar from '@/components/sections/audit2026/StatsBar'
import TruthSection from '@/components/sections/audit2026/TruthSection'
import MethodSection from '@/components/sections/audit2026/MethodSection'
import MathsSection from '@/components/sections/audit2026/MathsSection'
import FAQSection from '@/components/sections/audit2026/FAQSection'
import { faqItems } from '@/components/sections/audit2026/faqData'
import QualificationSection from '@/components/sections/audit2026/QualificationSection'
import FinalCTA from '@/components/sections/audit2026/FinalCTA'

export const metadata: Metadata = buildMetadata({
  title: 'Facturation électronique 2026 — Transformez votre obligation en +12 à 30% d\'honoraires',
  description:
    "Avant le 1er septembre 2026, vous devez recontacter 100% de vos clients pour la facturation électronique. On transforme cette obligation en repricing de votre base, sans recruter — payé au résultat. Audit offert, 45 min.",
  path: '/facturation-electronique',
})

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function FacturationElectroniquePage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <Hero />
      <StatsBar />
      <TruthSection />
      <MethodSection />
      <MathsSection />
      <FAQSection />
      <QualificationSection />
      <FinalCTA />
    </>
  )
}
