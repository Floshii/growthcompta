import Link from 'next/link'
import { FE_PAYBACK_ARTICLE } from './constants'

function EqCard({ tag, name, num, den }: { tag: string; name: string; num: string; den: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-1">{tag}</p>
      <p className="text-[15px] font-semibold text-ink mb-5">{name}</p>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[13px] text-ink-2 text-center leading-snug">{num}</p>
        <div className="w-full h-px bg-ink" />
        <p className="text-[13px] text-ink-2 text-center leading-snug">{den}</p>
      </div>
    </div>
  )
}

export default function PaybackLaw() {
  return (
    <section className="py-16 md:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Loi du payback · cadre de décision
            </p>
            <p
              className="font-display font-bold text-ink mb-5"
              style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', letterSpacing: '-0.035em', lineHeight: 1.1 }}
            >
              Chaque euro investi doit se rembourser vite. Sinon votre cabinet plafonne.
            </p>
            <p className="text-[15.5px] text-ink-2 leading-relaxed mb-4">
              Vous travaillez plus, vous gagnez autant. La loi du payback mesure cette vitesse de remboursement sur vos deux moteurs&nbsp;: vos clients et vos équipes.
            </p>
            <p className="text-[15.5px] text-ink-2 leading-relaxed mb-8">
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
              tag="Équation 01"
              name="Payback period client"
              num="Marge brute générée par le client"
              den="Coût total d'acquisition de ce client"
            />
            <EqCard
              tag="Équation 02"
              name="Payback period équipe"
              num="Marge brute générée par un collaborateur à 90 jours"
              den="Coût total de recrutement + formation"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
