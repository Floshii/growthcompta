import { FE_CTA_LABEL } from './constants'
import CalculateurCapacite from './CalculateurCapacite'

const problems = [
  {
    idx: '/01',
    title: 'Ressaisie chronique',
    body: "Chaque facture fournisseur passe encore par les mains d'un collaborateur. Le volume 2026 ne passera pas à la main.",
  },
  {
    idx: '/02',
    title: 'Conformité 2026 en suspens',
    body: "Au 1er septembre 2026, la réception électronique devient obligatoire. Sans flux raccordé, votre cabinet sera hors conformité.",
  },
  {
    idx: '/03',
    title: 'Stack éclatée',
    body: "Pennylane, ACD, Cegid, tableurs — autant de points de friction. Un flux automatisé connecte tout sans changer vos outils.",
  },
]

const livrables = [
  {
    num: '01',
    title: 'Flux Factur-X automatisé',
    desc: "Conversion au format hybride PDF/XML exigé par l'obligation 2026. Émission et réception couvertes.",
  },
  {
    num: '02',
    title: 'Raccordement PDP agréée',
    desc: "Branchement sur la plateforme de dématérialisation partenaire homologuée. Un seul raccordement pour l'ensemble du cabinet.",
  },
  {
    num: '03',
    title: 'Formation équipe incluse',
    desc: 'Session de prise en main de votre équipe. Adoption assurée avant la bascule.',
  },
  {
    num: '04',
    title: 'Tableau de bord flux',
    desc: "Visibilité en temps réel sur l'état de chaque facture : envoyée, reçue, acceptée, payée.",
  },
]

export default function Offer() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  return (
    <section className="py-16 md:py-[88px] bg-paper" id="offre">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          L&apos;offre · ce que vous recevez
        </p>
        <h2
          className="font-display font-bold text-ink mb-3"
          style={{ fontSize: 'clamp(28px, 3.5vw, 50px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
        >
          Trois problèmes résolus.{' '}
          <span
            style={{
              background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
              padding: '0 4px',
            }}
          >
            Quatre livrables.
          </span>
        </h2>
        <p className="text-[16px] text-ink-2 leading-relaxed mb-10 max-w-[600px]">
          Un périmètre resserré, livré en deux à quatre semaines. Vous restez sur vos outils.
        </p>

        {/* Problems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {problems.map((p) => (
            <div
              key={p.idx}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <p className="font-mono text-[11px] text-muted mb-3">{p.idx}</p>
              <p className="font-medium text-[15px] text-ink mb-2">{p.title}</p>
              <p className="text-[13.5px] text-ink-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Two-column: calculator left, livrables right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: calculator */}
          <div>
            <CalculateurCapacite />
          </div>

          {/* Right: livrables + result + price */}
          <div className="flex flex-col gap-6">
            {/* 4 livrables */}
            <div className="rounded-2xl border border-line bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-line">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Ce que vous recevez · 4 livrables</p>
              </div>
              <div className="divide-y divide-line">
                {livrables.map((l) => (
                  <div key={l.num} className="px-6 py-4 flex gap-4">
                    <span className="font-mono text-[11px] text-accent mt-0.5 flex-shrink-0">/{l.num}</span>
                    <div>
                      <p className="text-[14px] font-medium text-ink mb-0.5">{l.title}</p>
                      <p className="text-[13px] text-ink-2 leading-relaxed">{l.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Result box */}
            <div className="rounded-2xl border border-accent/25 bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-4">Résultat visé</p>
              <div className="flex items-end gap-2 mb-2">
                <p
                  className="font-display font-bold text-accent leading-none"
                  style={{ fontSize: 52, letterSpacing: '-0.04em' }}
                >
                  +20–30 %
                </p>
              </div>
              <p className="text-[14px] text-ink-2 leading-relaxed">
                de capacité libérée sur les flux de facturation. Chiffré sur votre stack lors du diagnostic.
              </p>
            </div>

            {/* Price box */}
            <div className="rounded-2xl border border-line bg-white overflow-hidden">
              <div className="px-6 py-5 border-b border-line flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-1">Prix de mise en place</p>
                  <p
                    className="font-display font-bold text-ink leading-none"
                    style={{ fontSize: 40, letterSpacing: '-0.04em' }}
                  >
                    1&nbsp;490&nbsp;€
                    <span className="text-[17px] font-normal text-ink-2 ml-1.5">HT</span>
                  </p>
                </div>
                <p className="text-[12px] text-muted text-right leading-snug max-w-[160px]">
                  Périmètre chiffré après audit. Diagnostic gratuit.
                </p>
              </div>
              <div className="divide-y divide-line">
                {[
                  { tier: 'Starter', detail: "jusqu'à 10 collaborateurs", price: '1 490 €' },
                  { tier: 'Croissance', detail: '11–25 collaborateurs', price: '2 490 €' },
                  { tier: 'Cabinet', detail: '26–50 collaborateurs', price: 'Sur devis' },
                ].map((row) => (
                  <div key={row.tier} className="px-6 py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-medium text-ink">{row.tier}</p>
                      <p className="font-mono text-[11px] text-muted mt-0.5">{row.detail}</p>
                    </div>
                    <p className="text-[14px] font-semibold text-ink flex-shrink-0">{row.price}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-paper border-t border-line">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[11px] rounded-full hover:bg-accent-deep transition-colors group"
                >
                  {FE_CTA_LABEL}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
