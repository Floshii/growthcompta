import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { niches } from '@/data/niches'
import { villes } from '@/data/villes'
import { leadMagnets } from '@/data/lead-magnets'
import { getAllArticleSlugs } from '@/lib/mdx'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://growthcompta.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl,                                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/services`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/tarifs`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`,                        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${siteUrl}/niches`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/expert-comptable`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/cabinet-growth-score`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/simulateurs/lmnp`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/facturation-electronique`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/outils/simulateur-facture-electronique`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const nicheIndexPage: MetadataRoute.Sitemap = [
    // index already in staticPages — individual niche pages below
  ]

  const nichePages: MetadataRoute.Sitemap = niches.map((n) => ({
    url: `${siteUrl}/niches/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const villePages: MetadataRoute.Sitemap = villes.map((v) => ({
    url: `${siteUrl}/expert-comptable/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
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

  return [
    ...staticPages,
    ...servicePages,
    ...nichePages,
    ...villePages,
    ...outilPages,
    ...blogPages,
    ...nicheIndexPage,
  ]
}
