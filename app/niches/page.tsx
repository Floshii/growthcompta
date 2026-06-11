import Link from 'next/link'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import { niches } from '@/data/niches'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '56 niches comptables à fort potentiel | GrowthCompta',
  description:
    'Découvrez 56 niches pour spécialiser votre cabinet comptable : santé libérale, immobilier, digital, commerce, juridique. Stratégie d\'acquisition sur mesure pour chaque niche.',
  alternates: { canonical: '/niches' },
  openGraph: {
    type: 'website',
    title: '56 niches comptables à fort potentiel | GrowthCompta',
    description:
      'Découvrez 56 niches pour spécialiser votre cabinet comptable : santé libérale, immobilier, digital, commerce, juridique.',
  },
}

// ─── Familles ────────────────────────────────────────────────────────────────

const FAMILIES = [
  {
    id: 'sante',
    label: 'Santé libérale',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-400',
    slugs: [
      'medecins', 'cabinets-medicaux', 'pharmacies', 'dentistes', 'kines',
      'infirmiers', 'osteopathes', 'psychologues', 'orthophonistes',
      'veterinaires', 'sages-femmes',
    ],
  },
  {
    id: 'immobilier',
    label: 'Immobilier & Patrimoine',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-400',
    slugs: [
      'lmnp', 'sci', 'immobilier-locatif', 'marchands-biens', 'airbnb',
      'conciergeries', 'agents-immobiliers', 'cgp', 'promoteurs',
      'courtiers-immobiliers',
    ],
  },
  {
    id: 'digital',
    label: 'Digital & Tech',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    dot: 'bg-violet-400',
    slugs: [
      'ecommerce', 'freelances', 'startups', 'influenceurs', 'shopify',
      'infopreneurs', 'developpeurs', 'agences-seo', 'agences-ia',
      'dropshipping', 'affiliation', 'saas-b2b', 'createurs-contenu-adulte',
      'nocode', 'media-newsletters', 'youtubeurs', 'consultants-ia',
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce & Artisanat',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    dot: 'bg-orange-400',
    slugs: [
      'restaurants', 'artisans', 'btp', 'transport', 'vtc',
      'boulangers', 'coiffeurs', 'estheticiennes', 'garages',
    ],
  },
  {
    id: 'juridique',
    label: 'Juridique & Conseil',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-400',
    slugs: ['avocats', 'notaires', 'courtiers-assurance'],
  },
  {
    id: 'liberal',
    label: 'Professions libérales',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    dot: 'bg-teal-400',
    slugs: ['professions-liberales', 'architectes', 'organismes-formation', 'coaching'],
  },
  {
    id: 'autre',
    label: 'Agriculture & Divers',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-400',
    slugs: ['agriculteurs', 'associations'],
  },
]

// ─── Schemas JSON-LD ─────────────────────────────────────────────────────────

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '56 niches comptables à fort potentiel — GrowthCompta',
  description:
    'Catalogue de 56 niches de spécialisation pour cabinets d\'expertise comptable en France.',
  url: 'https://growthcompta.com/niches',
  publisher: {
    '@type': 'Organization',
    name: 'GrowthCompta',
    url: 'https://growthcompta.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: niches.length,
    itemListElement: niches.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: n.label,
      url: `https://growthcompta.com/niches/${n.slug}`,
    })),
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NichesPage() {
  // Build a lookup: slug → niche data
  const nicheMap = Object.fromEntries(niches.map((n) => [n.slug, n]))

  // Build families with resolved niches
  const families = FAMILIES.map((f) => ({
    ...f,
    niches: f.slugs.map((s) => nicheMap[s]).filter(Boolean),
  }))

  return (
    <>
      <StructuredData data={collectionSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Accueil', href: '/' },
          { name: 'Niches', href: '/niches' },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-300 text-xs font-mono uppercase tracking-widest mb-4">
            Programmatic SEO · Spécialisation comptable
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {niches.length} niches comptables<br className="hidden sm:block" />
            à fort potentiel en France
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Chaque spécialisation représente un marché avec des besoins comptables
            spécifiques — et très peu de cabinets positionnés. Choisissez votre niche,
            on installe l&apos;acquisition.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { value: `${niches.length}`, label: 'niches référencées' },
              { value: `${FAMILIES.length}`, label: 'familles métier' },
              { value: '100 %', label: 'France' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold text-white">{value}</p>
                <p className="text-blue-300 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>

          <Button href="/cabinet-growth-score" size="lg" variant="accent">
            Faire mon Cabinet Growth Score — trouvez votre niche →
          </Button>
        </div>
      </section>

      {/* ── Sticky category nav ── */}
      <nav
        className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm"
        aria-label="Familles de niches"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {families.map((f) => (
              <li key={f.id} className="shrink-0">
                <a
                  href={`#${f.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors whitespace-nowrap"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${f.dot}`} />
                  {f.label}
                  <span className="text-gray-400 font-normal">({f.niches.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Familles ── */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {families.map((f) => (
            <section key={f.id} id={f.id} className="scroll-mt-16">
              {/* Family header */}
              <div className="flex items-center gap-3 mb-8">
                <span className={`w-2 h-2 rounded-full ${f.dot}`} />
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  {f.label}
                </h2>
                <span className="text-gray-400 text-sm font-normal">
                  — {f.niches.length} niche{f.niches.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Niche cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {f.niches.map((niche) => (
                  <Link
                    key={niche.slug}
                    href={`/niches/${niche.slug}`}
                    className="group flex flex-col bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                  >
                    {/* Category badge */}
                    <span
                      className={`self-start inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border mb-3 ${f.color}`}
                    >
                      {f.label}
                    </span>

                    {/* Label */}
                    <h3 className="font-display font-bold text-gray-900 text-base leading-tight mb-2 group-hover:text-blue-700 transition-colors">
                      {niche.label}
                    </h3>

                    {/* Stat */}
                    <p className="font-display text-2xl font-bold text-blue-600 mb-1">
                      {niche.stat.value}
                    </p>
                    <p className="text-gray-400 text-xs leading-snug mb-4 line-clamp-2">
                      {niche.stat.label}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                      Voir la stratégie
                      <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 text-xs font-mono uppercase tracking-widest mb-4">
            Vous ne savez pas quelle niche choisir ?
          </p>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
            On vous aide à identifier votre niche la plus rentable
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            En 5 minutes, le Cabinet Growth Score analyse votre cabinet et identifie
            les 2-3 niches à fort potentiel adaptées à votre zone géographique,
            votre expertise actuelle et vos objectifs de CA.
          </p>
          <Button href="/cabinet-growth-score" size="lg" variant="accent">
            Lancer mon Cabinet Growth Score →
          </Button>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
