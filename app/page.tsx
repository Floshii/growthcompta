import HeroSection from '@/components/sections/HeroSection'
import LogosStripSection from '@/components/sections/LogosStripSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import MethodSection from '@/components/sections/MethodSection'
import SimulateurSection from '@/components/sections/SimulateurSection'
import CasesSection from '@/components/sections/CasesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FitSection from '@/components/sections/FitSection'
import FAQSection from '@/components/sections/FAQSection'
import CTABanner from '@/components/sections/CTABanner'
import StructuredData from '@/components/seo/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GrowthCompta — Le système d\'acquisition des cabinets comptables ambitieux',
  description:
    "GrowthCompta est le système d'acquisition pensé pour les cabinets comptables ambitieux : générez des leads qualifiés, attirez des clients premium et sortez de la dépendance au bouche-à-oreille.",
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrowthCompta',
  url: 'https://growthcompta.com',
  description: "Le système d'acquisition pour cabinets comptables ambitieux — leads qualifiés, clients premium, croissance compoundée.",
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GrowthCompta',
  url: 'https://growthcompta.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://growthcompta.com/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <HeroSection />
      {/* <LogosStripSection /> — masqué jusqu'à avoir de vraies références clients */}
      <StatsSection />
      <ServicesSection />
      <MethodSection />
      <SimulateurSection />
      {/* <CasesSection /> — masqué jusqu'à avoir des chiffres clients confirmés */}
      <TestimonialsSection />
      <FitSection />
      <FAQSection />
      <CTABanner />
    </>
  )
}
