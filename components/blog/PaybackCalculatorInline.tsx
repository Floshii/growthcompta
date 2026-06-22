'use client'

import { useState } from 'react'

type Tab = 'acquisition' | 'recrutement'

function Badge({ value, label }: { value: number; label: string }) {
  let bg = ''
  let text = ''
  let border = ''

  if (label === 'acquisition') {
    if (value <= 2) { bg = 'bg-green-50'; text = 'text-green-700'; border = 'border-green-200' }
    else if (value <= 4) { bg = 'bg-blue-50'; text = 'text-blue-700'; border = 'border-blue-200' }
    else if (value <= 6) { bg = 'bg-orange-50'; text = 'text-orange-700'; border = 'border-orange-200' }
    else { bg = 'bg-red-50'; text = 'text-red-700'; border = 'border-red-200' }
  } else {
    if (value >= 1) { bg = 'bg-green-50'; text = 'text-green-700'; border = 'border-green-200' }
    else if (value >= 0.7) { bg = 'bg-blue-50'; text = 'text-blue-700'; border = 'border-blue-200' }
    else if (value >= 0.4) { bg = 'bg-orange-50'; text = 'text-orange-700'; border = 'border-orange-200' }
    else { bg = 'bg-red-50'; text = 'text-red-700'; border = 'border-red-200' }
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${bg} ${text} ${border}`}>
      {label === 'acquisition' ? `${value.toFixed(1)} mois` : value.toFixed(2)}
    </span>
  )
}

function AcquisitionTab() {
  const [cac, setCac] = useState(800)
  const [honoraires, setHonoraires] = useState(250)
  const [marge, setMarge] = useState(50)

  const margeMonthly = honoraires * (marge / 100)
  const payback = margeMonthly > 0 ? cac / margeMonthly : 0

  const upfrontEncaisse = honoraires * 9
  const upfrontMarge = upfrontEncaisse * (marge / 100)
  const upfrontPayback = upfrontMarge > 0 ? cac / upfrontMarge : 0

  function statusLabel(p: number) {
    if (p <= 2) return 'Excellent — vous pouvez accélérer l\'acquisition'
    if (p <= 4) return 'Correct — la trésorerie ne bloque pas encore'
    if (p <= 6) return 'Attention — la trésorerie ralentit votre croissance'
    return 'Critique — résolvez le pricing avant d\'investir en marketing'
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">CAC moyen (€)</label>
            <span className="text-sm font-semibold text-gray-900">{cac} €</span>
          </div>
          <input type="range" min={100} max={5000} step={50} value={cac}
            onChange={e => setCac(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>100 €</span><span>5 000 €</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Honoraires mensuels moyens (€ HT)</label>
            <span className="text-sm font-semibold text-gray-900">{honoraires} €</span>
          </div>
          <input type="range" min={50} max={2000} step={25} value={honoraires}
            onChange={e => setHonoraires(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>50 €</span><span>2 000 €</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Marge brute (%)</label>
            <span className="text-sm font-semibold text-gray-900">{marge} %</span>
          </div>
          <input type="range" min={20} max={80} step={5} value={marge}
            onChange={e => setMarge(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>20 %</span><span>80 %</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Payback Period</p>
            <p className="text-3xl font-bold text-gray-900 mt-0.5">{payback.toFixed(1)} mois</p>
          </div>
          <Badge value={payback} label="acquisition" />
        </div>
        <p className="text-sm text-gray-600">{statusLabel(payback)}</p>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Simulation avec paiement annuel upfront (9 mois)</p>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xl font-bold text-[#e85d2b]">{upfrontPayback.toFixed(1)} mois</p>
              <p className="text-xs text-gray-500">Cash encaissé J+0 : {upfrontEncaisse.toLocaleString('fr-FR')} €</p>
            </div>
            {payback > 0 && upfrontPayback < payback && (
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ÷{(payback / upfrontPayback).toFixed(1)} vs mensuel
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RecrutementTab() {
  const [cpr, setCpr] = useState(5000)
  const [salaireMonthly, setSalaireMonthly] = useState(2800)
  const [prod, setProd] = useState(50)
  const [marge, setMarge] = useState(50)
  const [caSenior, setCaSenior] = useState(8000)

  const c90 = salaireMonthly * 1.45 * 3
  const gp90 = caSenior * (prod / 100) * 3 * (marge / 100)
  const rp90 = (cpr + c90) > 0 ? gp90 / (cpr + c90) : 0

  function statusLabel(p: number) {
    if (p >= 1) return 'Recrutement autofinancé en 90 jours — vous pouvez accélérer'
    if (p >= 0.7) return 'Proche de l\'équilibre — améliorez l\'onboarding pour passer ≥ 1'
    if (p >= 0.4) return 'Chaque embauche immobilise de la trésorerie — priorisez les 4 leviers'
    return 'Recrutement très coûteux — résolvez d\'abord CPR et ramp avant de scaler'
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">CPR — Coût par recrue (€)</label>
            <span className="text-sm font-semibold text-gray-900">{cpr.toLocaleString('fr-FR')} €</span>
          </div>
          <input type="range" min={500} max={20000} step={250} value={cpr}
            onChange={e => setCpr(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>500 €</span><span>20 000 €</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Salaire brut mensuel recrue (€)</label>
            <span className="text-sm font-semibold text-gray-900">{salaireMonthly.toLocaleString('fr-FR')} €</span>
          </div>
          <input type="range" min={1500} max={8000} step={100} value={salaireMonthly}
            onChange={e => setSalaireMonthly(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 500 €</span><span>8 000 €</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Productivité sur la ramp (% d&apos;un senior)</label>
            <span className="text-sm font-semibold text-gray-900">{prod} %</span>
          </div>
          <input type="range" min={20} max={80} step={5} value={prod}
            onChange={e => setProd(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>20 %</span><span>80 %</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">CA généré par un senior / mois (€)</label>
            <span className="text-sm font-semibold text-gray-900">{caSenior.toLocaleString('fr-FR')} €</span>
          </div>
          <input type="range" min={2000} max={30000} step={500} value={caSenior}
            onChange={e => setCaSenior(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>2 000 €</span><span>30 000 €</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Marge brute cabinet (%)</label>
            <span className="text-sm font-semibold text-gray-900">{marge} %</span>
          </div>
          <input type="range" min={20} max={80} step={5} value={marge}
            onChange={e => setMarge(Number(e.target.value))}
            className="w-full accent-[#e85d2b]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>20 %</span><span>80 %</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">C90</p>
            <p className="text-lg font-bold text-gray-900">{Math.round(c90).toLocaleString('fr-FR')} €</p>
            <p className="text-xs text-gray-400">Coût cash 0-90j</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">GP90</p>
            <p className="text-lg font-bold text-gray-900">{Math.round(gp90).toLocaleString('fr-FR')} €</p>
            <p className="text-xs text-gray-400">Marge générée 90j</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">CPR + C90</p>
            <p className="text-lg font-bold text-gray-900">{Math.round(cpr + c90).toLocaleString('fr-FR')} €</p>
            <p className="text-xs text-gray-400">Coût total recrue</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Recruit Payback 90</p>
            <p className="text-3xl font-bold text-gray-900 mt-0.5">{rp90.toFixed(2)}</p>
          </div>
          <Badge value={rp90} label="recrutement" />
        </div>
        <p className="text-sm text-gray-600">{statusLabel(rp90)}</p>
      </div>

      <div className="text-xs text-gray-400 space-y-1">
        <p>C90 = salaire brut × 1,45 (charges) × 3 mois</p>
        <p>GP90 = CA senior × prod% × 3 mois × marge%</p>
        <p>Recruit Payback 90 = GP90 ÷ (CPR + C90)</p>
      </div>
    </div>
  )
}

export default function PaybackCalculatorInline() {
  const [tab, setTab] = useState<Tab>('acquisition')

  return (
    <div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Calculez votre Payback Period</h3>
        <p className="text-sm text-gray-500 mb-5">Deux équations, deux calculateurs — entrez vos chiffres, lisez votre goulot.</p>
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('acquisition')}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === 'acquisition'
                ? 'border-[#e85d2b] text-[#e85d2b]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Acquisition client
          </button>
          <button
            onClick={() => setTab('recrutement')}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === 'recrutement'
                ? 'border-[#e85d2b] text-[#e85d2b]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Recrutement
          </button>
        </div>
      </div>

      <div className="p-6">
        {tab === 'acquisition' ? <AcquisitionTab /> : <RecrutementTab />}
      </div>
    </div>
  )
}
