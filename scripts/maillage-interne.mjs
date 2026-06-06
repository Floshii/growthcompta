#!/usr/bin/env node
/**
 * scripts/maillage-interne.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Analyse les articles MDX de content/blog/ et orchestre le maillage interne.
 *
 * Mode rapport (défaut) — ne modifie aucun fichier :
 *   node scripts/maillage-interne.mjs
 *
 * Mode application — édite les fichiers MDX et génère le commit :
 *   node scripts/maillage-interne.mjs --apply
 *
 * Règles appliquées (SKILL.md) :
 *   - 1 lien Know→Do (/outils/audit-acquisition) obligatoire dans les 300 premiers mots
 *   - Max 3 liens internes blog par article (évite la sur-optimisation)
 *   - Jamais la même ancre 2 fois vers la même page
 *   - Ancre = phrase naturelle qui tient sans le lien
 *   - Pas de lien dans un titre H2/H3 ni dans un composant MDX
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const BLOG_DIR   = path.join(__dirname, '../content/blog')
const REPORT_OUT = path.join(__dirname, '../maillage-rapport.md')
const APPLY      = process.argv.includes('--apply')

// ─── Pages Do (Know→Do) ───────────────────────────────────────────────────────
// Chaque article doit contenir AU MOINS le lien vers audit-acquisition.
const PAGES_DO = [
  {
    url: '/outils/audit-acquisition',
    required: true,
    anchors: [
      'obtenir votre audit gratuit',
      'diagnostiquer votre acquisition',
      'audit d\'acquisition gratuit',
      'votre audit offert',
      'obtenir mon audit offert',
    ],
  },
  {
    url: '/outils/calculateur-croissance',
    required: false,
    anchors: [
      'estimer votre potentiel de croissance',
      'calculer votre CA additionnel',
    ],
  },
  {
    url: '/niches/',
    required: false,
    anchors: [
      'voir les verticales disponibles',
      'explorer les niches disponibles',
    ],
  },
]

// ─── Mots vides (ignorés dans le scoring de similarité) ──────────────────────
const STOP = new Set([
  'pour', 'dans', 'avec', 'sans', 'sous', 'vers', 'chez', 'entre', 'depuis',
  'comment', 'pourquoi', 'quand', 'votre', 'notre', 'leurs', 'vous', 'nous',
  'tout', 'tous', 'cette', 'cet', 'ces', 'des', 'les', 'une', 'par', 'plus',
  'très', 'bien', 'même', 'aussi', 'mais', 'comme', 'que', 'qui', 'dont',
  'cabinet', 'comptable', 'expert', 'cabinets', 'comptables', 'experts',
  'voici', 'ainsi', 'donc', 'chaque', 'selon', 'entre', 'encore', 'alors',
])

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Normalise + tokenise un texte, retire les mots vides et les courts */
function tokenize(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // strip accents
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 4 && !STOP.has(w))
}

/** Jaccard entre deux Sets de tokens */
function jaccard(a, b) {
  const inter = [...a].filter(x => b.has(x)).length
  const union  = new Set([...a, ...b]).size
  return union === 0 ? 0 : inter / union
}

/** Extrait les tokens représentatifs d'un article */
function articleTokens(a) {
  return new Set([
    ...tokenize(a.title),
    ...tokenize(a.description),
    ...(a.tags  || []).flatMap(tokenize),
    ...tokenize(a.category),
  ])
}

/** Parse le frontmatter YAML minimal depuis un fichier .mdx */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { frontmatter: {}, content: raw }
  const block = match[1]
  const frontmatter = {}
  // title / description / category
  for (const key of ['title', 'description', 'category']) {
    const m = block.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))
    if (m) frontmatter[key] = m[1]
  }
  // tags (tableau YAML)
  const tagMatch = block.match(/^tags:\s*\[(.+)\]/m)
  if (tagMatch) {
    frontmatter.tags = tagMatch[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, ''))
  }
  const content = raw.slice(match[0].length).trimStart()
  return { frontmatter, content }
}

/**
 * Pour une paire (source → target), trouve la meilleure ligne du contenu
 * source où un lien vers target serait naturel.
 * Retourne { line, lineIdx, anchor } ou null.
 */
function findBestOpportunity(sourceContent, targetSlug, targetTitle, targetDesc) {
  const targetKws = new Set([...tokenize(targetTitle), ...tokenize(targetDesc)])

  const lines = sourceContent.split('\n')
  let bestHit = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Lignes à ignorer
    if (line.length < 60)              continue
    if (line.startsWith('#'))          continue
    if (line.startsWith('<'))          continue
    if (line.startsWith('|'))          continue
    if (line.startsWith('- '))         continue
    if (line.startsWith('*'))          continue
    if (line.startsWith('>'))          continue
    if (line.includes(`/${targetSlug}`)) continue   // déjà lié
    if (line.includes(']('))           continue   // autre lien existant (évite nesting)

    const lineKws  = new Set(tokenize(line))
    const overlap  = [...targetKws].filter(k => lineKws.has(k)).length

    if (overlap >= 2 && (!bestHit || overlap > bestHit.overlap)) {
      // Cherche une ancre naturelle : suite de mots-clés communs présents dans la ligne
      const sharedKws = [...targetKws].filter(k => lineKws.has(k))
      // On tente de trouver une séquence de 2-4 mots dans la ligne contenant ces kws
      const anchor = buildNaturalAnchor(line, sharedKws)
      if (anchor) {
        bestHit = { line, lineIdx: i, overlap, anchor }
      }
    }
  }

  return bestHit
}

/**
 * Construit une ancre naturelle : cherche dans la ligne une expression
 * de 2-5 mots contenant au moins un des mots-clés partagés.
 */
function buildNaturalAnchor(line, sharedKws) {
  const words  = line.replace(/[*_`]/g, '').split(/\s+/)
  for (let i = 0; i < words.length; i++) {
    const wordNorm = tokenize(words[i])[0]
    if (!wordNorm || !sharedKws.some(k => wordNorm.startsWith(k.slice(0, 5)))) continue
    // Fenêtre de 2 à 4 mots autour du mot-clé
    for (let len = 2; len <= 4; len++) {
      const start  = Math.max(0, i - 1)
      const end    = Math.min(words.length, start + len)
      const phrase = words.slice(start, end).join(' ').replace(/[.,;:!?]+$/, '')
      if (phrase.split(' ').length >= 2 && phrase.length >= 10) return phrase
    }
  }
  return null
}

// ─── Lecture des articles ─────────────────────────────────────────────────────

function loadArticles() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files.map(file => {
    const slug = file.replace('.mdx', '')
    const raw  = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { frontmatter, content } = parseFrontmatter(raw)
    return {
      slug,
      file,
      raw,
      content,
      title:       frontmatter.title       || slug,
      description: frontmatter.description || '',
      category:    frontmatter.category    || '',
      tags:        frontmatter.tags        || [],
      tokens:      null,   // calculé après
    }
  }).map(a => ({ ...a, tokens: articleTokens(a) }))
}

// ─── Audit Know→Do ───────────────────────────────────────────────────────────

function auditKnowDo(articles) {
  const issues = []
  for (const a of articles) {
    for (const page of PAGES_DO.filter(p => p.required)) {
      if (!a.content.includes(page.url)) {
        issues.push({ slug: a.slug, missingUrl: page.url })
      }
    }
  }
  return issues
}

// ─── Plan de maillage ─────────────────────────────────────────────────────────

function buildPlan(articles) {
  const plan = []

  for (const source of articles) {
    // Trie les autres articles par score de similarité
    const ranked = articles
      .filter(a => a.slug !== source.slug)
      .map(a => ({ article: a, score: jaccard(source.tokens, a.tokens) }))
      .filter(x => x.score >= 0.06)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)   // on analyse les 6 plus proches

    const links = []
    const usedAnchors = new Set()

    for (const { article: target, score } of ranked) {
      if (links.length >= 3) break  // max 3 liens blog par article

      const opp = findBestOpportunity(
        source.content,
        target.slug,
        target.title,
        target.description,
      )
      if (!opp) continue
      if (usedAnchors.has(opp.anchor)) continue

      usedAnchors.add(opp.anchor)
      links.push({ target, score, opp })
    }

    plan.push({ source, links })
  }

  return plan
}

// ─── Génération du rapport ────────────────────────────────────────────────────

function generateReport(plan, kdIssues, articles) {
  const today  = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  const total  = plan.reduce((s, p) => s + p.links.length, 0)

  let md = `# Rapport de maillage interne — GrowthCompta\n\n`
  md += `Généré le **${today}** · **${articles.length} articles** analysés\n\n`
  md += `---\n\n`

  // Résumé
  md += `## Résumé\n\n`
  md += `| Indicateur | Valeur |\n|---|---|\n`
  md += `| Articles analysés | ${articles.length} |\n`
  md += `| Liens internes suggérés | **${total}** |\n`
  md += `| Articles sans \`/outils/audit-acquisition\` | **${kdIssues.length}** |\n\n`

  if (kdIssues.length > 0) {
    md += `### ⚠️ Know→Do manquant\n\n`
    md += `Ces articles n'ont pas de lien vers \`/outils/audit-acquisition\` :\n\n`
    for (const { slug } of kdIssues) md += `- \`${slug}\`\n`
    md += `\n`
  }

  md += `---\n\n`
  md += `## Plan détaillé\n\n`

  for (const { source, links } of plan) {
    md += `### \`${source.slug}\`\n`
    md += `> ${source.title}\n\n`

    if (links.length === 0) {
      md += `*Aucun lien interne suggéré (similarité insuffisante avec les autres articles).*\n\n`
    } else {
      for (const { target, score, opp } of links) {
        md += `**→ \`/blog/${target.slug}\`** *(similarité : ${(score * 100).toFixed(0)} %)*\n\n`
        md += `- Ancre : **"${opp.anchor}"**\n`
        md += `- Contexte (ligne ${opp.lineIdx + 1}) :\n`
        md += `  \`\`\`\n  ${opp.line.slice(0, 130)}\n  \`\`\`\n\n`
      }
    }
    md += `---\n\n`
  }

  md += `## Application\n\n`
  md += `**Mode dry-run (lecture seule) :** \`node scripts/maillage-interne.mjs\`\n\n`
  md += `**Mode apply (édite les fichiers) :** \`node scripts/maillage-interne.mjs --apply\`\n\n`
  md += `Puis :\n\`\`\`bash\ngit add content/blog/\ngit commit -m "feat(seo): maillage interne automatique (${total} liens)"\ngit push origin master\n\`\`\`\n`

  return md
}

// ─── Application des liens ────────────────────────────────────────────────────

function applyLinks(plan) {
  let applied = 0

  for (const { source, links } of plan) {
    if (links.length === 0) continue

    let content  = source.content
    let modified = false

    for (const { target, opp } of links) {
      const { line, anchor } = opp
      // Vérifie que la ligne et l'ancre sont encore présentes (pas déjà modifiées)
      if (!content.includes(line))   continue
      if (!line.includes(anchor))    continue

      const mdLink    = `[${anchor}](/blog/${target.slug})`
      const newLine   = line.replace(anchor, mdLink)
      content         = content.replace(line, newLine)
      modified        = true
      applied++

      console.log(`  ✓  ${source.slug}`)
      console.log(`     → /blog/${target.slug}`)
      console.log(`     ancre : "${anchor}"\n`)
    }

    if (modified) {
      // Reconstruit le fichier : frontmatter intact + contenu modifié
      const newRaw = source.raw.replace(source.content, content)
      fs.writeFileSync(path.join(BLOG_DIR, source.file), newRaw, 'utf-8')
    }
  }

  return applied
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('\n📚 Chargement des articles...\n')
  const articles = loadArticles()

  if (articles.length === 0) {
    console.error('Aucun article .mdx trouvé dans content/blog/. Vérifiez le chemin.')
    process.exit(1)
  }

  console.log(`   ${articles.length} articles chargés\n`)
  console.log('🔍 Calcul de la matrice de similarité...\n')

  const plan     = buildPlan(articles)
  const kdIssues = auditKnowDo(articles)
  const report   = generateReport(plan, kdIssues, articles)

  // Écriture du rapport
  fs.writeFileSync(REPORT_OUT, report, 'utf-8')

  const total = plan.reduce((s, p) => s + p.links.length, 0)
  console.log(`✅ Rapport généré → maillage-rapport.md`)
  console.log(`   ${total} liens internes identifiés`)
  console.log(`   ${kdIssues.length} articles sans /outils/audit-acquisition\n`)

  if (!APPLY) {
    console.log('ℹ️  Mode dry-run : aucun fichier modifié.')
    console.log('   Relancez avec --apply pour appliquer.\n')
    return
  }

  // Application
  console.log('🔗 Application des liens...\n')
  const applied = applyLinks(plan)

  console.log(`\n✅ ${applied} liens appliqués dans les fichiers MDX`)
  console.log('\nCommit suggéré :')
  console.log(`  git add content/blog/`)
  console.log(`  git commit -m "feat(seo): maillage interne automatique (${applied} liens)"`)
  console.log(`  git push origin master\n`)
}

main()
