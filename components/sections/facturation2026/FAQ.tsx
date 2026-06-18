'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { FE_CTA_LABEL } from './constants'

const items = [
  {
    q: 'Je suis déjà sur Pennylane. Vous remplacez quoi ?',
    a: "Rien. Pennylane reste votre outil. On automatise ce qui se passe autour et entre vos outils : la conversion au format Factur-X, le raccordement à la plateforme agréée, le suivi du cycle de vie de chaque facture. On orchestre, on ne remplace pas.",
  },
  {
    q: 'Combien de temps prend la mise en place ?',
    a: "L'audit de diagnostic est livré sous quelques jours. La mise en place du flux automatisé prend en général deux à quatre semaines selon le nombre d'outils à raccorder et le volume de dossiers. Vous gardez votre activité pendant toute la bascule.",
  },
  {
    q: 'Ça remplace mon logiciel de facturation ?',
    a: "Non. Votre logiciel continue d'émettre vos factures. On ajoute la couche de conformité 2026 et d'automatisation par-dessus : format Factur-X, transmission via une PDP agréée, traçabilité. Vous gardez vos habitudes, le flux devient conforme et automatique.",
  },
  {
    q: 'Faut-il être prêt avant le 1er septembre 2026 ?',
    a: "La réception des factures électroniques devient obligatoire pour toutes les entreprises au 1er septembre 2026. Préparer le flux maintenant évite la bascule dans l'urgence et au moment des clôtures. Plus tôt c'est posé, plus tôt la capacité est libérée.",
  },
  {
    q: 'Et la sécurité des données de mes clients ?',
    a: "La transmission passe par une plateforme de dématérialisation partenaire agréée par l'administration. Les flux sont tracés de bout en bout. Vous voyez l'état de chaque facture dans la console, sans manipulation de fichiers sensibles à la main.",
  },
  {
    q: "Que comprend l'audit gratuit ?",
    a: "La cartographie de vos outils, le tracé de vos flux actuels et le chiffrage du temps récupérable pour votre cabinet. Vous repartez avec un plan d'action clair, exécutable seul ou avec nous. Sans engagement.",
  },
  {
    q: 'On peut le faire nous-mêmes ?',
    a: "Oui. L'audit vous donne le plan. Certains cabinets l'exécutent en interne. La plupart nous confient la mise en place pour gagner du temps et éviter les ruptures de flux. Vous choisissez après le diagnostic.",
  },
  {
    q: 'À partir de quel budget ?',
    a: "La mise en place démarre à 1 490 €, périmètre chiffré après l'audit. L'audit de diagnostic, lui, est gratuit et sans engagement. Vous savez ce que vous payez et ce que vous récupérez avant de décider.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  return (
    <section className="py-16 md:py-[88px]" id="faq">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              FAQ · objections réelles
            </p>
            <h2
              className="font-display font-bold text-ink mb-5"
              style={{ fontSize: 'clamp(26px, 3vw, 44px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              Les questions{' '}
              <span
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                qui reviennent
              </span>
              .
            </h2>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-6">
              D&apos;autres ? Posez-les pendant le diagnostic gratuit. Réponse sous 24 h.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { source: 'faq', page: 'facturation-electronique-2026' })}
              className="inline-flex items-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[11px] rounded-full hover:bg-accent-deep transition-colors group"
            >
              {FE_CTA_LABEL}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>

          <div className="flex flex-col divide-y divide-line">
            {items.map((it, i) => (
              <div key={i} className="py-4">
                <button
                  className="w-full flex items-start justify-between gap-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-[15px] font-medium text-ink leading-snug">{it.q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full border border-line flex items-center justify-center text-ink-2 text-lg leading-none transition-transform duration-200"
                    style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <p className="text-[14.5px] text-ink-2 leading-relaxed mt-3 pr-10">{it.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
