import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { niches } from '@/data/niches'
import { leadMagnets } from '@/data/lead-magnets'
import { getAllArticleSlugs } from '@/lib/mdx'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://growthcompta.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const nichePages: MetadataRoute.Sitemap = niches.map((n) => ({
    url: `${siteUrl}/niches/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const outilPages: MetadataRoute.Sitemap = leadMagnets.map((lm) => ({
    url: `${siteUrl}/outils/${lm.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogSlugs = getAllArticleSlugs()
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...nichePages, ...outilPages, ...blogPages]
}
