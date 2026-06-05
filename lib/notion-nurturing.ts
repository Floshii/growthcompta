import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_MAX: Record<string, number> = {
  visibility:  10,
  positioning: 15,
  conversion:   5,
  acquisition: 20,
  content:      5,
  crm:          5,
  automation:  10,
  reputation:  10,
  supply:      20,
}

export const CATEGORY_LABELS_FR: Record<string, string> = {
  visibility:  'Visibilité Google',
  positioning: 'Positionnement',
  conversion:  'Site & Conversion',
  acquisition: 'Acquisition & Leads',
  content:     'Contenu & Autorité',
  crm:         'CRM & Relance',
  automation:  'Automation & IA',
  reputation:  'Réputation & Preuves',
  supply:      'Capacité & Supply',
}

export const QUADRANT_LABELS_FR: Record<string, string> = {
  'scale-ready':        'Scale Ready',
  'supply-constrained': 'Moteur en surchauffe',
  'demand-constrained': 'Capacité sous-exploitée',
  'restructure':        "Restructurer d'abord",
}

const QUADRANT_FROM_NOTION: Record<string, string> = {
  'Scale Ready':             'scale-ready',
  'Moteur en surchauffe':    'supply-constrained',
  'Capacité sous-exploitée': 'demand-constrained',
  "Restructurer d'abord":    'restructure',
}

export interface RecommendedArticle {
  slug: string
  title: string
}

// Article pool per dimension — will grow as more blog posts are published
const ARTICLES_BY_CATEGORY: Record<string, RecommendedArticle[]> = {
  visibility: [
    { slug: 'seo-expert-comptable-guide-complet',      title: 'SEO expert-comptable : le guide complet' },
    { slug: 'geo-cabinet-comptable-chatgpt-perplexity', title: 'Être visible sur ChatGPT et Perplexity' },
  ],
  positioning: [
    { slug: 'comment-specialiser-cabinet-comptable',   title: 'Comment spécialiser votre cabinet' },
    { slug: 'marche-experts-comptables-france-2026',    title: 'Le marché des experts-comptables en 2026' },
  ],
  conversion: [
    { slug: 'pennylane-expert-comptable-acquisition',  title: "Pennylane comme levier d'acquisition" },
    { slug: '7-canaux-acquisition-cabinet-comptable',  title: "7 canaux d'acquisition pour votre cabinet" },
  ],
  acquisition: [
    { slug: '7-canaux-acquisition-cabinet-comptable',                 title: "7 canaux d'acquisition pour votre cabinet" },
    { slug: 'developper-cabinet-comptable-sans-bouche-a-oreille',    title: 'Se développer sans le bouche-à-oreille' },
  ],
  content: [
    { slug: 'marche-experts-comptables-france-2026',    title: 'Le marché des experts-comptables en 2026' },
    { slug: 'etude-croissance-cabinets-comptables-2026', title: 'Étude croissance cabinets comptables 2026' },
  ],
  crm: [
    { slug: '7-canaux-acquisition-cabinet-comptable',              title: "7 canaux d'acquisition pour votre cabinet" },
    { slug: 'developper-cabinet-comptable-sans-bouche-a-oreille', title: 'Se développer sans le bouche-à-oreille' },
  ],
  automation: [
    { slug: 'chatgpt-expert-comptable-25-usages-acquisition', title: "25 usages de ChatGPT pour l'acquisition" },
    { slug: 'geo-cabinet-comptable-chatgpt-perplexity',       title: 'Être visible sur ChatGPT et Perplexity' },
  ],
  reputation: [
    { slug: 'etude-croissance-cabinets-comptables-2026', title: 'Étude croissance cabinets comptables 2026' },
    { slug: 'marche-experts-comptables-france-2026',      title: 'Le marché des experts-comptables en 2026' },
  ],
  supply: [
    { slug: 'recrutement-cabinet-comptable-probleme-acquisition', title: 'Recrutement : le frein caché à votre croissance' },
    { slug: 'etude-croissance-cabinets-comptables-2026',          title: 'Étude croissance cabinets comptables 2026' },
  ],
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NurturingLead {
  pageId:            string
  firstName:         string
  email:             string
  cabinetName:       string
  globalScore:       number
  levelLabel:        string
  quadrantId:        string
  quadrantLabelFr:   string
  weakest3:          string[]   // category keys, e.g. ['crm', 'visibility', 'content']
  weakest3LabelsFr:  string[]   // French labels for weakest3
  articles:          RecommendedArticle[]  // one article per weakest dimension
  submittedAt:       Date
}

// ── Property helpers (Notion API types are deep) ──────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFullPage(page: any): page is PageObjectResponse {
  return page.object === 'page' && 'properties' in page
}

function richText(page: PageObjectResponse, key: string): string {
  const p = page.properties[key]
  if (!p || p.type !== 'rich_text') return ''
  return p.rich_text.map(r => r.plain_text).join('')
}

function emailProp(page: PageObjectResponse, key: string): string {
  const p = page.properties[key]
  if (!p || p.type !== 'email') return ''
  return p.email ?? ''
}

function num(page: PageObjectResponse, key: string): number {
  const p = page.properties[key]
  if (!p || p.type !== 'number') return 0
  return p.number ?? 0
}

function sel(page: PageObjectResponse, key: string): string {
  const p = page.properties[key]
  if (!p || p.type !== 'select') return ''
  return p.select?.name ?? ''
}

function dateProp(page: PageObjectResponse, key: string): Date | null {
  const p = page.properties[key]
  if (!p || p.type !== 'date' || !p.date?.start) return null
  return new Date(p.date.start)
}

// ── Core logic ────────────────────────────────────────────────────────────────

function getClient() {
  const token = process.env.NOTION_TOKEN
  const dbId  = process.env.NOTION_LEADS_DATABASE_ID
  if (!token || !dbId) throw new Error('NOTION_TOKEN or NOTION_LEADS_DATABASE_ID not set')
  return { notion: new Client({ auth: token }), dbId }
}

function computeWeakest3(page: PageObjectResponse): string[] {
  const scores: Record<string, number> = {
    visibility:  num(page, 'Score Visibilité'),
    positioning: num(page, 'Score Positionnement'),
    conversion:  num(page, 'Score Conversion'),
    acquisition: num(page, 'Score Acquisition'),
    content:     num(page, 'Score Contenu'),
    crm:         num(page, 'Score CRM'),
    automation:  num(page, 'Score Automation'),
    reputation:  num(page, 'Score Réputation'),
    supply:      num(page, 'Score Supply (dim)'),
  }
  return Object.entries(scores)
    .map(([cat, score]) => ({ cat, pct: score / (CATEGORY_MAX[cat] ?? 10) }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3)
    .map(w => w.cat)
}

function parseLead(page: PageObjectResponse): NurturingLead | null {
  const emailAddr    = emailProp(page, 'Email')
  const submittedAt  = dateProp(page, 'Date soumission')
  if (!emailAddr || !submittedAt) return null

  const quadrantNotion = sel(page, 'Quadrant')
  const quadrantId     = QUADRANT_FROM_NOTION[quadrantNotion] ?? 'demand-constrained'
  const weakest3       = computeWeakest3(page)

  const articles = weakest3.map(
    cat => ARTICLES_BY_CATEGORY[cat]?.[0] ?? ARTICLES_BY_CATEGORY['acquisition'][0],
  )

  return {
    pageId:           page.id,
    firstName:        richText(page, 'Prénom'),
    email:            emailAddr,
    cabinetName:      richText(page, 'Cabinet'),
    globalScore:      num(page, 'Score global'),
    levelLabel:       sel(page, 'Niveau'),
    quadrantId,
    quadrantLabelFr:  QUADRANT_LABELS_FR[quadrantId] ?? quadrantNotion,
    weakest3,
    weakest3LabelsFr: weakest3.map(c => CATEGORY_LABELS_FR[c] ?? c),
    articles,
    submittedAt,
  }
}

// ── Exported functions ────────────────────────────────────────────────────────

/**
 * Returns leads that need a specific nurturing email.
 * @param dayThreshold  Minimum days since submission (1 / 3 / 7 / 14)
 * @param notionColumn  Checkbox column name in Notion ("Nurturing J1", etc.)
 */
export async function getLeadsForNurturing(
  dayThreshold: number,
  notionColumn: string,
): Promise<NurturingLead[]> {
  const { notion, dbId } = getClient()
  const cutoff = new Date(Date.now() - dayThreshold * 24 * 60 * 60 * 1000).toISOString()

  const response = await notion.databases.query({
    database_id: dbId,
    filter: {
      and: [
        { property: 'Date soumission', date: { on_or_before: cutoff } },
        { property: notionColumn, checkbox: { equals: false } },
      ],
    },
    page_size: 100,
  })

  return response.results
    .filter(isFullPage)
    .map(parseLead)
    .filter((l): l is NurturingLead => l !== null)
}

/** Marks a nurturing step as sent for a given Notion page */
export async function markNurturingSent(
  pageId: string,
  notionColumn: string,
): Promise<void> {
  const { notion } = getClient()
  await notion.pages.update({
    page_id: pageId,
    properties: {
      [notionColumn]: { checkbox: true },
    },
  })
}
