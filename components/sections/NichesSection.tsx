import NicheTag from '@/components/ui/NicheTag'
import { niches } from '@/data/niches'
import Button from '@/components/ui/Button'

export default function NichesSection() {
  const displayNiches = niches.slice(0, 12)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Spécialisation</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          L&apos;expertise dans votre niche, pas partout.
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Nous aidons les cabinets à dominer leur niche — avec du contenu, des pages, des campagnes et un discours calibrés pour chaque secteur.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {displayNiches.map((niche) => (
            <NicheTag key={niche.slug} slug={niche.slug} label={niche.label} />
          ))}
        </div>
        <Button href="/services/acquisition-specialisee" variant="ghost" size="md" aria-label="Voir l'offre spécialisation">
          Voir l&apos;offre spécialisation
        </Button>
      </div>
    </section>
  )
}
