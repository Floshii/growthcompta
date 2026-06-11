import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://growthcompta.com'
const siteName = 'GrowthCompta'
const defaultOgImage = '/og-image.png'

interface GenerateMetadataOptions {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path: pagePath = '/',
  ogImage = defaultOgImage,
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const url = `${siteUrl}${pagePath}`
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      type: 'website',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export { siteUrl, siteName }
