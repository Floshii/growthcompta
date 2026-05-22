'use client'

import { useState } from 'react'
import Link from 'next/link'

const items = [
  {
    q: "Quel budget prévoir ?",
    a: "On démarre à 6 500€/mois pour le pack growth complet (SEO programmatique + paid + content + ops). Engagement 6 mois. ROI moyen observé : 3 à 5× sur 8 mois. L'audit initial est gratuit et sans engagement.",
  },
  {
    q: "Combien de temps avant les premiers leads ?",
    a: "Quick wins (Google Business, landing, tracking) sous 30 jours. Premier flux paid sous 6 semaines. SEO programmatique : 3 mois pour les premiers classements, 6 mois pour le volume.",
  },
  {
    q: "Vous travaillez avec quels types de cabinets ?",
    a: "Cabinets entre 5 et 80 collaborateurs, idéalement avec une volonté de spécialisation verticale (e-comm, BTP, médical, immobilier, restauration, SaaS). On refuse les cabinets purement généralistes : nos méthodes marchent moins bien sans angle.",
  },
  {
    q: "Et la concurrence avec mes confrères ?",
    a: "On est exclusif par zone géographique × verticale. Vous êtes le seul cabinet sur 'expert-comptable e-commerce Lyon' dans notre portefeuille. C'est pour ça qu'on n'a que 27 clients après 2 ans.",
  },
  {
    q: "Vous gérez aussi le site web ?",
    a: "Oui. Soit on optimise l'existant, soit on refait (Webflow ou Next.js). Inclus dans l'engagement. On garde la main pendant l'engagement, transfert complet à la sortie.",
  },
  {
    q: "Que se passe-t-il après les 6 mois ?",
    a: "Le moteur tourne sans nous. 94% de nos clients re-signent (forfait opérationnel allégé : ~2 500€/mois pour l'opération + reporting + itérations). Sinon, on transfère tout proprement.",
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section className="py-[100px] bg-paper" id="faq">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid gap-16" style={{ gridTemplateColumns: '320px 1fr' }}>
          {/* Left */}
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              FAQ
            </p>
            <h2
              className="font-display font-bold text-ink my-3"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Les questions{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                qui reviennent
              </span>
              .
            </h2>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-5">
              D&apos;autres ? Posez-les pendant l&apos;audit gratuit.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-ink text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full hover:-translate-y-px transition-transform duration-200 group"
            >
              Réserver un audit
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
                    style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}
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
                  className="overflow-hidden transition-all duration-300 text-ink-2 text-[15.5px] leading-relaxed max-w-[640px]"
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
