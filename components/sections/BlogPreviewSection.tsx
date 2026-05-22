import ArticleCard from '@/components/ui/ArticleCard'
import Button from '@/components/ui/Button'
import { getAllArticles } from '@/lib/mdx'

export default function BlogPreviewSection() {
  const articles = getAllArticles().slice(0, 3)

  if (articles.length === 0) return null

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Blog</p>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Ressources & stratégies pour cabinets comptables.
            </h2>
          </div>
          <Button href="/blog" variant="ghost" size="md" aria-label="Voir tous les articles">
            Tous les articles
          </Button>
        </div>
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
      </div>
    </section>
  )
}
