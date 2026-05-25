import type { Metadata } from 'next'
import QuizEngine from '@/components/quiz/QuizEngine'

export const metadata: Metadata = {
  title: 'Cabinet Growth Score — Diagnostiquez la croissance de votre cabinet',
  description:
    "Testez votre cabinet en 3 minutes : score sur 100, radar de maturité sur 8 dimensions, quick wins prioritaires et roadmap 90 jours personnalisée. Gratuit.",
  openGraph: {
    title: 'Cabinet Growth Score',
    description: "Diagnostiquez la croissance de votre cabinet en 3 minutes.",
    type: 'website',
  },
}

export default function CabinetGrowthScorePage() {
  return <QuizEngine />
}
