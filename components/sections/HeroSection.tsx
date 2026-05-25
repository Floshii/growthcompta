import Link from 'next/link'
import DashboardMock from './DashboardMock'

export const CTA_HREF = '/outils/audit-acquisition'
export const CTA_LABEL = 'Obtenir mon audit de croissance'

export default function HeroSection() {
  return (
    <section className="py-14 md:py-[70px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid gap-10 lg:gap-16 items-center lg:grid-cols-[1.05fr_1fr]">

          {/* Left */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              100% experts comptables &amp; fiscaux
            </p>

            <h1
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(36px, 4.8vw, 80px)', letterSpacing: '-0.04em', lineHeight: 0.94 }}
            >
              Le système d&apos;acquisition moderne<br />
              pour cabinets comptables{' '}
              <span
                className="inline"
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                ambitieux
              </span>
              .
            </h1>

            <p className="text-[17px] md:text-[19px] leading-[1.5] text-ink-2 max-w-[520px] mt-7 mb-8">
              On installe un moteur d&apos;acquisition complet pour votre cabinet — et on l&apos;opère avec vous.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href={CTA_HREF}
                className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
              >
                {CTA_LABEL}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </Link>
              <span className="font-mono text-[11px] text-muted tracking-[0.08em]">
                Gratuit · Sans engagement
              </span>
            </div>

            <div className="flex gap-8 mt-10 md:mt-14 flex-wrap">
              <div>
                <div className="font-display font-bold text-[32px] md:text-[36px] tracking-display leading-none">17</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mt-1">Cabinets · 4 régions</div>
              </div>
              <div>
                <div className="font-display font-bold text-[32px] md:text-[36px] tracking-display leading-none">+120k€</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mt-1">CA additionnel / 6 mois</div>
              </div>
            </div>
          </div>

          {/* Right — Dashboard (desktop only) */}
          <div className="hidden lg:block">
            <DashboardMock />
          </div>

        </div>
      </div>
    </section>
  )
}
