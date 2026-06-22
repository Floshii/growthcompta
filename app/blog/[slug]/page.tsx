import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CTABanner from '@/components/sections/CTABanner'
import Badge from '@/components/ui/Badge'
import TLDRBox from '@/components/blog/TLDRBox'
import Callout from '@/components/blog/Callout'
import KeyInsight from '@/components/blog/KeyInsight'
import PaybackCalculatorInline from '@/components/blog/PaybackCalculatorInline'
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

const mdxComponents = { TLDRBox, Callout, KeyInsight, PaybackCalculatorInline }

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = getArticleBySlug(slug)
    return {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: 'article',
        publishedTime: article.frontmatter.date,
        authors: [article.frontmatter.author],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  let article
  try {
    article = getArticleBySlug(slug)
  } catch {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    author: { '@type': 'Organization', name: 'L\'équipe GrowthCompta', url: 'https://growthcompta.com' },
    publisher: { '@type': 'Organization', name: 'GrowthCompta', url: 'https://growthcompta.com' },
  }

  const faqSchema = article.frontmatter.faq && article.frontmatter.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.frontmatter.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  return (
    <>
      <StructuredData data={articleSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <BreadcrumbSchema items={[
        { name: 'Accueil', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: article.frontmatter.title, href: `/blog/${slug}` },
      ]} />

      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <Badge variant="blue" className="mb-4">{article.frontmatter.category}</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.frontmatter.title}
            </h1>
            <p className="text-gray-600 text-xl mb-6">{article.frontmatter.description}</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm border-t border-b border-gray-100 py-4">
              <span>{article.frontmatter.author}</span>
              <span>·</span>
              <time dateTime={article.frontmatter.date}>{formatDate(article.frontmatter.date)}</time>
              <span>·</span>
              <span>{article.readingTime} min de lecture</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </div>
      </article>

      <CTABanner />
    </>
  )
}
