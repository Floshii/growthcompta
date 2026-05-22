import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import Badge from './Badge'

interface ArticleCardProps {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: number
  variant?: 'vertical' | 'horizontal'
}

const categoryLabels: Record<string, string> = {
  acquisition: 'Acquisition',
  seo: 'SEO',
  ia: 'IA',
  specialisation: 'Spécialisation',
  rentabilite: 'Rentabilité',
  outils: 'Outils',
}

export default function ArticleCard({
  slug,
  title,
  description,
  date,
  category,
  readingTime,
  variant = 'vertical',
}: ArticleCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link href={`/blog/${slug}`} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="flex-1 min-w-0">
          <Badge variant="blue" className="mb-2">{categoryLabels[category] ?? category}</Badge>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{formatDate(date)} · {readingTime} min</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full hover:shadow-md transition-shadow">
        <Badge variant="blue" className="mb-3">{categoryLabels[category] ?? category}</Badge>
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <time dateTime={date}>{formatDate(date)}</time>
          <span>·</span>
          <span>{readingTime} min de lecture</span>
        </div>
      </article>
    </Link>
  )
}
