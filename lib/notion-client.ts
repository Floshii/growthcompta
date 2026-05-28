import { Client } from '@notionhq/client'
import type { DiagnosticResult, LeadData } from '@/types/quiz'

// Map raw question labels → Notion select option names
const BUDGET_MAP: Record<string, string> = {
  'Oui, plus de 2 000 €/mois':       'Plus de 2 000 €/mois',
  'Oui, entre 500 et 2 000 €/mois':  'Entre 500 et 2 000 €/mois',
  'Oui, moins de 500 €/mois':        'Moins de 500 €/mois',
  'Non, aucun budget marketing':      'Aucun budget marketing',
}

const AMBITION_MAP: Record<string, string> = {
  'Doubler mon nombre de clients':                          'Doubler mon nombre de clients',
  'Augmenter mon panier moyen et attirer de meilleurs clients': 'Augmenter mon panier moyen',
  "Stabiliser et structurer ce que j'ai":                  'Stabiliser et structurer',
  "Je n'ai pas encore d'objectif précis":                  "Pas encore d objectif",
}

function rt(content: string) {
  return { rich_text: [{ text: { content: content || '' } }] }
}

function sel(name: string | undefined) {
  return name ? { select: { name } } : undefined
}

export async function insertLeadToNotion(
  lead: LeadData,
  result: DiagnosticResult
): Promise<void> {
  const token = process.env.NOTION_TOKEN
  const dbId  = process.env.NOTION_LEADS_DATABASE_ID

  if (!token || !dbId) {
    console.warn('[notion] NOTION_TOKEN or NOTION_LEADS_DATABASE_ID not set — skipping')
    return
  }

  const notion = new Client({ auth: token })
  const { globalScore, categoryScores, levelConfig, quickWins, roadmap, qualification } = result

  // Format Quick Wins as readable text
  const quickWinsText = quickWins.slice(0, 3).map((qw, i) =>
    `${i + 1}. ${qw.title} — ${qw.description}`
  ).join('\n')

  // Format Roadmap as readable text
  const roadmapText = ['30', '60', '90'].map(period => {
    const items = roadmap.filter(r => r.period === period).map(r => r.title).join(', ')
    return items ? `J+${period}: ${items}` : null
  }).filter(Boolean).join('\n')

  // Qualification selects (map labels → Notion option names)
  const budgetRaw   = qualification.marketingBudget as string | undefined
  const ambitionRaw = qualification.growthAmbition  as string | undefined

  const properties: Record<string, unknown> = {
    // ── Identité ──────────────────────────────────────────────
    'Nom':       { title: [{ text: { content: lead.cabinetName || lead.firstName } }] },
    'Prénom':    rt(lead.firstName),
    'Email':     { email: lead.email },
    'Téléphone': { phone_number: lead.phone },
    'Cabinet':   rt(lead.cabinetName || ''),
    'Ville':     rt(lead.city || ''),

    // ── Score & niveau ────────────────────────────────────────
    'Score global':       { number: globalScore },
    'Niveau':             { select: { name: levelConfig.label } },
    'Date soumission':    { date: { start: new Date().toISOString() } },
    'Source':             { select: { name: 'Cabinet Growth Score' } },
    'Statut':             { select: { name: 'Nouveau' } },

    // ── Scores par dimension ──────────────────────────────────
    'Score Visibilité':     { number: categoryScores.visibility },
    'Score Positionnement': { number: categoryScores.positioning },
    'Score Conversion':     { number: categoryScores.conversion },
    'Score Acquisition':    { number: categoryScores.acquisition },
    'Score Contenu':        { number: categoryScores.content },
    'Score CRM':            { number: categoryScores.crm },
    'Score Automation':     { number: categoryScores.automation },
    'Score Réputation':     { number: categoryScores.reputation },

    // ── Qualification ─────────────────────────────────────────
    'Quick Wins': rt(quickWinsText),
    'Roadmap':    rt(roadmapText),
  }

  // Qualification selects — only add if we have a valid value
  const tailleVal = qualification.cabinetSize as string | undefined
  if (tailleVal)   properties['Taille cabinet']  = { select: { name: tailleVal } }

  const panierVal = qualification.averageBasket as string | undefined
  if (panierVal)   properties['Panier moyen']    = { select: { name: panierVal } }

  const budgetMapped = budgetRaw ? (BUDGET_MAP[budgetRaw] ?? budgetRaw) : undefined
  if (budgetMapped) properties['Budget marketing'] = { select: { name: budgetMapped } }

  const ambitionMapped = ambitionRaw ? (AMBITION_MAP[ambitionRaw] ?? ambitionRaw) : undefined
  if (ambitionMapped) properties['Ambition'] = { select: { name: ambitionMapped } }

  await notion.pages.create({
    parent: { database_id: dbId },
    properties: properties as Parameters<typeof notion.pages.create>[0]['properties'],
  })
}
