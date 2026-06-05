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

/** CTA bloc : bouton Calendly + alternative téléphone si CONTACT_PHONE est défini */
function contactCta(calendlyUrl: string, ctaLabel: string, subtext?: string): string {
  const phone = process.env.CONTACT_PHONE
  const phoneHtml = phone
    ? `<p style="margin:10px 0 0;text-align:center;color:#6b6b66;font-size:13px;">
        Ou appelez directement&nbsp;:&nbsp;
        <a href="tel:${esc(phone.replace(/\s/g, ''))}" style="color:#e85d2b;font-weight:600;text-decoration:none;">${esc(phone)}</a>
       </p>`
    : ''

  return `<table width="100%" cellpadding="0" cellspacing="0"><tr>
  <td align="center" style="padding:24px 0 4px;">
    <a href="${esc(calendlyUrl)}" style="display:inline-block;background:#e85d2b;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:99px;text-decoration:none;">${esc(ctaLabel)} →</a>
    ${subtext ? `<p style="margin:8px 0 0;color:#a8a8a0;font-size:11px;">${esc(subtext)}</p>` : ''}
    ${phoneHtml}
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

// ── Per-dimension content ─────────────────────────────────────────────────────

// J+1 — what's strong (1-2 sentences, positive, genuine)
const DIMENSION_STRENGTH: Record<string, string> = {
  visibility:
    "Votre cabinet ressort là où vos prospects cherchent. C'est la fondation que 70&nbsp;% des cabinets n'ont pas encore — vous avez une vraie longueur d'avance sur ce point.",
  positioning:
    "Votre positionnement est clair et vous distingue des cabinets généralistes. Ça attire les bons clients et filtre naturellement les mauvais sans effort commercial supplémentaire.",
  conversion:
    "Votre site transforme les visiteurs en prospects. C'est rare — la majorité des cabinets perdent leurs leads au moment même où ils arrivent sur le site.",
  acquisition:
    "Vous avez un flux de prospects entrants. C'est le levier que tout le monde cherche à construire — vous l'avez déjà.",
  content:
    "Vous publiez et construisez votre autorité dans la durée. Ça travaille pour vous en permanence, même quand vous ne prospectez pas.",
  crm:
    "Vous suivez vos prospects et ne perdez pas de leads dans les mailles. C'est ce qui fait la différence entre 20&nbsp;% et 40&nbsp;% de taux de closing.",
  automation:
    "Vous utilisez les outils pour gagner du temps là où les autres consomment des heures inutilement. Ça libère de la bande passante pour l'essentiel.",
  reputation:
    "Votre réputation en ligne inspire confiance. C'est souvent ce qui fait pencher la balance quand un prospect hésite entre vous et un concurrent.",
  supply:
    "Votre cabinet peut absorber la croissance sans se casser. C'est la fondation que beaucoup négligent — et qui les fait stagner au pire moment.",
}

// J+1 — why the weak dimension matters (2-3 sentences, no negativity bias, focus on opportunity)
const DIMENSION_INSIGHT: Record<string, string> = {
  visibility:
    "Sur Google, les cabinets visibles captent les demandes entrantes — les autres attendent le bouche-à-oreille. Un cabinet bien positionné sur « expert-comptable [ville] » reçoit des prospects qualifiés sans effort commercial actif. C'est la différence entre une acquisition subie et une acquisition choisie.",
  positioning:
    "Choisir une niche et la communiquer clairement, c'est souvent la décision qui permet d'augmenter le panier moyen de 40 à 60&nbsp;% en 12 mois — pas parce qu'on travaille plus, mais parce qu'on arrête de se battre sur le prix.",
  conversion:
    "Un site qui convertit répond à trois questions en cinq secondes&nbsp;: qui êtes-vous, pour qui, et quoi faire maintenant. Travailler ce point, c'est transformer du trafic existant en prospects sans dépenser plus en acquisition.",
  acquisition:
    "Construire un deuxième canal d'acquisition — SEO local, LinkedIn, ads — c'est ce qui rend la croissance prévisible. Vous contrôlez le volume et la qualité des leads entrants, au lieu de dépendre des recommandations.",
  content:
    "Publier régulièrement — même une fois par semaine — construit une autorité sectorielle qui génère des leads entrants 6 à 12 mois après. Le contenu est le seul actif marketing qui travaille quand vous dormez.",
  crm:
    "La plupart des leads perdus ne sont pas perdus parce qu'ils n'étaient pas intéressés — ils sont perdus faute de relance. Un suivi simple change radicalement le taux de closing, sans toucher à l'acquisition.",
  automation:
    "Ce que certains cabinets font en trois heures, d'autres le font en vingt minutes avec les bons outils. Le temps gagné sur l'administratif se réinvestit directement dans le développement commercial.",
  reputation:
    "Un prospect hésite entre vous et un concurrent — il regarde vos avis Google. La réputation en ligne est devenue le premier filtre de sélection d'un prestataire comptable, et elle se construit en quelques semaines.",
  supply:
    "Créer de la marge opérationnelle avant d'accélérer l'acquisition, c'est ce qui permet de scaler sans dégrader la qualité de service — et donc sans risquer de perdre les clients qu'on vient d'acquérir.",
}

// J+5 — one actionable quick win per dimension (doable in < 2h)
const DIMENSION_ACTION: Record<string, string> = {
  visibility:
    "Ouvrez Google Business Profile et complétez chaque champ à 100&nbsp;%&nbsp;: description, horaires, photos récentes, catégories secondaires. Activez la prise de rendez-vous directement depuis la fiche. Meilleur ratio effort&nbsp;/ impact sur le référencement local.",
  positioning:
    "Écrivez en une phrase votre positionnement&nbsp;: <em>«&nbsp;Nous sommes le cabinet comptable de référence pour [niche] dans [région].&nbsp;»</em> Testez-la sur votre page d'accueil cette semaine. Si ça fait peur d'être aussi précis, vous êtes sur la bonne voie.",
  conversion:
    "Testez votre site avec quelqu'un qui ne vous connaît pas&nbsp;: en cinq secondes, peut-il dire ce que vous faites, pour qui, et comment vous contacter&nbsp;? Sinon, c'est votre section hero à réécrire en priorité — avant toute autre optimisation.",
  acquisition:
    "Faites la liste de vos dix meilleurs clients actuels. Qu'ont-ils en commun — secteur, taille, problème initial&nbsp;? Ce profil est votre ICP. Cette semaine, initiez cinq conversations LinkedIn avec des profils identiques. Pas de pitch&nbsp;: une question sur leur situation.",
  content:
    "Publiez un post LinkedIn cette semaine. Format&nbsp;: un problème récurrent chez vos clients&nbsp;+ une façon concrète de l'adresser. 150 mots maximum. Pas de hashtags, pas de «&nbsp;n'hésitez pas à me contacter&nbsp;». Juste de la valeur. Mesurez les impressions à 48h.",
  crm:
    "Créez un tableau avec quatre colonnes&nbsp;: Nom&nbsp;/ Email&nbsp;/ Dernier contact&nbsp;/ Statut (À contacter · En discussion · Perdu). Listez vos dix derniers prospects. Regardez combien sont en «&nbsp;Perdu&nbsp;» uniquement par manque de relance.",
  automation:
    "Identifiez la tâche administrative que vous répétez le plus souvent. Cherchez si ChatGPT ou un template peut la diviser par trois. Objectif&nbsp;: gagner une heure cette semaine — pas restructurer votre workflow, juste une tâche, un gain mesurable.",
  reputation:
    "Envoyez un message court à trois clients satisfaits avec votre lien Google direct. Texte&nbsp;: <em>«&nbsp;Bonjour [Prénom], si vous êtes satisfait de notre accompagnement, un avis Google nous aiderait beaucoup — 2 minutes&nbsp;: [lien].&nbsp;»</em>",
  supply:
    "Calculez votre capacité réelle&nbsp;: combien de clients par collaborateur, et quel est votre seuil de saturation&nbsp;? Ce chiffre vous dira si vous pouvez activer l'acquisition maintenant ou si vous devez d'abord créer de la marge.",
}

// J+3 — quadrant-specific situation + priority moves
const QUADRANT_INSIGHT: Record<string, string> = {
  'demand-constrained': `Votre opérationnel est prêt. Votre équipe peut absorber plus de clients. Le problème est en amont&nbsp;: pas assez de leads qualifiés qui entrent.
<br><br>
C'est la situation la plus actionnable — vous n'avez pas à restructurer, vous avez à activer. Les cabinets dans votre profil qui ont progressé le plus vite ont suivi la même séquence&nbsp;: clarifier leur positionnement en ligne, lancer un canal d'acquisition (SEO local ou LinkedIn outbound), installer un suivi de leads minimal. Pas les trois en même temps — <strong>un seul levier, pendant 60 jours</strong>.
<br><br>
Le risque à éviter&nbsp;: tester cinq choses en deux semaines et conclure que rien ne marche.`,

  'supply-constrained': `Votre acquisition fonctionne — et c'est une vraie force. Vous avez prouvé que vous savez attirer des clients. Le prochain défi&nbsp;: faire en sorte que la capacité suive, pour que cette acquisition ne devienne pas un problème de qualité.
<br><br>
Les cabinets dans votre profil qui ont bien géré cette phase ont fait une chose en premier&nbsp;: <strong>auditer la charge réelle par collaborateur</strong> et identifier les deux ou trois tâches qui consomment le plus de temps sans valeur proportionnelle. Souvent, c'est là que se cachent 20&nbsp;% de capacité supplémentaire — sans recruter.
<br><br>
L'objectif à 60 jours&nbsp;: créer cette marge, puis réouvrir l'acquisition en position de force.`,

  'scale-ready': `Vous êtes dans le top 15&nbsp;% des cabinets sur l'acquisition. Vos deux moteurs tournent — leads entrants et capacité opérationnelle.
<br><br>
La question n'est plus «&nbsp;comment démarrer&nbsp;» mais «&nbsp;comment industrialiser pour que la croissance ne dépende plus de votre présence personnelle&nbsp;». Les cabinets dans votre position qui ont franchi le cap suivant ont tous fait la même chose&nbsp;: <strong>identifier leur segment le plus rentable et concentrer 80&nbsp;% de leurs efforts dessus</strong> — en abandonnant les campagnes et clients qui diluent le focus.
<br><br>
La prochaine étape concrète&nbsp;: poser le chiffre. Quel CA additionnel sur 12 mois, sur quel segment, avec quel coût d'acquisition cible&nbsp;?`,

  'restructure': `Votre diagnostic pointe des tensions sur les deux axes — acquisition et opérationnel. Dans cette situation, accélérer l'acquisition amplifierait les problèmes existants plutôt que de les résoudre.
<br><br>
Ce n'est pas un mauvais signal — c'est la phase de transition entre un cabinet artisanal et un cabinet structuré. La plupart des fondateurs y passent. Ce que les cabinets qui s'en sont sortis ont fait&nbsp;: <strong>réduire avant de construire</strong>. Réduire l'offre aux un ou deux segments rentables, augmenter les prix pour filtrer le volume, stabiliser l'équipe. Seulement ensuite, activer l'acquisition.
<br><br>
C'est contre-intuitif — mais c'est la séquence qui fonctionne durablement.`,
}

// J+7 — vision motivante et chemin vers la croissance, spécifique au quadrant
const QUADRANT_VISION: Record<string, string> = {
  'demand-constrained': `Votre cabinet a la capacité — il manque le flux entrant. Ce n'est pas le problème le plus difficile à résoudre&nbsp;: c'est un problème d'activation, pas de reconstruction.
<br><br>
Avec le bon système en place, les demandes qualifiées remplacent progressivement la prospection active. Dans 6 à 9 mois, vous pouvez choisir vos clients — refuser ceux qui ne correspondent pas à votre cible, accepter ceux qui correspondent parfaitement. C'est ça, l'acquisition maîtrisée.`,

  'supply-constrained': `Vous prouvez quelque chose que beaucoup de cabinets cherchent encore&nbsp;: vous savez attirer des clients. C'est le levier le plus dur à construire — et vous l'avez déjà.
<br><br>
La prochaine étape, c'est de structurer pour que cette croissance ne repose plus sur vous seul. Un cabinet qui tourne sans votre présence dans les opérations quotidiennes — c'est l'objectif. Et il est accessible plus vite qu'on ne le pense quand on s'y attaque méthodiquement.`,

  'scale-ready': `Vous êtes déjà là où la plupart des cabinets aspirent à être. La question n'est plus si vous allez scaler — c'est à quelle vitesse et avec quelle précision vous choisissez votre prochain cap.
<br><br>
Les cabinets dans votre position qui ont franchi le palier suivant ne l'ont pas fait en travaillant plus. Ils ont mieux choisi&nbsp;: un segment, une offre premium, un canal d'acquisition maîtrisé. La croissance à ce stade est une question de clarté stratégique, pas d'effort supplémentaire.`,

  'restructure': `Les fondations que vous posez maintenant sont précisément ce qui vous permettra de croître solidement dans 6 mois — sans risque de tout casser en accélérant trop tôt.
<br><br>
Les cabinets qui ont pris ce temps de structuration avant d'accélérer ne l'ont jamais regretté. Vous construisez quelque chose de durable. Et quand vous rouvrirez l'acquisition depuis des bases stables, la croissance sera beaucoup plus rapide — et beaucoup moins douloureuse.`,
}

// ── Email J+1 — Force + Levier principal ─────────────────────────────────────

function buildJ1Html(lead: NurturingLead, calendlyUrl: string): string {
  const strengthKey = lead.best1
  const weakestKey  = lead.weakest3[0] ?? 'acquisition'
  const strength    = DIMENSION_STRENGTH[strengthKey] ?? ''
  const insight     = DIMENSION_INSIGHT[weakestKey]   ?? ''
  const article     = lead.articles[0]

  return emailWrapper(
    `${lead.firstName}, votre force et votre levier principal — suite à votre diagnostic`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 24px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  Votre diagnostic en clair.
</h1>

<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="background:#f0faf4;border:1px solid #b8e8cc;border-radius:8px;padding:18px 20px;width:48%;vertical-align:top;">
      <p style="margin:0 0 6px;color:#0a8f4a;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Votre force</p>
      <p style="margin:0 0 6px;color:#1a1a1a;font-size:14px;font-weight:700;">${esc(lead.best1LabelFr)}</p>
      <p style="margin:0;color:#3d3d3a;font-size:13px;line-height:1.65;">${strength}</p>
    </td>
    <td style="width:4%;"></td>
    <td style="background:#fff8f5;border:1px solid #f5cebb;border-radius:8px;padding:18px 20px;width:48%;vertical-align:top;">
      <p style="margin:0 0 6px;color:#e85d2b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Votre levier principal</p>
      <p style="margin:0 0 6px;color:#1a1a1a;font-size:14px;font-weight:700;">${esc(lead.weakest3LabelsFr[0] ?? 'Acquisition')}</p>
      <p style="margin:0;color:#3d3d3a;font-size:13px;line-height:1.65;">${insight}</p>
    </td>
  </tr>
</table>

<p style="margin:0 0 24px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Les cabinets qui avancent le plus vite ne cherchent pas à tout améliorer en même temps. Ils s'appuient sur leur force pour générer de la confiance — et adressent leur principal levier en premier pour débloquer la croissance.
</p>

${article ? articleCard(article.slug, article.title) : ''}

${contactCta(calendlyUrl, 'On regarde ça ensemble — 30 min, gratuit', '30 min · Sans engagement · Sans pitch')}
`,
  )
}

// ── Email J+3 — Situation + plan selon le quadrant ───────────────────────────

function buildJ3Html(lead: NurturingLead, calendlyUrl: string): string {
  const insight = QUADRANT_INSIGHT[lead.quadrantId] ?? QUADRANT_INSIGHT['demand-constrained']
  const article = lead.articles[1]

  return emailWrapper(
    `Les cabinets « ${lead.quadrantLabelFr} » — ce qu'ils font en premier`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 20px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  Les cabinets &laquo;&thinsp;<span style="color:#e85d2b;">${esc(lead.quadrantLabelFr)}</span>&thinsp;&raquo; font ça en premier.
</h1>

<p style="margin:0 0 16px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Votre diagnostic vous place dans la catégorie <strong>${esc(lead.quadrantLabelFr)}</strong>. Ce n'est pas juste un label — ça définit précisément quelle est votre prochaine priorité, et dans quel ordre agir pour ne pas gaspiller d'énergie sur les mauvais leviers.
</p>

<p style="margin:0 0 24px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  ${insight}
</p>

${article ? articleCard(article.slug, article.title) : ''}

${contactCta(calendlyUrl, 'Cartographier mon plan d\'action', '30 min · Gratuit · Basé sur votre diagnostic')}
`,
  )
}

// ── Email J+5 — 3 actions concrètes cette semaine ────────────────────────────

function buildJ5Html(lead: NurturingLead, calendlyUrl: string): string {
  const [cat0, cat1, cat2]  = lead.weakest3
  const [lab0, lab1, lab2]  = lead.weakest3LabelsFr
  const action0 = DIMENSION_ACTION[cat0 ?? 'acquisition'] ?? ''
  const action1 = DIMENSION_ACTION[cat1 ?? 'visibility']  ?? ''
  const action2 = DIMENSION_ACTION[cat2 ?? 'crm']         ?? ''
  const article = lead.articles[2]

  return emailWrapper(
    `3 actions concrètes cette semaine — taillées pour votre situation`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 24px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  3 actions concrètes pour cette semaine.
</h1>

<p style="margin:0 0 24px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Basées sur vos trois dimensions les plus faibles. Chacune est faisable en moins de deux heures — pas de projet, pas de réunion, juste une action et un résultat mesurable.
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

<p style="margin:0 0 20px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  Besoin d'aide pour mettre l'une de ces actions en place&nbsp;? C'est exactement ce qu'on fait pendant l'appel — gratuitement, en 30 minutes.
</p>

${contactCta(calendlyUrl, 'Je veux de l\'aide pour la mise en place', '30 min · Gratuit · On travaille sur votre cas concret')}
`,
  )
}

// ── Email J+7 — Vision motivante + CTA ───────────────────────────────────────

function buildJ7Html(lead: NurturingLead, calendlyUrl: string): string {
  const vision     = QUADRANT_VISION[lead.quadrantId] ?? QUADRANT_VISION['demand-constrained']
  const scoreColor = lead.globalScore >= 76 ? '#0a5fbf'
    : lead.globalScore >= 56 ? '#0a8f4a'
    : lead.globalScore >= 36 ? '#e85d2b'
    : '#dc4a2b'

  return emailWrapper(
    `${lead.firstName} — la voie la plus directe vers votre prochaine étape`,
    `
<p style="margin:0 0 6px;color:#6b6b66;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Bonjour ${esc(lead.firstName)},</p>
<h1 style="margin:0 0 24px;font-size:22px;color:#1a1a1a;font-weight:700;line-height:1.25;">
  La voie la plus directe vers votre prochaine étape.
</h1>

<table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f4;border:1px solid #e6e1d3;border-radius:10px;margin-bottom:28px;">
<tr>
  <td style="padding:20px 24px;text-align:center;border-right:1px solid #e6e1d3;width:50%;">
    <p style="margin:0 0 4px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Votre score</p>
    <p style="margin:0;font-size:48px;font-weight:700;color:${scoreColor};line-height:1;">${lead.globalScore}</p>
    <p style="margin:2px 0 0;color:#6b6b66;font-size:11px;">/100 points</p>
  </td>
  <td style="padding:20px 24px;text-align:center;width:50%;">
    <p style="margin:0 0 4px;color:#6b6b66;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Profil</p>
    <p style="margin:0;font-size:14px;font-weight:700;color:#1a1a1a;line-height:1.3;">${esc(lead.quadrantLabelFr)}</p>
    <p style="margin:4px 0 0;color:#6b6b66;font-size:11px;">${esc(lead.levelLabel)}</p>
  </td>
</tr>
</table>

<p style="margin:0 0 20px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  ${vision}
</p>

<p style="margin:0 0 28px;color:#3d3d3a;font-size:15px;line-height:1.75;">
  En 30 minutes ensemble, on peut transformer votre diagnostic en plan d'action concret — les leviers à activer, dans quel ordre, avec quels indicateurs. Sans pitch, sans engagement. Juste du concret basé sur votre situation.
</p>

${contactCta(calendlyUrl, 'Réserver mon audit stratégique gratuit', '30 min · Gratuit · Sans engagement')}
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
      `${l.firstName} — votre force et votre levier principal`,
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
      `${l.firstName} — la voie vers votre prochaine étape (score : ${l.globalScore}/100)`,
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
