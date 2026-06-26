import { OB_CTA_LABEL, OB_CALENDLY_URL } from './constants'

const includes = [
  'Configuration du portail : branding, domaine, workflows par type de structure, intégration Pennylane',
  '20 onboardings clients inclus pour mesurer le gain de temps sur le terrain',
  'Accompagnement au démarrage jusqu’au premier dossier livré',
]

export default function Offer() {
  const calendlyUrl = OB_CALENDLY_URL

  return (
    <section className="py-16 md:py-[88px] bg-paper" id="offre">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">

          {/* Left: pitch */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Offre Cabinets Fondateurs · places limitées
            </p>
            <h2
              className="font-display font-bold text-ink mb-8"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.98 }}
            >
              1&nbsp;000&nbsp;€ pour les 10 premiers cabinets partenaires.
            </h2>

            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-5">Ce que comprend l&apos;offre</p>
            <ul className="flex flex-col gap-3 mb-10">
              {includes.map((it) => (
                <li key={it} className="flex gap-3 items-start text-[15px] leading-relaxed text-ink-2">
                  <span className="inline-block rounded-full bg-accent flex-shrink-0 mt-2.5" style={{ width: 6, height: 6 }} />
                  {it}
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-line bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-3">Pourquoi &laquo; Fondateurs &raquo;</p>
              <p className="text-[14.5px] leading-relaxed text-ink-2">
                On ouvre cette offre à un nombre limité de cabinets qui acceptent de tester le process sur leurs vrais dossiers et de nous donner un retour structuré. En échange&nbsp;: un tarif de lancement et un accès prioritaire aux évolutions du produit.
              </p>
            </div>
          </div>

          {/* Right: price box */}
          <div className="rounded-2xl border border-line bg-white overflow-hidden">
            <div className="px-6 pt-6 pb-5 border-b border-line">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-2">Offre Fondateurs</p>
              <p
                className="font-display font-bold text-ink leading-none"
                style={{ fontSize: 46, letterSpacing: '-0.04em' }}
              >
                1&nbsp;000<span className="text-[20px] font-normal text-ink-2 ml-1.5">€</span>
              </p>
              <div
                className="flex items-center rounded-[10px] mt-3"
                style={{ gap: 10, padding: '12px 16px', background: 'var(--color-accent-soft)' }}
              >
                <span className="inline-block rounded-full flex-shrink-0" style={{ width: 7, height: 7, background: 'var(--color-accent)' }} />
                <p className="font-medium" style={{ fontSize: 13.5, color: 'var(--color-accent-deep)' }}>
                  10 places · 20 onboardings inclus
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-paper">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[12px] rounded-full hover:bg-accent-deep transition-colors group"
              >
                {OB_CTA_LABEL}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
              <div className="mt-4 rounded-xl border border-line bg-white p-4">
                <p className="text-[12px] font-semibold text-ink mb-1">Garantie</p>
                <p className="text-[12px] text-ink-2 leading-relaxed">
                  Portail opérationnel en 30 jours, sinon les 10 prochains onboardings sont offerts. Après 5 dossiers traités, si vous estimez ne pas gagner au moins 3&nbsp;h par client — remboursement intégral du setup. Sans discussion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
