'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { AUDIT_CTA_HREF } from '@/components/sections/audit2026/Hero'

/* ================================================================
   Échéances réglementaires — facturation électronique
   - 1er sept. 2026 : réception (toutes entreprises) + émission (GE/ETI)
   - 1er sept. 2027 : émission obligatoire pour les TPE/PME — la quasi-
     totalité de la clientèle d'un cabinet d'expertise comptable.
   À VALIDER / mettre à jour si le calendrier légal évolue.
   ================================================================ */
const DEADLINE_TPE_PME = new Date('2027-09-01T00:00:00+02:00').getTime()

function getWeeksLeft(): number | null {
  if (typeof window === 'undefined') return null
  return Math.max(0, Math.ceil((DEADLINE_TPE_PME - Date.now()) / (7 * 86_400_000)))
}

function subscribeWeeks(callback: () => void): () => void {
  const interval = setInterval(callback, 3_600_000)
  return () => clearInterval(interval)
}

/** Nombre de semaines restantes avant le 1er sept. 2027 — null côté serveur (évite le mismatch d'hydratation) */
function useWeeksLeft(): number | null {
  return useSyncExternalStore(subscribeWeeks, getWeeksLeft, () => null)
}

// ─── Formatage ────────────────────────────────────────────────────
const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' €'
const num = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n))

// ─── Types ──────────────────────────────────────────────────────
interface Inputs {
  nbClients: number          // nb de clients TPE/PME du cabinet
  pctAMigrer: number          // % pas encore prêts pour la facturation électronique
  heuresParClient: number     // heures d'accompagnement par client (cadrage + paramétrage PDP + formation)
  tauxHoraire: number         // valorisation horaire du temps du cabinet (€/h)
  forfaitMigration: number    // forfait d'accompagnement migration, one-shot (€/client)
  pctAbonnement: number       // % des clients migrés qui prennent un abonnement conformité récurrent
  abonnementMensuel: number   // prix de cet abonnement (€/mois/client)
}

const DEFAULTS: Inputs = {
  nbClients: 120,
  pctAMigrer: 85,
  heuresParClient: 3,
  tauxHoraire: 70,
  forfaitMigration: 250,
  pctAbonnement: 40,
  abonnementMensuel: 25,
}

interface Result {
  clientsAMigrer: number
  chargeHeures: number
  chargeValorisee: number
  heuresParSemaine: number | null
  caMigration: number
  clientsAbonnes: number
  mrr: number
  arr: number
  caAnneeUn: number
  resteARembourser: number
  paybackMonths: number | null
}

function calculer(inp: Inputs, weeksLeft: number | null): Result {
  const clientsAMigrer = Math.round(inp.nbClients * (inp.pctAMigrer / 100))
  const chargeHeures = clientsAMigrer * inp.heuresParClient
  const chargeValorisee = chargeHeures * inp.tauxHoraire
  const heuresParSemaine = weeksLeft && weeksLeft > 0 ? chargeHeures / weeksLeft : null

  const caMigration = clientsAMigrer * inp.forfaitMigration
  const clientsAbonnes = Math.round(clientsAMigrer * (inp.pctAbonnement / 100))
  const mrr = clientsAbonnes * inp.abonnementMensuel
  const arr = mrr * 12
  const caAnneeUn = caMigration + arr

  // Payback period : le forfait migration couvre-t-il déjà le temps investi ?
  // Sinon, combien de mois de récurrent faut-il pour rembourser le solde ?
  const resteARembourser = Math.max(0, chargeValorisee - caMigration)
  const paybackMonths = resteARembourser === 0 ? 0 : mrr > 0 ? resteARembourser / mrr : null

  return { clientsAMigrer, chargeHeures, chargeValorisee, heuresParSemaine, caMigration, clientsAbonnes, mrr, arr, caAnneeUn, resteARembourser, paybackMonths }
}

// ─── Champ slider + valeur ────────────────────────────────────────
function Field({
  label, value, onChange, min, max, step = 1, format,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  format: (v: number) => string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <label className="text-[13px] font-medium text-ink-2">{label}</label>
        <span className="font-display font-bold text-ink text-[16px] whitespace-nowrap tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full bg-line accent-accent cursor-pointer"
      />
    </div>
  )
}

// ─── Carte résultat ────────────────────────────────────────────────
function StatCard({
  label, value, unit, sub, tone = 'default',
}: {
  label: string
  value: string
  unit?: string
  sub?: string
  tone?: 'default' | 'cost' | 'revenue'
}) {
  const valueColor =
    tone === 'cost' ? '#dc4a2b' : tone === 'revenue' ? '#0a8f4a' : 'var(--color-ink)'

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2">{label}</p>
      <div
        className="font-display font-bold flex items-baseline gap-1.5 leading-[0.95]"
        style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.02em', color: valueColor }}
      >
        {value}
        {unit && <span style={{ fontSize: '0.5em' }}>{unit}</span>}
      </div>
      {sub && <p className="text-[13px] leading-relaxed text-ink-2 mt-2 mb-0">{sub}</p>}
    </div>
  )
}

// ─── Composant principal ───────────────────────────────────────────
export default function SimulateurFactureElectronique() {
  const [inp, setInp] = useState<Inputs>(DEFAULTS)
  const set = (k: keyof Inputs) => (v: number) => setInp((prev) => ({ ...prev, [k]: v }))

  const weeksLeft = useWeeksLeft()
  const r = calculer(inp, weeksLeft)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-[90px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Simulateur · Facturation électronique TPE/PME
          </p>

          <h1
            className="font-display font-bold text-ink m-0 max-w-[920px] mx-auto"
            style={{ fontSize: 'clamp(32px, 4.6vw, 58px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            La facture électronique va te{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, transparent 65%, #f3c6b9 65%)',
                padding: '0 4px',
              }}
            >
              coûter
            </span>{' '}
            du temps — ou te{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)',
                padding: '0 4px',
              }}
            >
              rapporter
            </span>{' '}
            du CA récurrent.
          </h1>

          <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink-2 max-w-[640px] mx-auto mt-7 mb-2">
            D&apos;ici le <strong className="text-ink">1er septembre 2027</strong>, toutes tes clientes TPE/PME devront
            émettre leurs factures au format électronique via une plateforme de dématérialisation (PDP).
            Renseigne ton cabinet ci-dessous&nbsp;: on calcule la charge de travail qui arrive, et ce que tu peux
            en tirer si tu factures l&apos;accompagnement plutôt que de l&apos;offrir.
          </p>

          {weeksLeft !== null && (
            <p className="font-mono text-[11px] text-accent tracking-[0.08em] mt-3">
              ~{num(weeksLeft)} semaines avant l&apos;échéance légale du 1er septembre 2027
            </p>
          )}
        </div>
      </section>

      {/* ── Calculateur ──────────────────────────────────────────── */}
      <section className="pb-16 md:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

            {/* Paramètres */}
            <div className="rounded-2xl border border-line bg-paper p-6 md:p-8">
              <h2 className="font-display font-semibold text-ink text-[18px] m-0 mb-1">Ton cabinet</h2>
              <p className="text-[14px] text-muted mb-6">
                Ajuste les curseurs avec tes propres chiffres.
              </p>

              <div className="flex flex-col gap-6">
                <Field
                  label="Nombre de clients TPE/PME"
                  value={inp.nbClients}
                  onChange={set('nbClients')}
                  min={10} max={500} step={5}
                  format={(v) => `${num(v)} clients`}
                />
                <Field
                  label="Part pas encore prête pour la facturation électronique"
                  value={inp.pctAMigrer}
                  onChange={set('pctAMigrer')}
                  min={0} max={100} step={5}
                  format={(v) => `${v} %`}
                />
                <Field
                  label="Temps d'accompagnement par client (cadrage, paramétrage PDP, formation)"
                  value={inp.heuresParClient}
                  onChange={set('heuresParClient')}
                  min={1} max={8} step={0.5}
                  format={(v) => `${v} h`}
                />
                <Field
                  label="Valorisation horaire de ton temps / celui de ton équipe"
                  value={inp.tauxHoraire}
                  onChange={set('tauxHoraire')}
                  min={30} max={150} step={5}
                  format={(v) => `${num(v)} €/h`}
                />
                <Field
                  label="Forfait d'accompagnement migration (one-shot, par client)"
                  value={inp.forfaitMigration}
                  onChange={set('forfaitMigration')}
                  min={0} max={1000} step={25}
                  format={(v) => eur(v)}
                />
                <Field
                  label="Part des clients migrés qui prennent un abonnement conformité récurrent"
                  value={inp.pctAbonnement}
                  onChange={set('pctAbonnement')}
                  min={0} max={100} step={5}
                  format={(v) => `${v} %`}
                />
                <Field
                  label="Tarif mensuel de cet abonnement conformité"
                  value={inp.abonnementMensuel}
                  onChange={set('abonnementMensuel')}
                  min={0} max={100} step={5}
                  format={(v) => `${eur(v)}/mois`}
                />
              </div>
            </div>

            {/* Résultats */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">

              {/* Bandeau coûter / rapporter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  label="Ce que ça te coûte si tu l'offres"
                  value={eur(r.chargeValorisee)}
                  sub={`${num(r.chargeHeures)} h de travail valorisées à ${num(inp.tauxHoraire)} €/h, sur du temps non facturé.`}
                  tone="cost"
                />
                <StatCard
                  label="Ce que ça peut te rapporter (année 1)"
                  value={eur(r.caAnneeUn)}
                  sub={`${eur(r.caMigration)} de migration facturée + ${eur(r.arr)} de récurrent sur 12 mois.`}
                  tone="revenue"
                />
              </div>

              {/* Détails */}
              <div className="rounded-2xl border border-line bg-white p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-5 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                  Le détail
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
                    <span className="text-[14px] text-ink-2">Clients à migrer avant sept. 2027</span>
                    <span className="font-display font-bold text-ink text-[20px] tabular-nums">{num(r.clientsAMigrer)}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
                    <span className="text-[14px] text-ink-2">Charge de travail totale estimée</span>
                    <span className="font-display font-bold text-ink text-[20px] tabular-nums">{num(r.chargeHeures)} h</span>
                  </div>

                  {r.heuresParSemaine !== null && (
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
                      <span className="text-[14px] text-ink-2">… soit, étalé jusqu&apos;à l&apos;échéance</span>
                      <span className="font-display font-bold text-ink text-[20px] tabular-nums">
                        {r.heuresParSemaine.toFixed(1)} h/semaine
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
                    <span className="text-[14px] text-ink-2">CA migration (one-shot)</span>
                    <span className="font-display font-bold text-ink text-[20px] tabular-nums">{eur(r.caMigration)}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
                    <span className="text-[14px] text-ink-2">Clients sur abonnement conformité</span>
                    <span className="font-display font-bold text-ink text-[20px] tabular-nums">{num(r.clientsAbonnes)}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
                    <span className="text-[14px] text-ink-2">CA récurrent potentiel</span>
                    <span className="font-display font-bold text-[20px] tabular-nums" style={{ color: '#0a8f4a' }}>
                      {eur(r.mrr)}/mois · {eur(r.arr)}/an
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-ink-2">Payback du temps investi</span>
                      <span className="font-display font-bold text-ink text-[20px] tabular-nums">
                        {r.paybackMonths === 0
                          ? 'Immédiat'
                          : r.paybackMonths === null
                            ? '—'
                            : `${r.paybackMonths.toFixed(1)} mois`}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted mt-1.5 mb-0">
                      {r.paybackMonths === 0
                        ? 'Le forfait migration couvre déjà la valeur du temps investi : le récurrent est immédiatement net.'
                        : r.paybackMonths === null
                          ? "Configure un abonnement récurrent pour calculer ton payback."
                          : `Il reste ${eur(r.resteARembourser)} de temps investi non couvert par le forfait migration — couvert en ${r.paybackMonths.toFixed(1)} mois par le récurrent.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-ink text-white p-6 md:p-7 flex flex-col gap-3">
                <p className="font-display font-semibold text-[17px] m-0">
                  Tu veux transformer cette obligation en repricing de ta base&nbsp;?
                </p>
                <p className="text-[14px] text-white/70 m-0">
                  On t&apos;aide à packager l&apos;accompagnement, le pitcher à tes clients et l&apos;encaisser —
                  audit gratuit, 45&nbsp;min.
                </p>
                <Link
                  href={`/facturation-electronique${AUDIT_CTA_HREF}`}
                  className="inline-flex items-center justify-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[13px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group self-start mt-1"
                >
                  Obtenir mon audit gratuit
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mentions */}
          <p className="text-[12px] leading-relaxed text-muted mt-8 max-w-[820px]">
            <strong className="text-ink-2">Estimation indicative</strong> basée sur le calendrier légal en vigueur
            (réception généralisée et émission pour les grandes entreprises/ETI au 1er septembre 2026, émission
            pour les TPE/PME au 1er septembre 2027). Les paramètres par défaut sont des ordres de grandeur à
            ajuster avec la réalité de ton cabinet — cet outil ne remplace pas un chiffrage commercial détaillé.
            {' '}Pour t&apos;organiser semaine par semaine, vois aussi le{' '}
            <Link href="/outils/plan-attaque-60-jours" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              plan d&apos;attaque 60 jours
            </Link>.
          </p>
        </div>
      </section>
    </>
  )
}
