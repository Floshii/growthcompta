import Link from 'next/link'
import { FE_PAYBACK_ARTICLE } from './constants'

function EqCard({
  tag,
  name,
  num,
  den,
}: {
  tag: string
  name: string
  num: string
  den: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent mb-2">{tag}</p>
      <p className="text-[16px] font-semibold text-ink mb-6">{name}</p>
      <div className="flex flex-col items-center gap-3">
        <p className="text-[14px] text-ink leading-snug text-center font-medium px-4">{num}</p>
        <div className="w-full h-px bg-ink/20 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 font-mono text-[10px] text-muted">÷</span>
        </div>
        <p className="text-[14px] text-ink-2 leading-snug text-center px-4">{den}</p>
      </div>
    </div>
  )
}

export default function PaybackLaw() {
  return (
    <section className="py-16 md:py-[88px] bg-paper">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Loi du payback · cadre de décision
            </p>
            <h2
              className="font-display font-bold text-ink mb-5"
              style={{ fontSize: 'clamp(26px, 3vw, 44px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              Comment faire croître votre cabinet.
            </h2>
            <p className="text-[16px] font-medium text-ink mb-4 leading-snug">
              Chaque euro investi dans un client ou un collaborateur doit se rembourser vite.
            </p>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-4">
              Sinon votre cabinet plafonne. Vous travaillez plus, vous gagnez autant. La loi du payback mesure cette vitesse de remboursement sur vos deux moteurs&nbsp;: vos clients et vos équipes.
            </p>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-8">
              L&apos;automatisation agit d&apos;abord sur le second levier. Elle réduit le temps perdu, raccourcit le payback de chaque collaborateur et libère la capacité que vous réinvestissez ensuite.
            </p>
            <Link
              href={FE_PAYBACK_ARTICLE}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:text-accent-deep transition-colors group"
            >
              Lire l&apos;article complet sur la loi du payback
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <EqCard
              tag="Équation 01 · Acquisition client"
              name="Payback period client"
              num="Marge brute générée par le client"
              den="Coût total d'acquisition de ce client"
            />
            <EqCard
              tag="Équation 02 · Équipe"
              name="Payback period collaborateur"
              num="Marge brute générée par un collaborateur à 90 jours"
              den="Coût total de recrutement + onboarding + formation"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
