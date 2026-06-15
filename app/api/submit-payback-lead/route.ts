import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const LeadSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  cabinetName: z.string().default(''),
})

const ResultSchema = z.object({
  metrics: z.object({
    cac: z.number(),
    ltgp30: z.number(),
    paybackRatioClient: z.number(),
    paybackRatioTeam: z.number(),
    totalAcquisitionCost: z.number(),
    annualPaybackRatio: z.number(),
    gp90: z.number(),
    totalRecruitmentCost: z.number(),
  }),
  maturityLevel: z.number(),
  clientLevel: z.object({ label: z.string(), zone: z.string() }),
  teamLevel: z.object({ label: z.string(), zone: z.string() }),
  actions: z.array(z.string()),
}).passthrough()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const lead = LeadSchema.parse(body.lead)
    const result = ResultSchema.parse(body.result)

    // Forward to Notion if configured
    const notionToken = process.env.NOTION_TOKEN
    const notionDbId = process.env.NOTION_PAYBACK_DB_ID ?? process.env.NOTION_DB_ID

    if (notionToken && notionDbId) {
      await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: notionDbId },
          properties: {
            Name: { title: [{ text: { content: `${lead.firstName} — Payback ${result.metrics.paybackRatioClient.toFixed(2)}` } }] },
            Email: { email: lead.email },
            Phone: { phone_number: lead.phone },
            Cabinet: { rich_text: [{ text: { content: lead.cabinetName } }] },
            'Payback Client': { number: Math.round(result.metrics.paybackRatioClient * 100) / 100 },
            'Payback Équipe': { number: Math.round(result.metrics.paybackRatioTeam * 100) / 100 },
            'CAC': { number: Math.round(result.metrics.cac) },
            'LTGP30': { number: Math.round(result.metrics.ltgp30) },
            Maturité: { number: result.maturityLevel },
            Source: { select: { name: 'Payback Period Quiz' } },
          },
        }),
      }).catch(err => console.warn('[submit-payback-lead] Notion error:', err))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[submit-payback-lead]', err)
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
