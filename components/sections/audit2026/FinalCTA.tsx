import { AUDIT_CTA_HREF, AUDIT_CTA_LABEL } from './Hero'
import { CountdownDays, CountdownDigits, CountdownBar } from './Countdown'

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-[120px] bg-ink text-white relative overflow-hidden">
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
          <CountdownDays /> · la fenêtre se referme le 1er septembre 2026
        </p>
        <h2
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(36px, 5.5vw, 84px)', letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 40px' }}
        >
          Chaque dossier migré<br />
          sans repricing{' '}
          <span className="text-accent">est du CA perdu pour 3 ans</span>.
        </h2>

        <div className="mb-10">
          <CountdownDigits dark />
          <div className="mt-6">
            <CountdownBar dark />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <a
            href={AUDIT_CTA_HREF}
            className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            {AUDIT_CTA_LABEL}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>
        <p className="font-mono text-[11px] text-muted-2 tracking-[0.08em] mt-4">
          45 min · Gratuit · Payé au résultat sur l&apos;Étage 1
        </p>
      </div>
    </section>
  )
}
