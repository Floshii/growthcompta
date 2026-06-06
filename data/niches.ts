export interface NicheFAQ {
  question: string
  answer: string
}

export interface Niche {
  slug: string
  label: string
  headline: string       // H1 de la page
  description: string    // meta description 150-160 chars
  keywords: string[]
  stat: { value: string; label: string }  // chiffre terrain pour l'autorité
  painPoints: string[]   // problèmes des clients de cette niche
  services: string[]     // ce que le cabinet peut proposer
  avantages: string[]    // pourquoi se spécialiser vaut le coup
  relatedArticles: string[] // slugs d'articles de blog à mailler
  faqs: NicheFAQ[]
}

export const niches: Niche[] = [
  {
    slug: 'lmnp',
    label: 'LMNP & Location meublée',
    headline: 'Expert-comptable LMNP : spécialisez votre cabinet sur la location meublée',
    description: 'Expert-comptable LMNP : accompagnez les investisseurs en location meublée non professionnelle. Amortissements, déclaration 2031, optimisation fiscale. Niche à fort potentiel.',
    keywords: ['expert comptable lmnp', 'comptable location meublée', 'expert amortissement lmnp', 'comptable lmnp déclaration 2031'],
    stat: { value: '400 000+', label: 'déclarations LMNP déposées chaque année en France' },
    painPoints: [
      'Calcul et gestion des amortissements par composant',
      'Choix du régime réel vs micro-BIC et impact fiscal',
      'Bascule LMNP vers LMP selon les seuils',
      'Déclaration 2031 et liasse BIC simplifiée',
      'Gestion des plateformes Airbnb et location courte durée',
    ],
    services: [
      'Tenue comptable en régime réel LMNP',
      'Calcul du tableau d\'amortissement par composant',
      'Déclaration fiscale 2031 (BIC réel simplifié)',
      'Optimisation IS/IR selon la situation patrimoniale',
      'Accompagnement bascule LMNP → LMP',
    ],
    avantages: [
      'Panier moyen 30 à 50 % supérieur au client généraliste',
      'Marché en croissance portée par l\'investissement locatif meublé',
      'Faible concurrence de spécialistes sur cette niche en région',
    ],
    relatedArticles: [
      'seo-expert-comptable-guide-complet',
      'comment-specialiser-cabinet-comptable',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Un expert-comptable est-il obligatoire en LMNP au réel ?', answer: 'Non, mais fortement recommandé. Les amortissements par composant, la liasse 2031 et les déficits BIC reportables sont des sujets techniques que la plupart des investisseurs ne maîtrisent pas.' },
      { question: 'Combien facturez-vous pour un dossier LMNP au réel ?', answer: 'Les cabinets spécialisés facturent généralement entre 800 et 1 500 € par an pour un LMNP au réel, soit 2 à 3 fois le tarif d\'un dossier classique.' },
      { question: 'Gérez-vous les locations Airbnb et courte durée ?', answer: 'Oui. La location courte durée via Airbnb, Abritel ou Booking suit les règles BIC et a ses propres spécificités (taxe de séjour, obligations déclaratives).' },
    ],
  },

  {
    slug: 'ecommerce',
    label: 'E-commerce',
    headline: 'Expert-comptable e-commerce : le cabinet de référence des vendeurs en ligne',
    description: 'Expert-comptable e-commerce : TVA intracommunautaire OSS/IOSS, stocks, marketplaces, Shopify, Amazon. Positionnez votre cabinet sur la niche des vendeurs en ligne.',
    keywords: ['expert comptable ecommerce', 'comptable amazon fba', 'comptable shopify', 'expert tva oss ioss'],
    stat: { value: '212 000', label: 'sites e-commerce actifs en France (Fevad 2024)' },
    painPoints: [
      'TVA intracommunautaire OSS/IOSS sur les ventes européennes',
      'Réconciliation des paiements Stripe, PayPal, Amazon Pay',
      'Valorisation et gestion des stocks multi-entrepôts',
      'Comptabilisation des remboursements et retours clients',
      'Déclaration des comptes Stripe / PayPal étrangers',
    ],
    services: [
      'Réconciliation comptable Shopify, WooCommerce, Prestashop',
      'Gestion TVA OSS/IOSS multi-pays',
      'Comptabilité stocks e-commerce (FIFO, coût moyen pondéré)',
      'Clôture annuelle et bilan e-commerce',
      'Accompagnement levée de fonds et due diligence',
    ],
    avantages: [
      'CA clients souvent élevé dès la 1re année : panier moyen 150-400 €/mois',
      'Automatisation possible via API Shopify et outils comptables',
      'Clients jeunes, digitaux, habitués aux outils en ligne — peu de friction',
    ],
    relatedArticles: [
      'seo-expert-comptable-guide-complet',
      'comment-specialiser-cabinet-comptable',
      'pennylane-expert-comptable-acquisition',
    ],
    faqs: [
      { question: 'Gérez-vous la comptabilité des vendeurs Amazon FBA ?', answer: 'Oui. La réconciliation Amazon Seller Central, la TVA européenne et la valorisation des stocks FBA sont des spécialités que peu de cabinets maîtrisent — c\'est votre avantage.' },
      { question: 'Quelle est la différence entre OSS et IOSS ?', answer: 'L\'OSS (One Stop Shop) concerne les ventes de services et biens B2C intracommunautaires. L\'IOSS (Import One Stop Shop) concerne les importations de biens < 150 €. Les deux régimes permettent de centraliser les déclarations TVA.' },
      { question: 'Proposez-vous un accompagnement pour les startups e-commerce ?', answer: 'Oui. De la création à la levée de fonds, les e-commerçants en croissance ont besoin d\'un partenaire comptable qui connaît leur modèle.' },
    ],
  },

  {
    slug: 'medecins',
    label: 'Médecins & Santé',
    headline: 'Expert-comptable médecin : le cabinet dédié aux professionnels de santé',
    description: 'Expert-comptable médecin libéral : BNC, CARMF, CARPIMKO, SEL médicale, SCM. Accompagnez médecins, chirurgiens, dentistes et infirmiers avec une expertise dédiée.',
    keywords: ['expert comptable médecin', 'comptable profession libérale santé', 'comptable médecin libéral', 'expert comptable sel medicale'],
    stat: { value: '230 000', label: 'médecins libéraux en exercice en France (CNOM 2024)' },
    painPoints: [
      'Choix BNC vs BIC selon la structure juridique',
      'Cotisations CARMF (médecins) et CARPIMKO (auxiliaires)',
      'Constitution et gestion de SCM et SCI médicales',
      'Passage en SEL (Société d\'Exercice Libéral) et ses enjeux',
      'Optimisation de la rémunération en SEL : dividendes vs salaire',
    ],
    services: [
      'Comptabilité BNC au réel et déclaration 2035',
      'Optimisation des cotisations sociales obligatoires',
      'Constitution et suivi de SEL médicale (SELARL, SELAS)',
      'Gestion SCM (Société Civile de Moyens)',
      'Conseil retraite et épargne TNS (Madelin, PER)',
    ],
    avantages: [
      'Revenus clients stables et élevés : ticket moyen 200-600 €/mois',
      'Fidélité client exceptionnelle sur un marché en tension',
      'Différenciation immédiate face aux cabinets généralistes',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Gérez-vous les SEL médicales multi-associés ?', answer: 'Oui. Les SEL sont une structure complexe avec des enjeux de valorisation, de pactes d\'associés et d\'optimisation entre salaire et dividendes.' },
      { question: 'Accompagnez-vous les jeunes médecins à l\'installation ?', answer: 'L\'installation en libéral est un moment clé : choix de la structure, accords avec la CPAM, comptabilité dès la 1re consultation. C\'est une entrée relationnelle idéale.' },
      { question: 'Quelle différence entre CARPIMKO et CARMF ?', answer: 'La CARMF est la caisse de retraite des médecins, la CARPIMKO celle des auxiliaires médicaux (infirmiers, kinés, orthophonistes). Chaque régime a ses propres taux et spécificités.' },
    ],
  },

  {
    slug: 'freelances',
    label: 'Freelances & Indépendants',
    headline: 'Expert-comptable freelance : le cabinet de la nouvelle génération d\'indépendants',
    description: 'Expert-comptable freelance : SASU, portage salarial, dividendes, épargne retraite TNS. Accompagnez consultants, développeurs et designers avec une offre digitale adaptée.',
    keywords: ['expert comptable freelance', 'comptable indépendant', 'comptable consultant', 'expert comptable sasu freelance'],
    stat: { value: '1,2 million', label: 'travailleurs indépendants hors auto-entrepreneurs en France (INSEE 2023)' },
    painPoints: [
      'Choix du statut optimal : SASU, EURL, portage salarial, auto-entreprise',
      'Optimisation de la rémunération : dividendes vs salaire vs mélange',
      'Gestion de la TVA sur les missions à l\'international',
      'Épargne retraite TNS (PER individuel, Madelin)',
      'Transition auto-entrepreneur vers société quand le CA dépasse les seuils',
    ],
    services: [
      'Comptabilité SASU et EURL pour freelances',
      'Stratégie de rémunération optimisée (salaire + dividendes)',
      'Déclarations TVA et gestion des notes de frais',
      'Accompagnement à la création de société',
      'Bilan annuel et clôture d\'exercice',
    ],
    avantages: [
      'Marché de masse : 1,2 million d\'indépendants potentiellement clients',
      'Clients digitaux, à l\'aise avec les outils en ligne : zéro friction',
      'Forfaits mensuels standardisables — marges et récurrence élevées',
    ],
    relatedArticles: [
      'pennylane-expert-comptable-acquisition',
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
    ],
    faqs: [
      { question: 'SASU ou EURL pour un freelance ?', answer: 'La SASU est généralement préférable si les dividendes sont une composante clé de la rémunération (pas de cotisations sociales sur dividendes). L\'EURL est parfois avantageuse pour les profils avec de faibles charges personnelles.' },
      { question: 'Proposez-vous des forfaits mensuels pour freelances ?', answer: 'Oui. Un forfait mensuel clair (tenue + déclarations + conseil) est le format privilégié par les indépendants. Il simplifie la relation et garantit une récurrence pour le cabinet.' },
      { question: 'Gérez-vous le portage salarial ?', answer: 'Le portage salarial est une alternative à la société. Nous accompagnons les freelances dans le choix entre portage et création, selon leur niveau de CA et leurs besoins.' },
    ],
  },

  {
    slug: 'btp',
    label: 'BTP & Artisans',
    headline: 'Expert-comptable BTP : le cabinet qui comprend les chantiers et la sous-traitance',
    description: 'Expert-comptable BTP : TVA sur travaux, sous-traitance, retenue de garantie, trésorerie chantier. Positionnez votre cabinet comme référence dans le secteur du bâtiment.',
    keywords: ['expert comptable btp', 'comptable artisan bâtiment', 'comptable sous-traitant btp', 'expert comptable construction'],
    stat: { value: '650 000', label: 'entreprises du BTP en France (FFB 2024)' },
    painPoints: [
      'TVA sur les travaux : taux réduits 5,5 %, 10 % et normal 20 %',
      'Gestion comptable de la sous-traitance et auto-liquidation TVA',
      'Retenue de garantie et cautionnement bancaire sur chantiers',
      'Plans de trésorerie liés aux avances et situations de travaux',
      'Gestion de la saisonnalité et des creux d\'activité hivernaux',
    ],
    services: [
      'Comptabilité spécialisée BTP avec suivi par chantier',
      'Gestion TVA multi-taux (5,5 %, 10 %, 20 %)',
      'Suivi de la sous-traitance et auto-liquidation de TVA',
      'Tableau de bord trésorerie et prévisionnel de chantier',
      'Accompagnement Pass Pro et garantie Qualibat / RGE',
    ],
    avantages: [
      'Secteur en tension permanente : les artisans peinent à trouver un bon comptable',
      'Forte fidélité client une fois la relation établie',
      'Volume de missions récurrentes (paie, TVA mensuelle, clôture)',
    ],
    relatedArticles: [
      '7-canaux-acquisition-cabinet-comptable',
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
    ],
    faqs: [
      { question: 'Gérez-vous la comptabilité des auto-entrepreneurs du bâtiment ?', answer: 'Oui. De l\'auto-entrepreneur à la SARL BTP, chaque structure a ses spécificités. Nous accompagnons aussi le passage en société quand le seuil de CA est atteint.' },
      { question: 'Comment fonctionne l\'auto-liquidation de TVA en sous-traitance ?', answer: 'En BTP, le sous-traitant ne facture pas la TVA : c\'est le donneur d\'ordre qui la déclare directement. Ce mécanisme réduit les risques de fraude et nécessite une facturation spécifique.' },
      { question: 'Accompagnez-vous les artisans en difficulté de trésorerie ?', answer: 'La gestion de trésorerie est un sujet clé dans le BTP. Nous aidons les cabinets à mettre en place des tableaux de bord prévisionnels adaptés aux cycles des chantiers.' },
    ],
  },

  {
    slug: 'amazon-fba',
    label: 'Amazon FBA',
    headline: 'Expert-comptable Amazon FBA : devenez le référent des vendeurs Amazon',
    description: 'Expert-comptable Amazon FBA : réconciliation Seller Central, TVA européenne, valorisation stocks FBA. Niche peu couverte, forte demande, clients à haut potentiel.',
    keywords: ['comptable amazon fba', 'expert comptable vendeur amazon', 'tva amazon fba france', 'comptable fba europe'],
    stat: { value: '45 000+', label: 'vendeurs Amazon actifs en France (estimation Marketplace Pulse 2024)' },
    painPoints: [
      'Réconciliation complexe des paiements Amazon Seller Central',
      'TVA multi-pays sur les ventes européennes via FBA',
      'Valorisation des stocks dans les entrepôts Amazon (FBA fees)',
      'Gestion des remboursements, retours et pertes d\'inventaire',
      'Déclaration de la TVA OSS/IOSS selon les pays de vente',
    ],
    services: [
      'Réconciliation comptable Amazon Seller Central',
      'Gestion TVA européenne (OSS, IOSS, déclarations locales)',
      'Comptabilité stocks FBA et valorisation par SKU',
      'Clôture annuelle vendeur Amazon (bilan + compte de résultat)',
      'Accompagnement passage en société (SARL / SAS)',
    ],
    avantages: [
      'Niche très peu couverte par les cabinets traditionnels — first mover advantage',
      'Clients à fort CA : vendeurs Amazon génèrent souvent 100k€+ de revenus',
      'Automatisation partielle via connecteurs comptables (A2X, Taxjar)',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Combien facturez-vous pour un dossier Amazon FBA ?', answer: 'Les dossiers Amazon FBA sont facturés 150 à 500 €/mois selon le volume de transactions, les pays de vente et la complexité TVA. C\'est 2 à 4 fois le tarif d\'un dossier standard.' },
      { question: 'Gérez-vous la TVA dans plusieurs pays européens ?', answer: 'Oui. Via le guichet OSS ou des enregistrements locaux selon les pays où les stocks FBA sont entreposés (Allemagne, Italie, Espagne, etc.).' },
      { question: 'Utilisez-vous des outils spécialisés Amazon ?', answer: 'Des connecteurs comme A2X automatisent la réconciliation entre Amazon Seller Central et les logiciels comptables. Cela réduit le temps de traitement de 70 %.' },
    ],
  },

  {
    slug: 'startups',
    label: 'Startups & SaaS',
    headline: 'Expert-comptable startup : le cabinet qui parle le langage des entrepreneurs',
    description: 'Expert-comptable startup et SaaS : levée de fonds, BSPCE, R&D, revenus récurrents. Devenez le partenaire de confiance des startups françaises dès leur création.',
    keywords: ['expert comptable startup', 'comptable saas', 'expert bspce', 'comptable levée de fonds'],
    stat: { value: '25 000+', label: 'startups créées en France en 2023 (Bpifrance)' },
    painPoints: [
      'Comptabilisation des BSPCE et actions gratuites (AGA)',
      'Revenus récurrents SaaS : déferred revenue et comptabilisation IFRS',
      'Préparation de la due diligence lors d\'une levée de fonds',
      'Suivi du Crédit d\'Impôt Recherche (CIR) et CII',
      'Gestion des stocks d\'options et dilution des associés',
    ],
    services: [
      'Comptabilité startup (création, premiers exercices, levée)',
      'Optimisation et suivi du Crédit d\'Impôt Recherche',
      'Accompagnement due diligence et data room financière',
      'Mise en place des plans de BSPCE et actions gratuites',
      'Reporting mensuel investisseurs (KPIs, burn rate, runway)',
    ],
    avantages: [
      'Relation longue durée : une startup devient souvent une PME en quelques années',
      'Conseil stratégique à haute valeur ajoutée — honoraires premium',
      'Réseau d\'apporteurs d\'affaires naturel dans l\'écosystème tech',
    ],
    relatedArticles: [
      'pennylane-expert-comptable-acquisition',
      '7-canaux-acquisition-cabinet-comptable',
      'comment-specialiser-cabinet-comptable',
    ],
    faqs: [
      { question: 'Accompagnez-vous les startups lors des levées de fonds ?', answer: 'Oui. La préparation de la data room, la due diligence financière et l\'assistance lors des audits investisseurs sont des missions à haute valeur ajoutée.' },
      { question: 'Gérez-vous le CIR pour les startups tech ?', answer: 'Le Crédit d\'Impôt Recherche peut représenter 30 % des dépenses R&D. Nous documentons et optimisons chaque dossier pour maximiser la récupération.' },
      { question: 'Proposez-vous un suivi mensuel pour les investisseurs ?', answer: 'Oui. Un reporting mensuel avec burn rate, MRR, runway et suivi du plan de financement est souvent demandé par les fonds d\'investissement.' },
    ],
  },

  {
    slug: 'immobilier',
    label: 'Immobilier & SCI',
    headline: 'Expert-comptable immobilier : le spécialiste des investisseurs et des SCI',
    description: 'Expert-comptable immobilier : SCI, LMNP, marchands de biens, optimisation fiscale patrimoniale. Accompagnez les investisseurs et les familles dans leur stratégie immobilière.',
    keywords: ['expert comptable immobilier', 'comptable sci', 'comptable investisseur immobilier', 'expert patrimoine immobilier'],
    stat: { value: '2 millions', label: 'SCI actives en France (estimation INSEE/INPI 2024)' },
    painPoints: [
      'Choix entre IS et IR pour la SCI : impact sur la fiscalité de sortie',
      'Constitution de SCI familiale et rédaction des statuts',
      'Transmission patrimoniale via démembrement et donation de parts',
      'Optimisation fiscale LMNP vs location nue en SCI',
      'Comptabilité des marchands de biens (TVA sur marge, stock)',
    ],
    services: [
      'Constitution et suivi comptable de SCI',
      'Choix du régime fiscal optimal (IS / IR / TVA)',
      'Accompagnement marchand de biens (TVA sur marge)',
      'Stratégie de transmission patrimoniale',
      'Reporting patrimonial annuel pour les familles multi-SCI',
    ],
    avantages: [
      'Clients patrimoniaux à fort potentiel : plusieurs structures = plusieurs missions',
      'Marché en croissance porté par l\'investissement immobilier',
      'Récurrence naturelle : les SCI génèrent des missions annuelles régulières',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      'etude-croissance-cabinets-comptables-2026',
    ],
    faqs: [
      { question: 'Vaut-il mieux créer une SCI à l\'IS ou à l\'IR ?', answer: 'Tout dépend de l\'objectif patrimonial. L\'IR est simple et évite la double imposition à la sortie. L\'IS permet l\'amortissement des biens mais génère une plus-value professionnelle à la cession. Une étude personnalisée est indispensable.' },
      { question: 'Accompagnez-vous les marchands de biens ?', answer: 'Oui. Le régime TVA sur marge, la comptabilisation des biens en stock et les clôtures fréquentes sont des spécialités que peu de cabinets maîtrisent.' },
      { question: 'Gérez-vous la donation de parts de SCI ?', answer: 'La donation de parts est un acte clé de la transmission patrimoniale. Nous travaillons en coordination avec les notaires pour optimiser les abattements et droits de donation.' },
    ],
  },

  {
    slug: 'restauration',
    label: 'Restauration & CHR',
    headline: 'Expert-comptable CHR : le spécialiste des cafés, hôtels et restaurants',
    description: 'Expert-comptable restaurant et CHR : TVA multi-taux, pourboires, caisse, saisonnalité. Positionnez votre cabinet comme référence dans l\'hôtellerie-restauration.',
    keywords: ['expert comptable restaurant', 'comptable chr', 'comptable hôtel café', 'expert comptable restauration'],
    stat: { value: '175 000', label: 'établissements de restauration en France (INSEE 2023)' },
    painPoints: [
      'TVA multi-taux : 5,5 % sur la nourriture, 10 % sur le reste, 20 % sur l\'alcool',
      'Gestion des pourboires et du service obligatoire',
      'Contrôle des caisses et réconciliation des encaissements',
      'Saisonnalité : gestion de la trésorerie en basse saison',
      'Comptabilité des dark kitchens et restaurants virtuels',
    ],
    services: [
      'Comptabilité CHR spécialisée (café, hôtel, restaurant)',
      'Gestion TVA multi-taux et déclarations mensuelles',
      'Suivi des stocks et inventaires périodiques',
      'Tableau de bord trésorerie et prévisionnel saisonnier',
      'Accompagnement création et rachat de fonds de commerce',
    ],
    avantages: [
      'Secteur très peu digitalisé : les restaurateurs ont besoin d\'accompagnement',
      'Missions récurrentes mensuelles (TVA, paie, rapprochement caisse)',
      'Différenciation immédiate face aux cabinets qui refusent le CHR',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      '7-canaux-acquisition-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
    ],
    faqs: [
      { question: 'Quels sont les taux de TVA en restauration ?', answer: '5,5 % sur les ventes à emporter de produits alimentaires non préparés, 10 % sur la restauration sur place et les boissons non alcoolisées, 20 % sur les boissons alcoolisées.' },
      { question: 'Gérez-vous les dark kitchens et restaurants virtuels ?', answer: 'Oui. Les cuisines fantômes et restaurants sur Uber Eats/Deliveroo ont leurs propres problématiques : commissions plateforme, TVA, gestion des flux de paiement.' },
      { question: 'Accompagnez-vous la reprise d\'un restaurant ?', answer: 'La reprise d\'un fonds de commerce est un acte majeur : audit du cédant, évaluation du fonds, structure d\'acquisition, financement. Nous accompagnons chaque étape.' },
    ],
  },

  {
    slug: 'crypto',
    label: 'Crypto & Web3',
    headline: 'Expert-comptable crypto : maîtrisez la fiscalité des cryptomonnaies en France',
    description: 'Expert-comptable crypto et Web3 : fiscalité Bitcoin, NFT, DeFi, staking, mining. Une niche en forte demande avec peu de spécialistes en France. Positionnez-vous maintenant.',
    keywords: ['expert comptable crypto', 'comptable bitcoin', 'fiscalité cryptomonnaie France', 'comptable nft defi'],
    stat: { value: '8 millions', label: 'Français détenteurs de cryptomonnaies (AMF 2023)' },
    painPoints: [
      'Calcul des plus-values sur cessions de cryptomonnaies (article 150 VH bis)',
      'Déclaration des comptes sur plateformes étrangères (Binance, Coinbase)',
      'Fiscalité du staking, du yield farming et de la DeFi',
      'Comptabilisation des NFT (œuvres numériques, gaming)',
      'Traitement des revenus de mining comme BNC',
    ],
    services: [
      'Calcul et déclaration des plus-values crypto (formulaire 2086)',
      'Déclaration des comptes étrangers (formulaire 3916-bis)',
      'Accompagnement audit fiscal et contrôle DGFiP',
      'Conseil sur la structuration juridique pour les Web3 entrepreneurs',
      'Veille réglementaire crypto et MiCA',
    ],
    avantages: [
      'Quasi-monopole de niche : très peu de cabinets maîtrisent ce sujet',
      'Clients souvent à fort patrimoine numérique, ticket moyen élevé',
      'Sujet médiatisé qui génère des leads entrants sans effort',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Comment sont imposées les cryptomonnaies en France ?', answer: 'Les cessions de cryptomonnaies par des particuliers sont imposées au PFU (flat tax) de 30 % sur les plus-values. Le calcul global annuel s\'effectue via le formulaire 2086.' },
      { question: 'Faut-il déclarer ses comptes Binance ou Coinbase ?', answer: 'Oui. Tout compte ouvert sur une plateforme étrangère doit être déclaré via le formulaire 3916-bis. L\'amende en cas d\'omission est de 750 € par compte non déclaré.' },
      { question: 'Gérez-vous la fiscalité du staking et de la DeFi ?', answer: 'Oui. Les revenus de staking sont généralement traités comme des BNC, et la DeFi soulève des questions spécifiques sur la notion d\'échange et de cession. C\'est un sujet où notre expertise fait toute la différence.' },
    ],
  },

  {
    slug: 'artisans',
    label: 'Artisanat',
    headline: 'Expert-comptable artisan : le partenaire de confiance des métiers manuels',
    description: 'Expert-comptable artisan : plombier, électricien, boulanger, coiffeur. Accompagnez les artisans de la création à la transmission avec une comptabilité adaptée à leur réalité.',
    keywords: ['expert comptable artisan', 'comptable plombier', 'comptable électricien', 'comptable artisan boulanger'],
    stat: { value: '1,6 million', label: 'd\'artisans en activité en France (CMA France 2024)' },
    painPoints: [
      'Passage de l\'auto-entreprise à la SARL ou EURL au-delà des seuils',
      'Gestion de la trésorerie avec des cycles longs de règlement',
      'Transmission et valorisation d\'un fonds artisanal',
      'Gestion des apprentis et de la taxe d\'apprentissage',
      'Déclarations spécifiques CMA et cotisations RSI / URSSAF',
    ],
    services: [
      'Tenue comptable et déclarations fiscales artisans',
      'Accompagnement création et choix du statut juridique',
      'Plan de financement et dossier bancaire',
      'Accompagnement transmission et cession du fonds',
      'Conseil retraite et prévoyance TNS',
    ],
    avantages: [
      'Marché de masse : 1,6 million de cibles potentielles en France',
      'Clients peu exigeants techniquement, fidèles sur le long terme',
      'Opportunité de développer une offre sectorielle (plombiers, électriciens…)',
    ],
    relatedArticles: [
      '7-canaux-acquisition-cabinet-comptable',
      'comment-specialiser-cabinet-comptable',
      'etude-croissance-cabinets-comptables-2026',
    ],
    faqs: [
      { question: 'À quel moment un artisan doit-il créer une société ?', answer: 'Quand le CA dépasse les seuils de l\'auto-entreprise (77 700 € pour les services) ou quand les besoins de protection du patrimoine personnel justifient une structure à responsabilité limitée.' },
      { question: 'Gérez-vous la transmission d\'un fonds artisanal ?', answer: 'Oui. La valorisation, la structure de cession (fonds ou titres) et la fiscalité de la plus-value sont des points critiques que nous maîtrisons.' },
      { question: 'Accompagnez-vous les artisans pour leurs dossiers bancaires ?', answer: 'Oui. Un prévisionnel solide et un business plan convaincant augmentent significativement les chances d\'obtenir un financement.' },
    ],
  },

  {
    slug: 'associations',
    label: 'Associations & Secteur non-marchand',
    headline: 'Expert-comptable association : le spécialiste du secteur non-marchand',
    description: 'Expert-comptable association et ESS : comptabilité par fonds, subventions, commissariat aux comptes. Positionnez votre cabinet sur le secteur associatif et solidaire.',
    keywords: ['expert comptable association', 'commissariat aux comptes association', 'comptable ess', 'expert comptable loi 1901'],
    stat: { value: '1,5 million', label: 'd\'associations actives en France (INSEE 2023)' },
    painPoints: [
      'Comptabilité par fonds et projets (plan comptable associatif)',
      'Gestion et justification des subventions publiques',
      'Obligations de commissariat aux comptes selon les seuils',
      'Établissement du budget prévisionnel et du rapport financier annuel',
      'Fiscalité des activités commerciales accessoires (TVA, IS)',
    ],
    services: [
      'Tenue comptable selon le plan comptable des associations',
      'Gestion des subventions et comptes rendus financiers',
      'Mission de commissariat aux comptes associatif',
      'Établissement du rapport financier annuel AG',
      'Conseil sur la fiscalisation des activités lucratives',
    ],
    avantages: [
      'Secteur peu concurrentiel : les cabinets généralistes évitent souvent les associations',
      'Missions stables et récurrentes (subventions annuelles, AG obligatoire)',
      'Réseau associatif local dense — une association recommande aux autres',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Toutes les associations ont-elles l\'obligation d\'un commissaire aux comptes ?', answer: 'Non. Cette obligation dépasse des seuils : ressources > 153 000 € (associations recevant des subventions) ou selon les statuts. Nous analysons votre situation.' },
      { question: 'Gérez-vous les associations d\'utilité publique ?', answer: 'Oui. Les AUP ont des obligations spécifiques de transparence, de reporting et de contrôle interne. Notre expertise couvre ces obligations.' },
      { question: 'Une association peut-elle avoir des activités commerciales ?', answer: 'Oui, dans certaines limites. Si les activités lucratives deviennent prépondérantes, l\'association peut être soumise à la TVA et à l\'IS. Nous vous aidons à gérer cette frontière.' },
    ],
  },

  {
    slug: 'professions-liberales',
    label: 'Professions libérales',
    headline: 'Expert-comptable professions libérales : le cabinet des professionnels réglementés',
    description: 'Expert-comptable professions libérales : avocats, architectes, notaires, kinés. BNC, SEL, SCP, optimisation sociale. Une expertise dédiée aux professions réglementées.',
    keywords: ['expert comptable profession libérale', 'comptable avocat', 'comptable architecte', 'comptable scp sel'],
    stat: { value: '900 000', label: 'professionnels libéraux en France (UNAPL 2024)' },
    painPoints: [
      'Choix entre exercice individuel (BNC) et structure sociétaire (SEL, SCP)',
      'Optimisation des cotisations sociales selon la caisse de retraite',
      'Gestion de la SCP ou SEL multi-associés et pacte d\'associés',
      'Valorisation du cabinet lors d\'une cession ou d\'un départ à la retraite',
      'Fiscalité spécifique selon la caisse : CARMF, CNBF, CIPAV, etc.',
    ],
    services: [
      'Comptabilité BNC et déclaration 2035',
      'Conseil sur la transformation en SEL ou SCP',
      'Optimisation des cotisations sociales obligatoires',
      'Accompagnement cession de patientèle ou de clientèle',
      'Audit et valorisation du cabinet libéral',
    ],
    avantages: [
      'Clients à revenus élevés : ticket moyen 200-800 €/mois',
      'Missions complexes à haute valeur ajoutée (SEL, cession)',
      'Réseau de prescripteurs naturel dans les ordres professionnels',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      'etude-croissance-cabinets-comptables-2026',
    ],
    faqs: [
      { question: 'Gérez-vous les SCP et SEL multi-associés ?', answer: 'Oui. Les structures multi-associés des professions libérales impliquent des conventions de partage de bénéfices, des pactes d\'associés et des enjeux de valorisation spécifiques.' },
      { question: 'Comment valorise-t-on un cabinet libéral ?', answer: 'La valorisation dépend du secteur : un cabinet médical se valorise différemment d\'un cabinet d\'avocats. Les méthodes courantes incluent le multiple de recettes et l\'actualisation des flux futurs.' },
      { question: 'Accompagnez-vous la retraite d\'un professionnel libéral ?', answer: 'Oui. La cession de patientèle ou de clientèle est un moment critique. Nous optimisons la fiscalité de la plus-value professionnelle et structurons la transmission.' },
    ],
  },

  {
    slug: 'agences',
    label: 'Agences & Conseil',
    headline: 'Expert-comptable agence : le cabinet des agences web, marketing et conseil',
    description: 'Expert-comptable agence web et marketing : comptabilité à l\'avancement, frais refacturés, valorisation, cession. Accompagnez les agences en croissance avec une expertise dédiée.',
    keywords: ['expert comptable agence web', 'comptable agence marketing', 'comptable cabinet conseil', 'expert comptable agence digitale'],
    stat: { value: '70 000+', label: 'agences web et marketing recensées en France (estimation 2024)' },
    painPoints: [
      'Comptabilisation des projets en cours (méthode à l\'avancement)',
      'Gestion et refacturation des frais sous-traitants et partenaires',
      'Suivi de la marge par projet et par client',
      'Valorisation de l\'agence pour une cession ou un investissement',
      'Pilotage du cash flow sur des cycles de facturation longs',
    ],
    services: [
      'Comptabilité agence avec suivi de marge par projet',
      'Gestion des acomptes, situations intermédiaires et soldes',
      'Tableau de bord mensuel (CA, marge, trésorerie, relances)',
      'Accompagnement levée de fonds ou cession d\'agence',
      'Optimisation de la rémunération dirigeant (salaire + dividendes)',
    ],
    avantages: [
      'Clients digitaux à l\'aise avec les outils modernes — zéro friction',
      'Missions de conseil à haute valeur ajoutée (M&A, valorisation)',
      'Réseau naturel vers les startups et PME tech',
    ],
    relatedArticles: [
      'pennylane-expert-comptable-acquisition',
      '7-canaux-acquisition-cabinet-comptable',
      'comment-specialiser-cabinet-comptable',
    ],
    faqs: [
      { question: 'Accompagnez-vous la cession d\'une agence web ?', answer: 'Oui. La valorisation d\'une agence (multiples de EBITDA, récurrence du CA) et la structure de cession (fonds ou titres) sont des missions à forte valeur ajoutée très recherchées.' },
      { question: 'Comment comptabiliser un projet en cours à la fin d\'exercice ?', answer: 'La méthode à l\'avancement permet de comptabiliser les produits au fur et à mesure de l\'avancement des projets, évitant les décalages entre CA reconnu et trésorerie.' },
      { question: 'Proposez-vous un suivi mensuel de la marge par client ?', answer: 'Oui. Un tableau de bord mensuel avec marge brute par client, taux d\'occupation et prévisionnel de trésorerie est essentiel pour piloter une agence.' },
    ],
  },

  {
    slug: 'sci',
    label: 'SCI & Patrimoine',
    headline: 'Expert-comptable SCI : le spécialiste des sociétés civiles immobilières',
    description: 'Expert-comptable SCI familiale et patrimoniale : IS vs IR, donation de parts, transmission, optimisation fiscale. Accompagnez les familles dans leur stratégie patrimoniale.',
    keywords: ['expert comptable sci', 'comptable sci familiale', 'comptable gestion patrimoine', 'expert sci is ir'],
    stat: { value: '2 millions', label: 'SCI actives en France — 1ère forme juridique patrimoniale (INPI 2024)' },
    painPoints: [
      'Choix du régime fiscal optimal entre IS et IR',
      'Comptabilité annuelle et approbation des comptes en AG',
      'Donation de parts et calcul des droits de donation',
      'Démembrement de propriété (usufruit / nue-propriété)',
      'Gestion de plusieurs SCI familiales dans un même patrimoine',
    ],
    services: [
      'Constitution de SCI et rédaction des statuts',
      'Tenue comptable annuelle et AG d\'approbation des comptes',
      'Conseil sur le choix IS / IR selon la stratégie patrimoniale',
      'Accompagnement transmission (donation, démembrement)',
      'Consolidation de patrimoine multi-SCI',
    ],
    avantages: [
      'Chaque famille avec plusieurs biens = plusieurs missions annuelles récurrentes',
      'Clients patrimoniaux à fort pouvoir d\'achat et fidèles',
      'Extension naturelle vers le LMNP et l\'immobilier locatif',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      'etude-croissance-cabinets-comptables-2026',
    ],
    faqs: [
      { question: 'Une SCI doit-elle obligatoirement faire appel à un expert-comptable ?', answer: 'Non, mais c\'est fortement recommandé dès que la SCI est à l\'IS ou qu\'elle a plusieurs associés. La comptabilité d\'engagement, les amortissements et les assemblées générales requièrent une expertise.' },
      { question: 'Vaut-il mieux opter pour l\'IS ou l\'IR pour une SCI ?', answer: 'L\'IR est simple et évite la double imposition à la revente. L\'IS permet d\'amortir le bien et de capitaliser des réserves, mais génère une plus-value professionnelle à la cession. Le choix dépend de l\'horizon de détention et des objectifs patrimoniaux.' },
      { question: 'Accompagnez-vous la donation de parts de SCI ?', answer: 'Oui. La donation avec ou sans réserve d\'usufruit est un outil puissant de transmission patrimoniale. Nous coordonnons avec les notaires pour optimiser l\'opération.' },
    ],
  },
]
