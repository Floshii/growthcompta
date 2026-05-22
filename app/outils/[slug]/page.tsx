import { notFound } from 'next/navigation'
import LeadMagnetEmbed from '@/components/ui/LeadMagnetEmbed'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { leadMagnets } from '@/data/lead-magnets'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return leadMagnets.map((lm) => ({ slug: lm.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lm = leadMagnets.find((l) => l.slug === slug)
  if (!lm) return {}
  return { title: lm.metaTitle, description: lm.metaDescription }
}

export default async function OutilPage({ params }: PageProps) {
  const { slug } = await params
  const lm = leadMagnets.find((l) => l.slug === slug)
  if (!lm) notFound()

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Outils', href: '/outils/audit-acquisition' },
        { name: lm.title, href: `/outils/${lm.slug}` },
      ]} />
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">{lm.title}</h1>
            <p className="text-gray-600 text-lg">{lm.description}</p>
          </div>
          <LeadMagnetEmbed embedUrl={lm.embedUrl} embedHeight={lm.embedHeight} title={lm.title} />
        </div>
      </section>
    </>
  )
}
