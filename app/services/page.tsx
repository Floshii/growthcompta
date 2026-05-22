import ServiceCard from '@/components/ui/ServiceCard'
import CTABanner from '@/components/sections/CTABanner'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { services } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nos services d'acquisition pour cabinets comptables",
  description:
    "Découvrez tous nos services d'acquisition : SEO, Google Ads, LinkedIn, IA & automation. Spécialisé cabinets comptables.",
}

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Accueil', href: '/' }, { name: 'Services', href: '/services' }]} />
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos services d&apos;acquisition
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Chaque service est conçu exclusivement pour les cabinets comptables et optimisé pour générer des résultats mesurables.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
