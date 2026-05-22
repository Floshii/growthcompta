import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/blog')

export type ArticleCategory = 'acquisition' | 'seo' | 'ia' | 'specialisation' | 'rentabilite' | 'outils'

export interface ArticleFrontmatter {
  title: string
  description: string
  date: string
  category: ArticleCategory
  tags: string[]
  author: string
  featured: boolean
  ogImage: string
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
  readingTime: number
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))
  const articles = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    return getArticleBySlug(slug)
  })
  return articles.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getArticleBySlug(slug: string): Article {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
    readingTime,
  }
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.featured)
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.category === category)
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs.readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}
