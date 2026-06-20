import { FE_CTA_LABEL } from './constants'

const points = [
  { v: '45 min', l: 'de diagnostic' },
  { v: '+20–30 %', l: 'de capacité visée' },
  { v: '1 plan', l: "d'action chiffré" },
]

export default function CTAFinal() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  return (
    <section
      className="py-20 md:py-[112px] bg-ink text-white relative overflow-hidden"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 'auto -10% -50% -10%',
          height: '60%',
          background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.12), transparent 60%)',
        }}
      />
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-6 flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          45 minutes · sans engagement
        </p>

        <h2
          className="font-display font-bold text-white m-0 mb-10"
          style={{ fontSize: 'clamp(48px, 6.4vw, 104px)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
        >
          On chiffre votre
          <br />
          <span className="text-accent">gisement</span> de capacité.
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
          {points.map((p) => (
            <div key={p.v}>
              <p className="font-display font-bold text-white" style={{ fontSize: 30, letterSpacing: '-0.025em' }}>
                {p.v}
              </p>
              <p className="font-mono uppercase tracking-[0.1em] text-muted-2 mt-1" style={{ fontSize: 11 }}>{p.l}</p>
            </div>
          ))}
        </div>

        <p className="text-[17px] text-[#d6d4cf] max-w-[520px] mx-auto mb-8 leading-relaxed">
          En 45 minutes, on chiffre le temps récupérable de votre cabinet et on pose un plan d&apos;action. Exécutable seul ou accompagné.
        </p>

        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
        >
          {FE_CTA_LABEL}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
        <p className="font-mono text-[11px] text-muted-2 tracking-[0.08em] mt-4">
          Sans engagement · réponse sous 24 h
        </p>
      </div>
    </section>
  )
}
