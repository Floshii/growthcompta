import { notFound } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import TLDRBox from '@/components/blog/TLDRBox'
import Callout from '@/components/blog/Callout'
import KeyInsight from '@/components/blog/KeyInsight'
import { services } from '@/data/services'
import { getServiceContent } from '@/lib/services-content'
import type { Metadata } from 'next'

const mdxComponents = { TLDRBox, Callout, KeyInsight }

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
    alternates: { canonical: `/services/${slug}` },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const serviceContent = getServiceContent(slug)
  const faqs = serviceContent?.frontmatter.faq ?? service.faqs

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: 'GrowthCompta', url: 'https://growthcompta.com' },
  }

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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

      {/* Header — aligned with site design system */}
      <header className="bg-paper border-b border-line py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-6">
            Service · {service.title}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight tracking-display">
            {serviceContent?.frontmatter.title ?? service.title}
          </h1>
          {!serviceContent?.frontmatter.title && (
            <p className="text-[18px] text-muted leading-relaxed mb-8">{service.shortDesc}</p>
          )}
          <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-line">
            <Button href="/cabinet-growth-score" size="lg" variant="accent" aria-label="Faire mon Cabinet Growth Score">
              Faire mon Cabinet Growth Score
            </Button>
            <div>
              <span className="font-display text-3xl font-bold text-accent">{service.stat}</span>
              <span className="font-mono text-[12px] text-muted-2 ml-2.5">{service.statLabel}</span>
            </div>
          </div>
        </div>
      </header>

      {serviceContent ? (
        <article className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={serviceContent.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </div>
        </article>
      ) : (
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[18px] text-muted leading-relaxed mb-12">{service.description}</p>
            <h2 className="font-display text-2xl font-bold text-ink mb-8">Ce qui est inclus</h2>
            <ul className="space-y-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-paper border-t border-line">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-8">
              Questions fréquentes
            </p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white rounded-2xl p-6 border border-line">
                  <h3 className="font-display font-semibold text-ink mb-2">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
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
