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

// ── Per-dimension content pools ───────────────────────────────────────────────

// J+1 : why this dimension matters (2-3 sentences, no fluff)
const DIMENSION_INSIGHT: Record<string, string> = {
  visibility:
    "Sur Google, les cabinets visibles captent les demandes entrantes — les autres attendent le bouche-à-oreille. Un cabinet bien positionné sur « expert-comptable [ville] » reçoit des prospects qualifiés sans effort commercial actif. C'est la différence entre une acquisition subie et une acquisition choisie.",
  positioning:
    "Sans spécialisation claire, vous êtes en compétition avec tout le monde — y compris les gros cabinets avec dix fois votre budget marketing. Les cabinets qui ont choisi une niche et l'ont communiquée constatent une hausse de 40 à 60 % de leur panier moyen en 12 mois. Pas parce qu'ils travaillent plus, mais parce qu'ils ont arrêté de se battre sur le prix.",
  conversion:
    "Votre site reçoit peut-être des visiteurs — mais s'il ne les convertit pas, il n'a aucune valeur commerciale. Un site qui convertit répond à trois questions en cinq secondes : qui êtes-vous, pour qui, et quoi faire maintenant. La plupart des cabinets n'ont que la première.",
  acquisition:
    "Dépendre du bouche-à-oreille, c'est piloter à l'aveugle : vous ne contrôlez ni le volume ni la qualité des leads. Les cabinets qui ont installé un système d'acquisition diversifié ont un pipeline prévisible. Ils savent combien de prospects entrent chaque mois — et peuvent agir dessus.",
  content:
    "Sans contenu visible, vous n'existez pas en dehors de vos clients actuels. Les cabinets qui publient régulièrement — même une fois par semaine sur LinkedIn — construisent une autorité sectorielle qui génère des leads entrants 6 à 12 mois après. Le contenu est le seul actif marketing qui travaille quand vous dormez.",
  crm:
    "La plupart des leads perdus ne sont pas perdus parce qu'ils n'étaient pas intéressés. Ils sont perdus faute de relance. Un suivi simple — même dans un tableau Notion — change radicalement le taux de closing. Les cabinets qui tracent leur pipeline ferment en moyenne deux fois plus de prospects que ceux qui gèrent par email et mémoire.",
  automation:
    "Ce que vos confrères font en trois heures, des cabinets comparables le font en vingt minutes avec les bons outils. L'automatisation n'est plus réservée aux grands groupes — un cabinet de cinq personnes peut aujourd'hui automatiser son onboarding, ses relances et une partie de sa communication. Le temps gagné se réinvestit directement dans l'acquisition.",
  reputation:
    "Un prospect qui hésite entre vous et un concurrent va regarder vos avis Google. Moins de cinq avis, note médiocre, aucun témoignage sur le site — et il choisit l'autre. La réputation en ligne est devenue le premier filtre de sélection d'un prestataire comptable. Elle se construit en quelques semaines avec une démarche active auprès de vos clients satisfaits.",
  supply:
    "Pousser sur l'acquisition quand on est déjà saturé crée plus de problèmes qu'elle n'en résout : dégradation de la qualité de service, turnover, insatisfaction client. Avant d'ouvrir le robinet, la question à répondre est simple : peut-on absorber dix clients de plus sans casser ce qui fonctionne ?",
}

// J+5 : one actionable quick win per dimension (doable in < 2h)
const DIMENSION_ACTION: Record<string, string> = {
  visibility:
    "Ouvrez Google Business Profile et complétez chaque champ à 100 % : description détaillée, horaires, photos récentes, catégories secondaires. Activez la prise de rendez-vous directement depuis la fiche. C'est la mise à jour avec le meilleur ratio effort / impact sur le référencement local.",
  positioning:
    "Écrivez en une phrase votre positionnement : <em>« Nous sommes le cabinet comptable de référence pour [niche] dans [région]. »</em> Testez-la sur votre page d'accueil cette semaine. Si ça fait peur d'être aussi précis, c'est que vous êtes sur la bonne voie.",
  conversion:
    "Testez votre site avec quelqu'un qui ne vous connaît pas : en cinq secondes, peut-il dire ce que vous faites, pour qui, et comment vous contacter ? Sinon, c'est votre section hero à réécrire en priorité — avant toute autre optimisation.",
  acquisition:
    "Faites la liste de vos dix meilleurs clients actuels. Qu'ont-ils en commun — secteur, taille, problème initial ? Ce profil est votre ICP. Cette semaine, initiez cinq conversations LinkedIn avec des profils identiques. Pas de pitch : une question sur leur situation.",
  content:
    "Publiez un post LinkedIn cette semaine. Format : un problème récurrent que vous observez chez vos clients + une façon concrète de l'adresser. 150 mots maximum. Pas de hashtags, pas de « n'hésitez pas à me contacter ». Juste de la valeur. Mesurez les impressions à 48h.",
  crm:
    "Créez un tableau avec quatre colonnes : Nom / Email / Dernier contact / Statut (À contacter · En discussion · Perdu). Listez vos dix derniers prospects. Regardez combien sont en « Perdu » uniquement par manque de relance. Ce chiffre est votre première priorité.",
  automation:
    "Identifiez la tâche administrative que vous répétez le plus souvent chaque semaine. Cherchez si ChatGPT ou un template peut la diviser par trois. Objectif de la semaine : gagner une heure, pas restructurer votre workflow — juste une tâche, un gain mesurable.",
  reputation:
    "Envoyez un message court à trois clients satisfaits avec votre lien Google direct. Texte : <em>« Bonjour [Prénom], si vous êtes satisfait de notre accompagnement, un avis Google nous aiderait beaucoup — 2 minutes : [lien]. Merci d'avance. »</em> Trois messages, cette semaine.",
  supply:
    "Calculez votre capacité réelle : combien de clients par collaborateur, et quel est votre seuil de saturation ? Ce chiffre vous dira si vous pouvez activer l'acquisition maintenant ou si vous devez d'abord créer de la marge. Sans ce repère, vous pilotez à l'aveugle.",
}

// J+3 : quadrant-specific insight (situation + 2-3 priority moves)
const QUADRANT_INSIGHT: Record<string, string> = {
  'demand-constrained': `Votre opérationnel est prêt. Votre équipe peut absorber plus de clients. Le problème est en amont : pas assez de leads qualifiés qui entrent.
<br><br>
C'est la situation la plus actionnable — vous n'avez pas à restructurer, vous avez à activer. Les cabinets dans votre profil qui ont progressé le plus vite ont suivi la même séquence : clarifier leur positionnement en ligne, lancer un canal d'acquisition (SEO local ou LinkedIn outbound), installer un suivi de leads minimal. Pas les trois en même temps — <strong>un seul levier, pendant 60 jours</strong>.
<br><br>
Le risque à éviter : tester cinq choses en deux semaines et conclure que rien ne marche.`,

  'supply-constrained': `Votre acquisition fonctionne — peut-être trop bien. Vous savez attirer des clients, mais votre capacité à les absorber est en tension.
<br><br>
Pousser davantage sur l'acquisition maintenant serait une erreur. La dégradation de qualité de service est le chemin le plus court vers le churn et les mauvais avis. Les cabinets dans votre profil qui ont bien géré cette phase ont fait une chose en premier : <strong>auditer la charge réelle par collaborateur</strong> et identifier les deux ou trois tâches qui consomment le plus de temps sans valeur proportionnelle. Souvent, c'est là que se cachent 20 % de capacité supplémentaire.
<br><br>
L'objectif à 60 jours : créer la marge avant de rouvrir l'acquisition.`,

  'scale-ready': `Vous êtes dans le top 15 % des cabinets sur l'acquisition. Vos deux moteurs tournent — leads entrants et capacité opérationnelle.
<br><br>
La question n'est plus « comment démarrer » mais « comment industrialiser pour ne plus dépendre de votre présence personnelle ». Les cabinets dans votre position qui ont franchi le cap suivant ont tous fait la même chose : ils ont <strong>identifié leur segment le plus rentable et concentré 80 % de leurs efforts dessus</strong> — en abandonnant les campagnes et clients qui diluaient le focus.
<br><br>
La prochaine étape concrète : poser le chiffre. Quel CA additionnel sur 12 mois, sur quel segment, avec quel coût d'acquisition cible ?`,

  'restructure': `Votre diagnostic pointe des tensions sur les deux axes — acquisition et opérationnel. Dans cette situation, accélérer l'acquisition amplifierait les problèmes existants plutôt que de les résoudre.
<br><br>
Ce n'est pas un mauvais signal — c'est souvent la phase de transition entre un cabinet artisanal et un cabinet structuré. La plupart des fondateurs y passent. Ce que les cabinets qui s'en sont sortis ont fait en commun : ils ont <strong>réduit avant de construire</strong>. Réduit l'offre aux un ou deux segments rentables, augmenté les prix pour filtrer naturellement le volume, stabilisé l'équipe. Seulement ensuite, ils ont activé l'acquisition.
<br><br>
C'est contre-intuitif — mais c'est la séquence qui fonctionne.`,
}

// ── Email J+1 — "Votre point le plus faible" ─────────────────────────────────

function buildJ1Html(lead: NurturingLead, _calendlyUrl: string): string {
  const weakest = lead.weakest3LabelsFr[0] ?? 'Acquisition'
  const insight = DIMENSION_INSIGHT[lead.weakest3[0] ?? 'acquisition'] ?? DIMENSION_INSIGHT['acquisition']
  const article = lead.articles[0]

  return emailWrapper(
    `Votre point le plus faible : ${weakest} — et ce que font les cabinets qui l'ont adressé`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 20px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  Votre point le plus faible&nbsp;: <span style="color:#e85d2b;">${esc(weakest)}</span>
</h1>

<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Votre diagnostic l'a identifié comme votre principal levier inexploité. Ce n'est pas un hasard — c'est la dimension que la plupart des cabinets remettent à plus tard, parce qu'on gère le quotidien et les dossiers en priorité. C'est précisément ce qui creuse l'écart avec ceux qui avancent.
</p>

<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  ${insight}
</p>

<p style="margin:0 0 24px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Les cabinets qui ont adressé ce point ont un point commun : ils ont arrêté d'attendre d'avoir « le temps ». Ils ont isolé une action, l'ont testée pendant 30 jours, et ont mesuré. Pas de grand projet. Pas de refonte. Une action.
</p>

${article ? articleCard(article.slug, article.title) : ''}
`,
  )
}

// ── Email J+3 — "Les cabinets en situation X font ça" ────────────────────────

function buildJ3Html(lead: NurturingLead, _calendlyUrl: string): string {
  const article  = lead.articles[1]
  const insight  = QUADRANT_INSIGHT[lead.quadrantId] ?? QUADRANT_INSIGHT['demand-constrained']

  return emailWrapper(
    `Les cabinets « ${lead.quadrantLabelFr} » — ce qu'ils font en premier`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 20px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  Les cabinets &laquo;&thinsp;<span style="color:#e85d2b;">${esc(lead.quadrantLabelFr)}</span>&thinsp;&raquo; font ça en premier.
</h1>

<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Votre profil de diagnostic place votre cabinet dans la catégorie <strong>${esc(lead.quadrantLabelFr)}</strong>. Ce n'est pas juste un label — ça définit précisément quelle est votre prochaine priorité, et dans quel ordre agir.
</p>

<p style="margin:0 0 24px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  ${insight}
</p>

${article ? articleCard(article.slug, article.title) : ''}
`,
  )
}

// ── Email J+5 — "3 actions concrètes" ────────────────────────────────────────

function buildJ5Html(lead: NurturingLead, _calendlyUrl: string): string {
  const [cat0, cat1, cat2]   = lead.weakest3
  const [lab0, lab1, lab2]   = lead.weakest3LabelsFr
  const action0 = DIMENSION_ACTION[cat0 ?? 'acquisition'] ?? ''
  const action1 = DIMENSION_ACTION[cat1 ?? 'visibility']  ?? ''
  const action2 = DIMENSION_ACTION[cat2 ?? 'crm']         ?? ''
  const article  = lead.articles[2]

  return emailWrapper(
    `3 actions concrètes cette semaine — taillées pour votre situation`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 24px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  3 actions concrètes pour cette semaine.
</h1>

<p style="margin:0 0 24px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Basées sur vos trois dimensions les plus faibles. Chacune est faisable en moins de deux heures. Pas de projet, pas de réunion — une action, un résultat mesurable.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e1d3;border-radius:8px;overflow:hidden;margin-bottom:24px;">
  <tr><td style="padding:20px 24px;border-bottom:1px solid #f0ebe3;">
    <p style="margin:0 0 6px;color:#e85d2b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">01 &middot; ${esc(lab0 ?? 'Acquisition')}</p>
    <p style="margin:0;color:#3d3d3a;font-size:14px;line-height:1.7;">${action0}</p>
  </td></tr>
  <tr><td style="padding:20px 24px;border-bottom:1px solid #f0ebe3;background:#faf8f4;">
    <p style="margin:0 0 6px;color:#e85d2b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">02 &middot; ${esc(lab1 ?? 'Visibilité')}</p>
    <p style="margin:0;color:#3d3d3a;font-size:14px;line-height:1.7;">${action1}</p>
  </td></tr>
  <tr><td style="padding:20px 24px;">
    <p style="margin:0 0 6px;color:#e85d2b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">03 &middot; ${esc(lab2 ?? 'CRM')}</p>
    <p style="margin:0;color:#3d3d3a;font-size:14px;line-height:1.7;">${action2}</p>
  </td></tr>
</table>

${article ? articleCard(article.slug, article.title) : ''}
`,
  )
}

// ── Email J+7 — CTA commercial ────────────────────────────────────────────────

function buildJ7Html(lead: NurturingLead, calendlyUrl: string): string {
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

<table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f4;border:1px solid #e6e1d3;border-radius:10px;margin-bottom:28px;">
<tr>
  <td style="padding:20px 24px;text-align:center;border-right:1px solid #e6e1d3;width:50%;">
    <p style="margin:0 0 4px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Votre score</p>
    <p style="margin:0;font-size:48px;font-weight:700;color:${scoreColor};line-height:1;">${lead.globalScore}</p>
    <p style="margin:2px 0 0;color:#6b6b66;font-size:11px;">/100 points</p>
  </td>
  <td style="padding:20px 24px;text-align:center;width:50%;">
    <p style="margin:0 0 4px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Niveau</p>
    <p style="margin:0;font-size:15px;font-weight:700;color:#1a1a1a;line-height:1.3;">${esc(lead.levelLabel)}</p>
  </td>
</tr>
</table>

<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Ça fait une semaine que vous avez votre diagnostic. J'ai regardé votre situation — votre profil <strong>${esc(lead.quadrantLabelFr)}</strong> avec un score de ${lead.globalScore}/100 appelle quelques actions précises, dans un ordre précis.
</p>

<p style="margin:0 0 28px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Si vous voulez qu'on passe 30 minutes ensemble pour transformer ce diagnostic en plan d'action — sans pitch, sans engagement — le lien est ci-dessous. Sinon, aucun problème : les ressources envoyées cette semaine sont suffisantes pour démarrer seul.
</p>

${ctaButton(calendlyUrl, 'Réserver mon audit stratégique gratuit')}
`,
  )
}

// ── Step registry ─────────────────────────────────────────────────────────────

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
      `${l.firstName}, votre point le plus faible : ${l.weakest3LabelsFr[0] ?? 'Acquisition'}`,
    buildHtml: buildJ1Html,
  },
  {
    day: 3,
    notionColumn: 'Nurturing J3',
    subject: (l) =>
      `Les cabinets « ${l.quadrantLabelFr} » — ce qu'ils font en premier`,
    buildHtml: buildJ3Html,
  },
  {
    day: 5,
    notionColumn: 'Nurturing J5',
    subject: (l) =>
      `3 actions concrètes pour cette semaine, ${l.firstName}`,
    buildHtml: buildJ5Html,
  },
  {
    day: 7,
    notionColumn: 'Nurturing J7',
    subject: (l) =>
      `${l.firstName} — on peut en parler ? (score : ${l.globalScore}/100)`,
    buildHtml: buildJ7Html,
  },
]

// ── Send function ─────────────────────────────────────────────────────────────

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
  const replyTo     = process.env.NOTIFICATION_EMAIL

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from:    'GrowthCompta <diagnostic@growthcompta.com>',
    to:      lead.email,
    replyTo: replyTo,
    subject: step.subject(lead),
    html:    step.buildHtml(lead, calendlyUrl),
  })

  if (result.error) {
    console.error(`[resend-nurturing] J+${step.day} failed for ${lead.email}:`, result.error)
    return false
  }

  console.log(`[resend-nurturing] J+${step.day} → ${lead.email} (${lead.firstName})`)
  return true
}
