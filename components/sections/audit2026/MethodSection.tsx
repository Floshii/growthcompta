import { AUDIT_CTA_HREF } from './Hero'

const ascension = [
  {
    id: '00',
    tag: 'Audit',
    t: 'Diagnostic offert',
    d: '45 min · votre chiffre de CA dormant + la méthode complète.',
  },
  {
    id: '01',
    tag: 'Étage 1',
    t: 'Pay-per-performance',
    d: 'Repricing de la base. 20% du CA additionnel signé, plancher 0€.',
  },
  {
    id: '02',
    tag: 'Étage 2',
    t: 'Retainer 2 500€/mois',
    d: 'Démarre une fois les premiers avenants signés. Automatisation des flux.',
  },
  {
    id: '03',
    tag: 'Étage 3',
    t: 'Inclus au retainer',
    d: 'Acquisition de clones de vos meilleurs clients.',
  },
]

const phases = [
  {
    id: '01',
    tag: 'ÉTAGE 1 · PAY-PER-PERFORMANCE',
    tagColor: 'bg-accent',
    t: 'Repricing de votre base',
    sub: 'Semaines 1–5',
    d: 'Segmentation de vos dossiers par rentabilité réelle. Offres restructurées en 3 paliers.',
    items: [
      'Segmentation de vos dossiers par rentabilité réelle',
      'Offres restructurées en 3 paliers',
      'Avenants de migration avec nouvelle grille',
      'Scripts & accompagnement sur vos 20 premières conversations clients',
    ],
    price: '20% du CA additionnel signé',
    priceDetail: '· plancher 0€',
    highlight: '100% au résultat — vous ne payez que sur avenants signés',
  },
  {
    id: '02',
    tag: 'ÉTAGE 2 · RETAINER',
    tagColor: 'bg-white/15',
    t: 'Marge par automatisation',
    sub: 'Mois 2–4',
    d: 'Factur-X supprime la saisie. On branche vos flux PDP sur votre outil de production.',
    items: [
      'Factur-X supprime la saisie',
      'Connexion de vos flux PDP à votre outil de production',
      'Automatisation des tâches répétitives',
      'Chaque heure libérée devient mission de conseil facturable',
    ],
    price: '2 500€',
    priceDetail: '/mois',
    highlight: null,
  },
  {
    id: '03',
    tag: 'ÉTAGE 3 · INCLUS',
    tagColor: 'bg-white/15',
    t: 'Acquisition clone',
    sub: 'Mois 3+',
    d: "L'audit a révélé le profil exact de vos 20% meilleurs clients. Notre moteur cible leurs clones.",
    items: [
      'Profil exact de vos 20% meilleurs clients identifié par l’audit',
      'SEO programmatique, ads, funnel ciblés sur ce profil',
      'Objectif : remplacer vos pires dossiers, pas vous surcharger',
    ],
    price: 'Inclus',
    priceDetail: 'au retainer Étage 2',
    highlight: null,
  },
]

export default function MethodSection() {
  return (
    <section className="py-16 md:py-[100px] bg-ink text-white" id="methode">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              La méthode · 3 étages
            </p>
            <h2
              className="font-display font-bold text-white m-0"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              D&apos;abord le CA. Puis la marge.{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                Puis les clients que vous méritez.
              </span>
            </h2>
          </div>
          <p className="text-[15px] text-[#d6d4cf] md:max-w-[360px] leading-relaxed">
            Chaque étage se débloque sur la base des résultats du précédent. Vous gardez le contrôle à chaque palier.
          </p>
        </div>

        {/* Séquence d'ascension */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-3">
          {ascension.map((a, i) => (
            <div key={a.id} className="bg-[#161513] p-4 md:p-5 relative">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">{a.tag}</span>
                {i < ascension.length - 1 && (
                  <span className="hidden md:inline text-white/20 ml-auto font-mono text-[11px]">→</span>
                )}
              </div>
              <p className="font-display font-semibold text-white text-[14px] md:text-[15px] leading-tight m-0">{a.t}</p>
              <p className="text-[12px] text-muted-2 leading-snug mt-1 m-0">{a.d}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2 mb-12 md:mb-16">
          La garantie « 0€ si pas de résultat » s&apos;applique uniquement à l&apos;Étage 1. Les Étages 2 et 3 sont
          un retainer fixe classique, démarré une fois les premiers avenants signés.
        </p>

        {/* 3 Étages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {phases.map((p) => (
            <div key={p.id} className="bg-[#111] p-7 md:p-8 flex flex-col gap-5">
              {/* Tag + number */}
              <div className="flex items-center justify-between gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full text-white whitespace-nowrap ${p.tagColor}`}>
                  {p.tag}
                </span>
                <span className="font-mono text-[11px] text-white/30 tracking-[0.08em]">{p.id}</span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="font-display font-bold text-white m-0"
                  style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1 }}
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
                    style={{ fontSize: 'clamp(20px, 2vw, 28px)', letterSpacing: '-0.025em' }}
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

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={AUDIT_CTA_HREF}
            className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            Démarrer par l&apos;audit offert
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

      </div>
    </section>
  )
}
