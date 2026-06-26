import { OB_CTA_LABEL, OB_CALENDLY_URL } from './constants'

function PortalMock() {
  const steps = [
    { ic: 'KYC', t: 'Identité & structure', s: 'Kbis · statuts · bénéficiaires effectifs', state: 'done' },
    { ic: 'LM', t: 'Lettre de mission', s: 'signature électronique', state: 'done' },
    { ic: 'ACC', t: 'Accès & habilitations', s: 'fisc · banques · URSSAF', state: 'active' },
    { ic: '✓', t: 'Handoff Pennylane', s: 'dossier complet · prêt à produire', state: 'wait' },
  ]

  return (
    <div className="rounded-2xl border border-line overflow-hidden" style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.07)' }}>
      <div className="bg-paper px-4 py-2.5 flex items-center gap-2 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-muted">onboarding.votrecabinet.fr</span>
      </div>
      <div className="p-5 bg-white">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-4">Parcours client · marque blanche</p>
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
            <p className="font-display font-bold text-[24px] text-ink" style={{ letterSpacing: '-0.03em' }}>10 jours</p>
            <p className="font-mono text-[11px] text-muted mt-0.5">dossier prêt à produire</p>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-[24px] text-ink" style={{ letterSpacing: '-0.03em' }}>0</p>
            <p className="font-mono text-[11px] text-muted mt-0.5">relance manuelle</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const calendlyUrl = OB_CALENDLY_URL

  return (
    <section className="py-16 md:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
              Onboarding client · portail marque blanche
            </p>
            <h1
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(36px, 4.8vw, 62px)', letterSpacing: '-0.04em', lineHeight: 1.0 }}
            >
              Transformez chaque nouveau client en{' '}
              <span
                className="inline"
                style={{
                  background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                  padding: '0 4px',
                }}
              >
                dossier prêt à produire
              </span>
              . En 10 jours. Sans relance.
            </h1>

            <p className="text-[16px] md:text-[17.5px] leading-[1.58] text-ink-2 mt-6 mb-2">
              Pour les cabinets sur Pennylane qui perdent 4 à 6 semaines et des dizaines d&apos;emails avant de toucher le premier euro sur un nouveau dossier.
            </p>
            <p className="text-[15px] leading-[1.55] text-muted mb-8">
              On installe un portail aux couleurs de votre cabinet. Votre client dépose tout en une fois. Votre équipe récupère un dossier complet, structuré, prêt à produire.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
              >
                {OB_CTA_LABEL}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 text-ink font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-line hover:border-ink hover:bg-paper transition-all duration-200"
              >
                Voir comment ça marche ↓
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-[13px] font-semibold text-ink mb-1">Garantie</p>
              <p className="text-[13px] text-ink-2 leading-relaxed">
                Portail opérationnel en 30 jours, sinon les 10 prochains onboardings sont offerts. Après 5 dossiers, si vous n&apos;avez pas gagné au moins 3 h par client — remboursement intégral du setup.
              </p>
            </div>
          </div>

          <div>
            <PortalMock />
          </div>
        </div>
      </div>
    </section>
  )
}
