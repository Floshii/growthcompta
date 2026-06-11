const forYou = [
  "Vous avez de l'ambition pour votre croissance",
  "Vous n'avez pas peur de vous nicher",
  "Vous êtes ouvert à moderniser vos outils et process",
]

const notForYou = [
  "Votre cabinet est à sa taille idéale — vous cherchez à stabiliser, pas à grandir",
  "Vous préférez un positionnement généraliste tous secteurs",
  "Vous n'êtes pas à l'aise avec le digital et le marketing",
]

export default function FitSection() {
  return (
    <section className="py-16 md:py-[100px] bg-ink text-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-[640px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-4 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Est-ce fait pour vous ?
          </p>
          <h2
            className="font-display font-bold text-white m-0"
            style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
          >
            La taille compte{' '}
            <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
              moins
            </span>{' '}
            que l&apos;ambition.
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Fait pour vous */}
          <div className="rounded-2xl border border-white/10 p-7 md:p-10 flex flex-col gap-6 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                GrowthCompta est fait pour vous si
              </span>
            </div>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    className="mt-[3px] shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}
                  >
                    ✓
                  </span>
                  <span className="text-[16px] leading-[1.5] text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pas fait pour vous */}
          <div className="rounded-2xl border border-white/5 p-7 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">
                Ce n&apos;est probablement pas pour vous si
              </span>
            </div>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-[6px] shrink-0 w-4 h-px bg-white/20" />
                  <span className="text-[16px] leading-[1.5] text-white/35 line-through decoration-white/15">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
