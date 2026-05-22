import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center px-4">
        <p className="text-blue-700 font-bold text-6xl mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">Page introuvable</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil.
        </p>
        <Button href="/" size="lg" aria-label="Retour à l'accueil">Retour à l&apos;accueil</Button>
      </div>
    </section>
  )
}
