export interface NicheFAQ {
  question: string
  answer: string
}

export interface Niche {
  slug: string
  label: string
  headline: string
  description: string
  keywords: string[]
  painPoints: string[]
  faqs: NicheFAQ[]
}

export const niches: Niche[] = [
  {
    slug: "ecommerce",
    label: "E-commerce",
    headline: "Votre cabinet spécialisé e-commerce, visible sur Google.",
    description:
      "Les e-commerçants ont des besoins comptables spécifiques : TVA intracommunautaire, stocks, marketplaces, dropshipping. Positionnez votre cabinet comme l'expert incontournable.",
    keywords: ["expert comptable ecommerce", "comptable amazon fba", "comptable shopify", "expert tva ecommerce"],
    painPoints: ["TVA intracommunautaire complexe", "Gestion des stocks multi-entrepôts", "Réconciliation marketplaces"],
    faqs: [
      { question: "Gérez-vous la comptabilité Amazon FBA ?", answer: "Oui, nous accompagnons les cabinets qui souhaitent se positionner sur Amazon FBA et la vente multicanale." },
    ],
  },
  {
    slug: "amazon-fba",
    label: "Amazon FBA",
    headline: "Devenez le comptable de référence des vendeurs Amazon.",
    description:
      "Amazon FBA est une niche en forte croissance avec des enjeux comptables pointus. Les vendeurs cherchent des experts capables de gérer leurs spécificités.",
    keywords: ["comptable amazon fba", "expert comptable vendeur amazon", "tva amazon fba france"],
    painPoints: ["Réconciliation des paiements Amazon", "TVA européenne", "Valorisation des stocks FBA"],
    faqs: [
      { question: "Combien de vendeurs Amazon cherchent un comptable spécialisé ?", answer: "Des milliers en France, et la niche est peu couverte par les cabinets traditionnels." },
    ],
  },
  {
    slug: "startups",
    label: "Startups & SaaS",
    headline: "L'expert comptable qui parle le langage des startups.",
    description:
      "Les startups et SaaS ont des besoins spécifiques : levée de fonds, BSPCE, R&D, revenus récurrents. Soyez leur interlocuteur de confiance dès la création.",
    keywords: ["expert comptable startup", "comptable saas", "expert bspce", "comptable levée de fonds"],
    painPoints: ["Gestion des BSPCE et actions gratuites", "Comptabilisation des revenus SaaS", "Préparation due diligence levée"],
    faqs: [
      { question: "Accompagnez-vous les startups lors des levées de fonds ?", answer: "Oui, nous préparons les cabinets à devenir des partenaires stratégiques pour les startups en croissance." },
    ],
  },
  {
    slug: "medecins",
    label: "Médecins & Santé",
    headline: "Le cabinet comptable dédié aux professionnels de santé.",
    description:
      "Médecins libéraux, chirurgiens, dentistes, infirmiers : des contraintes fiscales et sociales spécifiques que peu de cabinets maîtrisent vraiment.",
    keywords: ["expert comptable médecin", "comptable profession libérale santé", "comptable médecin libéral"],
    painPoints: ["BNC vs BIC selon structure", "Cotisations CARMF / CARPIMKO", "SCM et SCI médicale"],
    faqs: [
      { question: "Gérez-vous les SEL médicales ?", answer: "Les SEL (Sociétés d'Exercice Libéral) sont une spécialité prisée — nous aidons les cabinets à communiquer leur expertise." },
    ],
  },
  {
    slug: "immobilier",
    label: "Immobilier & SCI",
    headline: "L'expert des investisseurs immobiliers et des SCI.",
    description:
      "Investisseurs locatifs, marchands de biens, SCI familiales : l'immobilier concentre des optimisations fiscales puissantes que vos clients veulent exploiter.",
    keywords: ["expert comptable immobilier", "comptable sci", "expert lmnp", "comptable investisseur immobilier"],
    painPoints: ["Choix du régime fiscal (réel vs micro)", "Constitution et gestion SCI", "Optimisation LMNP / LMP"],
    faqs: [
      { question: "Accompagnez-vous les marchands de biens ?", answer: "Oui, c'est une niche premium avec des marges élevées pour les cabinets spécialisés." },
    ],
  },
  {
    slug: "btp",
    label: "BTP & Artisans",
    headline: "Le comptable qui comprend les chantiers et la sous-traitance.",
    description:
      "Le secteur BTP a ses propres règles : TVA sur marge, sous-traitance, retenue de garantie, PPSPS. Les artisans cherchent un comptable qui parle leur langue.",
    keywords: ["expert comptable btp", "comptable artisan bâtiment", "comptable sous-traitant btp"],
    painPoints: ["TVA sur les travaux (taux réduits)", "Gestion de la sous-traitance", "Plans de trésorerie chantier"],
    faqs: [
      { question: "Gérez-vous la comptabilité des auto-entrepreneurs du bâtiment ?", answer: "Oui, de l'auto-entrepreneur à la SARL BTP, chaque structure a ses spécificités." },
    ],
  },
  {
    slug: "freelances",
    label: "Freelances & Indépendants",
    headline: "Le comptable de la nouvelle génération de travailleurs indépendants.",
    description:
      "Développeurs, consultants, designers, formateurs : les freelances veulent un comptable réactif, digital et qui comprend leur mode de travail.",
    keywords: ["expert comptable freelance", "comptable indépendant", "comptable consultant"],
    painPoints: ["Optimisation rémunération dividendes vs salaire", "TVA et portage salarial", "Epargne retraite TNS"],
    faqs: [
      { question: "Proposez-vous des forfaits adaptés aux freelances ?", answer: "Un positionnement prix clair et des services digitaux sont clés pour séduire les freelances." },
    ],
  },
  {
    slug: "agences",
    label: "Agences & Conseil",
    headline: "L'expert comptable des agences web, marketing et conseil.",
    description:
      "Agences web, agences marketing, cabinets de conseil : des structures spécifiques avec des cycles de facturation particuliers et des enjeux de valorisation.",
    keywords: ["expert comptable agence web", "comptable agence marketing", "comptable cabinet conseil"],
    painPoints: ["Comptabilisation des projets en cours", "Gestion des frais refacturés", "Valorisation et cession d'agence"],
    faqs: [
      { question: "Accompagnez-vous la cession d'une agence ?", answer: "La cession et l'évaluation d'agence sont des services à haute valeur ajoutée très recherchés." },
    ],
  },
  {
    slug: "restauration",
    label: "Restauration & CHR",
    headline: "Le comptable spécialiste des cafés, hôtels et restaurants.",
    description:
      "Le secteur CHR (Cafés, Hôtels, Restaurants) est complexe : caisse, TVA multi-taux, pourboires, saisonnalité. Positionnez-vous comme l'expert de ce secteur.",
    keywords: ["expert comptable restaurant", "comptable chr", "comptable hôtel café"],
    painPoints: ["TVA multi-taux en restauration", "Gestion des pourboires et service", "Saisonnalité et trésorerie"],
    faqs: [
      { question: "Gérez-vous les dark kitchens et restaurants virtuels ?", answer: "Oui, les nouvelles formes de restauration génèrent des besoins comptables spécifiques." },
    ],
  },
  {
    slug: "lmnp",
    label: "LMNP & Location meublée",
    headline: "L'expert numéro 1 du LMNP en France.",
    description:
      "La location meublée non professionnelle est un marché en explosion. Les investisseurs cherchent des experts capables d'optimiser leur fiscalité et leur amortissement.",
    keywords: ["expert comptable lmnp", "comptable location meublée", "expert amortissement lmnp"],
    painPoints: ["Calcul et gestion des amortissements", "Bascule LMNP vers LMP", "Déclaration 2031"],
    faqs: [
      { question: "Accompagnez-vous les plateformes Airbnb ?", answer: "Oui, la location courte durée est une sous-niche avec ses propres règles fiscales." },
    ],
  },
  {
    slug: "crypto",
    label: "Crypto & Web3",
    headline: "Le comptable qui maîtrise la fiscalité crypto en France.",
    description:
      "La fiscalité des cryptomonnaies est complexe et peu de comptables la maîtrisent. Une opportunité unique de vous positionner sur cette niche en forte demande.",
    keywords: ["expert comptable crypto", "comptable bitcoin", "fiscalité cryptomonnaie France", "comptable nft"],
    painPoints: ["Calcul des plus-values crypto", "Déclaration des comptes étrangers", "Fiscalité des NFT et DeFi"],
    faqs: [
      { question: "Gérez-vous la fiscalité des mineurs de cryptomonnaies ?", answer: "Le mining, le staking et la DeFi ont chacun leur traitement fiscal spécifique." },
    ],
  },
  {
    slug: "artisans",
    label: "Artisanat",
    headline: "Le comptable de confiance des artisans français.",
    description:
      "Plombiers, électriciens, maçons, boulangers : les artisans ont besoin d'un comptable réactif qui comprend leur activité et les aide à pérenniser leur entreprise.",
    keywords: ["expert comptable artisan", "comptable plombier", "comptable électricien", "comptable boulanger"],
    painPoints: ["Gestion de la trésorerie saisonnière", "Passage de l'auto-entreprise à la SARL", "Transmission d'entreprise artisanale"],
    faqs: [
      { question: "Accompagnez-vous la transmission d'un fonds artisanal ?", answer: "La transmission et la valorisation d'un fonds artisanal sont des missions à forte valeur ajoutée." },
    ],
  },
  {
    slug: "associations",
    label: "Associations & Secteur non-marchand",
    headline: "L'expert comptable du monde associatif et solidaire.",
    description:
      "Les associations ont des obligations comptables spécifiques (CSOEC, commissariat aux comptes selon seuils) et cherchent des experts du secteur non-marchand.",
    keywords: ["expert comptable association", "commissariat aux comptes association", "comptable ESS"],
    painPoints: ["Comptabilité par fonds et projets", "Gestion des subventions", "Obligations de commissariat aux comptes"],
    faqs: [
      { question: "Gérez-vous les associations d'utilité publique ?", answer: "Oui, avec des obligations spécifiques de transparence et de reporting." },
    ],
  },
  {
    slug: "professions-liberales",
    label: "Professions libérales",
    headline: "Le cabinet comptable des professions réglementées.",
    description:
      "Avocats, architectes, experts-comptables, notaires : les professions libérales réglementées ont des structures et des contraintes fiscales qui méritent une expertise dédiée.",
    keywords: ["expert comptable profession libérale", "comptable avocat", "comptable architecte", "comptable notaire"],
    painPoints: ["Choix de la structure juridique optimale", "Gestion de la SCP ou SEL", "Optimisation cotisations sociales"],
    faqs: [
      { question: "Gérez-vous les SCP et SCM d'avocats ?", answer: "Oui, les structures multi-associés des professions libérales sont notre spécialité." },
    ],
  },
  {
    slug: "sci",
    label: "SCI & Patrimoine",
    headline: "L'expert des SCI familiales et patrimoniales.",
    description:
      "La gestion de patrimoine via SCI est un marché en croissance. Les familles et investisseurs cherchent des experts capables de structurer et optimiser leur patrimoine immobilier.",
    keywords: ["expert comptable sci", "comptable sci familiale", "comptable gestion patrimoine"],
    painPoints: ["Constitution et gestion de la SCI", "IS vs IR : quel régime choisir ?", "Transmission patrimoniale via SCI"],
    faqs: [
      { question: "Accompagnez-vous la donation de parts de SCI ?", answer: "La transmission de parts de SCI est un acte clé qui nécessite une expertise comptable et fiscale pointue." },
    ],
  },
]
