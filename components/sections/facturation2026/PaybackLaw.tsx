import Link from 'next/link'
import { FE_PAYBACK_ARTICLE } from './constants'

const formulas = [
  {
    tag: 'Payback Period Client',
    num: 'LTGP30',
    den: 'CAC + Coût service 30J',
    vars: [
      { abbr: 'LTGP30', def: 'Gross Profit généré par le client sur les 30 premiers jours' },
      { abbr: 'CAC', def: "Coût total d'acquisition : marketing + commercial" },
      { abbr: 'Service 30J', def: 'Coût de prestation sur les 30 premiers jours' },
    ],
  },
  {
    tag: 'Payback Period Équipe',
    num: 'GP90',
    den: 'CPR + C90',
    vars: [
      { abbr: 'GP90', def: 'Gross Profit généré par la recrue à 90 jours' },
      { abbr: 'CPR', def: 'Coût complet de recrutement' },
      { abbr: 'C90', def: "Coût d'onboarding et de formation sur 90 jours" },
    ],
  },
]

const levels = [
  {
    n: '01',
    title: "L'économie du client",
    questions: [
      "Mon acquisition est-elle autofinancée ?",
      "Mon modèle génère-t-il du cash pour financer la suite ?",
    ],
  },
  {
    n: '02',
    title: "L'économie de l'équipe",
    questions: [
      "Une recrue rembourse-t-elle son coût avant de me fragiliser ?",
      "Puis-je recruter agressivement sans risque ?",
    ],
  },
  {
    n: '03',
    title: "L'économie de la structure",
    questions: [
      "Mon cabinet peut-il croître sans moi ?",
      "Ai-je les process pour absorber la croissance ?",
    ],
  },
]

export default function PaybackLaw() {
  return (
    <section className="py-16 md:py-[88px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Two-column: left=thesis+croyance | right=formulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">

          {/* Left */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Loi du payback · cadre de décision
            </p>
            <h2
              className="font-display font-bold text-ink mb-6"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.96 }}
            >
              La loi universelle de la croissance d&apos;un cabinet.
            </h2>

            <p
              className="font-serif italic mb-6"
              style={{ fontSize: 22, lineHeight: 1.4, color: 'var(--color-ink)' }}
            >
              Tout cabinet croît jusqu&apos;au niveau où son économie unitaire ne lui permet plus de financer l&apos;étape suivante.
            </p>

            {/* Croyance block */}
            <div
              className="rounded-xl mb-8"
              style={{
                borderLeft: '3px solid var(--color-accent)',
                padding: '18px 20px',
                background: 'var(--color-accent-soft)',
              }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent mb-3">
                La croyance à détruire
              </p>
              <p className="font-semibold text-ink mb-2 text-[15px]">
                &ldquo;Mon cabinet croît naturellement — j&apos;ai du bouche-à-oreille.&rdquo;
              </p>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-accent-deep)' }}>
                Le bouche-à-oreille n&apos;est pas une stratégie. C&apos;est une rente. Et comme toute rente, elle se dégrade silencieusement jusqu&apos;au jour où elle s&apos;arrête.
              </p>
            </div>

            <Link
              href={FE_PAYBACK_ARTICLE}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:text-accent-deep transition-colors group"
            >
              Lire l&apos;article complet sur la loi du payback
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </div>

          {/* Right: formulas */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-5">
              Une seule loi, deux applications
            </p>
            <div className="flex flex-col gap-4">
              {formulas.map((f) => (
                <div key={f.tag} className="rounded-2xl border border-line bg-paper p-6">
                  <p
                    className="font-mono uppercase mb-4"
                    style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--color-accent)' }}
                  >
                    {f.tag}
                  </p>

                  {/* Fraction */}
                  <div className="flex flex-col items-center mb-5">
                    <p
                      className="text-center font-semibold text-ink w-full font-mono"
                      style={{ fontSize: 15, padding: '10px 0', letterSpacing: '0.02em' }}
                    >
                      {f.num}
                    </p>
                    <div className="w-full" style={{ height: 2, background: 'var(--color-ink)' }} />
                    <p
                      className="text-center w-full font-mono"
                      style={{ fontSize: 13, padding: '10px 0', color: 'var(--color-muted)', letterSpacing: '0.02em' }}
                    >
                      {f.den}
                    </p>
                  </div>

                  {/* Variable legend */}
                  <div className="border-t border-line pt-4 flex flex-col gap-2">
                    {f.vars.map((v) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Three levels of maturity */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-6">
            Trois niveaux de maturité
          </p>
          <div
            className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '1px', background: 'var(--color-line)', border: '1px solid var(--color-line)' }}
          >
            {levels.map((l) => (
              <div key={l.n} className="bg-white" style={{ padding: '32px 28px' }}>
                <p
                  className="font-mono uppercase mb-2"
                  style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--color-accent)' }}
                >
                  Niveau {l.n}
                </p>
                <h3
                  className="font-display font-semibold text-ink mb-4"
                  style={{ fontSize: 18, letterSpacing: '-0.02em' }}
                >
                  {l.title}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {l.questions.map((q, i) => (
                    <p
                      key={i}
                      className="flex gap-2 items-start text-[14px] leading-snug"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <span className="text-accent flex-shrink-0 mt-0.5">→</span>
                      {q}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[12px] text-muted mt-4 leading-relaxed">
            Un cabinet qui maîtrise ces trois niveaux peut croître aussi vite que son marché le lui permet.
            Un cabinet qui ne les mesure pas croît par accident — et plafonne par accident.
          </p>
        </div>

      </div>
    </section>
  )
}
