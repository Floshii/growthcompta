import type { Question } from '@/types/quiz'

export const QUESTIONS: Question[] = [
  // ── VISIBILITÉ GOOGLE (3 questions × 5pts max) ──────────────
  {
    id: 'vis_1',
    category: 'visibility',
    text: "Quand quelqu'un recherche « expert-comptable [votre ville] » sur Google, votre cabinet apparaît…",
    options: [
      { label: 'En première position', value: 3 },
      { label: 'En première page, mais pas en tête', value: 2 },
      { label: 'En deuxième page ou après', value: 1 },
      { label: "Je ne sais pas / on n'apparaît pas", value: 0 },
    ],
  },
  {
    id: 'vis_2',
    category: 'visibility',
    text: 'Votre fiche Google Business Profile (Google Maps) est…',
    options: [
      { label: "Complète, à jour et avec des avis récents", value: 3 },
      { label: 'Existante mais peu remplie', value: 1 },
      { label: 'Non revendiquée ou inexistante', value: 0 },
      { label: "Créée mais jamais vraiment travaillée", value: 1 },
    ],
  },
  {
    id: 'vis_3',
    category: 'visibility',
    text: 'Votre cabinet a des pages web dédiées à une spécialisation (ex : « comptable e-commerce », « comptable médecin ») ?',
    options: [
      { label: 'Oui, plusieurs pages optimisées SEO', value: 3 },
      { label: 'Oui, une page générique de services', value: 1 },
      { label: "Non, on a juste une page « services »", value: 0 },
      { label: "On n'a pas vraiment de site", value: 0 },
    ],
  },

  // ── POSITIONNEMENT & SPÉCIALISATION (3 questions) ───────────
  {
    id: 'pos_1',
    category: 'positioning',
    text: 'Si je vous demande quelle est votre niche principale, vous diriez…',
    options: [
      { label: "On a une spécialisation claire et on la communique", value: 3 },
      { label: "On tend vers une niche mais c'est pas encore formalisé", value: 2 },
      { label: 'On accepte tous types de clients', value: 0 },
      { label: 'On a quelques clients dans un secteur mais sans stratégie', value: 1 },
    ],
  },
  {
    id: 'pos_2',
    category: 'positioning',
    text: 'Votre proposition de valeur vs un cabinet généraliste est…',
    options: [
      { label: 'Très claire : expertise sectorielle + preuve', value: 3 },
      { label: 'Définie mais peu communiquée en ligne', value: 1 },
      { label: "On dit qu'on est « réactif et disponible » comme tout le monde", value: 0 },
      { label: 'On y travaille', value: 1 },
    ],
  },
  {
    id: 'pos_3',
    category: 'positioning',
    text: 'Votre panier moyen client est de…',
    isQualification: true,
    qualificationKey: 'averageBasket',
    options: [
      { label: 'Plus de 2 000 €/mois', value: 3 },
      { label: 'Entre 1 000 et 2 000 €/mois', value: 2 },
      { label: 'Entre 500 et 1 000 €/mois', value: 1 },
      { label: 'Moins de 500 €/mois', value: 0 },
    ],
  },

  // ── SITE WEB & CONVERSION (3 questions) ─────────────────────
  {
    id: 'conv_1',
    category: 'conversion',
    text: "Votre site web a-t-il un appel à l'action clair pour prendre rendez-vous ?",
    options: [
      { label: 'Oui, un bouton de prise de RDV en ligne visible partout', value: 3 },
      { label: 'Oui, un formulaire de contact', value: 1 },
      { label: "Juste un numéro de téléphone", value: 0 },
      { label: "On n'a pas de site à jour", value: 0 },
    ],
  },
  {
    id: 'conv_2',
    category: 'conversion',
    text: 'Votre site se charge en moins de 3 secondes sur mobile ?',
    options: [
      { label: 'Oui, il est rapide et optimisé', value: 3 },
      { label: 'Je ne sais pas', value: 1 },
      { label: 'Il est plutôt lent', value: 0 },
      { label: 'Mon site date de plus de 3 ans', value: 0 },
    ],
  },
  {
    id: 'conv_3',
    category: 'conversion',
    text: 'Quand un prospect arrive sur votre site, il comprend immédiatement…',
    options: [
      { label: 'Ce que vous faites, pour qui, et comment vous contacter', value: 3 },
      { label: 'Ce que vous faites mais pas vraiment pour qui', value: 1 },
      { label: 'Difficile à dire — le site est générique', value: 0 },
      { label: 'On a un site vitrine basique', value: 0 },
    ],
  },

  // ── ACQUISITION & LEADS (3 questions) ───────────────────────
  {
    id: 'acq_1',
    category: 'acquisition',
    text: 'Comment vos nouveaux clients vous trouvent-ils actuellement ?',
    options: [
      { label: 'Mix diversifié : SEO, Ads, LinkedIn, bouche-à-oreille', value: 3 },
      { label: 'Surtout bouche-à-oreille + un peu de Google', value: 1 },
      { label: 'Quasi-exclusivement le bouche-à-oreille', value: 0 },
      { label: 'On fait un peu de tout mais sans vraie stratégie', value: 1 },
    ],
  },
  {
    id: 'acq_2',
    category: 'acquisition',
    text: 'Vous avez un budget marketing mensuel défini ?',
    isQualification: true,
    qualificationKey: 'marketingBudget',
    options: [
      { label: 'Oui, plus de 2 000 €/mois', value: 3 },
      { label: 'Oui, entre 500 et 2 000 €/mois', value: 2 },
      { label: 'Oui, moins de 500 €/mois', value: 1 },
      { label: 'Non, aucun budget marketing', value: 0 },
    ],
  },
  {
    id: 'acq_3',
    category: 'acquisition',
    text: 'Vous faites de la prospection outbound (LinkedIn, emailing, partenariats) ?',
    options: [
      { label: 'Oui, régulièrement avec une vraie stratégie', value: 3 },
      { label: 'De temps en temps, sans système', value: 1 },
      { label: 'Rarement, on attend que les clients viennent', value: 0 },
      { label: 'Jamais — on est contre cette approche', value: 0 },
    ],
  },

  // ── CONTENU & AUTORITÉ (2 questions) ────────────────────────
  {
    id: 'cont_1',
    category: 'content',
    text: 'Votre cabinet publie du contenu (blog, LinkedIn, vidéo) ?',
    options: [
      { label: 'Oui, régulièrement avec une ligne éditoriale', value: 3 },
      { label: 'Oui, mais de façon irrégulière', value: 1 },
      { label: "On a publié quelques posts LinkedIn il y a longtemps", value: 0 },
      { label: 'Non, aucun contenu', value: 0 },
    ],
  },
  {
    id: 'cont_2',
    category: 'content',
    text: 'Votre présence LinkedIn professionnelle est…',
    options: [
      { label: 'Active : profil optimisé + publications régulières', value: 3 },
      { label: 'Existante mais pas vraiment entretenue', value: 1 },
      { label: 'Un profil créé mais vide', value: 0 },
      { label: 'Inexistante', value: 0 },
    ],
  },

  // ── CRM & RELANCE (2 questions) ──────────────────────────────
  {
    id: 'crm_1',
    category: 'crm',
    text: 'Vous avez un CRM ou un système pour suivre vos prospects ?',
    options: [
      { label: 'Oui, un CRM avec pipeline structuré', value: 3 },
      { label: 'Oui, un tableur Excel/Notion', value: 1 },
      { label: "Non, ça se passe par email/mémoire", value: 0 },
      { label: "Je ne sais pas ce qu'est un CRM", value: 0 },
    ],
  },
  {
    id: 'crm_2',
    category: 'crm',
    text: 'Quand un prospect vous contacte et ne répond plus, vous…',
    options: [
      { label: 'Relancez avec une séquence automatisée', value: 3 },
      { label: 'Relancez manuellement 1-2 fois', value: 1 },
      { label: "Attendez qu'il revienne", value: 0 },
      { label: "Il n'y a pas vraiment de processus", value: 0 },
    ],
  },

  // ── AUTOMATION & IA (2 questions) ───────────────────────────
  {
    id: 'auto_1',
    category: 'automation',
    text: "L'onboarding de vos nouveaux clients est…",
    options: [
      { label: 'Automatisé : emails de bienvenue, checklist, portail client', value: 3 },
      { label: 'Semi-automatisé : quelques templates mais pas de flux complet', value: 1 },
      { label: 'Manuel : chaque onboarding est fait à la main', value: 0 },
      { label: 'Très informel', value: 0 },
    ],
  },
  {
    id: 'auto_2',
    category: 'automation',
    text: "Vous utilisez l'IA dans votre activité ?",
    options: [
      { label: "Oui, dans plusieurs processus (acquisition, contenu, admin)", value: 3 },
      { label: "Un peu, pour la rédaction ou des tâches ponctuelles", value: 1 },
      { label: 'Rarement', value: 0 },
      { label: 'Jamais', value: 0 },
    ],
  },

  // ── RÉPUTATION & PREUVE SOCIALE (2 questions) ───────────────
  {
    id: 'rep_1',
    category: 'reputation',
    text: 'Vos avis Google sont…',
    options: [
      { label: '+20 avis, note 4,5+, avec réponses', value: 3 },
      { label: '+5 avis mais peu récents', value: 1 },
      { label: 'Moins de 5 avis', value: 0 },
      { label: "Pas d'avis du tout", value: 0 },
    ],
  },
  {
    id: 'rep_2',
    category: 'reputation',
    text: 'Sur votre site, on trouve des témoignages, études de cas, ou logos clients ?',
    options: [
      { label: 'Oui, des études de cas détaillées avec résultats', value: 3 },
      { label: 'Oui, quelques témoignages texte', value: 1 },
      { label: 'Non, rien de ce type', value: 0 },
      { label: 'On a des logos mais pas de contenu associé', value: 1 },
    ],
  },

  // ── QUALIFICATION (2 questions non scorées) ──────────────────
  {
    id: 'qual_size',
    category: 'acquisition',
    isQualification: true,
    qualificationKey: 'cabinetSize',
    text: 'Votre cabinet compte…',
    options: [
      { label: '1 personne (solo)', value: 0 },
      { label: '2 à 5 personnes', value: 1 },
      { label: '6 à 10 personnes', value: 2 },
      { label: '11 personnes et plus', value: 3 },
    ],
  },
  {
    id: 'qual_ambition',
    category: 'acquisition',
    isQualification: true,
    qualificationKey: 'growthAmbition',
    text: 'Votre objectif de croissance pour les 12 prochains mois est…',
    options: [
      { label: 'Doubler mon nombre de clients', value: 3 },
      { label: "Augmenter mon panier moyen et attirer de meilleurs clients", value: 3 },
      { label: "Stabiliser et structurer ce que j'ai", value: 1 },
      { label: "Je n'ai pas encore d'objectif précis", value: 0 },
    ],
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  visibility:  'Visibilité Google',
  positioning: 'Positionnement',
  conversion:  'Site & Conversion',
  acquisition: 'Acquisition & Leads',
  content:     'Contenu & Autorité',
  crm:         'CRM & Relance',
  automation:  'Automation & IA',
  reputation:  'Réputation & Preuves',
}

export const CATEGORY_MAX: Record<string, number> = {
  visibility:  15,
  positioning: 15,
  conversion:  15,
  acquisition: 15,
  content:     10,
  crm:         10,
  automation:  10,
  reputation:  10,
}
