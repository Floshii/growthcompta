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
    <section className="py-16 md:py-[88px]" id="offre">
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
              style={{ fontSize: 'clamp(28px, 3.5vw, 50px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
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

        {/* 3 problems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {problems.map((p) => (
            <div key={p.n} className="rounded-2xl border border-line bg-paper p-6 flex flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{p.n}</p>
              <h3 className="text-[16px] font-semibold text-ink leading-snug">{p.title}</h3>
              <p className="text-[13.5px] text-ink-2 leading-relaxed flex-1">{p.body}</p>
              <div className="mt-auto pt-3 border-t border-line">
                <p className="font-mono text-[11px] text-accent">{p.cost}</p>
              </div>
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
                <div key={l.n} className={`flex gap-4 px-6 py-5 ${i < livrables.length - 1 ? 'border-b border-line' : ''}`}>
                  <span className="font-mono text-[12px] text-accent mt-0.5 flex-shrink-0 w-6">{l.n}</span>
                  <div>
                    <p className="text-[14px] font-semibold text-ink mb-1 flex items-center gap-2">
                      {l.title}
                      {l.bonus && (
                        <span className="font-mono text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">Bonus inclus</span>
                      )}
                    </p>
                    <p className="text-[13px] text-ink-2 leading-relaxed">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <CalculateurCapacite />
          </div>

          {/* Right: result box + price box */}
          <div className="flex flex-col gap-5">
            {/* Result box */}
            <div className="rounded-2xl border border-accent/20 bg-paper p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-4">Résultat attendu</p>
              <p
                className="font-display font-bold text-accent leading-none mb-3"
                style={{ fontSize: 52, letterSpacing: '-0.04em' }}
              >
                +20–30<span style={{ fontSize: 28 }}>%</span>
              </p>
              <p className="text-[14px] text-ink-2 leading-relaxed mb-4">
                de productivité, soit du temps rendu pour les tâches à forte valeur ajoutée plutôt que la saisie.
              </p>
              <p className="text-[13px] text-ink-2 leading-relaxed border-t border-line pt-4">
                <strong className="text-ink">Cabinet de 10 collaborateurs&nbsp;:</strong> 2&nbsp;h par semaine et par collaborateur de ressaisie supprimées, soit près de 80&nbsp;h par mois rendues à l&apos;équipe. L&apos;équivalent de plus d&apos;un demi-collaborateur à temps plein.
              </p>
              <p className="font-mono text-[11px] text-muted mt-3">
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
                <p className="text-[12px] text-ink-2 mt-2">
                  Réglé en une fois, à la livraison du flux automatisé. Périmètre chiffré après l&apos;audit.
                </p>
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
                <p className="font-mono text-[11px] text-muted mb-4">Audit de diagnostic gratuit en amont</p>
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
