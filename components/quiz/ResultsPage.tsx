'use client'

import Link from 'next/link'
import type { DiagnosticResult, LeadData, Quadrant } from '@/types/quiz'
import { CATEGORY_LABELS, CATEGORY_MAX } from '@/data/quiz/questions'
import { getQuadrantConfig } from '@/data/quiz/quadrants'
import ScoreGauge from './ScoreGauge'
import RadarChart from './RadarChart'

interface Props {
  result: DiagnosticResult
  lead: LeadData
  onReset: () => void
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/growthcompta/audit'

const TONE_COLOR: Record<string, string> = {
  red: '#dc4a2b', orange: '#e85d2b', green: '#0a8f4a', blue: '#0a5fbf',
}

// ── Quadrant 2×2 matrix visual ────────────────────────────────────────────────
function QuadrantMatrix({ demandScore, supplyScore }: { demandScore: number; supplyScore: number }) {
  const isHighDemand = demandScore >= 50
  const isHighSupply = supplyScore >= 50

  const cells: { quadrant: Quadrant; label: string; row: 'top' | 'bottom'; col: 'left' | 'right' }[] = [
    { quadrant: 'demand-constrained', label: 'Capacité\nsous-exploitée', row: 'top',    col: 'left'  },
    { quadrant: 'scale-ready',        label: 'Scale\nReady',            row: 'top',    col: 'right' },
    { quadrant: 'restructure',        label: "Restructurer\nd'abord",   row: 'bottom', col: 'left'  },
    { quadrant: 'supply-constrained', label: 'Moteur en\nsurchauffe',   row: 'bottom', col: 'right' },
  ]

  const activeQ = getQuadrantConfig(demandScore, supplyScore)

  return (
    <div className="relative w-[200px] shrink-0">
      {/* Axis labels */}
      <div className="absolute -top-5 left-0 right-0 flex justify-center">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted">Supply ↑</span>
      </div>
      <div className="absolute -bottom-5 right-0 flex justify-end w-full">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted">Demand →</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {cells.map(cell => {
          const isActive = cell.quadrant === activeQ.id
          const cellColor = isActive ? activeQ.color : undefined
          return (
            <div
              key={cell.quadrant}
              className="rounded-lg p-2.5 flex items-center justify-center text-center transition-all"
              style={{
                background: isActive ? `${cellColor}18` : 'var(--color-paper)',
                border: isActive ? `1.5px solid ${cellColor}` : '1.5px solid var(--color-line)',
                minHeight: '76px',
              }}
            >
              {isActive && (
                <div
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{ background: cellColor }}
                />
              )}
              <span
                className="font-mono text-[9px] uppercase tracking-wide leading-tight whitespace-pre-line"
                style={{ color: isActive ? cellColor : 'var(--color-muted)' }}
              >
                {cell.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Sub-scores */}
      <div className="flex gap-3 mt-4">
        <div className="flex-1 text-center">
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted">Demand</div>
          <div className="font-display font-bold text-[17px] text-ink">{demandScore}<span className="text-muted font-normal text-[10px]">/100</span></div>
        </div>
        <div className="w-px bg-line" />
        <div className="flex-1 text-center">
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted">Supply</div>
          <div className="font-display font-bold text-[17px] text-ink">{supplyScore}<span className="text-muted font-normal text-[10px]">/100</span></div>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ResultsPage({ result, lead, onReset }: Props) {
  const { globalScore, demandScore, supplyScore, quadrant, categoryScores, levelConfig, quickWins, roadmap } = result

  const dimData = (Object.entries(categoryScores) as [string, number][]).map(([cat, score]) => {
    const max = CATEGORY_MAX[cat] ?? 10
    const pct = Math.round((score / max) * 100)
    const shortLabels: Record<string, string> = {
      visibility: 'VISIB.', positioning: 'POS.', conversion: 'CONV.',
      acquisition: 'ACQ.', content: 'CONT.', crm: 'CRM',
      automation: 'AUTO.', reputation: 'REP.', supply: 'SUPPLY',
    }
    return { cat, label: CATEGORY_LABELS[cat] ?? cat, short: shortLabels[cat] ?? cat.toUpperCase().slice(0, 6), score, max, pct }
  })

  const radarData = dimData.map(d => ({ label: d.short, value: d.pct }))
  const accentColor = TONE_COLOR[levelConfig.tone] ?? '#e85d2b'
  const quadrantConfig = getQuadrantConfig(demandScore, supplyScore)

  return (
    <div className="bg-paper min-h-screen pb-24 md:pb-0">

      {/* HERO */}
      <section className="border-b border-line bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Cabinet Growth Score · {lead.cabinetName || 'Votre cabinet'}
          </p>
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_auto] items-center">
            <div>
              <h1
                className="font-display font-bold text-ink mb-4"
                style={{ fontSize: 'clamp(32px, 5vw, 68px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
              >
                Votre score : <span style={{ color: accentColor }}>{levelConfig.label}</span>
              </h1>
              <p className="text-[17px] text-ink-2 leading-relaxed max-w-[520px] mb-3">{levelConfig.headline}</p>
              <p className="text-[15px] text-muted max-w-[480px] mb-8">{levelConfig.sub}</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Niveau', value: levelConfig.label },
                  { label: 'Score global', value: `${globalScore}/100` },
                  { label: 'Potentiel', value: `+${100 - globalScore} pts` },
                ].map(b => (
                  <div key={b.label} className="bg-paper border border-line rounded-xl px-4 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{b.label}</div>
                    <div className="font-display font-bold text-[18px] text-ink mt-0.5">{b.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ScoreGauge score={globalScore} size={300} animate={true} />
            </div>
          </div>
        </div>
      </section>

      {/* QUADRANT */}
      <section className="py-12 md:py-14 border-b border-line bg-paper">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: quadrantConfig.color }} />
                Diagnostic Supply vs Demand
              </p>
              <h2
                className="font-display font-bold text-ink mb-3"
                style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: quadrantConfig.color }}
              >
                {quadrantConfig.label}
              </h2>
              <p className="text-[17px] text-ink-2 leading-relaxed max-w-[520px] mb-2">{quadrantConfig.tagline}</p>
              <p className="text-[14px] text-muted leading-relaxed max-w-[500px]">{quadrantConfig.description}</p>
            </div>
            <div className="flex justify-center md:justify-end pt-4">
              <QuadrantMatrix demandScore={demandScore} supplyScore={supplyScore} />
            </div>
          </div>
        </div>
      </section>

      {/* RADAR */}
      <section className="py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Profil de maturité
            </p>
            <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
              Votre radar growth.
            </h2>
            <p className="text-muted text-[15px] mt-3 max-w-[520px] leading-relaxed">
              Vos forces et angles morts sur les 9 dimensions — acquisition et capacité.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_280px] gap-8 items-center">
            <div className="max-w-[480px]">
              <RadarChart data={radarData} size={480} />
            </div>
            <div className="flex flex-col gap-2">
              {dimData.map((d, i) => (
                <div key={d.cat} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`text-[13px] flex-1 truncate ${d.cat === 'supply' ? 'font-semibold text-ink' : 'text-ink'}`}>{d.label}</span>
                  <span className={`font-mono text-[13px] font-bold ${d.pct >= 70 ? 'text-green-700' : d.pct >= 40 ? 'text-accent' : 'text-red-600'}`}>
                    {d.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="py-14 md:py-16 bg-white border-y border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Détail par dimension
            </p>
            <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
              Le score, décomposé.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dimData.map(d => {
              const color   = d.pct >= 70 ? '#0a8f4a' : d.pct >= 40 ? '#e85d2b' : '#dc4a2b'
              const verdict = d.pct >= 70 ? 'Solide' : d.pct >= 40 ? 'À renforcer' : 'Levier prioritaire'
              const isSupply = d.cat === 'supply'
              return (
                <div
                  key={d.cat}
                  className="bg-paper rounded-xl p-5 border transition-all duration-200"
                  style={{ borderColor: isSupply ? quadrantConfig.color : 'var(--color-line)', boxShadow: isSupply ? `0 0 0 1px ${quadrantConfig.color}22` : undefined }}
                >
                  {isSupply && (
                    <div className="font-mono text-[9px] uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full inline-block" style={{ background: `${quadrantConfig.color}15`, color: quadrantConfig.color }}>
                      Dimension supply
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div>
                      <div className="font-display font-semibold text-[15px] text-ink leading-tight">{d.label}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1">{verdict}</div>
                    </div>
                    <div className="font-display font-bold text-[22px] leading-none shrink-0" style={{ color }}>
                      {d.score}<span className="text-[11px] text-muted font-normal">/{d.max}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-line rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.pct}%`, background: color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* QUICK WINS */}
      <section className="py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />À lancer cette semaine
            </p>
            <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
              Vos 3 quick wins prioritaires.
            </h2>
            <p className="text-muted text-[15px] mt-3 max-w-[520px] leading-relaxed">
              Sélectionnés selon vos angles morts — ceux qui généreront le plus de valeur, le plus vite.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {quickWins.slice(0, 3).map((qw, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-line hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-3">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display font-bold text-[18px] text-ink leading-tight mb-3">{qw.title}</h3>
                <p className="text-muted text-[14px] leading-relaxed mb-4">{qw.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-2.5 py-1 rounded-full">
                    Impact {qw.impact === 'high' ? 'fort' : 'moyen'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-paper border border-line text-muted px-2.5 py-1 rounded-full">
                    {qw.speed === 'quick' ? 'Rapide' : qw.speed === 'medium' ? 'Moyen terme' : 'Long terme'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-14 md:py-16 bg-white border-y border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          {globalScore > 93 ? (
            <div className="text-center max-w-[600px] mx-auto py-8">
              <div className="text-[48px] mb-6">🏆</div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />Score parfait
              </p>
              <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none mb-4">
                Vous êtes des boss.
              </h2>
              <p className="text-[17px] text-ink-2 leading-relaxed mb-3">Honnêtement ? On ne va pas pouvoir vous apprendre grand-chose.</p>
              <p className="text-[15px] text-muted leading-relaxed mb-8">
                Mais si vous êtes chauds pour comparer vos pratiques, challenger votre stratégie ou juste curiosité — on est dispo pour un appel entre gens qui savent ce qu&apos;ils font.
              </p>
              <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-7 py-4 rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200">
                Appel entre experts ↗
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />Plan d&apos;action
                </p>
                <h2 className="font-display font-bold text-ink text-[32px] md:text-[40px] tracking-display leading-none">
                  Votre roadmap 30 / 60 / 90 jours.
                </h2>
                <p className="text-muted text-[15px] mt-3 max-w-[520px] leading-relaxed">
                  Calibrée sur votre quadrant <span className="font-semibold" style={{ color: quadrantConfig.color }}>{quadrantConfig.label}</span> — pas générique.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {(['30', '60', '90'] as const).map((period, pi) => {
                  const actions = roadmap.filter(r => r.period === period)
                  const periodColors = ['#dc4a2b', '#e85d2b', '#0a8f4a']
                  const periodLabels = ['Fondations', 'Construction', 'Accélération']
                  return (
                    <div key={period}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: periodColors[pi] }} />
                        <div>
                          <div className="font-display font-bold text-[17px] text-ink">{period} jours</div>
                          <div className="font-mono text-[10px] text-muted uppercase tracking-wider">{periodLabels[pi]}</div>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-3 pl-6 border-l-2 border-line">
                        {actions.map((a, ai) => (
                          <li key={ai} className="text-[14px] text-ink-2 flex items-start gap-2">
                            <span className="text-accent mt-0.5 shrink-0 text-[12px]">✓</span>
                            {a.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA BOOKING */}
      <section className="py-16 md:py-20 bg-ink">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Étape suivante
            </p>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Votre cabinet a un vrai potentiel{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(232,93,43,0.5) 65%)', padding: '0 4px' }}>
                non exploité
              </span>
              .
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-[420px]">
              En 30 minutes, on vous montre exactement quoi mettre en place pour générer des RDV qualifiés de manière prévisible — basé sur vos résultats.
            </p>
            <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-accent text-white font-medium text-[15px] px-7 py-4 rounded-full hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group">
              Réserver mon audit stratégique
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
            <div className="flex gap-4 mt-4 flex-wrap">
              {['30 min', 'Gratuit', 'Sans engagement'].map(t => (
                <span key={t} className="font-mono text-[11px] text-white/50 flex items-center gap-1.5">
                  <span className="text-accent">✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-4">Prochains créneaux disponibles</div>
            <div className="grid grid-cols-3 gap-2">
              {['Lun 2', 'Mer 4', 'Jeu 5', 'Lun 9', 'Mer 11', 'Jeu 12'].map((d, i) => (
                <div key={i} className={`rounded-lg px-3 py-2.5 text-center cursor-pointer transition-colors ${i === 1 ? 'bg-accent text-white' : 'bg-white/8 text-white/60 hover:bg-white/15'}`}>
                  <div className="font-display font-bold text-[15px]">{d.split(' ')[1]}</div>
                  <div className="font-mono text-[10px] mt-0.5">{d.split(' ')[0]}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['10:00', '14:30', '16:00'].map((t, i) => (
                <div key={i} className={`rounded-lg px-3 py-2 text-center font-mono text-[12px] ${i === 1 ? 'bg-accent text-white' : 'bg-white/8 text-white/60'}`}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <div className="bg-white border-t border-line py-4 px-5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[13px] text-ink-2">
            <span>📧</span>
            <span>Rapport envoyé à <strong>{lead.email}</strong></span>
          </div>
          <button onClick={onReset} className="font-mono text-[12px] text-muted hover:text-ink transition-colors border border-line rounded-full px-4 py-1.5">
            Refaire le diagnostic
          </button>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-line p-4 z-40">
        <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-accent text-white font-medium text-[15px] py-4 rounded-full">
          Réserver mon audit ↗
        </Link>
      </div>
    </div>
  )
}
