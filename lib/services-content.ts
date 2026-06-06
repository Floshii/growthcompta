import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/services')

export interface ServiceFAQItem {
  question: string
  answer: string
}

export interface ServiceContentFrontmatter {
  title?: string
  faq?: ServiceFAQItem[]
}

export interface ServiceContent {
  slug: string
  frontmatter: ServiceContentFrontmatter
  content: string
}

export function getServiceContent(slug: string): ServiceContent | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as ServiceContentFrontmatter,
    content,
  }
}

export function getAllServiceContentSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs.readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}
