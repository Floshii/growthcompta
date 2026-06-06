const phases = [
  {
    id: '01',
    tag: 'FIRE',
    tagColor: 'bg-accent',
    t: 'Allumer l\'acquisition',
    sub: 'Sprint de lancement · 30 jours',
    d: "Allumer l'acquisition rapidement. Prouver la valeur. Payé à la performance — zéro risque pour le cabinet.",
    items: [
      "Définition de la niche & de l'angle d'attaque",
      'Campagnes Ads quick win (Meta ou Google)',
      'Funnel de qualification + prise de RDV automatisée',
      'Dashboard : coût/lead, coût/RDV, taux de signature',
    ],
    price: '1 000€',
    priceDetail: 'minimum à dépenser',
    highlight: '100% au résultat',
  },
  {
    id: '02',
    tag: 'ENGINE',
    tagColor: 'bg-white/15',
    t: 'Construire le moteur',
    sub: 'Construction d\'un moteur scalable · 3 mois',
    d: "On remplace votre site vitrine par un vrai tunnel de vente — et on l'alimente en prospects qualifiés.",
    items: [
      'Un tunnel de vente qui convertit à la place de votre site vitrine',
      'Une présence LinkedIn qui génère des demandes entrantes',
      'Un SEO niche qui vous positionne sur les recherches de vos prospects',
      'Un système de réputation qui convertit les hésitants',
      'Un process de closing qui transforme chaque RDV en client',
    ],
    price: '7 000€',
    priceDetail: '· satisfait ou remboursé',
    highlight: null,
  },
  {
    id: '03',
    tag: 'FUEL',
    tagColor: 'bg-white/15',
    t: 'Alimenter en continu',
    sub: 'Retainer mensuel · ∞',
    d: "Alimenter la machine en continu. Contenus, campagnes, croissance compoundée — −33 % vs. à la carte.",
    items: [
      'SEO continu via système interview mensuel',
      'Content & ghostwriting LinkedIn',
      'Setting LinkedIn (outreach 100% conforme)',
      'Création de contenus publicitaires',
      'Gestion & optimisation des Ads',
    ],
    price: '1 500€',
    priceDetail: '/mois · full service',
    highlight: '−33% vs à la carte',
  },
]

export default function MethodSection() {
  return (
    <section className="py-16 md:py-[100px] bg-ink text-white" id="method">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Méthode GC · FIRE · ENGINE · FUEL
            </p>
            <h2
              className="font-display font-bold text-white m-0"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Pas une agence.<br />
              Une{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                infrastructure
              </span>{' '}
              de croissance.
            </h2>
          </div>
          <p className="text-[15px] text-[#d6d4cf] md:max-w-[360px] leading-relaxed">
            Un cabinet invisible → leader de sa niche. Des résultats dès 30 jours, une croissance compoundée mois après mois.
          </p>
        </div>

        {/* 3 Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {phases.map((p) => (
            <div key={p.id} className="bg-[#111] p-7 md:p-8 flex flex-col gap-5">
              {/* Tag + number */}
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full text-white ${p.tagColor}`}>
                  {p.tag}
                </span>
                <span className="font-mono text-[11px] text-white/30 tracking-[0.08em]">{p.id}</span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="font-display font-bold text-white m-0"
                  style={{ fontSize: 'clamp(28px, 2.8vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {p.t}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-2 mt-2">{p.sub}</p>
              </div>

              {/* Description */}
              <p className="text-[14.5px] leading-[1.6] text-[#d6d4cf] m-0">{p.d}</p>

              {/* Deliverables */}
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13.5px] text-[#b8b5af]">
                    <span className="text-accent mt-[3px] shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mt-auto pt-5 border-t border-white/10">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="font-display font-bold text-white"
                    style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', letterSpacing: '-0.025em' }}
                  >
                    {p.price}
                  </span>
                  <span className="font-mono text-[11px] text-muted-2 tracking-[0.06em]">{p.priceDetail}</span>
                </div>
                {p.highlight && (
                  <span className="inline-block mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                    ✓ {p.highlight}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center font-mono text-[11px] text-muted-2 tracking-[0.08em] mt-8">
          Un cabinet qui génère, qui attire, et qui domine sa niche.
        </p>

      </div>
    </section>
  )
}
