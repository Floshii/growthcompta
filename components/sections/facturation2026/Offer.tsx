import { FE_CTA_LABEL } from './constants'
import CalculateurCapacite from './CalculateurCapacite'

const problems = [
  {
    n: 'Problème 01',
    title: 'Vos équipes ressaisissent les mêmes données',
    body: "Une facture passe par trois outils et deux fichiers Excel avant d'être classée. Le temps part en manipulation, pas en conseil.",
    cost: "jusqu'à 3 h / semaine / collaborateur",
  },
  {
    n: 'Problème 02',
    title: 'La réforme arrive sans plan',
    body: "Réception obligatoire au 1er septembre 2026, émission qui suit. Sans préparation, la bascule se fait dans l'urgence et au mauvais moment.",
    cost: 'échéance réglementaire fixe',
  },
  {
    n: 'Problème 03',
    title: 'Vos outils ne se parlent pas',
    body: "Pennylane, ACD, Cegid, MyUnisoft. Chacun fait sa part, aucun ne tient le flux de bout en bout. Les ruptures coûtent des heures.",
    cost: 'flux fragmenté · zéro visibilité',
  },
]

const livrables = [
  {
    n: '01',
    title: 'Audit des flux + cartographie des outils',
    desc: "On trace chaque facture de l'émission au paiement et on cartographie votre stack existante : Pennylane, ACD, Cegid, MyUnisoft.",
  },
  {
    n: '02',
    title: 'Intégration Factur-X / PDP + scénarios',
    desc: "Raccordement à la plateforme agréée, conversion au format Factur-X et scénarios de traitement adaptés à chaque type de dossier.",
  },
  {
    n: '03',
    title: 'Formation équipe + scripts de migration',
    desc: "Vos collaborateurs prennent la main sur le nouveau flux. On fournit les scripts de mails clients prêts à envoyer pour la bascule.",
  },
  {
    n: '04',
    title: 'Console / CRM GrowthCompta inclus',
    desc: "Le pilotage de vos flux dans une console unique, pour voir où en est chaque facture. Inclus dans la mise en place.",
    bonus: true,
  },
]

const tiers = [
  { seg: '5 à 10 collaborateurs', price: '1 490 – 2 500 €' },
  { seg: '10 à 25 collaborateurs', price: '2 500 – 4 900 €' },
  { seg: '25 à 50 collaborateurs', price: 'sur devis' },
]

export default function Offer() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  return (
    <section className="py-16 md:py-[88px] bg-paper" id="offre">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Offre · automatisation facture électronique
            </p>
            <h2
              className="font-display font-bold text-ink"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.96 }}
            >
              Trois frictions aujourd&apos;hui.
              <br />
              Un flux{' '}
              <span
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                automatisé
              </span>{' '}
              demain.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[15.5px] text-ink-2 leading-relaxed">
              On part de vos outils existants. On ne remplace rien. On orchestre le flux de bout en bout et on le met en conformité pour 2026.
            </p>
          </div>
        </div>

        {/* 3 problems — 1px gap trick */}
        <div
          className="rounded-2xl overflow-hidden mb-14 grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1px', background: 'var(--color-line)', border: '1px solid var(--color-line)' }}
        >
          {problems.map((p) => (
            <div
              key={p.n}
              className="bg-white flex flex-col"
              style={{ padding: '34px', minHeight: '240px', gap: 14 }}
            >
              <p
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--color-muted)' }}
              >
                {p.n}
              </p>
              <h3
                className="font-semibold"
                style={{ fontSize: 23, letterSpacing: '-0.02em', lineHeight: 1.12, color: 'var(--color-ink)' }}
              >
                {p.title}
              </h3>
              <p className="flex-1" style={{ fontSize: 14.5, color: 'var(--color-muted)' }}>
                {p.body}
              </p>
              <p className="font-mono" style={{ fontSize: 11, color: 'var(--color-accent-deep)' }}>
                {p.cost}
              </p>
            </div>
          ))}
        </div>

        {/* Offer grid: livrables + side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">

          {/* Left: 4 livrables + calculator */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-6">Ce que vous recevez · 4 livrables</p>
            <div className="rounded-2xl border border-line bg-white overflow-hidden mb-6">
              {livrables.map((l, i) => (
                <div
                  key={l.n}
                  className={i < livrables.length - 1 ? 'border-b border-line' : ''}
                  style={{ display: 'grid', gridTemplateColumns: '64px 1fr' }}
                >
                  <div
                    className="font-mono text-[13px] text-accent"
                    style={{ padding: '26px 0 0 24px' }}
                  >
                    {l.n}
                  </div>
                  <div className="py-6 pr-6">
                    <p className="font-semibold text-ink mb-1.5 flex items-center gap-2" style={{ fontSize: 20 }}>
                      {l.title}
                      {l.bonus && (
                        <span
                          className="font-mono uppercase text-white"
                          style={{
                            fontSize: 10.5,
                            background: 'var(--color-accent)',
                            padding: '3px 9px',
                            borderRadius: '99px',
                          }}
                        >
                          Bonus inclus
                        </span>
                      )}
                    </p>
                    <p className="text-[14.5px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      {l.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <CalculateurCapacite />
          </div>

          {/* Right: result box + price box */}
          <div className="flex flex-col gap-5">

            {/* Result box */}
            <div className="rounded-2xl bg-ink p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2 mb-4">Résultat attendu</p>
              <p
                className="font-display font-bold text-accent"
                style={{ fontSize: 64, letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: 12 }}
              >
                +20–30
                <span style={{ fontSize: '0.42em', marginLeft: '0.1em', color: 'var(--color-accent)' }}>%</span>
              </p>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#d6d4cf' }}>
                de productivité, soit du temps rendu pour les tâches à forte valeur ajoutée plutôt que la saisie.
              </p>
              <p className="text-[13px] leading-relaxed pt-4" style={{ color: '#d6d4cf', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <strong className="text-white">Cabinet de 10 collaborateurs&nbsp;:</strong> 2&nbsp;h par semaine et par collaborateur de ressaisie supprimées, soit près de 80&nbsp;h par mois rendues à l&apos;équipe. L&apos;équivalent de plus d&apos;un demi-collaborateur à temps plein.
              </p>
              <p className="font-mono text-[11px] text-muted-2 mt-3">
                Ordre de grandeur observé sur ce type d&apos;automatisation. Le gain réel est chiffré pendant l&apos;audit.
              </p>
            </div>

            {/* Price box */}
            <div className="rounded-2xl border border-line bg-white overflow-hidden">
              <div className="px-6 pt-6 pb-5 border-b border-line">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-2">Mise en place</p>
                <p className="font-mono text-[12px] text-ink-2 mb-1">à partir de</p>
                <p
                  className="font-display font-bold text-ink leading-none"
                  style={{ fontSize: 46, letterSpacing: '-0.04em' }}
                >
                  1&nbsp;490<span className="text-[20px] font-normal text-ink-2 ml-1.5">€</span>
                </p>

                {/* pb-free */}
                <div
                  className="flex items-center rounded-[10px] mt-3"
                  style={{
                    gap: 10,
                    padding: '12px 16px',
                    background: 'var(--color-accent-soft)',
                  }}
                >
                  <span
                    className="inline-block rounded-full flex-shrink-0"
                    style={{ width: 7, height: 7, background: 'var(--color-accent)' }}
                  />
                  <p
                    className="font-medium"
                    style={{ fontSize: 13.5, color: 'var(--color-accent-deep)' }}
                  >
                    Diagnostic gratuit inclus
                  </p>
                </div>

              </div>
              <div className="px-6 py-4 border-b border-line">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mb-3">Ordres de grandeur · selon le cabinet</p>
                {tiers.map((t) => (
                  <div key={t.seg} className="flex items-center justify-between py-2 border-b border-line/50 last:border-0">
                    <p className="text-[13px] text-ink-2">{t.seg}</p>
                    <p className="text-[13px] font-semibold text-ink">{t.price}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-paper">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[12px] rounded-full hover:bg-accent-deep transition-colors group"
                >
                  {FE_CTA_LABEL}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
                <div className="mt-4 rounded-xl border border-line bg-white p-4">
                  <p className="text-[12px] font-semibold text-ink mb-1">Garantie de mise en service</p>
                  <p className="text-[12px] text-ink-2 leading-relaxed">
                    Flux non opérationnel sous 30 jours ouvrés après le kick-off ? On continue sans facturer. Rien en place de notre fait après 60 jours ouvrés ? Remboursement intégral des honoraires de mise en place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
