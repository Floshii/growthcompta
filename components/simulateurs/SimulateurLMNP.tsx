'use client'

import { useState } from 'react'

/* ================================================================
   Règles fiscales 2026 — À VALIDER avec un expert-comptable
   Mettre à jour ces constantes à chaque loi de finances.
   ================================================================ */
const REGLES = {
  PS:              0.172,    // Prélèvements sociaux : 17,2 %
  MF_ABATT:        0.30,     // Abattement micro-foncier : 30 %
  MF_PLAFOND:      15_000,   // Plafond loyers micro-foncier : 15 000 €
  BIC_ABATT:       0.50,     // Abattement micro-BIC (longue durée) : 50 %
  BIC_PLAFOND:     77_700,   // Plafond loyers micro-BIC : 77 700 €
  DF_MAX:          10_700,   // Déficit foncier imputable sur rev. global : 10 700 €/an
  AMORT_BATI_ANS:  30,       // Durée amortissement bâti : 30 ans
  AMORT_MOB_ANS:   7,        // Durée amortissement mobilier : 7 ans
} as const

const TMI_OPTIONS = [
  { label: '0 %',  v: 0 },
  { label: '11 %', v: 0.11 },
  { label: '30 %', v: 0.30 },
  { label: '41 %', v: 0.41 },
  { label: '45 %', v: 0.45 },
] as const

/** Formatage euros à la française : 12 345 € */
const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' €'

// ─── Types ──────────────────────────────────────────────────────
interface Inputs {
  loyers:         number
  charges:        number
  interets:       number
  valeurBien:     number
  partTerrain:    number  // en %
  valeurMobilier: number
  tmi:            number  // décimale ex. 0.30
}

interface Regime {
  id:               string
  nom:              string
  eligible:         boolean
  motifIneligible?: string
  revenuImposable:  number
  ir:               number
  ps:               number
  total:            number
  revenuNet:        number
  note?:            string
}

// ─── Moteur de calcul ────────────────────────────────────────────
function calculer(s: Inputs): Regime[] {
  const { loyers, charges, interets, valeurBien, partTerrain, valeurMobilier, tmi } = s

  const fiscal = (base: number) => {
    const revenuImposable = Math.max(0, base)
    const ir = revenuImposable * tmi
    const ps = revenuImposable * REGLES.PS
    return { revenuImposable, ir, ps, total: ir + ps, revenuNet: loyers - ir - ps }
  }

  // 1. Location NUE — Micro-foncier
  const nueMicro: Regime = loyers > REGLES.MF_PLAFOND
    ? {
        id: 'nue-micro', nom: 'NUE — Micro-foncier',
        eligible: false, motifIneligible: 'Loyers > 15 000 €',
        revenuImposable: 0, ir: 0, ps: 0, total: Infinity, revenuNet: 0,
      }
    : {
        id: 'nue-micro', nom: 'NUE — Micro-foncier', eligible: true,
        note: 'Abattement forfaitaire 30 %',
        ...fiscal(loyers * (1 - REGLES.MF_ABATT)),
      }

  // 2. Location NUE — Réel
  const brutFoncier = loyers - charges - interets
  const deficit = brutFoncier < 0 ? Math.abs(brutFoncier) : 0
  const nueReel: Regime = {
    id: 'nue-reel', nom: 'NUE — Réel', eligible: true,
    note: deficit > 0
      ? `Déficit ${eur(deficit)} — déductible rev. global (max ${eur(REGLES.DF_MAX)}/an)`
      : 'Déduction charges et intérêts réels, sans amortissement',
    ...fiscal(brutFoncier),
  }

  // 3. Location MEUBLÉE — Micro-BIC
  const meubMicro: Regime = loyers > REGLES.BIC_PLAFOND
    ? {
        id: 'meub-micro', nom: 'MEUBLÉE — Micro-BIC',
        eligible: false, motifIneligible: 'Loyers > 77 700 €',
        revenuImposable: 0, ir: 0, ps: 0, total: Infinity, revenuNet: 0,
      }
    : {
        id: 'meub-micro', nom: 'MEUBLÉE — Micro-BIC', eligible: true,
        note: 'Abattement forfaitaire 50 %',
        ...fiscal(loyers * (1 - REGLES.BIC_ABATT)),
      }

  // 4. Location MEUBLÉE — Réel (LMNP)
  // L'amortissement ne peut pas créer de déficit : excédent reporté aux exercices suivants.
  const amortBati  = (valeurBien * (1 - partTerrain / 100)) / REGLES.AMORT_BATI_ANS
  const amortMob   = valeurMobilier / REGLES.AMORT_MOB_ANS
  const amortTotal = amortBati + amortMob
  const avantAmort = loyers - charges - interets
  const report     = Math.max(0, -(avantAmort - amortTotal))

  const noteParts: string[] = [`Amort. bâti : ${eur(Math.round(amortBati))}/an`]
  if (amortMob > 0) noteParts.push(`mobilier : ${eur(Math.round(amortMob))}/an`)
  if (report > 0)   noteParts.push(`report amort. : ${eur(Math.round(report))}`)

  const meubReel: Regime = {
    id: 'meub-reel', nom: 'MEUBLÉE — Réel (LMNP)', eligible: true,
    note: noteParts.join(' — '),
    ...fiscal(avantAmort - amortTotal),
  }

  return [nueMicro, nueReel, meubMicro, meubReel]
}

// ─── CSS scopé via .lmnp-sim ─────────────────────────────────────
// Re-skin : modifier les 2 variables de couleur + la police pour
// adapter ce composant aux couleurs de n'importe quel cabinet.
const CSS = `
.lmnp-sim {
  --pri:    #448ab5;
  --dark:   #2b6a91;
  --light:  #eaf4fb;
  --bg:     #f7f7f7;
  --card:   #ffffff;
  --txt:    #313436;
  --muted:  #666666;
  --border: #e5e5e5;
  --font:   'Open Sans', Arial, Helvetica, sans-serif;
  --r:      8px;
}
.lmnp-sim *, .lmnp-sim *::before, .lmnp-sim *::after { box-sizing: border-box; }
.lmnp-sim {
  font-family: var(--font);
  color: var(--txt);
  background: var(--bg);
  font-size: 15px;
  line-height: 1.5;
}

/* ── En-tête ─────────────────────────────────────────────────── */
.lmnp-header {
  background: linear-gradient(135deg, var(--dark) 0%, var(--pri) 100%);
  color: #fff;
  padding: 2rem 1.5rem;
  text-align: center;
}
.lmnp-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 .4rem;
  letter-spacing: -.01em;
}
.lmnp-header p { font-size: .9rem; margin: 0; opacity: .88; }

/* ── Layout principal ────────────────────────────────────────── */
.lmnp-body { max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem 1rem; }

/* ── Carte générique ─────────────────────────────────────────── */
.lmnp-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
}
.lmnp-card-title {
  font-size: .72rem;
  font-weight: 700;
  color: var(--dark);
  text-transform: uppercase;
  letter-spacing: .07em;
  margin-bottom: 1.1rem;
}

/* ── Grille d'inputs ─────────────────────────────────────────── */
.lmnp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem; }
@media (max-width: 580px) { .lmnp-grid { grid-template-columns: 1fr; } }

.lmnp-field { display: flex; flex-direction: column; gap: .35rem; }
.lmnp-field > label { font-size: .78rem; font-weight: 600; color: var(--muted); }
.lmnp-row   { display: flex; align-items: center; gap: .75rem; }

/* Slider */
.lmnp-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  cursor: pointer;
  outline: none;
  margin: 0;
}
.lmnp-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 17px; height: 17px;
  border-radius: 50%;
  background: var(--pri);
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.22);
  cursor: pointer;
}
.lmnp-slider::-moz-range-thumb {
  width: 17px; height: 17px;
  border-radius: 50%;
  background: var(--pri);
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.22);
  cursor: pointer;
}

/* Input numérique */
.lmnp-num {
  width: 100px;
  padding: .35rem .5rem;
  text-align: right;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: var(--font);
  font-size: .85rem;
  color: var(--txt);
  background: #fff;
}
.lmnp-num:focus { outline: 2px solid var(--pri); border-color: var(--pri); }

/* Boutons TMI */
.lmnp-tmi { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .25rem; }
.lmnp-tmi-btn {
  padding: .38rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: #fff;
  font-family: var(--font);
  font-size: .85rem;
  color: var(--txt);
  cursor: pointer;
  transition: all .15s;
}
.lmnp-tmi-btn:hover { border-color: var(--pri); color: var(--pri); }
.lmnp-tmi-btn.on    { background: var(--pri); color: #fff; border-color: var(--pri); font-weight: 600; }

/* ── Bandeau de synthèse ─────────────────────────────────────── */
.lmnp-banner {
  background: var(--light);
  border: 1.5px solid var(--pri);
  border-radius: var(--r);
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.lmnp-banner-ico { font-size: 1.1rem; color: var(--pri); margin-top: .05rem; flex-shrink: 0; }
.lmnp-banner-win { font-weight: 700; font-size: 1rem; color: var(--dark); }
.lmnp-banner-eco { font-size: .84rem; color: var(--muted); margin-top: .2rem; }

/* ── Badge "Optimal" ─────────────────────────────────────────── */
.lmnp-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255,255,255,.25);
  color: #fff;
  font-size: .6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  padding: .1rem .45rem;
  border-radius: 3px;
  margin-left: .45rem;
  vertical-align: middle;
  line-height: 1.4;
}

/* ── Tableau comparatif — desktop ────────────────────────────── */
.lmnp-table-wrap { overflow-x: auto; margin-bottom: 1.25rem; }
.lmnp-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  overflow: hidden;
}
.lmnp-table th {
  background: var(--dark);
  color: #fff;
  padding: .72rem 1rem;
  font-size: .78rem;
  font-weight: 700;
  text-align: left;
  vertical-align: bottom;
}
.lmnp-table th.w { background: var(--pri); }
.lmnp-table td {
  padding: .6rem 1rem;
  font-size: .86rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}
.lmnp-table tr:last-child td { border-bottom: none; }
.lmnp-table td.lbl {
  font-size: .78rem; font-weight: 600; color: var(--muted);
  background: #fafafa; white-space: nowrap; width: 18%;
}
.lmnp-table td.w      { background: var(--light); }
.lmnp-table tr.r-tot  td { font-weight: 700; background: #f0f0f0; }
.lmnp-table tr.r-tot  td.w { background: var(--light); color: var(--dark); }
.lmnp-table tr.r-net  td { font-weight: 700; color: var(--dark); font-size: .9rem; }
.lmnp-table tr.r-net  td.w { background: var(--light); }
.lmnp-table td.note   { font-size: .73rem; color: var(--muted); font-style: italic; }
.lmnp-table td.note.w { background: var(--light); }
.lmnp-ineligible      { color: #bbb; font-style: italic; font-size: .78rem; }

@media (max-width: 799px) { .lmnp-table-wrap { display: none; } }

/* ── Cartes — mobile ─────────────────────────────────────────── */
.lmnp-cards { display: none; gap: .75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
@media (max-width: 799px) { .lmnp-cards { display: flex; } }

.lmnp-rc {
  flex: 1 1 calc(50% - .375rem);
  min-width: 180px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1rem;
}
.lmnp-rc.w { border: 2px solid var(--pri); background: var(--light); }
@media (max-width: 440px) { .lmnp-rc { flex: 1 1 100%; } }
.lmnp-rc h3 { font-size: .82rem; font-weight: 700; margin: 0 0 .75rem; }
.lmnp-rc-row {
  display: flex; justify-content: space-between;
  font-size: .82rem; padding: .26rem 0;
  border-bottom: 1px solid var(--border);
}
.lmnp-rc-row:last-child { border: none; }
.lmnp-rc-row .v  { font-weight: 600; }
.lmnp-rc-sep     { border-top: 2px solid var(--border); margin: .4rem 0; }
.lmnp-rc-tot     { display: flex; justify-content: space-between; font-weight: 700; font-size: .9rem; color: var(--dark); padding: .3rem 0; }
.lmnp-rc-note    { font-size: .72rem; color: var(--muted); font-style: italic; margin-top: .5rem; }
.lmnp-rc-badge   {
  display: inline-flex; align-items: center;
  background: var(--pri); color: #fff;
  font-size: .6rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
  padding: .1rem .45rem; border-radius: 3px; margin-left: .45rem; vertical-align: middle;
}

/* ── Formulaire de capture de lead ──────────────────────────── */
.lmnp-lead h2 { font-size: 1rem; font-weight: 700; color: var(--dark); margin: 0 0 .35rem; }
.lmnp-lead > p { font-size: .84rem; color: var(--muted); margin: 0 0 1rem; }

.lmnp-lead-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: .75rem;
  align-items: end;
}
@media (max-width: 680px) { .lmnp-lead-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 380px) { .lmnp-lead-grid { grid-template-columns: 1fr; } }

.lmnp-fld { display: flex; flex-direction: column; gap: .3rem; }
.lmnp-fld label { font-size: .75rem; font-weight: 600; color: var(--muted); }
.lmnp-fld input {
  padding: .45rem .7rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: var(--font);
  font-size: .86rem;
  color: var(--txt);
  background: #fff;
}
.lmnp-fld input:focus { outline: 2px solid var(--pri); border-color: var(--pri); }

.lmnp-btn {
  padding: .5rem 1.25rem;
  background: var(--pri);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: var(--font);
  font-size: .88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s;
  white-space: nowrap;
}
.lmnp-btn:hover { background: var(--dark); }

.lmnp-success {
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  border-radius: var(--r);
  padding: .9rem 1.1rem;
  font-size: .86rem;
  color: #2e7d32;
}

/* ── Mentions légales ────────────────────────────────────────── */
.lmnp-footer {
  font-size: .71rem;
  color: var(--muted);
  text-align: center;
  border-top: 1px solid var(--border);
  padding: 1rem .5rem 1.5rem;
  line-height: 1.65;
}
`

// ─── Valeurs par défaut ──────────────────────────────────────────
const DEFAULTS: Inputs = {
  loyers:          18_000,
  charges:          3_500,
  interets:         4_000,
  valeurBien:     200_000,
  partTerrain:         15,
  valeurMobilier:   5_000,
  tmi:               0.30,
}

// ─── Composant ───────────────────────────────────────────────────
export default function SimulateurLMNP() {
  const [inp, setInp]   = useState<Inputs>(DEFAULTS)
  const [lead, setLead] = useState({ prenom: '', email: '', tel: '' })
  const [sent, setSent] = useState(false)

  const set = (k: keyof Inputs) => (v: number) =>
    setInp(prev => ({ ...prev, [k]: v }))

  const regimes = calculer(inp)
  const eligible = regimes.filter(r => r.eligible)
  const winner   = eligible.length
    ? eligible.reduce((a, b) => a.total < b.total ? a : b)
    : null

  // Économie vs le meilleur régime micro (référence forfaitaire)
  const micros    = eligible.filter(r => r.id === 'nue-micro' || r.id === 'meub-micro')
  const bestMicro = micros.length ? micros.reduce((a, b) => a.total < b.total ? a : b) : null
  const economie  = winner && bestMicro && winner.id !== bestMicro.id
    ? Math.round(bestMicro.total - winner.total)
    : 0

  const handleLead = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead LMNP:', { ...lead, simulation: { inputs: inp, regime: winner?.nom } })
    // TODO: POST vers webhook Make.com ici
    setSent(true)
  }

  // Helper : champ slider + input numérique synchronisés
  const numField = (
    k: keyof Inputs, label: string,
    min: number, max: number, step: number,
    width = 100,
  ) => (
    <div className="lmnp-field" key={k}>
      <label>{label}</label>
      <div className="lmnp-row">
        <input
          type="range" className="lmnp-slider"
          min={min} max={max} step={step}
          value={inp[k] as number}
          onChange={e => set(k)(Number(e.target.value))}
        />
        <input
          type="number" className="lmnp-num"
          style={{ width }}
          min={min} max={max} step={step}
          value={inp[k] as number}
          onChange={e => set(k)(Math.min(max, Math.max(min, Number(e.target.value))))}
        />
      </div>
    </div>
  )

  // Helper : cellule de tableau (eligible ou non)
  const cell = (r: Regime, val: number, extraClass = '') => (
    <td key={r.id} className={[extraClass, winner?.id === r.id ? 'w' : ''].filter(Boolean).join(' ')}>
      {!r.eligible
        ? <span className="lmnp-ineligible">{r.motifIneligible}</span>
        : eur(val)}
    </td>
  )

  return (
    <div className="lmnp-sim">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── En-tête ─────────────────────────────────────────────── */}
      <div className="lmnp-header">
        <h1>Simulateur fiscal LMNP 2026</h1>
        <p>Comparez les 4 régimes et identifiez la stratégie fiscale optimale pour votre bien locatif</p>
      </div>

      <div className="lmnp-body">

        {/* ── Paramètres ──────────────────────────────────────────── */}
        <div className="lmnp-card">
          <div className="lmnp-card-title">Vos paramètres</div>
          <div className="lmnp-grid">
            {numField('loyers',         'Loyers annuels encaissés (€)',        1_000, 200_000, 500)}
            {numField('charges',        'Charges déductibles annuelles (€)',       0,  50_000, 500)}
            {numField('interets',       "Intérêts d'emprunt annuels (€)",          0,  30_000, 500)}
            {numField('valeurBien',     'Valeur du bien (€)',                 50_000, 1_000_000, 5_000)}
            {numField('valeurMobilier', 'Valeur du mobilier (€)',                  0,  50_000, 500)}
            <div className="lmnp-field">
              <label>Part du terrain non amortissable (%)</label>
              <div className="lmnp-row">
                <input
                  type="range" className="lmnp-slider"
                  min={0} max={40} step={1}
                  value={inp.partTerrain}
                  onChange={e => set('partTerrain')(Number(e.target.value))}
                />
                <input
                  type="number" className="lmnp-num"
                  style={{ width: 72 }}
                  min={0} max={40} step={1}
                  value={inp.partTerrain}
                  onChange={e => set('partTerrain')(Math.min(40, Math.max(0, Number(e.target.value))))}
                />
              </div>
            </div>
          </div>

          <div className="lmnp-field" style={{ marginTop: '1rem' }}>
            <label>Tranche marginale d&apos;imposition (TMI)</label>
            <div className="lmnp-tmi">
              {TMI_OPTIONS.map(o => (
                <button key={o.v} type="button"
                  className={`lmnp-tmi-btn${inp.tmi === o.v ? ' on' : ''}`}
                  onClick={() => set('tmi')(o.v)}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bandeau de synthèse ─────────────────────────────────── */}
        {winner && (
          <div className="lmnp-banner">
            <span className="lmnp-banner-ico" aria-hidden="true">&#9733;</span>
            <div>
              <div className="lmnp-banner-win">
                Le régime le plus avantageux pour vous&nbsp;: {winner.nom}
              </div>
              {economie > 0 && (
                <div className="lmnp-banner-eco">
                  Économie estimée vs meilleur forfait&nbsp;: {eur(economie)}/an
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tableau comparatif — desktop ────────────────────────── */}
        <div className="lmnp-table-wrap">
          <table className="lmnp-table">
            <thead>
              <tr>
                <th></th>
                {regimes.map(r => (
                  <th key={r.id} className={winner?.id === r.id ? 'w' : ''}>
                    {r.nom}
                    {winner?.id === r.id && (
                      <span className="lmnp-badge">Optimal</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lbl">Revenu imposable</td>
                {regimes.map(r => cell(r, r.revenuImposable))}
              </tr>
              <tr>
                <td className="lbl">IR (TMI&nbsp;{Math.round(inp.tmi * 100)}&nbsp;%)</td>
                {regimes.map(r => (
                  <td key={r.id} className={winner?.id === r.id ? 'w' : ''}>
                    {!r.eligible ? '—' : eur(r.ir)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="lbl">Prél. sociaux (17,2&nbsp;%)</td>
                {regimes.map(r => (
                  <td key={r.id} className={winner?.id === r.id ? 'w' : ''}>
                    {!r.eligible ? '—' : eur(r.ps)}
                  </td>
                ))}
              </tr>
              <tr className="r-tot">
                <td className="lbl">Total prélèvements</td>
                {regimes.map(r => (
                  <td key={r.id} className={winner?.id === r.id ? 'w' : ''}>
                    {!r.eligible ? '—' : eur(r.total)}
                  </td>
                ))}
              </tr>
              <tr className="r-net">
                <td className="lbl">Revenu net après impôt</td>
                {regimes.map(r => (
                  <td key={r.id} className={winner?.id === r.id ? 'w' : ''}>
                    {!r.eligible ? '—' : eur(r.revenuNet)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="lbl">Note</td>
                {regimes.map(r => (
                  <td key={r.id} className={`note${winner?.id === r.id ? ' w' : ''}`}>
                    {r.note ?? '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Cartes — mobile ─────────────────────────────────────── */}
        <div className="lmnp-cards">
          {regimes.map(r => (
            <div key={r.id} className={`lmnp-rc${winner?.id === r.id ? ' w' : ''}`}>
              <h3>
                {r.nom}
                {winner?.id === r.id && (
                  <span className="lmnp-rc-badge">Optimal</span>
                )}
              </h3>
              {!r.eligible ? (
                <p className="lmnp-ineligible">{r.motifIneligible}</p>
              ) : (
                <>
                  <div className="lmnp-rc-row">
                    <span>Rev. imposable</span>
                    <span className="v">{eur(r.revenuImposable)}</span>
                  </div>
                  <div className="lmnp-rc-row">
                    <span>IR</span>
                    <span className="v">{eur(r.ir)}</span>
                  </div>
                  <div className="lmnp-rc-row">
                    <span>Prél. sociaux</span>
                    <span className="v">{eur(r.ps)}</span>
                  </div>
                  <div className="lmnp-rc-sep" />
                  <div className="lmnp-rc-tot">
                    <span>Total fiscal</span>
                    <span>{eur(r.total)}</span>
                  </div>
                  <div className="lmnp-rc-row" style={{ marginTop: '.3rem' }}>
                    <span>Revenu net</span>
                    <span className="v">{eur(r.revenuNet)}</span>
                  </div>
                  {r.note && <p className="lmnp-rc-note">{r.note}</p>}
                </>
              )}
            </div>
          ))}
        </div>

        {/* ── Capture de lead ─────────────────────────────────────── */}
        <div className="lmnp-card lmnp-lead">
          <h2>
            Recevez votre simulation détaillée + un échange de 15&nbsp;min
            avec un expert-comptable
          </h2>
          <p>
            Nos experts vous accompagnent pour choisir et mettre en place
            le régime fiscal le plus adapté à votre situation.
          </p>
          {sent ? (
            <div className="lmnp-success">
              Merci&nbsp;! Votre demande a bien été enregistrée.
              Nous vous recontactons sous 24&nbsp;h ouvrées.
            </div>
          ) : (
            <form className="lmnp-lead-grid" onSubmit={handleLead}>
              <div className="lmnp-fld">
                <label>Prénom *</label>
                <input type="text" required placeholder="Jean"
                  value={lead.prenom}
                  onChange={e => setLead(l => ({ ...l, prenom: e.target.value }))} />
              </div>
              <div className="lmnp-fld">
                <label>E-mail *</label>
                <input type="email" required placeholder="jean@exemple.fr"
                  value={lead.email}
                  onChange={e => setLead(l => ({ ...l, email: e.target.value }))} />
              </div>
              <div className="lmnp-fld">
                <label>Téléphone</label>
                <input type="tel" placeholder="06 12 34 56 78"
                  value={lead.tel}
                  onChange={e => setLead(l => ({ ...l, tel: e.target.value }))} />
              </div>
              <button type="submit" className="lmnp-btn">
                Être rappelé&nbsp;→
              </button>
            </form>
          )}
        </div>

        {/* ── Mentions légales ────────────────────────────────────── */}
        <div className="lmnp-footer">
          <strong>Estimation indicative</strong> basée sur les règles fiscales en vigueur.
          Ne constitue pas un conseil personnalisé et ne remplace pas l&apos;accompagnement
          d&apos;un expert-comptable agréé.
          <br />
          <em>
            Depuis 2025, les amortissements déduits en LMNP réel sont réintégrés dans le calcul
            de la plus-value à la revente (réforme PLF&nbsp;2024, art.&nbsp;151&nbsp;septies&nbsp;A
            CGI).
          </em>
        </div>

      </div>
    </div>
  )
}
