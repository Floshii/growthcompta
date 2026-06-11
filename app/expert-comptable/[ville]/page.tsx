import { notFound } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import { villes } from '@/data/villes'
import { niches } from '@/data/niches'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ ville: string }>
}

export async function generateStaticParams() {
  return villes.map((v) => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville } = await params
  const data = villes.find((v) => v.slug === ville)
  if (!data) return {}
  return {
    title: `Développez votre cabinet comptable à ${data.label} | GrowthCompta`,
    description: `GrowthCompta aide les expert-comptables de ${data.label} à développer leur acquisition — SEO, niches, paid ads. ~${data.nbCabinets} cabinets en concurrence. Audit gratuit en 5 min.`,
    alternates: { canonical: `/expert-comptable/${ville}` },
    openGraph: {
      type: 'website',
      title: `Développez votre cabinet comptable à ${data.label} | GrowthCompta`,
      description: `Agence growth pour expert-comptables à ${data.label}. Acquisition, SEO local, spécialisation niche.`,
    },
  }
}

export default async function VillePage({ params }: PageProps) {
  const { ville } = await params
  const data = villes.find((v) => v.slug === ville)
  if (!data) notFound()

  // Resolve top niches
  const topNicheData = data.topNiches
    .map((slug) => niches.find((n) => n.slug === slug))
    .filter(Boolean)

  // JSON-LD : ProfessionalService avec areaServed
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `GrowthCompta — Agence growth pour expert-comptables à ${data.label}`,
    description: `GrowthCompta aide les cabinets d'expertise comptable de ${data.label} à développer leur acquisition client — SEO local, spécialisation niche, paid ads.`,
    url: `https://growthcompta.com/expert-comptable/${data.slug}`,
    areaServed: {
      '@type': 'City',
      name: data.label,
      containedInPlace: { '@type': 'State', name: data.region },
    },
    provider: {
      '@type': 'Organization',
      name: 'GrowthCompta',
      url: 'https://growthcompta.com',
    },
    serviceType: 'Acquisition client pour cabinets d\'expertise comptable',
  }

  return (
    <>
      <StructuredData data={serviceSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Accueil', href: '/' },
          { name: 'Villes', href: '/expert-comptable' },
          { name: data.label, href: `/expert-comptable/${data.slug}` },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge positionnement — évite la confusion avec un cabinet */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-mono text-blue-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
            Agence growth · Pas un cabinet comptable · {data.label}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Vous êtes expert-comptable<br className="hidden sm:block" />
            à {data.label} ?
          </h1>

          <p className="text-xl text-blue-100 mb-4 leading-relaxed">
            {data.marketDesc}
          </p>

          <p className="text-blue-200 mb-8 text-base">
            Avec <strong className="text-white">~{data.nbCabinets.toLocaleString('fr-FR')} cabinets</strong> en
            concurrence dans la ville, seuls ceux qui installent un vrai moteur
            d&apos;acquisition s&apos;imposent durablement.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/cabinet-growth-score" size="lg" variant="accent">
              Faire mon Cabinet Growth Score — 5 min →
            </Button>
            <Button href="/niches" size="lg" variant="ghost-dark">
              Voir les niches disponibles
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats locales ── */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-display text-3xl font-bold text-blue-700">
                ~{data.nbCabinets.toLocaleString('fr-FR')}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                cabinets comptables en concurrence à {data.label}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-blue-700">
                {(data.population / 1000).toFixed(0)}k
              </p>
              <p className="text-gray-500 text-sm mt-1">
                habitants dans la ville
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-xl font-bold text-blue-700 leading-tight">
                {data.region}
              </p>
              <p className="text-gray-500 text-sm mt-1">région</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problème local ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
            Le défi des cabinets à {data.label}
          </h2>
          <p className="text-gray-500 mb-8">
            ~{data.nbCabinets} cabinets se disputent le même marché.
            Sans stratégie d&apos;acquisition, vous dépendez uniquement du bouche-à-oreille —
            impossible à scaler.
          </p>
          <ul className="space-y-3">
            {[
              {
                icon: '🔍',
                text: `Concurrence Google intense : "expert-comptable ${data.label}" est dominé par les cabinets qui ont investi en SEO depuis des années.`,
              },
              {
                icon: '📣',
                text: 'Bouche-à-oreille saturé — efficace jusqu\'à 300-400 k€ de CA, mais impossible à scaler au-delà sans système.',
              },
              {
                icon: '🎯',
                text: 'Pas de niche identifiée : sans spécialisation, vous répondez à tous les prospects et n\'en signez aucun de façon répétable.',
              },
            ].map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100"
              >
                <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                <span className="text-gray-700">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Top niches locales ── */}
      {topNicheData.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
              Les niches les plus porteuses à {data.label}
            </h2>
            <p className="text-gray-500 mb-8">
              Sélectionnées selon le tissu économique local — les spécialisations
              avec le meilleur ratio opportunité / concurrence dans votre zone.
            </p>
            <div className="grid gap-4">
              {topNicheData.map((niche) => (
                <Link
                  key={niche!.slug}
                  href={`/niches/${niche!.slug}`}
                  className="flex items-center justify-between p-5 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="font-display font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {niche!.label}
                    </p>
                    <p className="text-gray-500 text-sm mt-0.5">
                      <span className="font-semibold text-blue-600">{niche!.stat.value}</span>
                      {' '}· {niche!.stat.label}
                    </p>
                  </div>
                  <span className="text-blue-400 text-xl group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-4">
                    →
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-center mt-6">
              <Link
                href="/niches"
                className="text-gray-400 text-sm hover:text-blue-600 underline underline-offset-2 transition-colors"
              >
                Voir les 56 niches disponibles →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── Ce qu'on installe ── */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-3">
            Ce qu&apos;on installe pour votre cabinet à {data.label}
          </h2>
          <p className="text-blue-200 mb-10">
            En 90 jours, votre cabinet reçoit ses premiers leads qualifiés
            en dehors du bouche-à-oreille. Machine complète, résultats vérifiables.
          </p>
          <ul className="space-y-6">
            {[
              {
                n: '01',
                title: 'Positionnement niche',
                desc: `Identification de votre niche à fort potentiel à ${data.label} et construction de votre positionnement différenciant — clair, mémorisable, convertissant.`,
              },
              {
                n: '02',
                title: 'SEO local & programmatique',
                desc: `Pages optimisées pour capturer les recherches "expert-comptable [niche] ${data.label}" — trafic organique qualifié, sans dépenser en ads.`,
              },
              {
                n: '03',
                title: 'Pipeline d\'acquisition complet',
                desc: 'LinkedIn ciblé, paid ads locaux, content marketing — chaque canal activé au bon moment pour remplir votre pipeline de façon prévisible.',
              },
            ].map(({ n, title, desc }) => (
              <li key={n} className="flex items-start gap-5">
                <span className="text-2xl font-bold text-blue-400 shrink-0 leading-none mt-1 font-display">
                  {n}
                </span>
                <div>
                  <p className="font-display font-bold text-white text-lg mb-1">{title}</p>
                  <p className="text-blue-200 leading-relaxed">{desc}</p>
                </div>
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

      {/* ── FAQ locale ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
            Questions fréquentes — {data.label}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `GrowthCompta est-il un cabinet comptable à ${data.label} ?`,
                a: `Non. GrowthCompta est une agence de growth spécialisée pour les cabinets d'expertise comptable. Nous n'effectuons pas de missions comptables — nous aidons les cabinets de ${data.label} à développer leur acquisition client.`,
              },
              {
                q: `Comment vous différenciez-vous des autres cabinets comptables à ${data.label} ?`,
                a: `Avec ~${data.nbCabinets} cabinets sur ${data.label}, la différenciation passe par la spécialisation niche et le SEO local. Nous installons ce système pour vous — audit gratuit en 5 minutes pour identifier votre meilleure opportunité.`,
              },
              {
                q: `Combien de temps pour voir des résultats à ${data.label} ?`,
                a: `Les premiers leads qualifiés arrivent sous 30 jours. Le SEO local commence à produire des résultats durables entre 60 et 90 jours. Nous nous engageons sur des résultats vérifiables, pas sur des promesses.`,
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
