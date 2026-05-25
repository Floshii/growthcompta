import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { DiagnosticResult } from '@/types/quiz'
import { insertLeadToNotion } from '@/lib/notion-client'
import { sendLeadEmails } from '@/lib/resend-client'

const LeadSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  cabinetName: z.string().default(''),
  city: z.string().default(''),
})

const CategoryScoresSchema = z.object({
  visibility:  z.number(),
  positioning: z.number(),
  conversion:  z.number(),
  acquisition: z.number(),
  content:     z.number(),
  crm:         z.number(),
  automation:  z.number(),
  reputation:  z.number(),
})

const ResultSchema = z.object({
  globalScore: z.number().min(0).max(100),
  categoryScores: CategoryScoresSchema,
  level: z.enum(['invisible', 'traditional', 'growing', 'structured', 'dominant']),
  levelConfig: z.object({
    id: z.enum(['invisible', 'traditional', 'growing', 'structured', 'dominant']),
    label: z.string(),
    tone: z.enum(['red', 'orange', 'green', 'blue']),
    headline: z.string(),
    sub: z.string(),
    range: z.tuple([z.number(), z.number()]),
  }),
  quickWins: z.array(z.object({
    title: z.string(),
    description: z.string(),
    impact: z.enum(['high', 'medium']),
    speed: z.enum(['quick', 'medium', 'long']),
  })),
  roadmap: z.array(z.object({
    title: z.string(),
    period: z.enum(['30', '60', '90']),
  })),
  qualification: z.record(z.string()).default({}),
})

const BodySchema = z.object({
  lead: LeadSchema,
  result: ResultSchema,
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
  }

  const { lead, result: rawResult } = parsed.data
  const result = rawResult as unknown as DiagnosticResult
  const errors: string[] = []

  // 1. Notion insert
  try {
    await insertLeadToNotion(lead, result)
  } catch (err) {
    console.error('[submit-lead] Notion:', err)
    errors.push('notion')
  }

  // 2. Generate PDF + send emails
  let pdfBase64: string | null = null
  try {
    pdfBase64 = await generatePdfBase64({ lead, result: rawResult })
  } catch (err) {
    console.error('[submit-lead] PDF:', err)
    errors.push('pdf')
  }

  try {
    await sendLeadEmails(lead, result, pdfBase64)
  } catch (err) {
    console.error('[submit-lead] Resend:', err)
    errors.push('email')
  }

  return NextResponse.json({ success: true, errors })
}

// ── PDF generation with pdfkit ──────────────────────────────────
async function generatePdfBase64({
  lead, result,
}: {
  lead: z.infer<typeof LeadSchema>
  result: z.infer<typeof ResultSchema>
}): Promise<string> {
  // Dynamic import keeps pdfkit server-side only
  const PDFDocument = (await import('pdfkit')).default
  const { globalScore, levelConfig, categoryScores, quickWins, roadmap } = result

  const CATEGORY_LABELS: Record<string, string> = {
    visibility: 'Visibilité Google', positioning: 'Positionnement',
    conversion: 'Site & Conversion', acquisition: 'Acquisition & Leads',
    content: 'Contenu & Autorité', crm: 'CRM & Relance',
    automation: 'Automation & IA', reputation: 'Réputation & Preuves',
  }
  const CATEGORY_MAX: Record<string, number> = {
    visibility: 15, positioning: 15, conversion: 15, acquisition: 15,
    content: 10, crm: 10, automation: 10, reputation: 10,
  }

  const INK = '#1a1a1a'; const ACCENT = '#e85d2b'; const MUTED = '#6b6b66'
  const LINE = '#e6e1d3'; const PAPER = '#faf8f4'
  const GOOD = '#0a8f4a'; const WARN = '#e85d2b'; const BAD = '#dc4a2b'
  const W = 595.28; const M = 50; const CW = W - M * 2

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 0, bufferPages: true })
    const chunks: Buffer[] = []
    doc.on('data', c => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks).toString('base64')))
    doc.on('error', reject)

    // PAGE 1: COVER
    doc.rect(0, 0, W, 841.89).fill(INK)
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(11).text('GROWTHCOMPTA', M, 52, { characterSpacing: 3 })
    doc.fillColor(ACCENT).font('Helvetica').fontSize(9).text('CABINET GROWTH SCORE — RAPPORT DE DIAGNOSTIC', M, 72, { characterSpacing: 1.5 })
    const scoreColor = globalScore >= 76 ? '#4a9fff' : globalScore >= 56 ? GOOD : globalScore >= 36 ? WARN : BAD
    doc.fillColor(scoreColor).font('Helvetica-Bold').fontSize(140).text(String(globalScore), M, 155, { characterSpacing: -4 })
    doc.fillColor('#ffffff44').font('Helvetica').fontSize(28).text('/100', M + 185, 240)
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(22).text(levelConfig.label, M, 330)
    doc.fillColor('#ffffff66').font('Helvetica').fontSize(13)
      .text(`${lead.cabinetName || lead.firstName}${lead.city ? ' · ' + lead.city : ''}`, M, 370)
      .text(new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }), M, 390)
    doc.fillColor(ACCENT).rect(M, 800, CW, 1.5).fill()
    doc.fillColor('#ffffff33').font('Helvetica').fontSize(9).text('Confidentiel — usage exclusif du cabinet destinataire.', M, 814, { align: 'center', width: CW })

    // PAGE 2: DIMENSION SCORES
    doc.addPage()
    doc.fillColor(ACCENT).font('Helvetica').fontSize(9).text('PROFIL DE MATURITE', M, 52, { characterSpacing: 1.5 })
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(28).text('Score par dimension', M, 70)
    doc.fillColor(MUTED).font('Helvetica').fontSize(12).text(`Score global : ${globalScore}/100 · ${levelConfig.label}`, M, 110)
    let y = 150
    ;(Object.entries(categoryScores) as [string, number][]).forEach(([cat, score]) => {
      const max = CATEGORY_MAX[cat] ?? 10
      const pct = Math.round((score / max) * 100)
      const color = pct >= 70 ? GOOD : pct >= 40 ? WARN : BAD
      const verdict = pct >= 70 ? 'Solide' : pct >= 40 ? 'A renforcer' : 'Levier prioritaire'
      doc.fillColor(INK).font('Helvetica-Bold').fontSize(12).text(CATEGORY_LABELS[cat] ?? cat, M, y)
      doc.fillColor(MUTED).font('Helvetica').fontSize(10).text(verdict, M, y + 16)
      doc.fillColor(color).font('Helvetica-Bold').fontSize(16).text(`${score}/${max}`, W - M - 60, y, { width: 60, align: 'right' })
      doc.roundedRect(M, y + 34, CW, 8, 4).fill('#f0ebde')
      if (pct > 0) doc.roundedRect(M, y + 34, Math.max(8, CW * pct / 100), 8, 4).fill(color)
      y += 62
    })

    // PAGE 3: QUICK WINS
    doc.addPage()
    doc.fillColor(ACCENT).font('Helvetica').fontSize(9).text('A LANCER CETTE SEMAINE', M, 52, { characterSpacing: 1.5 })
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(28).text('Vos 3 quick wins prioritaires', M, 70)
    y = 130
    quickWins.slice(0, 3).forEach((qw, i) => {
      doc.roundedRect(M, y, CW, 120, 8).fill(PAPER)
      doc.roundedRect(M, y, CW, 120, 8).stroke(LINE)
      doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(9).text(`0${i + 1}`, M + 20, y + 20, { characterSpacing: 2 })
      doc.fillColor(INK).font('Helvetica-Bold').fontSize(14).text(qw.title, M + 20, y + 36, { width: CW - 40 })
      const titleH = doc.heightOfString(qw.title, { width: CW - 40 })
      doc.fillColor(MUTED).font('Helvetica').fontSize(11).text(qw.description, M + 20, y + 36 + titleH + 6, { width: CW - 40 })
      y += 138
    })

    // PAGE 4: ROADMAP
    doc.addPage()
    doc.fillColor(ACCENT).font('Helvetica').fontSize(9).text("PLAN D'ACTION", M, 52, { characterSpacing: 1.5 })
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(28).text('Votre roadmap 30 / 60 / 90 jours', M, 70)
    y = 130
    ;[['30', BAD, 'Stop the bleeding'], ['60', WARN, 'Build the engine'], ['90', GOOD, 'Scale & compound']].forEach(([period, color, label]) => {
      const items = roadmap.filter(r => r.period === period)
      doc.circle(M + 6, y + 8, 6).fill(color)
      doc.fillColor(INK).font('Helvetica-Bold').fontSize(15).text(`${period} jours`, M + 22, y)
      doc.fillColor(MUTED).font('Helvetica').fontSize(11).text(label, M + 22, y + 20)
      items.forEach((item, j) => {
        doc.fillColor(INK).font('Helvetica').fontSize(11).text(`—  ${item.title}`, M + 32, y + 44 + j * 20)
      })
      y += 44 + items.length * 20 + 28
    })

    // PAGE 5: CTA
    doc.addPage()
    doc.rect(0, 0, W, 841.89).fill(INK)
    doc.fillColor(ACCENT).font('Helvetica').fontSize(9).text('ETAPE SUIVANTE', M, 52, { characterSpacing: 1.5 })
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(36).text("Passez a l'action.", M, 90, { lineGap: 8 })
    doc.fillColor('#ffffff77').font('Helvetica').fontSize(14)
      .text("En 30 minutes, on vous montre exactement quoi mettre en place\npour generer des rendez-vous qualifies — base sur votre score.", M, 190, { lineGap: 6, width: CW })
    ;['30 min · 100% gratuit', 'Sans engagement', 'Base sur votre diagnostic'].forEach((b, i) => {
      doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(14).text('/', M, 280 + i * 28)
      doc.fillColor('#fff').font('Helvetica').fontSize(13).text(b, M + 18, 282 + i * 28)
    })
    doc.roundedRect(M, 380, 280, 50, 8).fill(ACCENT)
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(13).text('Reserver mon audit strategique', M, 400, { width: 280, align: 'center' })
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'growthcompta.fr/audit'
    doc.fillColor('#ffffff55').font('Helvetica').fontSize(11).text(url, M, 448)
    doc.fillColor(ACCENT).rect(M, 760, CW, 1.5).fill()
    doc.fillColor('#ffffff33').font('Helvetica').fontSize(9).text('GrowthCompta · diagnostic@growthcompta.fr · growthcompta.fr', M, 774, { align: 'center', width: CW })

    doc.end()
  })
}
