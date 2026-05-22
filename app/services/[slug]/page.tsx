import { notFound } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import { services } from '@/data/services'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: 'GrowthCompta', url: 'https://growthcompta.fr' },
  }

  const faqSchema = service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null

  return (
    <>
      <StructuredData data={faqSchema ? [serviceSchema, faqSchema] : serviceSchema} />
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Services', href: '/services' },
        { name: service.title, href: `/services/${service.slug}` },
      ]} />

      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-200 text-sm uppercase tracking-widest mb-4">Service</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">{service.description}</p>
          <Button href="/outils/audit-acquisition" size="lg" variant="accent" aria-label="Demander un audit gratuit">
            Audit gratuit
          </Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Ce qui est inclus</h2>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Questions fréquentes</h2>
            <div className="space-y-6">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  )
}
