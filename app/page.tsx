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
  title: 'GrowthCompta — Le seul cabinet de growth pour experts-comptables',
  description:
    "GrowthCompta installe votre moteur d'acquisition complet — SEO programmatique, paid ads, content & sales ops. Dédié aux cabinets d'expertise comptable.",
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrowthCompta',
  url: 'https://growthcompta.com',
  description: "Agence growth B2B spécialisée dans l'acquisition pour cabinets comptables français.",
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
      <LogosStripSection />
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
