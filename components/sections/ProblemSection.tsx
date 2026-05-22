import { XCircle } from 'lucide-react'

const problems = [
  {
    title: 'Bouche à oreille qui s\'essouffle',
    desc: 'Le réseau ne suffit plus. Les nouveaux clients arrivent au compte-gouttes et vous n\'avez aucune prévisibilité.',
  },
  {
    title: 'Concurrence qui se visibilise sur Google',
    desc: 'Vos concurrents apparaissent en premier sur "expert comptable + votre ville". Vous, pas encore.',
  },
  {
    title: 'Pas de temps pour la prospection',
    desc: 'Entre la production et les RDV clients, impossible de se consacrer au développement commercial.',
  },
  {
    title: 'Clients non rentables difficiles à refuser',
    desc: 'Sans flux entrant, on accepte tout. Résultat : un portefeuille hétérogène qui tire les marges vers le bas.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vous reconnaissez-vous dans cette situation ?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            La plupart des cabinets comptables font face aux mêmes blocages de croissance. Nous les connaissons — et nous savons comment les débloquer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-6 border border-red-100 flex gap-4">
              <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
