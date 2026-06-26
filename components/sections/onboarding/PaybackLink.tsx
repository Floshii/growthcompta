import Link from 'next/link'

export default function PaybackLink() {
  return (
    <section className="py-16 md:py-[88px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Lien avec la loi du payback
            </p>
            <h2
              className="font-display font-bold text-ink mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.98 }}
            >
              Le levier du payback que personne n&apos;optimise.
            </h2>

            <p className="text-[16px] leading-relaxed text-ink-2 mb-4">
              La plupart des cabinets travaillent sur le <strong className="text-ink">CAC</strong> — trouver des clients moins cher. Ou sur le <strong className="text-ink">LTGP30</strong> — avoir des dossiers plus rentables.
            </p>
            <p className="text-[16px] leading-relaxed text-ink-2 mb-4">
              Personne ne touche au <strong className="text-ink">Coût service 30J</strong>.
            </p>
            <p className="text-[16px] leading-relaxed text-ink-2 mb-6">
              Or un nouveau dossier mal intégré ne génère rien pendant 4 à 6 semaines. Des heures de collecte, de relance, de correction non facturables. Le coût service 30J explose silencieusement à chaque nouveau client. L&apos;onboarding ne réduit pas ce coût à la marge — il le divise.
            </p>

            <Link
              href="/blog/loi-du-payback-cabinet-comptable"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:text-accent-deep transition-colors group"
            >
              Lire l&apos;article complet sur la loi du payback
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </div>

          {/* Right: formula */}
          <div className="rounded-2xl border border-line bg-paper p-6">
            <p
              className="font-mono uppercase mb-4"
              style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--color-accent)' }}
            >
              Payback Period Client
            </p>
            <div className="flex flex-col items-center mb-5">
              <p
                className="text-center font-semibold text-ink w-full font-mono"
                style={{ fontSize: 15, padding: '10px 0', letterSpacing: '0.02em' }}
              >
                LTGP30
              </p>
              <div className="w-full" style={{ height: 2, background: 'var(--color-ink)' }} />
              <p
                className="text-center w-full font-mono"
                style={{ fontSize: 13, padding: '10px 0', color: 'var(--color-muted)', letterSpacing: '0.02em' }}
              >
                CAC + Coût service 30J
              </p>
            </div>
            <div className="border-t border-line pt-4 flex flex-col gap-2">
              {[
                { abbr: 'LTGP30', def: 'Gross Profit généré par le client sur les 30 premiers jours' },
                { abbr: 'CAC', def: "Coût total d'acquisition : marketing + commercial" },
                { abbr: 'Service 30J', def: 'Coût de prestation sur les 30 premiers jours — c’est le levier que l’onboarding réduit' },
              ].map((v) => (
                <div key={v.abbr} className="flex gap-3 items-start">
                  <span
                    className="font-mono flex-shrink-0"
                    style={{ fontSize: 11, color: 'var(--color-accent)', width: 80 }}
                  >
                    {v.abbr}
                  </span>
                  <span className="text-[13px] leading-snug" style={{ color: 'var(--color-muted)' }}>
                    {v.def}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
