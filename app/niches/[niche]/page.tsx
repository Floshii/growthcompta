import { notFound } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import { niches } from '@/data/niches'
import { getAllArticles } from '@/lib/mdx'
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
    title: `${data.headline} | GrowthCompta`,
    description: data.description,
    alternates: { canonical: `/niches/${niche}` },
    openGraph: {
      type: 'website',
      title: `${data.headline} | GrowthCompta`,
      description: data.description,
    },
  }
}

export default async function NichePage({ params }: PageProps) {
  const { niche } = await params
  const data = niches.find((n) => n.slug === niche)
  if (!data) notFound()

  const allArticles = getAllArticles()
  const relatedArticles = allArticles.filter((a) =>
    data.relatedArticles?.includes(a.slug)
  )

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Expert-comptable ${data.label}`,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: 'GrowthCompta',
      url: 'https://growthcompta.com',
    },
    areaServed: { '@type': 'Country', name: 'France' },
    serviceType: `Comptabilité et acquisition cabinet ${data.label}`,
  }

  const faqSchema = data.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null

  return (
    <>
      <StructuredData data={serviceSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Niches', href: '/niches/lmnp' },
        { name: data.label, href: `/niches/${data.slug}` },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 text-xs font-mono uppercase tracking-widest mb-4">
            Niche comptable · {data.label}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {data.headline}
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/cabinet-growth-score" size="lg" variant="accent">
              Faire mon Cabinet Growth Score →
            </Button>
            <Button href="/outils/guide-niche-comptable" size="lg" variant="ghost">
              Guide des niches
            </Button>
          </div>
        </div>
      </section>

      {/* Stat terrain */}
      {data.stat && (
        <section className="bg-white border-b border-gray-100 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="shrink-0">
                <p className="font-display text-5xl font-bold text-blue-700">{data.stat.value}</p>
                <p className="text-gray-500 text-sm mt-1 max-w-xs">{data.stat.label}</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-200" />
              <p className="text-gray-600 text-lg leading-relaxed">
                C&apos;est le marché auquel votre cabinet peut accéder en se positionnant clairement
                sur la niche {data.label}. Les cabinets spécialisés affichent un panier moyen
                60 à 120 % supérieur aux généralistes.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pain points */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
            Les défis spécifiques de vos clients {data.label}
          </h2>
          <p className="text-gray-500 mb-8">
            Ce sont les sujets sur lesquels vos clients cherchent un vrai expert — pas un généraliste.
          </p>
          <ul className="space-y-3">
            {data.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-2.5 shrink-0" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      {data.services && data.services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
              Ce que votre cabinet peut proposer
            </h2>
            <p className="text-gray-500 mb-8">
              Les missions à forte valeur ajoutée sur lesquelles se positionner dans la niche {data.label}.
            </p>
            <ul className="space-y-3">
              {data.services.map((service) => (
                <li key={service} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-blue-600 font-bold mt-0.5 shrink-0">✓</span>
                  <span className="text-gray-800">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Avantages */}
      {data.avantages && data.avantages.length > 0 && (
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold mb-3">
              Pourquoi se spécialiser dans la niche {data.label} ?
            </h2>
            <p className="text-blue-200 mb-8">
              Les cabinets spécialisés ne font pas que mieux servir leurs clients.
              Ils ont une économie fondamentalement différente.
            </p>
            <ul className="space-y-5">
              {data.avantages.map((av, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-blue-400 shrink-0 leading-none mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-blue-100 text-lg leading-relaxed">{av}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/cabinet-growth-score" size="lg" variant="accent">
                Faire mon Cabinet Growth Score →
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Articles liés */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Ressources pour développer votre acquisition {data.label}
            </h2>
            <p className="text-gray-500 mb-8">
              Guides et stratégies pour acquérir vos premiers clients dans cette niche.
            </p>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all group"
                >
                  <span className="text-blue-600 text-xl shrink-0 mt-0.5">→</span>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {article.frontmatter.title}
                    </p>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {article.frontmatter.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
              Questions fréquentes — {data.label}
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq) => (
                <div key={faq.question} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
