import Link from 'next/link'

const figures = [
  {
    value: '+72 000€',
    unit: '/an',
    label: 'de CA annuel',
    desc: "Repricing moyen de +12% appliqué à 60% de la base à l'occasion des avenants de migration. Sans un seul client en plus.",
  },
  {
    value: '+400h',
    unit: '/an',
    label: 'de capacité libérée',
    desc: "Par l'automatisation des flux — soit ~48 000€ de missions conseil facturables, ou la respiration que votre équipe attend.",
  },
]

const guarantees = [
  {
    t: 'Vous ne payez que sur preuve',
    d: 'Avenants signés, CA constaté — Étage 1. Si la base ne bouge pas, vous ne devez rien.',
  },
  {
    t: 'Vous gardez la méthode',
    d: 'Grilles, scripts et calculateur restent chez vous, audit gratuit ou pas.',
  },
  {
    t: 'Exclusivité par zone',
    d: 'Un seul cabinet accompagné par zone géographique. Vos confrères attendront.',
  },
]

export default function MathsSection() {
  return (
    <section className="py-16 md:py-[100px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-[640px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Les maths
          </p>
          <h2
            className="font-display font-bold text-ink m-0"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
          >
            Cabinet de 1 M€ d&apos;honoraires.{' '}
            <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
              Cas médian.
            </span>
          </h2>
          <Link
            href="/outils/simulateur-facture-electronique"
            className="inline-flex items-center gap-2 mt-5 text-[14px] font-medium text-accent hover:text-accent-deep transition-colors group"
          >
            Calculer le chiffre de TON cabinet avec le simulateur
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Figures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {figures.map((f) => (
            <div key={f.label} className="rounded-2xl border border-line bg-paper p-7 md:p-10">
              <div
                className="font-display font-bold text-ink flex items-baseline gap-1.5 leading-[0.95]"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.03em' }}
              >
                {f.value}
                <span className="text-accent" style={{ fontSize: '0.4em' }}>{f.unit}</span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mt-3 mb-3">{f.label}</p>
              <p className="text-[15px] leading-relaxed text-ink-2 m-0 max-w-[420px]">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guarantees.map((g) => (
            <div key={g.t} className="rounded-2xl border border-line p-6 md:p-7 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{ background: 'var(--color-accent)', color: '#fff' }}
                >
                  ✓
                </span>
                <h3 className="font-display font-semibold text-ink text-[16px] m-0">{g.t}</h3>
              </div>
              <p className="text-[14px] leading-relaxed text-ink-2 m-0">{g.d}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
