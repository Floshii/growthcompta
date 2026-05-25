import { Resend } from 'resend'
import type { DiagnosticResult, LeadData } from '@/types/quiz'
import { CATEGORY_LABELS } from '@/data/quiz/questions'

export async function sendLeadEmails(
  lead: LeadData,
  result: DiagnosticResult,
  pdfBase64: string | null
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[resend] RESEND_API_KEY not set — skipping emails')
    return
  }

  const resend = new Resend(apiKey)
  const { globalScore, levelConfig } = result
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.fr/audit'

  const attachments = pdfBase64
    ? [{
        filename: `cabinet-growth-score-${(lead.cabinetName || lead.firstName)
          .replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)}.pdf`,
        content: pdfBase64,
      }]
    : []

  // Email to prospect
  await resend.emails.send({
    from: 'GrowthCompta <diagnostic@growthcompta.fr>',
    to: lead.email,
    subject: `Votre Cabinet Growth Score — ${globalScore}/100`,
    html: buildProspectEmail({ lead, globalScore, levelConfig, calendlyUrl }),
    attachments,
  })

  // Internal notification
  const notifTo = process.env.NOTIFICATION_EMAIL ?? 'florent@growthcompta.fr'
  await resend.emails.send({
    from: 'GrowthCompta <noreply@growthcompta.fr>',
    to: notifTo,
    subject: `[Nouveau lead] ${lead.cabinetName || lead.firstName} — ${globalScore}/100`,
    html: buildInternalEmail({ lead, result }),
  })
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildProspectEmail({
  lead, globalScore, levelConfig, calendlyUrl,
}: {
  lead: LeadData
  globalScore: number
  levelConfig: DiagnosticResult['levelConfig']
  calendlyUrl: string
}): string {
  const color = globalScore >= 76 ? '#0a5fbf' : globalScore >= 56 ? '#0a8f4a' : globalScore >= 36 ? '#e85d2b' : '#dc4a2b'

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4efe6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fff;border-radius:12px;overflow:hidden;">
  <tr><td style="background:#1a1a1a;padding:28px 36px;">
    <p style="margin:0;color:#fff;font-size:17px;font-weight:700;">growthcompta</p>
    <p style="margin:4px 0 0;color:#e85d2b;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;">Cabinet Growth Score</p>
  </td></tr>
  <tr><td style="padding:36px;">
    <p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
    <h1 style="margin:0 0 14px;font-size:26px;color:#1a1a1a;font-weight:700;line-height:1.2;">
      Votre rapport Cabinet Growth Score est prêt.
    </h1>
    <p style="margin:0 0 28px;color:#6b6b66;font-size:15px;line-height:1.65;">
      Votre diagnostic complet est en pièce jointe. Retrouvez ci-dessous un résumé de votre score.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f4;border-radius:10px;border:1px solid #e6e1d3;margin-bottom:28px;">
    <tr>
      <td style="padding:24px;text-align:center;border-right:1px solid #e6e1d3;">
        <p style="margin:0 0 4px;color:#6b6b66;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Score global</p>
        <p style="margin:0;font-size:52px;font-weight:700;color:${color};line-height:1;">${globalScore}</p>
        <p style="margin:2px 0 0;color:#6b6b66;font-size:11px;">/100 points</p>
      </td>
      <td style="padding:24px;text-align:center;">
        <p style="margin:0 0 4px;color:#6b6b66;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Niveau</p>
        <p style="margin:0;font-size:16px;font-weight:700;color:#1a1a1a;">${esc(levelConfig.label)}</p>
      </td>
    </tr>
    </table>
    <table width="100%"><tr><td align="center" style="padding-bottom:28px;">
      <a href="${esc(calendlyUrl)}" style="display:inline-block;background:#e85d2b;color:#fff;font-size:15px;font-weight:700;padding:15px 30px;border-radius:99px;text-decoration:none;">
        Réserver mon audit stratégique gratuit →
      </a>
      <p style="margin:10px 0 0;color:#6b6b66;font-size:12px;">30 min · Gratuit · Sans engagement</p>
    </td></tr></table>
    <p style="margin:0;color:#a8a8a0;font-size:11px;border-top:1px solid #e6e1d3;padding-top:20px;">
      Vous recevez cet email car vous avez complété le Cabinet Growth Score sur growthcompta.fr.
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

function buildInternalEmail({
  lead, result,
}: {
  lead: LeadData
  result: DiagnosticResult
}): string {
  const { globalScore, levelConfig, categoryScores } = result
  const dimRows = (Object.entries(categoryScores) as [string, number][])
    .map(([cat, score], i) => {
      const max = { visibility: 15, positioning: 15, conversion: 15, acquisition: 15, content: 10, crm: 10, automation: 10, reputation: 10 }[cat] ?? 10
      const pct = Math.round((score / max) * 100)
      const color = pct >= 70 ? '#0a8f4a' : pct >= 40 ? '#e85d2b' : '#dc4a2b'
      return `<tr style="${i % 2 ? '' : 'background:#faf8f4;'}">
        <td style="padding:8px 14px;color:#6b6b66;font-size:13px;">${esc(CATEGORY_LABELS[cat] ?? cat)}</td>
        <td style="padding:8px 14px;font-weight:700;color:${color};font-size:13px;">${score}/${max} — ${pct}%</td>
      </tr>`
    }).join('')

  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:24px;background:#f4efe6;font-family:Helvetica,Arial,sans-serif;">
<div style="max-width:560px;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e6e1d3;">
  <div style="background:#1a1a1a;padding:20px 24px;">
    <p style="margin:0;color:#e85d2b;font-size:9px;text-transform:uppercase;letter-spacing:0.15em;">Nouveau lead — Cabinet Growth Score</p>
    <h2 style="margin:6px 0 0;font-size:20px;color:#fff;font-weight:700;">${esc(lead.cabinetName || lead.firstName)} — Score ${globalScore}/100</h2>
  </div>
  <div style="padding:24px;">
    <table width="100%" style="border-collapse:collapse;margin-bottom:20px;border:1px solid #e6e1d3;border-radius:8px;overflow:hidden;">
      ${[['Prénom', lead.firstName], ['Email', lead.email], ['Téléphone', lead.phone], ['Cabinet', lead.cabinetName || '—'], ['Ville', lead.city || '—'], ['Niveau', levelConfig.label]]
        .map(([k, v], i) => `<tr style="${i % 2 ? '' : 'background:#faf8f4;'}"><td style="padding:9px 14px;color:#6b6b66;font-size:13px;width:40%;">${k}</td><td style="padding:9px 14px;font-size:13px;">${esc(v)}</td></tr>`)
        .join('')}
    </table>
    <h3 style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:#1a1a1a;">Scores par dimension</h3>
    <table width="100%" style="border-collapse:collapse;border:1px solid #e6e1d3;border-radius:8px;overflow:hidden;">
      ${dimRows}
    </table>
  </div>
</div>
</body></html>`
}
