import StructuredData from './StructuredData'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://growthcompta.com'

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }

  return <StructuredData data={schema} />
}
