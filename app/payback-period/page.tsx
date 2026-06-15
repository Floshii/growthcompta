import type { Metadata } from 'next'
import PaybackEngine from '@/components/payback/PaybackEngine'

export const metadata: Metadata = {
  title: 'Calculez votre Payback Period — Diagnostic cabinets comptables',
  description:
    "Calculez votre Payback Period en 8 étapes : CAC réel, LTGP30, modèle de paiement, spécialisation, recrutement. La métrique que les cabinets qui scalent mesurent.",
  openGraph: {
    title: 'Calculez votre Payback Period',
    description: "Diagnostiquez la mécanique financière de votre cabinet en 8 minutes.",
    type: 'website',
  },
}

export default function PaybackPeriodPage() {
  return <PaybackEngine />
}
