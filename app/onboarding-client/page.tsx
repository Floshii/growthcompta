import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import StructuredData from '@/components/seo/StructuredData'
import Hero from '@/components/sections/onboarding/Hero'
import StatsBand from '@/components/sections/onboarding/StatsBand'
import Frictions from '@/components/sections/onboarding/Frictions'
import Deliverables from '@/components/sections/onboarding/Deliverables'
import Process from '@/components/sections/onboarding/Process'
import Offer from '@/components/sections/onboarding/Offer'
import PaybackLink from '@/components/sections/onboarding/PaybackLink'
import Why from '@/components/sections/onboarding/Why'
import FAQ from '@/components/sections/onboarding/FAQ'
import CTAFinal from '@/components/sections/onboarding/CTAFinal'
import { faqItems } from '@/components/sections/onboarding/constants'

export const metadata: Metadata = buildMetadata({
  title: 'Onboarding client cabinet comptable — Dossier prêt à produire en 10 jours',
  description:
    'Cabinets sur Pennylane : finissez avec les relances interminables. Portail marque blanche, dossier complet en moins de 10 jours ouvrés, 3 h internes économisées par client. Offre Fondateurs — 1 000 € HT.',
  path: '/onboarding-client',
})

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function OnboardingClientPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <Hero />
      <StatsBand />
      <Frictions />
      <Deliverables />
      <Process />
      <Offer />
      <PaybackLink />
      <Why />
      <FAQ />
      <CTAFinal />
    </>
  )
}
