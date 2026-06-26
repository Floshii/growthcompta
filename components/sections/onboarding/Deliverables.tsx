const livrables = [
  {
    n: '01',
    title: 'Portail marque blanche configuré',
    desc: 'Votre logo, vos couleurs, votre domaine. Le client ne voit pas GrowthCompta — il voit votre cabinet. Déployé et opérationnel en 30 jours.',
  },
  {
    n: '02',
    title: 'Tableau de bord onboarding',
    desc: 'Tous vos dossiers en cours sur un écran. Statut par flux : fiscal, bancaire, social, juridique. Les points bloquants remontent automatiquement — vous n’avez pas à relancer pour savoir où en est un dossier.',
  },
  {
    n: '03',
    title: 'Workflows par type de structure',
    desc: 'SAS, SARL, EI, SCI, association. Chaque parcours client est configuré selon la structure juridique. Les pièces demandées sont exactement les bonnes, dans le bon ordre.',
  },
  {
    n: '04',
    title: 'Handoff Pennylane',
    desc: 'Création du dossier, exercice, imports, organisation documentaire. Quand votre client a terminé son parcours, vous récupérez un dossier complet, structuré, prêt à produire dans Pennylane. Rien à reformater, rien à compléter.',
    bonus: true,
  },
]

export default function Deliverables() {
  return (
    <section className="py-16 md:py-[88px] bg-paper" id="deliverables">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="mb-12 max-w-[680px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Livrables
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.98 }}
          >
            Ce que vous recevez. Ce que voit votre client.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">

          {/* Left: 4 livrables cabinet */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-6">Côté cabinet · 4 livrables</p>
            <div className="rounded-2xl border border-line bg-white overflow-hidden">
              {livrables.map((l, i) => (
                <div
                  key={l.n}
                  className={i < livrables.length - 1 ? 'border-b border-line' : ''}
                  style={{ display: 'grid', gridTemplateColumns: '64px 1fr' }}
                >
                  <div className="font-mono text-[13px] text-accent" style={{ padding: '26px 0 0 24px' }}>
                    {l.n}
                  </div>
                  <div className="py-6 pr-6">
                    <p className="font-semibold text-ink mb-1.5 flex items-center gap-2 flex-wrap" style={{ fontSize: 20 }}>
                      {l.title}
                      {l.bonus && (
                        <span
                          className="font-mono uppercase text-white"
                          style={{ fontSize: 10.5, background: 'var(--color-accent)', padding: '3px 9px', borderRadius: '99px' }}
                        >
                          Le cœur de l&apos;offre
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
          </div>

          {/* Right: côté client */}
          <div className="rounded-2xl bg-ink p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2 mb-4">Côté client · ce qu&apos;il vit</p>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#d6d4cf' }}>
              Un portail simple, à vos couleurs. Une checklist claire&nbsp;: quoi faire, pourquoi, dans quel ordre. Signature de la lettre de mission, envoi des pièces, habilitations — dans un seul parcours guidé. Une vision en temps réel de l&apos;avancement de son dossier.
            </p>
            <p className="text-[13px] leading-relaxed pt-4" style={{ color: '#d6d4cf', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              L&apos;expérience ressemble à <strong className="text-white">Qonto</strong> ou <strong className="text-white">Stripe Atlas</strong>. Pas à un email avec des pièces jointes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
