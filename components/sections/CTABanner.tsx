import Link from 'next/link'

export default function CTABanner() {
  return (
    <section
      className="py-[120px] bg-ink text-white relative overflow-hidden"
      id="contact"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 'auto -10% -50% -10%',
          height: '60%',
          background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.12), transparent 60%)',
        }}
      />
      <div className="max-w-[1280px] mx-auto px-8 text-center relative">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-2 mb-8 flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          2 slots disponibles · Q1 2026
        </p>
        <h2
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(56px, 7vw, 120px)', letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 32px' }}
        >
          On installe<br />
          votre <span className="text-accent">moteur</span>.<br />
          Vous comptez.
        </h2>
        <p className="text-[18px] text-[#d6d4cf] max-w-[540px] mx-auto mb-9 leading-relaxed">
          14 jours pour l&apos;audit. 4 mois pour installer. 6 mois pour opérer. Engagement clair, résultats vérifiables.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            Réserver un audit gratuit
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2.5 bg-transparent text-white font-medium text-[15px] px-[22px] py-[14px] rounded-full border border-white/20 hover:bg-white/8 hover:border-white/40 transition-all duration-200"
          >
            Télécharger le pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
