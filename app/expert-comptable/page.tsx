import Link from 'next/link'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import { villes } from '@/data/villes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expert-comptable par ville — Développez votre cabinet | GrowthCompta',
  description:
    'GrowthCompta aide les cabinets d\'expertise comptable de toute la France à développer leur acquisition. Paris, Lyon, Marseille, Toulouse… trouvez votre ville.',
  alternates: { canonical: '/expert-comptable' },
  openGraph: {
    type: 'website',
    title: 'Expert-comptable par ville — GrowthCompta',
    description:
      'Agence growth pour cabinets comptables — 50 villes couvertes en France.',
  },
}

// Regroupe les villes par région
const byRegion = villes.reduce<Record<string, typeof villes>>((acc, v) => {
  if (!acc[v.region]) acc[v.region] = []
  acc[v.region].push(v)
  return acc
}, {})

const regions = Object.entries(byRegion).sort((a, b) => b[1].length - a[1].length)

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'GrowthCompta — Agence growth pour expert-comptables par ville',
  description:
    'GrowthCompta aide les cabinets d\'expertise comptable de 50 villes françaises à développer leur acquisition client.',
  url: 'https://growthcompta.com/expert-comptable',
  publisher: { '@type': 'Organization', name: 'GrowthCompta', url: 'https://growthcompta.com' },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: villes.length,
    itemListElement: villes.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Expert-comptable ${v.label}`,
      url: `https://growthcompta.com/expert-comptable/${v.slug}`,
    })),
  },
}

export default function ExpertComptableIndexPage() {
  const totalCabinets = villes.reduce((s, v) => s + v.nbCabinets, 0)

  return (
    <>
      <StructuredData data={collectionSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Accueil', href: '/' },
          { name: 'Expert-comptable par ville', href: '/expert-comptable' },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-mono text-blue-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
            Agence growth · Pas un cabinet comptable · France entière
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Développez votre cabinet comptable,<br className="hidden sm:block" />
            où que vous soyez en France
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            GrowthCompta installe le moteur d&apos;acquisition des cabinets d&apos;expertise comptable.
            Nous intervenons dans {villes.length} villes — sur ~{totalCabinets.toLocaleString('fr-FR')} cabinets
            en concurrence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button href="/cabinet-growth-score" size="lg" variant="accent">
              Faire mon Cabinet Growth Score — 5 min →
            </Button>
            <Button href="/niches" size="lg" variant="ghost-dark">
              Voir les 56 niches disponibles
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { value: `${villes.length}`, label: 'villes couvertes' },
              { value: `~${totalCabinets.toLocaleString('fr-FR')}`, label: 'cabinets analysés' },
              { value: '56', label: 'niches référencées' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold text-white">{value}</p>
                <p className="text-blue-300 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grille par région ── */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {regions.map(([region, regionVilles]) => (
            <section key={region}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <h2 className="font-display text-xl font-bold text-gray-900">{region}</h2>
                <span className="text-gray-400 text-sm">
                  — {regionVilles.length} ville{regionVilles.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {regionVilles.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/expert-comptable/${v.slug}`}
                    className="group flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3.5 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                        {v.label}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        ~{v.nbCabinets.toLocaleString('fr-FR')} cabinets
                      </p>
                    </div>
                    <span className="text-blue-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all ml-3 shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Encart "pas un cabinet" ── */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5 text-xs font-mono text-orange-600 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
            Important — lisez ceci
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            GrowthCompta n&apos;est pas un cabinet comptable
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Nous sommes une agence de growth spécialisée pour les cabinets d&apos;expertise comptable.
            Nous n&apos;effectuons aucune mission comptable ou fiscale. Notre rôle : installer votre
            moteur d&apos;acquisition pour que votre cabinet signe de nouveaux clients de façon
            prévisible et sans dépendre du bouche-à-oreille.
          </p>
          <Button href="/cabinet-growth-score" size="md" variant="accent">
            Faire mon Cabinet Growth Score →
          </Button>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
