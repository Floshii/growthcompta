import type { Metadata } from 'next'
import SimulateurLMNP from '@/components/simulateurs/SimulateurLMNP'

export const metadata: Metadata = {
  title: 'Simulateur fiscal LMNP 2026 — Micro-foncier vs Réel vs LMNP',
  description:
    "Comparez les 4 régimes d'imposition pour votre bien locatif (NUE micro-foncier, NUE réel, MEUBLÉE micro-BIC, LMNP réel) et identifiez la stratégie la plus avantageuse.",
}

/*
  Pour un embed iframe propre sur WordPress (sans le header/footer GrowthCompta),
  déployez ce composant en standalone via un second projet Vercel :
  le fichier SimulateurLMNP.tsx est autonome, sans aucune dépendance externe.
*/
export default function SimulateurLMNPPage() {
  return <SimulateurLMNP />
}
