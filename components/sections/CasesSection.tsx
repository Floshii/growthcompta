const miniStats = [
  { l: 'SQL ratio · Q3 2025', v: '38%', name: 'Compta+Nantes · +14pts vs baseline' },
  { l: 'RDV / mois · Expertis Lyon', v: '42', name: 'vs 7 au démarrage · M+8' },
  { l: "Coût d'acquisition client", v: '−68%', name: 'moyenne portefeuille · 12 mois' },
  { l: 'LTV · Numa Fiduciaire', v: '×2,4', name: 'repositionnement vertical BTP' },
]

export default function CasesSection() {
  return (
    <section className="py-[100px] bg-paper" id="cases">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-12 mb-14 flex-wrap">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              Études de cas · résultats vérifiables
            </p>
            <h2
              className="font-display font-bold text-ink m-0"
              style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              Ce que ça donne,{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
                en chiffres.
              </span>
            </h2>
          </div>
          <p className="text-[15px] text-ink-2 max-w-[360px] leading-relaxed">
            Études de cas anonymisées sur demande. Tous les chiffres sont audités et signés par les dirigeants des cabinets.
          </p>
        </div>

        {/* Main cards */}
        <div className="grid gap-6" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
          {/* Primary card */}
          <div
            className="bg-ink text-white rounded-[18px] p-9 flex flex-col justify-between min-h-[460px] cursor-pointer hover:-translate-y-1 transition-transform duration-200 group"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">Cabinet Mercier · Lyon · 18 collab.</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">2024–2025 · 8 mois</span>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2 mb-4">Trafic organique</div>
              <div
                className="font-display font-bold text-accent leading-[0.92]"
                style={{ fontSize: 'clamp(80px, 9vw, 144px)', letterSpacing: '-0.045em' }}
              >
                ×312<span style={{ fontSize: '0.35em', color: 'white', marginLeft: 8 }}>%</span>
              </div>
              <p className="text-[17px] text-[#d6d4cf] mt-5 leading-relaxed max-w-[480px]">
                387 pages programmatiques générées sur &quot;expert-comptable + ville + secteur&quot;. 4 200 visiteurs SEO / mois. 42 rdv qualifiés / mois après 6 mois.
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="font-display font-semibold text-[22px] tracking-display">Cabinet Mercier</div>
                <div className="text-sm text-white/70 mt-1">SEO programmatique · 387 pages indexées</div>
              </div>
              <div className="w-11 h-11 rounded-full border border-white/40 grid place-items-center flex-shrink-0 group-hover:opacity-100 group-hover:rotate-[-45deg] group-hover:bg-accent group-hover:border-accent transition-all duration-200 opacity-40">
                ↗
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {[
              { tag1: 'Fiducia & Co · Paris', tag2: '2025', stat: '+180k€', name: 'CA additionnel · 6 mois', sub: 'Paid ads + content sales' },
              { tag1: 'Audit-Lab · Bordeaux', tag2: '2024–2025', stat: '38€', name: 'CPL moyen · Meta ads', sub: 'Persona dirigeant e-comm' },
            ].map((c) => (
              <div
                key={c.tag1}
                className="bg-paper border border-line rounded-[18px] p-9 flex flex-col justify-between min-h-[220px] cursor-pointer hover:-translate-y-1 transition-transform duration-200 group"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{c.tag1}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{c.tag2}</span>
                </div>
                <div
                  className="font-display font-bold text-ink mt-4 leading-[0.92]"
                  style={{ fontSize: 'clamp(64px, 6vw, 96px)', letterSpacing: '-0.045em' }}
                >
                  {c.stat}
                </div>
                <div className="flex items-end justify-between gap-4 mt-4">
                  <div>
                    <div className="font-display font-semibold text-[16px] tracking-display">{c.name}</div>
                    <div className="text-sm text-muted mt-1">{c.sub}</div>
                  </div>
                  <div className="w-11 h-11 rounded-full border border-ink/40 grid place-items-center flex-shrink-0 group-hover:opacity-100 group-hover:rotate-[-45deg] transition-all duration-200 opacity-40">
                    ↗
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {miniStats.map((m) => (
            <div
              key={m.l}
              className="bg-white border border-line rounded-2xl p-7 flex flex-col gap-3.5 min-h-[220px] cursor-pointer hover:-translate-y-0.5 hover:border-ink transition-all duration-200"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{m.l}</div>
              <div
                className="font-display font-bold text-ink leading-[0.9]"
                style={{ fontSize: 56, letterSpacing: '-0.04em' }}
              >
                {m.v}
              </div>
              <div className="text-sm text-ink-2 mt-auto">{m.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
