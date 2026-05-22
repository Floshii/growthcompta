import Link from 'next/link'

interface NicheTagProps {
  slug: string
  label: string
}

export default function NicheTag({ slug, label }: NicheTagProps) {
  return (
    <Link
      href={`/niches/${slug}`}
      className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
    >
      {label}
    </Link>
  )
}
