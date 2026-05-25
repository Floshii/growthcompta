import Link from 'next/link'
import { CTA_HREF, CTA_LABEL } from './HeroSection'

export default function CTABanner() {
  return (
    <section
      className="py-20 md:py-[120px] bg-ink text-white relative overflow-hidden"
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
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-8 flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          2 slots disponibles · Q1 2026
        </p>
        <h2
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(44px, 6.5vw, 110px)', letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 32px' }}
        >
          On installe le moteur<br />
          de croissance.<br />
          <span className="text-accent">Vous le pilotez.</span>
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#d6d4cf] max-w-[500px] mx-auto mb-9 leading-relaxed">
          De nouveaux clients sous 30J garantis. 90 jours pour installer la machine complète. Engagement clair, résultats vérifiables.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            {CTA_LABEL}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>
        <p className="font-mono text-[11px] text-muted-2 tracking-[0.08em] mt-4">
          Gratuit · Sans engagement · Livré en 14 jours
        </p>
      </div>
    </section>
  )
}
