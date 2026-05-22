import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/data/services'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 text-sm flex-1 mb-4">{service.shortDesc}</p>
      <ul className="space-y-1 mb-6">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-1 text-blue-700 font-semibold text-sm hover:gap-2 transition-all"
        aria-label={`En savoir plus sur ${service.title}`}
      >
        En savoir plus <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  )
}
