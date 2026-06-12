import Link from 'next/link'
import { CountdownDays } from './Countdown'

export const AUDIT_CTA_HREF = '#audit'
export const AUDIT_CTA_LABEL = 'Obtenir mon Audit Septembre 2026 — offert'

export default function Hero() {
  return (
    <section className="py-16 md:py-[90px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">

        {/* Eyebrow */}
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          100% cabinets d&apos;expertise comptable · Facturation électronique 2026
        </p>

        {/* Title — promesse directe d'abord */}
        <h1
          className="font-display font-bold text-ink m-0 max-w-[920px] mx-auto"
          style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', letterSpacing: '-0.04em', lineHeight: 0.98 }}
        >
          Votre obligation de septembre,{' '}
          <span
            className="inline"
            style={{
              background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
              padding: '0 4px',
            }}
          >
            transformée en CA
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink-2 max-w-[640px] mx-auto mt-7 mb-8">
          Avant le 1er septembre 2026, vous devez recontacter 100% de vos clients pour la facturation électronique.
          C&apos;est la fenêtre de repricing de la décennie — et le prétexte légal parfait pour réajuster vos
          honoraires, client par client. <strong className="text-ink">+12 à 30% de CA par client. Sans recruter. Payé au résultat.</strong>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
          <Link
            href={AUDIT_CTA_HREF}
            className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            {AUDIT_CTA_LABEL}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>
        <p className="font-mono text-[11px] text-muted tracking-[0.08em] mb-2">
          45 min · La méthode complète + votre chiffre de CA dormant · Gratuit
        </p>
        <p className="font-mono text-[11px] text-accent tracking-[0.08em]">
          <CountdownDays />{' '}avant l&apos;échéance légale du 1er septembre 2026
        </p>

      </div>
    </section>
  )
}
