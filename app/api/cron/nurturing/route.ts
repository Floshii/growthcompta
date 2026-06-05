import { NextResponse } from 'next/server'
import { getLeadsForNurturing, markNurturingSent } from '@/lib/notion-nurturing'
import { sendNurturingEmail, NURTURING_STEPS } from '@/lib/resend-nurturing'

// Force Node.js runtime — Notion + Resend need it
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Vercel Cron — runs daily at 08:00 UTC (configured in vercel.json).
 *
 * For each nurturing step (J+1, J+3, J+7, J+14):
 *   1. Queries Notion for leads past the day threshold with that step not yet sent
 *   2. Sends the personalized email via Resend
 *   3. Marks the Notion checkbox to prevent re-sends
 *
 * Security: Vercel automatically injects Authorization: Bearer <CRON_SECRET>
 * on cron requests. We validate this in production.
 *
 * Prerequisite: add these 4 Checkbox columns to the "GC LEADS Growth Score"
 * Notion DB before deploying:
 *   - Nurturing J1
 *   - Nurturing J3
 *   - Nurturing J7
 *   - Nurturing J14
 */
export async function GET(request: Request) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  if (process.env.NODE_ENV === 'production') {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  const summary: Record<string, { found: number; sent: number; errors: number }> = {}
  let totalSent = 0

  // ── Process each step sequentially ─────────────────────────────────────────
  for (const step of NURTURING_STEPS) {
    const tag = `J+${step.day}`
    summary[tag] = { found: 0, sent: 0, errors: 0 }

    // 1. Fetch leads due for this step
    let leads
    try {
      leads = await getLeadsForNurturing(step.day, step.notionColumn)
    } catch (err) {
      console.error(`[nurturing-cron] Notion query failed for ${tag}:`, err)
      summary[tag].errors++
      continue
    }

    summary[tag].found = leads.length
    if (leads.length === 0) continue

    console.log(`[nurturing-cron] ${tag}: ${leads.length} lead(s) to process`)

    // 2. Send email + mark sent for each lead
    for (const lead of leads) {
      try {
        const sent = await sendNurturingEmail(lead, step)

        if (sent) {
          // Only mark as sent if email was accepted — so failures auto-retry tomorrow
          await markNurturingSent(lead.pageId, step.notionColumn)
          summary[tag].sent++
          totalSent++
        } else {
          summary[tag].errors++
        }
      } catch (err) {
        console.error(`[nurturing-cron] Error processing ${lead.email} for ${tag}:`, err)
        summary[tag].errors++
      }
    }
  }

  console.log(`[nurturing-cron] Complete. Total sent: ${totalSent}`, summary)

  return NextResponse.json({
    ok:        true,
    totalSent,
    summary,
    timestamp: new Date().toISOString(),
  })
}
