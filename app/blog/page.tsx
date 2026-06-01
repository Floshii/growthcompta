import ArticleCard from '@/components/ui/ArticleCard'
import { getAllArticles } from '@/lib/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blog — Stratégies d'acquisition pour cabinets comptables",
  description:
    "Articles, guides et stratégies pour développer l'acquisition de votre cabinet comptable. SEO, LinkedIn, IA, spécialisation.",
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog GrowthCompta</h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Stratégies, guides et ressources pour développer la croissance de votre cabinet comptable.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-gray-500">Premiers articles bientôt disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                date={article.frontmatter.date}
                category={article.frontmatter.category}
                readingTime={article.readingTime}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
