export interface FAQ {
  question: string
  answer: string
}

export interface Service {
  slug: string
  title: string
  shortDesc: string
  description: string
  features: string[]
  icon: string
  stat: string
  statLabel: string
  metaTitle: string
  metaDescription: string
  faqs: FAQ[]
}

export const services: Service[] = [
  {
    slug: 'seo-programmatique',
    title: 'SEO programmatique',
    shortDesc: 'Des centaines de pages locales optimisées pour capter la demande qualifiée.',
    description:
      'On génère des centaines de pages locales (ville × verticale) optimisées pour capter la demande qualifiée. On indexe, on classe, on convertit. Le SEO programmatique est le levier le plus scalable pour les cabinets qui veulent dominer Google.',
    features: [
      'Audit SEO technique complet',
      'Génération de pages ville × verticale',
      'Optimisation Core Web Vitals',
      'Content SEO mensuel',
      'Link building sectoriel',
      'Google Business Profile',
    ],
    icon: 'Search',
    stat: '×312',
    statLabel: 'trafic organique · Cabinet Mercier',
    metaTitle: 'SEO programmatique pour cabinet comptable | GrowthCompta',
    metaDescription:
      "Dominez Google avec des centaines de pages optimisées ville × verticale. SEO programmatique spécialisé cabinets d'expertise comptable.",
    faqs: [
      {
        question: 'En combien de temps le SEO programmatique produit-il des résultats ?',
        answer: 'Premiers classements en 3 mois, volume significatif à 6 mois. Le SEO programmatique est un investissement long terme à très fort ROI.',
      },
    ],
  },
  {
    slug: 'paid-ads',
    title: 'Paid ads · Meta + Google',
    shortDesc: 'Campagnes ciblées par persona dirigeant avec attribution propre.',
    description:
      'Campagnes ciblées par persona dirigeant (e-comm, BTP, médical…). Lead magnets calibrés, retargeting tight, attribution propre. On vise un CPL sous 50€ pour des prospects qualifiés.',
    features: [
      'Audit et structuration des comptes',
      'Création des personas et audiences',
      'Production des créatifs et copies',
      'Lead magnets dédiés',
      'Retargeting multi-touch',
      'Attribution et reporting ROI',
    ],
    icon: 'Target',
    stat: '38€',
    statLabel: 'CPL moyen · Meta ads',
    metaTitle: 'Acquisition payante cabinet comptable : Facebook, Google ou LinkedIn | GrowthCompta',
    metaDescription:
      'Guide complet de l\'acquisition payante pour experts-comptables. Quel canal choisir selon votre niche ? Matrice Niche-Canal, framework, CPL moyen 38€.',
    faqs: [
      {
        question: 'Quel budget minimum pour lancer des campagnes ?',
        answer: 'On recommande 2 000 à 3 000€/mois de budget média pour tester et optimiser efficacement. En dessous, les données sont insuffisantes pour apprendre.',
      },
    ],
  },
  {
    slug: 'content-sales',
    title: 'Content sales',
    shortDesc: 'Guides verticaux, comparateurs et calculateurs qui convertissent.',
    description:
      'On écrit ce qui convertit : guides verticaux, comparateurs, calculateurs. Optimisé pour les recherches "expert-comptable + X". Le content sales transforme votre expertise en machine à leads.',
    features: [
      'Stratégie éditoriale par verticale',
      'Guides experts téléchargeables',
      'Comparateurs et calculateurs',
      'Articles de blog SEO',
      'Newsletters prospects',
      'Séquences email nurturing',
    ],
    icon: 'FileText',
    stat: '4,7%',
    statLabel: 'taux de conversion blog',
    metaTitle: 'Contenu pour expert-comptable : transformer son expertise en machine à clients | GrowthCompta',
    metaDescription:
      "Guide complet du content marketing pour cabinets comptables. LinkedIn, SEO, newsletter, YouTube — l'Équation du Contenu Rentable : Expertise × Distribution × Confiance × Nurturing.",
    faqs: [
      {
        question: "Combien d'articles faut-il produire par mois ?",
        answer: '2 à 4 articles optimisés par mois par verticale ciblée. La qualité et la pertinence sectorielle priment sur la quantité.',
      },
    ],
  },
  {
    slug: 'sales-ops-automation',
    title: 'Sales ops & automation',
    shortDesc: 'CRM, nurturing et scoring pour qualifier avant que vous décrochiez.',
    description:
      'CRM, séquences de nurturing, scoring leads, intégration aux outils comptables. On qualifie avant que vous décrochiez. Vos commerciaux ne contactent que des prospects chauds.',
    features: [
      'Audit et choix du CRM',
      'Paramétrage et intégrations',
      'Scoring et qualification automatique',
      'Séquences de nurturing multi-canal',
      'Tableaux de bord et reporting',
      'Formation équipe commerciale',
    ],
    icon: 'Zap',
    stat: '38%',
    statLabel: 'SQL ratio moyen',
    metaTitle: 'Sales ops & automation pour cabinet comptable | GrowthCompta',
    metaDescription:
      'CRM, nurturing et automation pour qualifier vos leads avant de les contacter. SQL ratio moyen 38% sur notre portefeuille.',
    faqs: [
      {
        question: 'Avec quels CRM travaillez-vous ?',
        answer: "HubSpot, Pipedrive et Salesforce principalement. On s'adapte à votre stack existant ou recommandons la solution la plus adaptée à votre taille.",
      },
    ],
  },
  {
    slug: 'brand-positioning',
    title: 'Brand & positioning',
    shortDesc: 'Positionnement vertical, naming, identité visuelle, site refonte.',
    description:
      "Pour sortir du lot \"expert-comptable généraliste\" : positionnement vertical, naming, identité visuelle, site refonte. Une marque forte réduit le coût d'acquisition et augmente la valeur perçue.",
    features: [
      'Atelier de positionnement vertical',
      'Naming et territoire de marque',
      'Identité visuelle complète',
      'Refonte site (Webflow ou Next.js)',
      'Templates supports commerciaux',
      'Guide de marque livré',
    ],
    icon: 'Palette',
    stat: '6sem',
    statLabel: 'go-live moyen',
    metaTitle: 'Brand & positioning pour cabinet comptable | GrowthCompta',
    metaDescription:
      'Positionnement vertical, identité visuelle et refonte site pour cabinets comptables. Go-live en 6 semaines.',
    faqs: [
      {
        question: 'Le site est-il inclus dans cette offre ?',
        answer: 'Oui. La refonte site est incluse. On livre sur Webflow (pour l\'autonomie éditoriale) ou Next.js (pour le SEO programmatique avancé).',
      },
    ],
  },
  {
    slug: 'growth-audit',
    title: 'Growth audit + roadmap',
    shortDesc: 'Diagnostic complet et roadmap 6 mois priorisée. Livré en 14 jours.',
    description:
      "Diagnostic complet : trafic, conversion, retention, pricing. Roadmap 6 mois priorisée par ROI. Livré sous 14 jours. L'audit est gratuit pour les cabinets éligibles.",
    features: [
      'Analyse trafic et sources',
      'Audit conversion et parcours',
      'Benchmarking concurrents',
      'Analyse pricing et positionnement',
      'Roadmap 6 mois priorisée',
      'Session de restitution live',
    ],
    icon: 'BarChart',
    stat: '14j',
    statLabel: 'livraison · gratuit',
    metaTitle: 'Growth audit pour cabinet comptable | GrowthCompta',
    metaDescription:
      'Audit complet de votre acquisition + roadmap 6 mois. Diagnostic trafic, conversion, retention, pricing. Livré en 14 jours, gratuit.',
    faqs: [
      {
        question: "L'audit est-il vraiment gratuit ?",
        answer: "Oui, pour les cabinets éligibles (5+ collaborateurs, volonté de spécialisation). On investit sur l'audit car 70% de nos clients démarrent ensuite un engagement.",
      },
    ],
  },
]
