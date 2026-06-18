import Link from 'next/link'
import { FE_CTA_LABEL } from './constants'

function FlowMock() {
  const steps = [
    { ic: 'PL', t: 'Émission facture', s: 'Pennylane · ACD · Cegid', state: 'done' },
    { ic: 'FX', t: 'Conversion Factur-X', s: 'format hybride PDF + XML', state: 'done' },
    { ic: 'PDP', t: 'Transmission PDP', s: 'plateforme agréée', state: 'active' },
    { ic: '✓', t: 'Cycle de vie suivi', s: 'reçue · acceptée · payée', state: 'wait' },
  ]

  return (
    <div className="rounded-2xl border border-line overflow-hidden" style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.07)' }}>
      <div className="bg-paper px-4 py-2.5 flex items-center gap-2 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-muted">console.growthcompta.com / flux-facturation</span>
      </div>
      <div className="p-5 bg-white">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-4">Flux automatisé · conformité 2026</p>
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                step.state === 'done'
                  ? 'border-[#d1fae5] bg-[#f0fdf4]'
                  : step.state === 'active'
                  ? 'border-[var(--color-accent)]/30 bg-[var(--color-paper)]'
                  : 'border-line bg-white'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 ${
                  step.state === 'done'
                    ? 'bg-[#16a34a] text-white'
                    : step.state === 'active'
                    ? 'bg-accent text-white'
                    : 'bg-paper-2 text-muted border border-line'
                }`}
              >
                {step.ic}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-ink leading-tight">{step.t}</p>
                <p className="font-mono text-[11px] text-muted mt-0.5 truncate">{step.s}</p>
              </div>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1.5 ${
                  step.state === 'done'
                    ? 'bg-[#dcfce7] text-[#15803d]'
                    : step.state === 'active'
                    ? 'bg-paper text-accent'
                    : 'bg-paper text-muted'
                }`}
              >
                {step.state === 'active' && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent inline-block"
                    style={{ animation: 'pulse-dot 1.5s ease-in-out infinite' }}
                  />
                )}
                {step.state === 'done' ? 'Traité' : step.state === 'active' ? 'En cours' : 'En attente'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-line flex justify-between">
          <div>
            <p className="font-display font-bold text-[24px] text-ink" style={{ letterSpacing: '-0.03em' }}>2 h 40</p>
            <p className="font-mono text-[11px] text-muted mt-0.5">par semaine · capacité rendue</p>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-[24px] text-ink" style={{ letterSpacing: '-0.03em' }}>0</p>
            <p className="font-mono text-[11px] text-muted mt-0.5">ressaisie manuelle</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  return (
    <section className="py-16 md:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Automatisation · conformité 2026
            </p>
            <h1
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(36px, 4.8vw, 62px)', letterSpacing: '-0.04em', lineHeight: 1.0 }}
            >
              Automatisez la facture électronique. Libérez{' '}
              <span
                className="inline"
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                20–30 %
              </span>{' '}
              de capacité d&apos;ici septembre 2026.
            </h1>

            <p className="text-[16px] md:text-[17.5px] leading-[1.58] text-ink-2 mt-6 mb-2">
              Pour les cabinets de 5 à 50 collaborateurs qui veulent être conformes et plus productifs sans changer d&apos;outil.
            </p>
            <p className="text-[15px] leading-[1.55] text-muted mb-6">
              On branche vos flux sur une plateforme agréée, on supprime la ressaisie, on forme votre équipe.
            </p>
            <p className="text-[15px] font-medium text-ink mb-8">
              <strong>À partir de 1&nbsp;490&nbsp;€, ou remboursé.</strong> Diagnostic gratuit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
              >
                {FE_CTA_LABEL}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-[13px] font-semibold text-ink mb-1">Garantie de mise en service</p>
              <p className="text-[13px] text-ink-2 leading-relaxed">
                Flux non opérationnel sous 30 jours ouvrés après le kick-off ? On continue sans facturer.
                Rien en place de notre fait après 60 jours ouvrés ? Remboursement intégral.
              </p>
            </div>
          </div>

          <div>
            <FlowMock />
          </div>
        </div>
      </div>
    </section>
  )
}
