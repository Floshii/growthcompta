import { OB_CTA_LABEL, OB_CALENDLY_URL } from './constants'

const points = [
  { v: '30 min', l: 'de démo live' },
  { v: '10 jours', l: "dossier prêt à produire" },
  { v: '3 h', l: 'économisées par client' },
]

export default function CTAFinal() {
  const calendlyUrl = OB_CALENDLY_URL

  return (
    <section className="py-20 md:py-[112px] bg-ink text-white relative overflow-hidden">
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
          30 minutes · sans engagement
        </p>

        <h2
          className="font-display font-bold text-white m-0 mb-10"
          style={{ fontSize: 'clamp(40px, 5.6vw, 88px)', letterSpacing: '-0.04em', lineHeight: 0.98 }}
        >
          Voyez en direct comment un client passe de
          <br />
          &laquo; signature &raquo; à <span className="text-accent">&laquo; prêt à produire &raquo;</span>.
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
          30 min de démo live sur un cas réel, sans qu&apos;on touche un Excel. Pas de pitch, pas d&apos;engagement — vous repartez avec un chiffre concret.
        </p>

        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[15px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
        >
          {OB_CTA_LABEL}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
        <p className="font-mono text-[11px] text-muted-2 tracking-[0.08em] mt-4">
          Sans engagement · réponse sous 24 h
        </p>
      </div>
    </section>
  )
}
