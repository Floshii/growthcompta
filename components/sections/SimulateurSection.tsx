'use client'

import { useEffect, useRef, useState } from 'react'
import type { Chart as ChartType } from 'chart.js'

/* ─── Types ─── */
interface SimResults {
  duree: string
  ltgp: string
  cac: string
  net: string
  ratioVal: string
  ratioPct: number
  fomoVal: string
  legObj: number
  legNow: number
  labels: string[]
  dataN: number[]
  dataO: number[]
}

/* ─── Format ─── */
function fmt(v: number): string {
  if (v >= 1e6) return (v / 1e6).toFixed(2).replace('.', ',') + ' M€'
  if (v >= 1e3) return (v / 1000).toFixed(0) + ' k€'
  return Math.round(v) + ' €'
}

/* ─── Compute ─── */
function compute(hon: number, mg: number, churn: number, cac: number, acqN: number, acqO: number): SimResults {
  const duree = 1 / churn
  const ltgp  = hon * mg * duree
  const net   = ltgp - cac
  const ratio = cac > 0 ? ltgp / cac : 0
  const fomoMonthly = (acqO - acqN) * net
  const margeMens = hon * mg / 12
  const labels: string[] = [], dataN: number[] = [], dataO: number[] = []

  for (let m = 1; m <= 36; m++) {
    let cumN = 0, cumO = 0
    for (let i = 1; i <= m; i++) {
      const mr = m - i + 1
      cumN += acqN * margeMens * mr
      cumO += acqO * margeMens * mr
    }
    labels.push(m === 1 || m % 6 === 0 || m === 36 ? 'M' + m : '')
    dataN.push(Math.round(cumN))
    dataO.push(Math.round(cumO))
  }

  return {
    duree: duree.toFixed(1) + ' ans',
    ltgp: fmt(ltgp), cac: fmt(cac), net: fmt(net),
    ratioVal: ratio.toFixed(1) + ' € récupérés',
    ratioPct: Math.min(ratio / 10 * 100, 100),
    fomoVal: fmt(fomoMonthly),
    legObj: acqO, legNow: acqN,
    labels, dataN, dataO,
  }
}

/* ════════════════════════════════════════ */
export default function SimulateurSection() {
  const [hon,      setHon]      = useState(2500)
  const [mg,       setMg]       = useState(60)
  const [churn,    setChurn]    = useState(8)
  const [acqNow,   setAcqNow]   = useState(2)
  const [scenario, setScenario] = useState<'fire' | 'engine'>('fire')
  const [results,  setResults]  = useState<SimResults | null>(null)

  const acqObj = scenario === 'fire' ? 10 : 20
  const cac    = scenario === 'fire' ? 240 : 200

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef  = useRef<ChartType | null>(null)

  /* Init + update chart whenever results change (canvas only exists after results render) */
  useEffect(() => {
    if (!results || !canvasRef.current) return

    async function draw() {
      const { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } =
        await import('chart.js')
      Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

      if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null }
      if (!canvasRef.current) return

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: results!.labels,
          datasets: [
            {
              label: 'Avec GrowthCompta', data: results!.dataO,
              borderColor: '#e85d2b', backgroundColor: 'rgba(232,93,43,.10)',
              fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5,
            },
            {
              label: 'Rythme actuel', data: results!.dataN,
              borderColor: '#a8a8a0', backgroundColor: 'rgba(168,168,160,.08)',
              fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 4,
              borderWidth: 1.5, borderDash: [4, 3],
            },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', borderWidth: 1,
              titleColor: '#a8a8a0', bodyColor: '#ffffff', padding: 12,
              titleFont: { family: "'Geist Mono', monospace", size: 11 },
              bodyFont: { family: "'Geist', sans-serif", size: 13, weight: 600 },
              callbacks: { label: (c) => ' ' + c.dataset.label + ' : ' + fmt(c.parsed.y ?? 0) },
            },
          },
          scales: {
            x: { grid: { color: '#e6e1d3' }, border: { color: '#e6e1d3' }, ticks: { color: '#6b6b66', font: { family: "'Geist Mono', monospace", size: 11 } } },
            y: { grid: { color: '#e6e1d3' }, border: { color: '#e6e1d3' }, ticks: { color: '#6b6b66', font: { family: "'Geist Mono', monospace", size: 11 }, callback: (v: number | string) => fmt(Number(v)) } },
          },
        },
      })
    }

    draw()
    return () => { chartRef.current?.destroy(); chartRef.current = null }
  }, [results])

  function simulate() {
    setResults(compute(hon, mg / 100, churn / 100, cac, acqNow, acqObj))
    setTimeout(() => document.getElementById('sim-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <section className="py-16 md:py-[100px] bg-[var(--color-paper)]" id="simulateur">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        {/* Head */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-10 md:mb-12 flex-wrap">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              Simulateur · ROI acquisition client
            </p>
            <h2 className="font-display font-bold text-[var(--color-ink)] m-0"
              style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-0.035em', lineHeight: 0.95, marginTop: 12 }}>
              Combien vous rapporte{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>vraiment</span>
              <br />chaque nouveau client&nbsp;?
            </h2>
          </div>
          <p className="text-[15px] text-[var(--color-ink-2)] max-w-[360px] leading-[1.55]">
            Vos chiffres — marge, churn, CAC — traduits en décision d&apos;acquisition. Calcul instantané, sans inscription.
          </p>
        </div>

        <div className="max-w-[960px]">

          {/* Inputs */}
          <div className="bg-white border border-[var(--color-line)] rounded-[18px] p-6 md:p-9 mb-4">
            <p className="font-mono text-[11px] font-medium text-[var(--color-muted)] uppercase tracking-[0.12em] mb-6">Vos paramètres</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Field label="Honoraires annuels moyens / client" hint="Ex : 2 500 € / an, hors missions ponctuelles" unit="€">
                <input type="number" value={hon} min={500} max={50000} step={100} onChange={e => setHon(Number(e.target.value))} className="sim-input" />
              </Field>

              <Field label="Marge brute" hint="Après charges directes, avant frais fixes" unit="%">
                <input type="number" value={mg} min={10} max={95} step={1} onChange={e => setMg(Number(e.target.value))} className="sim-input" />
              </Field>

              <Field label="Churn annuel estimé" hint="% de clients perdus / an (hors départs retraite)" unit="%">
                <input type="number" value={churn} min={1} max={40} step={1} onChange={e => setChurn(Number(e.target.value))} className="sim-input" />
              </Field>

              <Field label="Nouveaux clients / mois (actuellement)" hint="Moyenne 12 derniers mois, hors reprises de dossiers" unit="/mois">
                <input type="number" value={acqNow} min={0} max={50} step={1} onChange={e => setAcqNow(Number(e.target.value))} className="sim-input" />
              </Field>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[var(--color-ink)] mb-1">Scénario GrowthCompta visé</label>
                <p className="text-[12px] text-[var(--color-muted)] mb-3 leading-[1.4]">Définit votre objectif d&apos;acquisition et le CAC associé</p>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <ScenarioTab active={scenario === 'fire'}   name="🔥 FIRE"          detail="10 clients / mois · CAC 240 €" onClick={() => setScenario('fire')} />
                  <ScenarioTab active={scenario === 'engine'} name="🚀 ENGINE / FUEL" detail="20 clients / mois · CAC 200 €" onClick={() => setScenario('engine')} />
                </div>
              </div>

            </div>
            <button onClick={simulate}
              className="mt-6 w-full flex items-center justify-center gap-2.5 py-[17px] rounded-full bg-[var(--color-accent)] text-white text-[15px] font-medium cursor-pointer hover:bg-[var(--color-accent-deep)] transition-colors">
              Calculer mon potentiel <span>↗</span>
            </button>
          </div>

          {/* Results */}
          {results && (
            <div id="sim-results" className="animate-[fadeIn_.6s_ease_both]">

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-4">
                <KPI label="Durée de vie client"   value={results.duree} sub="années (1 ÷ churn)" />
                <KPI label="LTGP / client"         value={results.ltgp}  sub="marge brute sur durée de vie" accent />
                <KPI label="CAC (GrowthCompta)"    value={results.cac}   sub="coût d'acquisition" />
                <KPI label="Résultat net / client" value={results.net}   sub="LTGP − CAC" hero />
              </div>

              {/* Ratio */}
              <div className="bg-white border border-[var(--color-line)] rounded-[14px] p-7 mb-4">
                <div className="flex justify-between items-center gap-6 mb-4 flex-wrap">
                  <p className="text-sm font-medium text-[var(--color-ink-2)] max-w-[520px] leading-[1.4]">
                    Pour 1 € investi en acquisition (CAC), vous récupérez en marge
                  </p>
                  <span className="font-display font-bold text-[var(--color-accent-deep)] whitespace-nowrap" style={{ fontSize: '26px', letterSpacing: '-0.025em' }}>
                    {results.ratioVal}
                  </span>
                </div>
                <div className="h-2.5 bg-[var(--color-paper-2)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-accent)] rounded-full transition-[width] duration-700 ease-out" style={{ width: results.ratioPct + '%' }} />
                </div>
                <div className="flex justify-between font-mono text-[10.5px] text-[var(--color-muted)] uppercase tracking-[0.08em] mt-2.5">
                  <span>Seuil rentabilité (1:1)</span>
                  <span>Excellent (ratio 10:1 et +)</span>
                </div>
              </div>

              {/* FOMO */}
              <div className="bg-[var(--color-ink)] rounded-[16px] px-8 py-7 mb-4 text-[17px] leading-[1.55] text-white">
                À vos paramètres actuels, chaque mois sans machine d&apos;acquisition vous coûte environ{' '}
                <strong className="text-[var(--color-accent)] font-bold">{results.fomoVal}</strong>{' '}
                de marge future non captée.
                <p className="font-mono text-[11.5px] text-[#a8a8a0] mt-3 tracking-[0.02em] leading-[1.5]">
                  Calculé sur la durée de vie complète des clients non acquis ce mois-ci.
                </p>
              </div>

              {/* Chart */}
              <div className="bg-white border border-[var(--color-line)] rounded-[18px] p-6 md:p-9 mb-4">
                <p className="font-mono text-[11px] font-medium text-[var(--color-muted)] uppercase tracking-[0.12em] mb-4">Marge brute cumulée sur 36 mois</p>
                <div className="relative h-[280px] mt-1">
                  <canvas ref={canvasRef} />
                </div>
                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2 font-mono text-[11.5px] text-[var(--color-muted)] tracking-[0.02em]">
                    <span className="w-2 h-2 rounded-full bg-[#e85d2b]" /> Avec GrowthCompta ({results.legObj}/mois)
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11.5px] text-[var(--color-muted)] tracking-[0.02em]">
                    <span className="w-2 h-2 rounded-full bg-[#a8a8a0]" /> Rythme actuel ({results.legNow}/mois)
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[var(--color-ink)] text-white rounded-[18px] px-8 md:px-10 py-12 text-center relative overflow-hidden" style={{ marginTop: 16 }}>
                <div className="absolute pointer-events-none" style={{ inset: 'auto -10% -60% -10%', height: '80%', background: 'radial-gradient(ellipse at center top, rgba(232,93,43,0.18), transparent 60%)' }} />
                <h2 className="font-display font-bold relative" style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 14 }}>
                  Valider ces chiffres pour <span className="text-[var(--color-accent)]">votre cabinet</span>
                </h2>
                <p className="text-[#d6d4cf] text-[15px] max-w-[520px] mx-auto mb-7 leading-[1.6] relative">
                  On refait le calcul avec un peu plus de données, on corrige les hypothèses, et on vous montre comment GrowthCompta peut vous aider à capter concrètement ce potentiel.
                </p>
                <a href="/cabinet-growth-score"
                  className="inline-flex items-center gap-2.5 relative px-8 py-4 rounded-full bg-[var(--color-accent)] text-white text-[15px] font-medium hover:bg-[var(--color-accent-deep)] transition-colors mb-4">
                  Obtenir mon audit chiffré <span>↗</span>
                </a>
                <p className="font-mono text-[11.5px] text-[#a8a8a0] tracking-[0.04em] relative">
                  Analyse gratuite · Résultats chiffrés remis par écrit
                </p>
              </div>

            </div>
          )}
        </div>
      </div>

      <style>{`
        .sim-input {
          width: 100%; background: var(--color-paper);
          border: 1px solid var(--color-line); border-radius: 11px;
          color: var(--color-ink); font-family: var(--font-display);
          font-size: 19px; font-weight: 700; letter-spacing: -0.02em;
          padding: 13px 50px 13px 16px; outline: none;
          transition: border-color .15s, background .15s;
          -moz-appearance: textfield;
        }
        .sim-input:focus { border-color: var(--color-accent); background: white; }
        .sim-input::-webkit-inner-spin-button { opacity: .25; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  )
}

/* ─── Sub-components ─── */

function Field({ label, hint, unit, children }: { label: string; hint: string; unit: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--color-ink)] mb-1">{label}</label>
      <p className="text-[12px] text-[var(--color-muted)] mb-2.5 leading-[1.4]">{hint}</p>
      <div className="relative">
        {children}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[13px] font-medium text-[var(--color-muted)] pointer-events-none">{unit}</span>
      </div>
    </div>
  )
}

function ScenarioTab({ active, name, detail, onClick }: { active: boolean; name: string; detail: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex-1 flex flex-col items-start gap-1.5 px-5 py-4 rounded-[14px] text-left cursor-pointer transition-all border ${
        active ? 'border-[var(--color-accent)] bg-[rgba(232,93,43,.08)] shadow-[inset_0_0_0_1px_var(--color-accent)]'
               : 'border-[var(--color-line)] bg-[var(--color-paper)] hover:border-[var(--color-accent)]'
      }`}>
      <span className={`font-display text-[16px] font-bold tracking-[-0.02em] ${active ? 'text-[var(--color-accent-deep)]' : 'text-[var(--color-ink)]'}`}>{name}</span>
      <span className="font-mono text-[11.5px] text-[var(--color-muted)] tracking-[0.02em]">{detail}</span>
    </button>
  )
}

function KPI({ label, value, sub, accent, hero }: { label: string; value: string; sub: string; accent?: boolean; hero?: boolean }) {
  return (
    <div className={`rounded-[14px] p-5 border ${hero ? 'bg-[var(--color-ink)] border-[var(--color-ink)]' : accent ? 'bg-[rgba(232,93,43,.08)] border-[var(--color-accent)]' : 'bg-white border-[var(--color-line)]'}`}>
      <p className={`font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] mb-3.5 ${hero ? 'text-[#a8a8a0]' : 'text-[var(--color-muted)]'}`}>{label}</p>
      <p className={`font-display font-bold leading-none tracking-[-0.03em] ${hero ? 'text-[var(--color-accent)]' : accent ? 'text-[var(--color-accent-deep)]' : 'text-[var(--color-ink)]'}`} style={{ fontSize: '30px' }}>{value}</p>
      <p className={`font-mono text-[10.5px] mt-2.5 tracking-[0.02em] ${hero ? 'text-[#a8a8a0]' : 'text-[var(--color-muted)]'}`}>{sub}</p>
    </div>
  )
}
