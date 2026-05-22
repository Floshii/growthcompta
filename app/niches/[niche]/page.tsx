import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import { niches } from '@/data/niches'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ niche: string }>
}

export async function generateStaticParams() {
  return niches.map((n) => ({ niche: n.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche } = await params
  const data = niches.find((n) => n.slug === niche)
  if (!data) return {}
  return {
    title: `Expert comptable ${data.label} | GrowthCompta`,
    description: data.description.slice(0, 155),
  }
}

export default async function NichePage({ params }: PageProps) {
  const { niche } = await params
  const data = niches.find((n) => n.slug === niche)
  if (!data) notFound()

  const faqSchema = data.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null

  return (
    <>
      {faqSchema && <StructuredData data={faqSchema} />}
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Niches', href: '/niches/ecommerce' },
        { name: data.label, href: `/niches/${data.slug}` },
      ]} />

      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-200 text-sm uppercase tracking-widest mb-4">Niche · {data.label}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{data.headline}</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">{data.description}</p>
          <Button href="/outils/audit-acquisition" size="lg" variant="accent" aria-label="Audit gratuit niche">
            Audit gratuit
          </Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Les défis spécifiques du secteur</h2>
          <ul className="space-y-4">
            {data.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {data.faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Questions fréquentes</h2>
            <div className="space-y-4">
              {data.faqs.map((faq) => (
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
