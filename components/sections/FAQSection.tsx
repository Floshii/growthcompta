'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CTA_HREF, CTA_LABEL } from './HeroSection'

const items = [
  {
    q: "Quel budget prévoir ?",
    a: "Ça dépend de votre volonté de croissance. On commence toujours par le résultat — des leads qualifiés rapidement — avant de travailler sur vos actifs long terme (SEO, brand, contenu). L'audit initial est gratuit et sans engagement.",
  },
  {
    q: "Combien de temps avant les premiers leads ?",
    a: "De nouveaux clients sous 30 jours garantis. Quick wins (Google Business, landing, tracking) dès la première semaine. Premier flux paid sous 3 semaines. SEO programmatique : 3 mois pour les premiers classements, 6 mois pour le volume.",
  },
  {
    q: "Vous travaillez avec quels types de cabinets ?",
    a: "Cabinets entre 5 et 80 collaborateurs, idéalement avec une volonté de spécialisation verticale (e-comm, BTP, médical, immobilier, restauration, SaaS). On refuse les cabinets purement généralistes : nos méthodes marchent moins bien sans angle.",
  },
  {
    q: "Et la concurrence avec mes confrères ?",
    a: "On est exclusif par zone géographique × verticale. Vous êtes le seul cabinet sur 'expert-comptable e-commerce Lyon' dans notre portefeuille. C'est pour ça qu'on n'a que 17 clients après 2 ans.",
  },
  {
    q: "Vous gérez aussi le site web ?",
    a: "Oui. Soit on optimise l'existant, soit on refait (Webflow ou Next.js). Inclus dans l'engagement. On garde la main pendant l'engagement, transfert complet à la sortie.",
  },
  {
    q: "Que se passe-t-il après la mission ?",
    a: "Le moteur tourne sans nous. Vous pilotez les actifs qu'on a construits ensemble. Si vous souhaitez qu'on continue à opérer, on propose un forfait opérationnel allégé. Sinon, on transfère tout proprement.",
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section className="py-16 md:py-[100px] bg-paper" id="faq">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-[300px_1fr]">

          {/* Left */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              FAQ
            </p>
            <h2
              className="font-display font-bold text-ink my-3"
              style={{ fontSize: 'clamp(32px, 3.8vw, 52px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Les questions{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                qui reviennent
              </span>
              .
            </h2>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-6">
              D&apos;autres ? Posez-les pendant l&apos;audit offert.
            </p>
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
            >
              {CTA_LABEL}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </div>

          {/* Accordion */}
          <div className="flex flex-col">
            {items.map((it, i) => (
              <div
                key={i}
                className="border-t border-line last:border-b py-[22px] cursor-pointer"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className="flex justify-between items-center gap-6">
                  <h3
                    className="font-display font-medium text-ink m-0"
                    style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}
                  >
                    {it.q}
                  </h3>
                  <div
                    className="w-8 h-8 rounded-full border border-line flex-shrink-0 grid place-items-center font-mono text-lg transition-all duration-200"
                    style={open === i ? { background: 'var(--color-accent)', borderColor: 'var(--color-accent)', transform: 'rotate(45deg)', color: 'white' } : {}}
                  >
                    +
                  </div>
                </div>
                <div
                  className="overflow-hidden transition-all duration-300 text-ink-2 text-[15px] leading-relaxed max-w-[640px]"
                  style={{ maxHeight: open === i ? 240 : 0, marginTop: open === i ? 14 : 0, opacity: open === i ? 1 : 0 }}
                >
                  {it.a}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
