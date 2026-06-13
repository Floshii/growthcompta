'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { AUDIT_CTA_HREF } from '@/components/sections/audit2026/Hero'

/* ================================================================
   Échéance légale : 1er septembre 2026 (réception généralisée +
   émission pour les grandes entreprises/ETI). Même échéance que
   le countdown de la campagne /facturation-electronique.
   ================================================================ */
const DEADLINE = new Date('2026-09-01T00:00:00+02:00').getTime()
const DAY = 86_400_000
const WEEK = 7 * DAY

function getNow(): number | null {
  if (typeof window === 'undefined') return null
  return Date.now()
}

function subscribe(callback: () => void): () => void {
  const interval = setInterval(callback, 3_600_000)
  return () => clearInterval(interval)
}

/** Horodatage courant — null côté serveur (évite le mismatch d'hydratation) */
function useNow(): number | null {
  return useSyncExternalStore(subscribe, getNow, () => null)
}

const fmtDate = (ts: number) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(new Date(ts))

const num = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n))

// ─── La feuille de route : 8 semaines + jour J ───────────────────
interface Milestone {
  code: string
  weeksBefore: number
  phase: string
  tasks: string[]
}

const ROADMAP: Milestone[] = [
  {
    code: 'S-8',
    weeksBefore: 8,
    phase: 'Cadrage & segmentation',
    tasks: [
      'Lister tous les clients TPE/PME et identifier ceux sans solution de facturation électronique.',
      'Segmenter par taille, secteur et niveau de maturité digitale.',
      "Repérer les comptes à fort volume de factures ou ERP complexe — ce sont les priorités.",
    ],
  },
  {
    code: 'S-7',
    weeksBefore: 7,
    phase: 'Choix de la PDP & construction de l\'offre',
    tasks: [
      'Sélectionner 1 à 2 plateformes de dématérialisation partenaires (PDP) à recommander.',
      'Négocier les conditions cabinet (tarifs préférentiels, support dédié).',
      "Construire la grille tarifaire de l'accompagnement (forfait migration + abonnement conformité).",
    ],
  },
  {
    code: 'S-6',
    weeksBefore: 6,
    phase: 'Lancement de la communication',
    tasks: [
      "Envoyer l'email 1 du kit (sensibilisation et pédagogie sur l'obligation légale).",
      "Préparer le script d'appel pour les relances téléphoniques.",
      'Créer un support visuel d\'une page expliquant le calendrier légal.',
    ],
  },
  {
    code: 'S-5',
    weeksBefore: 5,
    phase: 'Vague 1 : comptes prioritaires',
    tasks: [
      "Envoyer l'email 2, ciblé sur les comptes prioritaires (volumes élevés, échéance la plus proche).",
      'Caler les premiers rendez-vous de présentation et de devis.',
      'Démarrer les paramétrages PDP pour les comptes qui valident vite.',
    ],
  },
  {
    code: 'S-4',
    weeksBefore: 4,
    phase: 'Rendez-vous & signatures',
    tasks: [
      "Tenir les rendez-vous calés : présenter l'offre et la grille tarifaire.",
      "Envoyer l'email 3 (relance avec preuve sociale / premiers cas clients migrés).",
      "Signer les premiers avenants ou contrats d'accompagnement.",
    ],
  },
  {
    code: 'S-3',
    weeksBefore: 3,
    phase: 'Vague 2 : reste de la base',
    tasks: [
      "Envoyer l'email 4 à l'ensemble des clients n'ayant pas encore répondu.",
      "Relancer par téléphone (script d'appel) les comptes stratégiques sans réponse.",
      'Démarrer les paramétrages PDP pour les comptes signés en vague 1.',
    ],
  },
  {
    code: 'S-2',
    weeksBefore: 2,
    phase: 'Formation & paramétrage en série',
    tasks: [
      'Former l\'équipe interne au support PDP et aux questions clients les plus fréquentes.',
      'Paramétrer en série les comptes signés (process industrialisé).',
      "Envoyer l'email 5 — la dernière relance, ton \"dernier wagon\".",
    ],
  },
  {
    code: 'S-1',
    weeksBefore: 1,
    phase: 'Derniers réglages',
    tasks: [
      'Finaliser les paramétrages restants et lancer des envois de factures tests.',
      'Vérifier la conformité des comptes prioritaires (factures de test acceptées par la PDP).',
      'Préparer la communication "vous êtes prêts" envoyée le jour J.',
    ],
  },
  {
    code: 'Jour J',
    weeksBefore: 0,
    phase: 'Bascule',
    tasks: [
      'Bascule effective : premières factures électroniques envoyées en conditions réelles.',
      'Monitoring des rejets / erreurs et support réactif aux clients migrés.',
      'Capitaliser : transformer chaque migration réussie en avis client et en témoignage.',
    ],
  },
]

type Status = 'loading' | 'past' | 'current' | 'future'

function getStatus(now: number | null, weekStart: number, weekEnd: number): Status {
  if (now === null) return 'loading'
  if (now > weekEnd) return 'past'
  if (now >= weekStart) return 'current'
  return 'future'
}

const STATUS_META: Record<Status, { label: string; badge: string; ring: string }> = {
  loading: { label: '', badge: 'bg-line text-muted', ring: 'border-line' },
  past:    { label: '⚠ En retard', badge: 'bg-[#dc4a2b]/10 text-[#dc4a2b]', ring: 'border-[#dc4a2b]/30' },
  current: { label: '● Cette semaine', badge: 'bg-accent text-white', ring: 'border-accent' },
  future:  { label: 'À venir', badge: 'bg-paper text-muted', ring: 'border-line' },
}

export default function PlanAttaque60Jours() {
  const now = useNow()
  const daysLeft = now !== null ? Math.ceil((DEADLINE - now) / DAY) : null
  const sprintStart = DEADLINE - 8 * WEEK

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-[90px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6 inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Plan d&apos;attaque · 60 jours avant l&apos;échéance
          </p>

          <h1
            className="font-display font-bold text-ink m-0 max-w-[920px] mx-auto"
            style={{ fontSize: 'clamp(32px, 4.6vw, 58px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Tu as 8 semaines.{' '}
            <span style={{ background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)', padding: '0 4px' }}>
              Voici l&apos;ordre exact.
            </span>
          </h1>

          <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink-2 max-w-[640px] mx-auto mt-7 mb-2">
            La roadmap semaine par semaine pour transformer l&apos;obligation de facturation électronique en
            campagne de repricing avant le <strong className="text-ink">1er septembre 2026</strong>. Daté
            automatiquement selon la date du jour&nbsp;: pas de calcul à faire.
          </p>

          {daysLeft !== null && (
            <p className="font-mono text-[11px] text-accent tracking-[0.08em] mt-3">
              J-{num(Math.max(0, daysLeft))} avant l&apos;échéance légale du 1er septembre 2026
            </p>
          )}
        </div>
      </section>

      {/* ── Bandeau de positionnement ─────────────────────────── */}
      <section className="pb-10">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="rounded-2xl border border-line bg-paper p-6 md:p-7">
            {now === null ? (
              <p className="text-[15px] text-ink-2 m-0">Calcul de ta position dans le calendrier…</p>
            ) : daysLeft !== null && now < sprintStart ? (
              <p className="text-[15px] leading-relaxed text-ink-2 m-0">
                <strong className="text-ink">Tu as de la marge.</strong> Le sprint de 60 jours démarre le{' '}
                <strong className="text-ink">{fmtDate(sprintStart)}</strong>, dans{' '}
                {num(Math.ceil((sprintStart - now) / WEEK))} semaines. Tu peux commencer en avance — chaque
                semaine d&apos;avance est une semaine de moins en mode panique. Voici la feuille de route complète.
              </p>
            ) : now <= DEADLINE ? (
              <p className="text-[15px] leading-relaxed text-ink-2 m-0">
                <strong className="text-ink">Tu es en plein sprint.</strong> La semaine surlignée ci-dessous est
                celle où tu devrais te trouver aujourd&apos;hui. Les semaines marquées « en retard » sont à
                rattraper en priorité — sans bloquer la suite.
              </p>
            ) : (
              <p className="text-[15px] leading-relaxed text-ink-2 m-0">
                <strong className="text-ink">L&apos;échéance légale est passée.</strong> Priorité absolue&nbsp;:
                finaliser la bascule des comptes restants, gérer les rejets en urgence, et capitaliser sur les
                migrations réussies pour vendre l&apos;accompagnement à ceux qui restent.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="pb-16 md:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="flex flex-col gap-4">
            {ROADMAP.map((m) => {
              const weekStart = DEADLINE - m.weeksBefore * WEEK
              const weekEnd = m.weeksBefore === 0 ? weekStart : weekStart + 6 * DAY
              const status = getStatus(now, weekStart, weekEnd)
              const meta = STATUS_META[status]
              const dateLabel = m.weeksBefore === 0
                ? `Le ${fmtDate(weekStart)}`
                : `Semaine du ${fmtDate(weekStart)} au ${fmtDate(weekEnd)}`

              return (
                <div
                  key={m.code}
                  className={`rounded-2xl border bg-white p-6 md:p-7 ${status === 'current' ? meta.ring : 'border-line'}`}
                  style={status === 'current' ? { borderWidth: 2 } : undefined}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-ink text-[15px]">{m.code}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{dateLabel}</span>
                    </div>
                    {status !== 'loading' && (
                      <span className={`font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${meta.badge}`}>
                        {meta.label}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-ink text-[18px] m-0 mb-3">{m.phase}</h3>

                  <ul className="flex flex-col gap-1.5 m-0 pl-5 list-disc">
                    {m.tasks.map((t) => (
                      <li key={t} className="text-[14px] leading-relaxed text-ink-2">{t}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-ink text-white p-6 md:p-7 flex flex-col gap-3 mt-8">
            <p className="font-display font-semibold text-[17px] m-0">
              Tu veux qu&apos;on exécute cette roadmap avec toi&nbsp;?
            </p>
            <p className="text-[14px] text-white/70 m-0">
              Grille tarifaire, séquences emails et scripts d&apos;appel prêts à l&apos;emploi — audit gratuit, 45&nbsp;min.
            </p>
            <Link
              href={`/facturation-electronique${AUDIT_CTA_HREF}`}
              className="inline-flex items-center justify-center gap-2.5 bg-accent text-white font-medium text-[15px] px-[24px] py-[13px] rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group self-start mt-1"
            >
              Obtenir mon audit gratuit
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </div>

          <p className="text-[12px] leading-relaxed text-muted mt-8 max-w-[820px]">
            <strong className="text-ink-2">Plan indicatif</strong> basé sur l&apos;échéance légale du 1er
            septembre 2026 (réception généralisée des factures électroniques et émission obligatoire pour les
            grandes entreprises/ETI). Pour la migration des TPE/PME (émission obligatoire au 1er septembre 2027),
            utilise le{' '}
            <Link href="/outils/simulateur-facture-electronique" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              simulateur de charge et de CA potentiel
            </Link>.
          </p>
        </div>
      </section>
    </>
  )
}
