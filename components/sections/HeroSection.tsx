import Link from 'next/link'
import DashboardMock from './DashboardMock'

export default function HeroSection() {
  return (
    <section className="py-[70px]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: '1.05fr 1fr' }}>
          {/* Left */}
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted mb-7 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Cabinet growth · 100% experts-comptables
            </p>

            <h1
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(48px, 5.4vw, 88px)', letterSpacing: '-0.04em', lineHeight: 0.92 }}
            >
              Plus de{' '}
              <span
                className="inline"
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                clients
              </span>
              .<br />
              Moins de prospection.<br />
              Zéro discours.
            </h1>

            <p className="text-[20px] leading-[1.45] text-ink-2 max-w-[540px] mt-8 mb-10">
              On installe un moteur d&apos;acquisition complet pour votre cabinet — SEO programmatique, paid, content &amp; sales ops — et on l&apos;opère avec vous.
            </p>

            <div className="flex items-center gap-3.5 flex-wrap">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2.5 bg-ink text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-transparent hover:-translate-y-px transition-transform duration-200 group"
              >
                Réserver un audit
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2.5 bg-transparent text-ink font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-line hover:border-ink hover:bg-paper transition-all duration-200"
              >
                Voir le pricing
              </Link>
            </div>

            <div className="flex gap-8 mt-14 flex-wrap">
              <div>
                <div className="font-display font-bold text-[36px] tracking-display leading-none">27</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mt-1">Cabinets · 4 régions</div>
              </div>
              <div>
                <div className="font-display font-bold text-[36px] tracking-display leading-none">+180k€</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mt-1">CA additionnel / 6 mois</div>
              </div>
            </div>
          </div>

          {/* Right — Dashboard */}
          <div>
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  )
}
