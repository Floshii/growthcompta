import type { Metadata } from 'next'
import PricingSimulator from '@/components/sections/PricingSimulator'
import StructuredData from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Tarifs & investissement | GrowthCompta',
  description:
    "Estimez votre investissement en 2 questions. L'approche et la fourchette de prix adaptées à votre niche et votre horizon de résultats.",
  alternates: { canonical: 'https://growthcompta.com/tarifs' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quel est le budget minimum pour travailler avec GrowthCompta ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'investissement mensuel démarre à partir de 800 € / mois pour les niches accessibles en ligne avec un horizon de 120 jours. Il monte à 1 800 – 3 500 € / mois pour les niches difficiles à atteindre avec une vélocité de 30 jours. La fourchette exacte est affinée lors de l'appel de diagnostic gratuit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la durée d\'engagement minimum ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'engagement minimum est de 3 mois pour les approches FIRE (résultats sous 30 jours) et de 6 mois pour les approches ENGINE (construction organique sur 120 jours). Ces durées correspondent aux horizons nécessaires pour mesurer un ROI réel.",
      },
    },
    {
      '@type': 'Question',
      name: 'Est-ce que le diagnostic initial est vraiment gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, entièrement. L\'appel de 30 minutes permet de valider votre situation, affiner la fourchette d\'investissement et définir les 3 premières actions prioritaires. Aucun engagement requis.',
      },
    },
  ],
}

export default function TarifsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />

      <section className="pt-10 pb-16 md:pt-12 md:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">

          {/* Header */}
          <div className="mb-6 md:mb-8 max-w-[680px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Investissement · estimez votre budget en 2 questions
            </p>
            <h1
              className="font-display font-bold text-ink m-0 mb-5"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Quel investissement
              {' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                pour vous&nbsp;?
              </span>
            </h1>
            <p className="text-[16px] text-ink-2 leading-[1.6] m-0">
              L&apos;approche et la fourchette de prix dépendent de deux paramètres&nbsp;:
              la facilité d&apos;accès à votre cible en ligne, et la vélocité souhaitée.
              Deux questions, une recommandation concrète.
            </p>
          </div>

          {/* Interactive simulator */}
          <PricingSimulator />

        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-paper border-t border-line">
        <div className="max-w-[860px] mx-auto px-5 md:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-8 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Questions fréquentes
          </p>
          <div className="flex flex-col divide-y divide-line">
            {[
              {
                q: 'La fourchette affichée est-elle fixe ?',
                a: "Non — c'est une estimation basée sur vos deux réponses. Le prix exact est affiché en fin d'appel de 30 min, après avoir cerné votre marché, votre point de départ et vos objectifs précis. Il peut être dans la fourchette, en dessous ou au-dessus selon la complexité.",
              },
              {
                q: "Qu'est-ce qui est inclus dans l'engagement ?",
                a: "L'activation des canaux sélectionnés, le setup complet (landing pages, CRM, séquences), la gestion opérationnelle mensuelle, et un reporting régulier avec les KPIs définis ensemble. Pas de frais cachés, pas d'extras non discutés.",
              },
              {
                q: 'Quelle est la durée d\'engagement minimum ?',
                a: "3 mois pour les approches FIRE (30 jours de vélocité) et 6 mois pour les approches ENGINE (120 jours). Ces durées correspondent aux horizons nécessaires pour mesurer un ROI réel — en dessous, les résultats ne sont pas représentatifs.",
              },
              {
                q: 'Est-ce que le budget ads est inclus dans la fourchette ?',
                a: "Non. La fourchette couvre les honoraires GrowthCompta (stratégie, setup, gestion). Le budget media (Meta Ads, Google Ads) est en plus — il est défini ensemble lors de l'appel en fonction de vos objectifs et de votre marché.",
              },
            ].map(({ q, a }, i) => (
              <details key={i} className="group py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 font-display font-semibold text-[16px] text-ink tracking-[-0.015em] leading-[1.3]">
                  {q}
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border border-line flex items-center justify-center text-muted text-[12px] group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] text-ink-2 leading-[1.65]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
