import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

const solutions = [
  { title: 'SEO local & de niche', desc: 'Votre cabinet apparaît en premier sur Google quand vos prospects cherchent un expert de leur secteur.' },
  { title: 'Google Ads ultra-ciblé', desc: "Campagnes précises sur les requêtes à forte intention d'achat, sans gaspiller votre budget." },
  { title: 'LinkedIn Outbound', desc: 'Prospection directe vers vos clients idéaux avec des messages personnalisés et un suivi structuré.' },
  { title: 'IA & automation', desc: 'Qualification automatique, nurturing intelligent, gain de temps sur les tâches à faible valeur.' },
]

export default function SolutionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Notre approche</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Un système d&apos;acquisition complet, pas une solution isolée.
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Nous combinons les leviers digitaux les plus efficaces pour les cabinets comptables — et nous les faisons travailler ensemble pour des résultats durables.
            </p>
            <Button href="/services/acquisition-complete" size="lg" aria-label="Découvrir notre système complet">
              Découvrir le système complet
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solutions.map((s) => (
              <div key={s.title} className="bg-blue-50 rounded-xl p-5">
                <CheckCircle className="w-5 h-5 text-emerald-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
