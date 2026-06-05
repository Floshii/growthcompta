/**
 * resend-nurturing.ts
 *
 * Email templates for the 4-step nurturing sequence.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  HOW TO WRITE THE CONTENT (in a separate conversation)
 *  ─────────────────────────────────────────────────────
 *  Each email has a clearly delimited CONTENU block.
 *  Replace the [PLACEHOLDER] paragraphs with real copy.
 *  The dynamic variables already injected are listed above
 *  each block. See /docs/nurturing-brief.md for full brief.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { Resend } from 'resend'
import type { NurturingLead } from './notion-nurturing'

// ── Brand helpers ─────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const BASE_URL = 'https://growthcompta.com'

function emailWrapper(preheader: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#f4efe6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(preheader)}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

  <tr><td style="background:#1a1a1a;padding:24px 36px;border-radius:12px 12px 0 0;">
    <p style="margin:0;color:#fff;font-size:16px;font-weight:700;letter-spacing:-0.01em;">growthcompta</p>
    <p style="margin:3px 0 0;color:#e85d2b;font-size:9px;text-transform:uppercase;letter-spacing:0.15em;">Cabinet Growth Score</p>
  </td></tr>

  <tr><td style="background:#fff;padding:36px;border-radius:0 0 12px 12px;">
    ${bodyHtml}
    <p style="margin:32px 0 0;color:#a8a8a0;font-size:11px;border-top:1px solid #f0ebe3;padding-top:20px;line-height:1.6;">
      GrowthCompta &middot; <a href="${BASE_URL}" style="color:#a8a8a0;text-decoration:none;">growthcompta.com</a><br>
      Vous recevez cet email suite à votre Cabinet Growth Score.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function ctaButton(url: string, label: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0"><tr>
  <td align="center" style="padding:24px 0 8px;">
    <a href="${esc(url)}" style="display:inline-block;background:#e85d2b;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:99px;text-decoration:none;">${esc(label)} →</a>
    <p style="margin:10px 0 0;color:#a8a8a0;font-size:11px;">30 min &middot; Gratuit &middot; Sans engagement</p>
  </td>
</tr></table>`
}

function articleCard(slug: string, title: string): string {
  const url = `${BASE_URL}/blog/${esc(slug)}`
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e1d3;border-radius:8px;overflow:hidden;margin-bottom:20px;">
  <tr><td style="padding:16px 20px;background:#faf8f4;">
    <p style="margin:0 0 6px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Article recommandé pour vous</p>
    <a href="${url}" style="color:#1a1a1a;font-size:15px;font-weight:600;text-decoration:none;line-height:1.35;">${esc(title)}</a><br>
    <a href="${url}" style="color:#e85d2b;font-size:12px;text-decoration:none;display:inline-block;margin-top:8px;">Lire l'article →</a>
  </td></tr>
</table>`
}

// ── Email J+1 — "Votre point le plus faible" ─────────────────────────────────
//
//  Variables disponibles :
//    lead.firstName          → prénom
//    lead.weakest3LabelsFr[0] → ex. "CRM & Relance"
//    lead.weakest3LabelsFr[1] → 2ème dimension faible
//    lead.weakest3LabelsFr[2] → 3ème dimension faible
//    lead.globalScore         → ex. 42
//    lead.levelLabel          → ex. "Cabinet émergent"
//    lead.articles[0].slug / .title → article recommandé sur la dim. la + faible
//
function buildJ1Html(lead: NurturingLead, _calendlyUrl: string): string {
  const weakest    = lead.weakest3LabelsFr[0] ?? 'Acquisition'
  const article    = lead.articles[0]

  return emailWrapper(
    `Votre point le plus faible : ${weakest} — et ce que font les cabinets avancés`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 20px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  Votre point le plus faible&nbsp;: <span style="color:#e85d2b;">${esc(weakest)}</span>
</h1>

<!-- ─── CONTENU J1 ───────────────────────────────────────────────────────
  But : expliquer pourquoi cette dimension est critique, ce que ça coûte
  de la négliger, et ce que font les cabinets qui l'ont adressée.
  Ton : direct, bienveillant, pas de vente. 3-4 paragraphes courts.
  Finir sur un bridge vers l'article ci-dessous.
─────────────────────────────────────────────────────────────────────── -->
<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  [PLACEHOLDER — contenu principal email J+1]
</p>
<!-- ─── FIN CONTENU J1 ─────────────────────────────────────────────── -->

${article ? articleCard(article.slug, article.title) : ''}
`,
  )
}

// ── Email J+3 — "Les cabinets en situation X font ça" ────────────────────────
//
//  Variables disponibles :
//    lead.quadrantId         → 'demand-constrained' | 'supply-constrained' | 'scale-ready' | 'restructure'
//    lead.quadrantLabelFr    → ex. "Capacité sous-exploitée"
//    lead.firstName
//    lead.articles[1].slug / .title → article recommandé sur la 2ème dim. faible
//
//  Note : écrire 4 variantes de texte (une par quadrant), en les séparant
//  par des commentaires conditionnels si besoin, ou via une fonction switch.
//
function buildJ3Html(lead: NurturingLead, _calendlyUrl: string): string {
  const article = lead.articles[1]

  return emailWrapper(
    `Les cabinets "${lead.quadrantLabelFr}" — ce qu'ils font en premier`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 20px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  Les cabinets <span style="color:#e85d2b;">&laquo;&thinsp;${esc(lead.quadrantLabelFr)}&thinsp;&raquo;</span> font ça en premier.
</h1>

<!-- ─── CONTENU J3 ───────────────────────────────────────────────────────
  But : expliquer leur quadrant (${lead.quadrantId}), ce que ça signifie
  concrètement, et les 2-3 premières actions prioritaires pour leur profil.
  4 profils à rédiger :
    - demand-constrained  → manque de leads, tout à construire en amont
    - supply-constrained  → trop de travail, risque de dégradation qualité
    - scale-ready         → bonnes bases, objectif industrialiser
    - restructure         → fondations à solidifier avant d'accélérer
  Ton : stratégique, concret, preuves par l'exemple. 3-4 paragraphes.
─────────────────────────────────────────────────────────────────────── -->
<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  [PLACEHOLDER — contenu principal email J+3, profil ${esc(lead.quadrantId)}]
</p>
<!-- ─── FIN CONTENU J3 ─────────────────────────────────────────────── -->

${article ? articleCard(article.slug, article.title) : ''}
`,
  )
}

// ── Email J+7 — "3 actions concrètes" ────────────────────────────────────────
//
//  Variables disponibles :
//    lead.weakest3LabelsFr[0/1/2] → les 3 dimensions faibles (labels FR)
//    lead.firstName
//    lead.articles[2].slug / .title → article recommandé sur la 3ème dim. faible
//
function buildJ7Html(lead: NurturingLead, _calendlyUrl: string): string {
  const [w0, w1, w2] = lead.weakest3LabelsFr
  const article = lead.articles[2]

  return emailWrapper(
    `3 actions concrètes cette semaine — taillées pour votre situation`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 24px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  3 actions concrètes pour cette semaine.
</h1>

<!-- ─── CONTENU J7 ───────────────────────────────────────────────────────
  But : 3 quick wins actionnables, un par dimension faible.
  Format pour chacune :
    Titre de l'action (gras, accroché sur la dim.)
    2-3 lignes d'explication concrète
    Impact attendu en une phrase
  Les 3 dimensions de ce lead : ${esc(w0 ?? '?')} / ${esc(w1 ?? '?')} / ${esc(w2 ?? '?')}
  Chaque action doit être faisable en < 2h cette semaine.
  Ton : coach, zéro fioriture.
─────────────────────────────────────────────────────────────────────── -->

<p style="margin:0 0 4px;color:#6b6b66;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Action 1 &middot; ${esc(w0 ?? 'Acquisition')}</p>
<p style="margin:0 0 20px;color:#3d3d3a;font-size:15px;line-height:1.75;">[PLACEHOLDER — action 1]</p>

<p style="margin:0 0 4px;color:#6b6b66;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Action 2 &middot; ${esc(w1 ?? 'Visibilité')}</p>
<p style="margin:0 0 20px;color:#3d3d3a;font-size:15px;line-height:1.75;">[PLACEHOLDER — action 2]</p>

<p style="margin:0 0 4px;color:#6b6b66;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Action 3 &middot; ${esc(w2 ?? 'CRM')}</p>
<p style="margin:0 0 20px;color:#3d3d3a;font-size:15px;line-height:1.75;">[PLACEHOLDER — action 3]</p>

<!-- ─── FIN CONTENU J7 ─────────────────────────────────────────────── -->

${article ? articleCard(article.slug, article.title) : ''}
`,
  )
}

// ── Email J+14 — CTA commercial ───────────────────────────────────────────────
//
//  Variables disponibles :
//    lead.firstName
//    lead.globalScore    → ex. 42
//    lead.levelLabel     → ex. "Cabinet émergent"
//    lead.cabinetName    → ex. "Cabinet Dupont"
//    calendlyUrl         → lien de prise de RDV
//
function buildJ14Html(lead: NurturingLead, calendlyUrl: string): string {
  const scoreColor = lead.globalScore >= 76 ? '#0a5fbf'
    : lead.globalScore >= 56 ? '#0a8f4a'
    : lead.globalScore >= 36 ? '#e85d2b'
    : '#dc4a2b'

  return emailWrapper(
    `Votre score de ${lead.globalScore}/100 — on en parle ?`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 24px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  On peut en parler&nbsp;?
</h1>

<table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f4;border:1px solid #e6e1d3;border-radius:10px;margin-bottom:24px;">
<tr>
  <td style="padding:20px 24px;text-align:center;border-right:1px solid #e6e1d3;">
    <p style="margin:0 0 4px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Votre score</p>
    <p style="margin:0;font-size:48px;font-weight:700;color:${scoreColor};line-height:1;">${lead.globalScore}</p>
    <p style="margin:2px 0 0;color:#6b6b66;font-size:11px;">/100 points</p>
  </td>
  <td style="padding:20px 24px;text-align:center;">
    <p style="margin:0 0 4px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Niveau</p>
    <p style="margin:0;font-size:15px;font-weight:700;color:#1a1a1a;">${esc(lead.levelLabel)}</p>
  </td>
</tr>
</table>

<!-- ─── CONTENU J14 ──────────────────────────────────────────────────────
  But : email commercial court et humain. 6-8 lignes max.
  Rappeler le score et le niveau, proposer un appel de 30 min pour
  transformer le diagnostic en plan d'action concret avec GrowthCompta.
  Ton : direct, chaleureux, sans pression. Pas de liste à puces.
  Finir sur le bouton Calendly ci-dessous.
─────────────────────────────────────────────────────────────────────── -->
<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  [PLACEHOLDER — texte principal email J+14]
</p>
<!-- ─── FIN CONTENU J14 ────────────────────────────────────────────── -->

${ctaButton(calendlyUrl, 'Réserver mon audit stratégique gratuit')}
`,
  )
}

// ── Step registry — single source of truth ────────────────────────────────────

export interface NurturingStep {
  day:          number
  notionColumn: string
  subject:      (lead: NurturingLead) => string
  buildHtml:    (lead: NurturingLead, calendlyUrl: string) => string
}

export const NURTURING_STEPS: NurturingStep[] = [
  {
    day: 1,
    notionColumn: 'Nurturing J1',
    subject: (l) =>
      `${l.firstName}, votre point le plus faible : ${l.weakest3LabelsFr[0] ?? 'Acquisition'}`,
    buildHtml: buildJ1Html,
  },
  {
    day: 3,
    notionColumn: 'Nurturing J3',
    subject: (l) =>
      `Les cabinets « ${l.quadrantLabelFr} » — ce qu’ils font en premier`,
    buildHtml: buildJ3Html,
  },
  {
    day: 7,
    notionColumn: 'Nurturing J7',
    subject: (l) =>
      `3 actions concrètes pour cette semaine, ${l.firstName}`,
    buildHtml: buildJ7Html,
  },
  {
    day: 14,
    notionColumn: 'Nurturing J14',
    subject: (l) =>
      `${l.firstName} — on peut en parler ? (score : ${l.globalScore}/100)`,
    buildHtml: buildJ14Html,
  },
]

// ── Send function ─────────────────────────────────────────────────────────────

/**
 * Sends one nurturing email for a given step.
 * Returns true if the email was accepted by Resend, false otherwise.
 */
export async function sendNurturingEmail(
  lead: NurturingLead,
  step: NurturingStep,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[resend-nurturing] RESEND_API_KEY not set')
    return false
  }

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.com/cabinet-growth-score'
  const replyTo     = process.env.NOTIFICATION_EMAIL  // replies go to your inbox

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from:     'GrowthCompta <diagnostic@growthcompta.com>',
    to:       lead.email,
    replyTo:  replyTo,
    subject:  step.subject(lead),
    html:     step.buildHtml(lead, calendlyUrl),
  })

  if (result.error) {
    console.error(`[resend-nurturing] J+${step.day} failed for ${lead.email}:`, result.error)
    return false
  }

  console.log(`[resend-nurturing] J+${step.day} sent to ${lead.email} (${lead.firstName})`)
  return true
}
