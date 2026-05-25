import { Client } from '@notionhq/client'
import type { DiagnosticResult, LeadData } from '@/types/quiz'

export async function insertLeadToNotion(
  lead: LeadData,
  result: DiagnosticResult
): Promise<void> {
  const token = process.env.NOTION_TOKEN
  const dbId = process.env.NOTION_LEADS_DATABASE_ID

  if (!token || !dbId) {
    console.warn('[notion] NOTION_TOKEN or NOTION_LEADS_DATABASE_ID not set — skipping')
    return
  }

  const notion = new Client({ auth: token })

  await notion.pages.create({
    parent: { database_id: dbId },
    properties: {
      Name: { title: [{ text: { content: lead.cabinetName || lead.firstName } }] },
      Email: { email: lead.email },
      Telephone: { phone_number: lead.phone },
      Prenom: { rich_text: [{ text: { content: lead.firstName } }] },
      Ville: { rich_text: [{ text: { content: lead.city || '' } }] },
      'Score global': { number: result.globalScore },
      Niveau: { select: { name: result.levelConfig.label } },
      'Date soumission': { date: { start: new Date().toISOString() } },
      Source: { select: { name: 'Cabinet Growth Score' } },
      Statut: { select: { name: 'Nouveau lead' } },
    },
  })
}
