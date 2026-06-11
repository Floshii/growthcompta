import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface LeadMagnetSectionProps {
  title?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  variant?: 'dark' | 'light'
}

export default function LeadMagnetSection({
  title = 'Où en est votre acquisition ?',
  description = 'Faites votre Cabinet Growth Score en 5 minutes et recevez votre diagnostic personnalisé avec les 3 priorités à adresser immédiatement.',
  ctaText = 'Faire mon Cabinet Growth Score',
  ctaHref = '/cabinet-growth-score',
  variant = 'dark',
}: LeadMagnetSectionProps) {
  const isDark = variant === 'dark'

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
        <Button
          href={ctaHref}
          size="lg"
          variant={isDark ? 'accent' : 'primary'}
          aria-label={ctaText}
        >
          {ctaText} <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}
