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

  // ─── Sous-niches à forte intention commerciale ────────────────────────────────

  {
    slug: 'influenceurs',
    label: 'Influenceurs & Créateurs de contenu',
    headline: 'Expert-comptable influenceur : le cabinet des créateurs de contenu',
    description: 'Expert-comptable influenceur, YouTubeur, TikTokeur : droits d\'auteur, AdSense, partenariats, SASU créateur. La fiscalité des créateurs de contenu n\'a plus de secret.',
    keywords: ['expert comptable influenceur', 'comptable youtubeur', 'comptable créateur contenu', 'comptable tiktok'],
    stat: { value: '150 000+', label: 'créateurs de contenu monétisés en France (estimation 2024)' },
    painPoints: [
      'Qualification fiscale des revenus : droits d\'auteur vs BNC vs salaires',
      'TVA sur les revenus AdSense et partenariats étrangers (Google, YouTube)',
      'Traitement des dons et revenus Twitch, Patreon, OnlyFans',
      'Choix du statut : auto-entrepreneur, SASU, artiste-auteur',
      'Déclaration des comptes étrangers (AdSense, PayPal US)',
    ],
    services: [
      'Choix du statut optimal (artiste-auteur, SASU, auto-entrepreneur)',
      'Comptabilité revenus multi-plateformes (YouTube, TikTok, Instagram)',
      'Gestion TVA sur les services numériques étrangers',
      'Optimisation droits d\'auteur et abattement fiscal spécifique',
      'Déclarations fiscales et comptes étrangers',
    ],
    avantages: [
      'Niche quasi-vierge : moins de 1 % des cabinets se positionne dessus',
      'Communauté très active en ligne — un client satisfait en apporte 10',
      'Clients jeunes, digitaux, habitués aux paiements en ligne : zéro friction',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Les revenus YouTube sont-ils des droits d\'auteur ?', answer: 'Partiellement. Les revenus publicitaires AdSense sont traités comme des BNC ou des droits d\'auteur selon le statut du créateur. Les droits d\'auteur bénéficient d\'un abattement de 34 % en micro. Une analyse au cas par cas est nécessaire.' },
      { question: 'Quelle structure juridique pour un influenceur ?', answer: 'La SASU est souvent la meilleure option au-delà de 50 000 € de revenus annuels : optimisation salaire + dividendes, protection du patrimoine, crédibilité professionnelle.' },
      { question: 'Faut-il déclarer ses revenus Patreon ou Twitch ?', answer: 'Oui. Tous les revenus, même en crypto ou en dons, sont imposables en France. Les plateformes étrangères génèrent aussi une obligation de déclaration de compte étranger.' },
    ],
  },

  {
    slug: 'organismes-formation',
    label: 'Organismes de formation',
    headline: 'Expert-comptable organisme de formation : maîtrisez Qualiopi et les OPCO',
    description: 'Expert-comptable organisme de formation : Qualiopi, OPCO, subventions, TVA exonérée. Accompagnez les formateurs et centres de formation avec une expertise réglementaire dédiée.',
    keywords: ['expert comptable organisme formation', 'comptable centre formation', 'comptable qualiopi', 'expert comptable opco'],
    stat: { value: '100 000+', label: 'organismes de formation déclarés en France (DREETS 2024)' },
    painPoints: [
      'Exonération de TVA sur la formation : conditions et limites réglementaires',
      'Justification des dépenses pour les remboursements OPCO',
      'Comptabilisation des subventions CPF et financement public',
      'Obligations Qualiopi : audit interne et indicateurs de résultats',
      'Gestion des formateurs vacataires et statut juridique',
    ],
    services: [
      'Comptabilité spécialisée organisme de formation',
      'Gestion TVA exonérée et TVA mixte selon les activités',
      'Suivi des conventions OPCO et remboursements CPF',
      'Accompagnement certification Qualiopi (aspects financiers)',
      'Déclaration fiscale annuelle et bilan pédagogique et financier',
    ],
    avantages: [
      'Réglementation complexe = forte valeur du conseil, honoraires premium',
      'Secteur en croissance portée par le CPF et la formation continue',
      'Peu de cabinets maîtrisent le triptyque TVA + OPCO + Qualiopi',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Un organisme de formation est-il soumis à la TVA ?', answer: 'Non, si les formations relèvent de la formation professionnelle continue et font l\'objet d\'une convention de formation. Cette exonération a des conditions précises que nous vérifions pour chaque client.' },
      { question: 'Qualiopi est-elle obligatoire pour accéder aux fonds OPCO ?', answer: 'Oui depuis janvier 2022. Sans certification Qualiopi, un organisme ne peut plus accéder aux financements OPCO, CPF ou contrats d\'apprentissage.' },
      { question: 'Accompagnez-vous les formateurs indépendants ?', answer: 'Oui. Le formateur indépendant peut exercer en auto-entrepreneur (jusqu\'à 77 700 €), en SASU ou en entreprise individuelle. Chaque statut a ses avantages selon le CA et les objectifs.' },
    ],
  },

  {
    slug: 'marchands-biens',
    label: 'Marchands de biens',
    headline: 'Expert-comptable marchand de biens : le spécialiste de la TVA sur marge',
    description: 'Expert-comptable marchand de biens : TVA sur marge, stock immobilier, IS, financement. Une niche premium à forte valeur ajoutée pour les cabinets qui maîtrisent l\'immobilier.',
    keywords: ['expert comptable marchand de biens', 'comptable marchand de biens', 'fiscalité marchand de biens', 'tva marge immobilier'],
    stat: { value: '15 000+', label: 'marchands de biens actifs en France (estimation FNAIM 2024)' },
    painPoints: [
      'Régime TVA sur marge vs TVA sur prix total selon la nature des biens',
      'Comptabilisation des biens en stock (actif circulant, non immobilisé)',
      'Calcul de la marge imposable et gestion des travaux incorporés',
      'IS obligatoire dès l\'activité habituelle d\'achat-revente',
      'Financement des opérations : banques, crowdfunding immobilier',
    ],
    services: [
      'Comptabilité spécialisée marchand de biens (stock immobilier)',
      'Gestion TVA sur marge et déclarations CA3',
      'Suivi des opérations d\'achat-revente par bien',
      'Accompagnement montage financier (prêt pro, crowdfunding)',
      'Optimisation fiscale sur les plus-values professionnelles',
    ],
    avantages: [
      'Ticket moyen parmi les plus élevés du secteur immobilier',
      'Clients à fort CA qui réalisent plusieurs opérations par an',
      'Très peu de cabinets maîtrisent la TVA sur marge immobilière',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      'etude-croissance-cabinets-comptables-2026',
    ],
    faqs: [
      { question: 'La TVA s\'applique-t-elle toujours sur la marge pour un marchand de biens ?', answer: 'Non. La TVA sur marge s\'applique aux biens acquis sans TVA récupérable (anciens logements chez des particuliers). Pour les biens neufs ou acquis avec TVA, c\'est la TVA sur le prix total qui s\'applique.' },
      { question: 'Un marchand de biens doit-il créer une société ?', answer: 'L\'activité habituelle d\'achat-revente d\'immeubles est commerciale par nature et relève de l\'IS. Exercer en nom propre est possible mais risqué fiscalement et patrimonialement.' },
      { question: 'Comment sont imposées les plus-values d\'un marchand de biens ?', answer: 'Les plus-values sont traitées comme des bénéfices professionnels soumis à l\'IS (15 % ou 25 %), et non comme des plus-values immobilières des particuliers.' },
    ],
  },

  {
    slug: 'airbnb',
    label: 'Airbnb & Location courte durée',
    headline: 'Expert-comptable Airbnb : maîtrisez la fiscalité de la location courte durée',
    description: 'Expert-comptable Airbnb et location courte durée : micro-BIC, régime réel, taxe de séjour, obligations déclaratives mairie. La niche des propriétaires Airbnb en France.',
    keywords: ['expert comptable airbnb', 'comptable location courte durée', 'comptable airbnb france', 'fiscalité location courte durée'],
    stat: { value: '900 000+', label: 'annonces Airbnb actives en France (Airbnb 2023)' },
    painPoints: [
      'Choix entre micro-BIC (50 % d\'abattement) et régime réel avec amortissements',
      'Obligations déclaratives mairie et numéro d\'enregistrement de location',
      'Taxe de séjour : collecte et reversement à la collectivité locale',
      'Règle des 120 nuits en résidence principale et changement d\'usage',
      'Cumul LMNP classique et location courte durée sur plusieurs biens',
    ],
    services: [
      'Choix du régime fiscal optimal (micro-BIC vs réel LMNP)',
      'Déclaration des revenus location courte durée (2042 C Pro)',
      'Accompagnement conformité mairie et obligations déclaratives',
      'Calcul et déclaration de la taxe de séjour',
      'Optimisation fiscale via le régime réel et les amortissements',
    ],
    avantages: [
      'Marché de masse : 900 000 propriétaires Airbnb potentiellement clients',
      'Sujet réglementaire complexe = forte valeur du conseil',
      'Passerelle naturelle vers le LMNP et l\'investissement locatif meublé',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Les revenus Airbnb sont-ils imposables en France ?', answer: 'Oui, dès le premier euro. Les revenus de location meublée courte durée sont imposés en BIC, soit en micro-BIC avec un abattement de 50 %, soit au régime réel avec déduction des charges et amortissements.' },
      { question: 'Combien de nuits par an peut-on louer sa résidence principale sur Airbnb ?', answer: 'La loi limite à 120 nuits par an la location de la résidence principale dans la plupart des communes françaises. Au-delà, c\'est un changement d\'usage soumis à autorisation municipale.' },
      { question: 'Airbnb reverse-t-il automatiquement la taxe de séjour ?', answer: 'Dans la plupart des grandes communes françaises, oui. Airbnb collecte et reverse la taxe de séjour automatiquement depuis 2019. Dans les communes non couvertes, c\'est au propriétaire de le faire.' },
    ],
  },

  {
    slug: 'pharmacies',
    label: 'Pharmacies',
    headline: 'Expert-comptable pharmacie : le cabinet des pharmaciens et officines',
    description: 'Expert-comptable pharmacie et officine : SPFPL, acquisition d\'officine, marges réglementées, tiers payant. Une niche premium avec des dossiers complexes et très rentables.',
    keywords: ['expert comptable pharmacie', 'comptable pharmacien', 'comptable officine', 'expert comptable spfpl pharmacie'],
    stat: { value: '20 000', label: 'officines pharmaceutiques en France (ANSM 2024)' },
    painPoints: [
      'Acquisition et financement d\'une officine (banque, holding SPFPL)',
      'Gestion des marges réglementées et flux du tiers payant',
      'TVA sur les médicaments : taux 2,1 %, 10 % et 20 %',
      'Optimisation de la rémunération du pharmacien via la SPFPL',
      'Gestion de l\'association de pharmaciens (SNC, SEL)',
    ],
    services: [
      'Comptabilité officine et suivi des marges pharmaceutiques',
      'Montage SPFPL pour l\'acquisition et la détention d\'officines',
      'Gestion TVA multi-taux (médicaments remboursables et non remboursables)',
      'Suivi du tiers payant et réconciliation des remboursements',
      'Accompagnement cession et transmission d\'officine',
    ],
    avantages: [
      'Ticket moyen parmi les plus élevés des professions de santé',
      'Dossiers récurrents et complexes générant de forts honoraires de conseil',
      'Peu de cabinets maîtrisent la SPFPL et les marges pharmaceutiques',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      'etude-croissance-cabinets-comptables-2026',
    ],
    faqs: [
      { question: 'Qu\'est-ce qu\'une SPFPL et pourquoi est-elle utile ?', answer: 'La SPFPL est une holding qui permet de détenir des parts de SEL pharmaceutique. Elle est utilisée pour optimiser la rémunération du pharmacien et faciliter l\'acquisition d\'officines supplémentaires.' },
      { question: 'Accompagnez-vous l\'acquisition d\'une première officine ?', answer: 'Oui. L\'acquisition d\'une officine est un acte majeur (valeur 500k à 5M€). Nous accompagnons le montage financier, la due diligence comptable et la structure juridique d\'acquisition.' },
      { question: 'Comment fonctionne la TVA sur les médicaments ?', answer: '2,1 % pour les médicaments remboursables, 10 % pour les autres médicaments non remboursables, 20 % pour les produits non médicamenteux (cosmétiques, parapharmacie).' },
    ],
  },

  {
    slug: 'dentistes',
    label: 'Dentistes',
    headline: 'Expert-comptable dentiste : le cabinet dédié aux chirurgiens-dentistes',
    description: 'Expert-comptable chirurgien-dentiste : SELARL dentaire, investissements matériels, optimisation rémunération, cotisations CARCDSF. Une niche à fort potentiel de revenus.',
    keywords: ['expert comptable dentiste', 'comptable cabinet dentaire', 'comptable chirurgien dentiste', 'expert comptable selarl dentaire'],
    stat: { value: '42 000', label: 'chirurgiens-dentistes libéraux en France (CNSD 2024)' },
    painPoints: [
      'Amortissement des équipements lourds (fauteuils, CBCT, scanner 3D)',
      'Optimisation de la rémunération en SELARL : salaire vs dividendes',
      'Cotisations CARCDSF et optimisation des charges sociales',
      'Constitution d\'une SELARL dentaire et rachat de parts entre associés',
      'Gestion de la TVA sur les actes non remboursés (prothèses, orthodontie)',
    ],
    services: [
      'Comptabilité cabinet dentaire (BNC individuel et SELARL)',
      'Accompagnement création et reprise de cabinet dentaire',
      'Montage SELARL dentaire et optimisation de la rémunération',
      'Tableau d\'amortissement des équipements dentaires',
      'Conseil retraite CARCDSF et épargne TNS (PER, Madelin)',
    ],
    avantages: [
      'Revenus clients parmi les plus élevés des professions de santé libérales',
      'Investissements matériels importants = missions d\'amortissement valorisées',
      'Forte fidélité : un dentiste bien accompagné ne change pas de cabinet',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Faut-il créer une SELARL pour exercer en cabinet dentaire ?', answer: 'Non, l\'exercice en BNC individuel est possible. Mais la SELARL devient intéressante dès que le bénéfice dépasse 80 000 €, grâce à l\'optimisation dividendes et à la déductibilité des charges sociales.' },
      { question: 'Comment amortit-on un fauteuil dentaire ou un CBCT ?', answer: 'Les équipements dentaires sont des immobilisations corporelles amorties selon leur durée d\'utilisation estimée : 5 à 10 ans pour les fauteuils, 5 à 7 ans pour les équipements numériques. Chaque composant peut faire l\'objet d\'un amortissement séparé.' },
      { question: 'Accompagnez-vous la reprise d\'un cabinet dentaire ?', answer: 'Oui. L\'évaluation (patientèle, équipements, pas-de-porte), le financement et la structure d\'acquisition sont des points clés que nous traitons de bout en bout.' },
    ],
  },

  {
    slug: 'avocats',
    label: 'Avocats',
    headline: 'Expert-comptable avocat : le cabinet des professionnels du droit',
    description: 'Expert-comptable avocat : CNBF, SCP d\'avocats, SELARL, optimisation rémunération, cession de clientèle. Accompagnez les cabinets d\'avocats avec une expertise dédiée.',
    keywords: ['expert comptable avocat', 'comptable cabinet avocat', 'comptable selarl avocat', 'expert comptable cnbf avocat'],
    stat: { value: '70 000', label: 'avocats inscrits au barreau en France (CNB 2024)' },
    painPoints: [
      'Cotisations CNBF et optimisation des charges sociales de l\'avocat',
      'Choix entre exercice individuel, SCP, AARPI et SELARL',
      'Comptabilisation des honoraires en cours et provisions clients',
      'Gestion de la TVA sur les honoraires et l\'aide juridictionnelle',
      'Valorisation et cession de clientèle lors d\'un départ ou d\'une fusion',
    ],
    services: [
      'Comptabilité BNC avocat et déclaration 2035',
      'Accompagnement création de SCP, AARPI ou SELARL d\'avocats',
      'Optimisation cotisations CNBF et prévoyance déductible',
      'Conseil sur la cession de clientèle et la transmission de cabinet',
      'Reporting mensuel pour les cabinets d\'avocats en développement',
    ],
    avantages: [
      'Réseau naturel : un avocat prescrit facilement à ses confrères',
      'Dossiers à haute valeur ajoutée (restructuration, fusion de cabinets)',
      'Clients exigeants mais fidèles une fois la confiance établie',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Les honoraires d\'avocat sont-ils soumis à la TVA ?', answer: 'Oui, au taux de 20 %. L\'aide juridictionnelle est exonérée. Certains avocats bénéficient de la franchise en base TVA (CA < 36 800 €), mais c\'est rare pour les avocats en activité significative.' },
      { question: 'Quelle structure juridique pour un cabinet d\'avocats associés ?', answer: 'La SCP est historique mais fiscalement transparente. La SELARL d\'avocats permet une optimisation IS + dividendes. L\'AARPI est une alternative souple, sans personnalité morale propre.' },
      { question: 'Comment valorise-t-on une clientèle d\'avocat ?', answer: 'La clientèle d\'avocat se valorise généralement entre 0,5 et 1,5 fois le chiffre d\'affaires annuel récurrent, selon la spécialisation, la fidélité des clients et les perspectives de développement.' },
    ],
  },

  {
    slug: 'shopify',
    label: 'E-commerce Shopify',
    headline: 'Expert-comptable Shopify : le cabinet des marchands Shopify en France',
    description: 'Expert-comptable Shopify : réconciliation Shopify Payments, TVA OSS, Stripe, dropshipping. Positionnez votre cabinet sur la niche des marchands Shopify français.',
    keywords: ['expert comptable shopify', 'comptable shopify', 'expert comptable ecommerce shopify', 'comptable dropshipping shopify'],
    stat: { value: '150 000+', label: 'boutiques Shopify actives en France (estimation Shopify 2024)' },
    painPoints: [
      'Réconciliation des virements Shopify Payments et identification des frais',
      'TVA OSS sur les ventes européennes B2C dépassant 10 000 €',
      'Comptabilisation des remboursements, chargebacks et litiges clients',
      'Gestion des dropshippeurs (achat hors UE, TVA à l\'import, droits de douane)',
      'Déclaration des comptes Stripe et PayPal étrangers',
    ],
    services: [
      'Réconciliation comptable Shopify Payments automatisée',
      'Gestion de la TVA OSS multi-pays pour marchands Shopify',
      'Comptabilité dropshipping (TVA à l\'import, douanes)',
      'Clôture annuelle e-commerce et liasse fiscale',
      'Accompagnement passage en société (SASU ou SARL)',
    ],
    avantages: [
      'Mot-clé très ciblé "comptable Shopify" avec une faible concurrence SEO',
      'Automatisation possible avec des connecteurs comptables dédiés (A2X, Synder)',
      'Complémentaire à la niche e-commerce généraliste déjà positionnée',
    ],
    relatedArticles: [
      'pennylane-expert-comptable-acquisition',
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
    ],
    faqs: [
      { question: 'Comment réconcilier les paiements Shopify avec ma comptabilité ?', answer: 'Shopify Payments verse des montants nets (ventes moins frais et remboursements). Des outils comme A2X ou Synder automatisent la réconciliation avec les logiciels comptables compatibles FEC.' },
      { question: 'Quelle TVA s\'applique aux ventes Shopify en Europe ?', answer: 'Au-delà de 10 000 € de ventes B2C dans l\'UE, le régime OSS s\'applique. Vous déposez une déclaration unique en France et la TVA est reversée automatiquement aux différents pays de destination.' },
      { question: 'Gérez-vous la comptabilité du dropshipping depuis la Chine ?', answer: 'Oui. Le dropshipping depuis des fournisseurs hors UE génère des droits de douane et de la TVA à l\'import. Chaque expédition doit être correctement qualifiée selon sa valeur et son origine.' },
    ],
  },

  {
    slug: 'conciergeries',
    label: 'Conciergeries Airbnb',
    headline: 'Expert-comptable conciergerie : le cabinet des gestionnaires de locations courte durée',
    description: 'Expert-comptable conciergerie Airbnb : TVA, commissions, statut juridique, fonds de tiers. Une niche en pleine explosion avec très peu de concurrence SEO en France.',
    keywords: ['expert comptable conciergerie', 'comptable gestion locative courte durée', 'comptable conciergerie airbnb', 'expert comptable location saisonnière'],
    stat: { value: '5 000+', label: 'conciergeries et gestionnaires de locations courte durée actifs en France (estimation 2024)' },
    painPoints: [
      'TVA à 20 % sur les commissions de gestion encaissées',
      'Qualification juridique : agent immobilier, prestataire ou mandataire',
      'Comptabilisation des fonds de tiers (loyers collectés pour compte)',
      'Gestion des charges refacturées aux propriétaires (ménage, linge)',
      'Choix du statut selon le volume : SASU, SARL, auto-entrepreneur',
    ],
    services: [
      'Comptabilité conciergerie (revenus de commission et prestations)',
      'Conseil sur le statut juridique (agent immobilier vs prestataire)',
      'Gestion TVA et facturation propriétaires',
      'Suivi des fonds de tiers et comptes de passage',
      'Accompagnement croissance et embauche de saisonniers',
    ],
    avantages: [
      'Niche quasi-vierge en SEO : "comptable conciergerie" a peu de résultats',
      'Secteur en forte croissance porté par l\'essor de la location courte durée',
      'Clients en structuration qui ont besoin de conseil dès le démarrage',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Une conciergerie Airbnb doit-elle avoir une carte professionnelle ?', answer: 'Cela dépend des services. Si la conciergerie effectue des actes de gestion immobilière (encaissement de loyers, conclusion de contrats), la carte T est obligatoire. Un prestataire de services pur (ménage, accueil) n\'en a pas besoin.' },
      { question: 'Comment facturer une commission de gestion locative ?', answer: 'Les commissions de gestion sont soumises à TVA à 20 %. La facture doit distinguer les sommes encaissées pour compte du propriétaire (fonds de tiers, non imposables) des honoraires de gestion.' },
      { question: 'Quel statut juridique pour lancer une conciergerie ?', answer: 'La SASU est souvent privilégiée pour la flexibilité et la crédibilité. L\'auto-entrepreneur est possible en démarrage mais les seuils de CA (77 700 €) sont rapidement atteints dans ce secteur.' },
    ],
  },

  {
    slug: 'infopreneurs',
    label: 'Infopreneurs & Formateurs en ligne',
    headline: 'Expert-comptable infopreneur : le cabinet des formateurs en ligne',
    description: 'Expert-comptable infopreneur et formation en ligne : TVA services numériques, revenus récurrents, Amazon KDP, Teachable, Gumroad. La fiscalité des infopreneurs en France.',
    keywords: ['expert comptable infopreneur', 'comptable formation en ligne', 'comptable amazon kdp', 'expert comptable revenus formation ligne'],
    stat: { value: '40 000+', label: 'formateurs en ligne actifs en France (estimation 2024)' },
    painPoints: [
      'TVA sur les services numériques vendus à des particuliers européens (OSS)',
      'Comptabilisation des revenus récurrents (abonnements, formations)',
      'Traitement fiscal des revenus Amazon KDP (royalties, droits d\'auteur)',
      'Choix du statut selon les revenus : artiste-auteur, SASU, auto-entrepreneur',
      'Déclaration des comptes Teachable, Gumroad, Podia établis hors France',
    ],
    services: [
      'Comptabilité infopreneur (revenus multi-plateformes)',
      'Gestion TVA OSS sur les formations vendues en Europe',
      'Optimisation fiscale droits d\'auteur (formations, ebooks)',
      'Accompagnement création de société adaptée à l\'activité',
      'Déclarations fiscales et gestion des comptes étrangers',
    ],
    avantages: [
      'Niche peu concurrentielle avec une demande en forte croissance',
      'Clients 100 % en ligne — tout se gère à distance, zéro déplacement',
      'Complémentaire à Amazon FBA pour les vendeurs multi-canaux',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      'pennylane-expert-comptable-acquisition',
    ],
    faqs: [
      { question: 'Les revenus de formations en ligne sont-ils exonérés de TVA ?', answer: 'Uniquement si la formation relève de la formation professionnelle continue (convention, public éligible). La plupart des formations en ligne vendues au grand public sont soumises à TVA à 20 %.' },
      { question: 'Quelle fiscalité pour les royalties Amazon KDP ?', answer: 'Les royalties Amazon KDP peuvent être qualifiées de droits d\'auteur si l\'auteur est reconnu comme tel, bénéficiant d\'un abattement de 34 % en micro-BNC. Sinon elles sont traitées comme des BNC classiques.' },
      { question: 'Faut-il déclarer un compte Teachable ou Gumroad aux impôts ?', answer: 'Oui. Tout compte ouvert sur une plateforme étrangère doit être déclaré via le formulaire 3916. L\'amende en cas d\'omission est de 750 € par compte non déclaré.' },
    ],
  },

  {
    slug: 'vtc',
    label: 'VTC & Transport',
    headline: 'Expert-comptable VTC : le cabinet des chauffeurs et transporteurs indépendants',
    description: 'Expert-comptable VTC et transport : auto-entrepreneur, SARL transport, déductibilité véhicule, commissions Uber et Bolt. Accompagnez les chauffeurs VTC et transporteurs.',
    keywords: ['expert comptable vtc', 'comptable chauffeur vtc', 'comptable transporteur', 'expert comptable uber chauffeur'],
    stat: { value: '60 000+', label: 'chauffeurs VTC autorisés en France (DGITM 2023)' },
    painPoints: [
      'Passage de l\'auto-entrepreneur à la société quand le CA dépasse les seuils',
      'Déductibilité des charges véhicule : carburant, entretien, assurance, LLD',
      'TVA : franchise vs régime réel selon le statut et le volume d\'activité',
      'Gestion des commissions Uber, Bolt, G7 et leur comptabilisation',
      'Optimisation indemnités kilométriques vs déduction des charges réelles',
    ],
    services: [
      'Comptabilité VTC (auto-entrepreneur et société)',
      'Optimisation des charges véhicule et déductibilité fiscale',
      'Accompagnement passage en SASU ou SARL transport',
      'Déclarations TVA et gestion des commissions plateformes',
      'Conseil retraite TNS et prévoyance chauffeur indépendant',
    ],
    avantages: [
      'Marché de masse : 60 000 chauffeurs cherchent un comptable accessible',
      'Forfaits mensuels standardisables = ticket récurrent prévisible',
      'Complément naturel avec les niches artisans et freelances',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      '7-canaux-acquisition-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
    ],
    faqs: [
      { question: 'Un chauffeur VTC peut-il rester auto-entrepreneur ?', answer: 'Oui, jusqu\'à 77 700 € de CA annuel. Au-delà, le passage en société (SASU ou SARL) devient obligatoire et souvent avantageux grâce à la déduction des charges réelles et à l\'optimisation de la rémunération.' },
      { question: 'Comment déduire les charges de véhicule en VTC ?', answer: 'En entreprise individuelle : déduction des charges réelles (carburant, entretien, assurance, amortissement) ou application du barème kilométrique. En société : le véhicule est une immobilisation amortissable sur 5 ans.' },
      { question: 'Les commissions Uber sont-elles des charges déductibles ?', answer: 'Oui. Les commissions prélevées par Uber, Bolt ou G7 sur chaque course sont des charges d\'exploitation pleinement déductibles du résultat imposable.' },
    ],
  },

  {
    slug: 'kines',
    label: 'Kinésithérapeutes',
    headline: 'Expert-comptable kinésithérapeute : le cabinet dédié aux masseurs-kinés libéraux',
    description: 'Expert-comptable kinésithérapeute : BNC, CARPIMKO, SCM kiné, optimisation cotisations. Accompagnez les 85 000 masseurs-kinésithérapeutes libéraux avec une vraie expertise.',
    keywords: ['expert comptable kine', 'comptable masseur kinesitherapeute', 'comptable cabinet kine', 'expert comptable carpimko kine'],
    stat: { value: '85 000', label: 'kinésithérapeutes libéraux en France (DREES 2023)' },
    painPoints: [
      'Cotisations CARPIMKO et optimisation des options de retraite complémentaire',
      'Gestion de la SCM en cabinet partagé entre plusieurs kinés',
      'Comptabilité BNC et déclaration 2035 en régime réel',
      'Déductibilité des frais de formation professionnelle continue',
      'Passage de l\'exercice individuel à l\'association ou à la SEL',
    ],
    services: [
      'Comptabilité BNC masseur-kinésithérapeute et déclaration 2035',
      'Optimisation des cotisations CARPIMKO',
      'Création et suivi comptable d\'une SCM kinésithérapeutes',
      'Conseil retraite et prévoyance (PER individuel, Madelin)',
      'Accompagnement installation libérale et rachat de patientèle',
    ],
    avantages: [
      '85 000 kinés libéraux — un marché de masse pour des forfaits standardisés',
      'Dossiers simples et récurrents avec des charges prévisibles',
      'Fidélité client élevée une fois la relation de confiance instaurée',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Quelle est la différence entre CARPIMKO et CARMF ?', answer: 'La CARPIMKO est la caisse de retraite des auxiliaires médicaux (kinésithérapeutes, infirmiers, orthophonistes…). La CARMF est celle des médecins. Chaque caisse a ses propres taux de cotisation et niveaux de prestations.' },
      { question: 'Qu\'est-ce qu\'une SCM en kinésithérapie ?', answer: 'La Société Civile de Moyens permet à plusieurs kinés de partager des locaux et du matériel sans fusionner leurs activités ni leurs revenus. Chaque associé reste indépendant fiscalement.' },
      { question: 'Combien coûte un dossier kiné pour un cabinet comptable ?', answer: 'Un dossier kinésithérapeute au régime réel BNC est facturé entre 80 et 200 € par mois selon les services inclus. C\'est un dossier standardisable, rentable et peu chronophage.' },
    ],
  },

  {
    slug: 'infirmiers',
    label: 'Infirmiers libéraux (IDEL)',
    headline: 'Expert-comptable infirmier libéral : le cabinet des IDEL',
    description: 'Expert-comptable infirmier libéral (IDEL) : BNC, CARPIMKO, tournées domicile, frais kilométriques. Accompagnez les 130 000 infirmiers libéraux avec une comptabilité adaptée.',
    keywords: ['expert comptable infirmier liberal', 'comptable idel', 'comptable infirmiere liberale', 'expert comptable carpimko infirmier'],
    stat: { value: '130 000', label: 'infirmiers libéraux (IDEL) en France (DREES 2023)' },
    painPoints: [
      'Optimisation des indemnités kilométriques sur les tournées domicile',
      'Cotisations CARPIMKO et options de retraite complémentaire IDEL',
      'Gestion de la convention CPAM et des feuilles de soins dématérialisées',
      'Comptabilité des remplacements et sous-traitance entre IDEL',
      'Association entre infirmiers : SCM ou cabinet de groupe',
    ],
    services: [
      'Comptabilité BNC infirmier libéral et déclaration 2035',
      'Optimisation des frais kilométriques (indemnités ou charges réelles)',
      'Suivi et optimisation des cotisations CARPIMKO',
      'Accompagnement association et partage de cabinet entre IDEL',
      'Conseil retraite, prévoyance et épargne TNS',
    ],
    avantages: [
      '130 000 IDEL en France — le plus grand marché des professions de santé libérales',
      'Dossiers très standardisables avec des forfaits mensuels accessibles',
      'Réseau de prescription dense dans les équipes de soins locales',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Comment déclarer ses revenus en tant qu\'infirmier libéral ?', answer: 'Les IDEL déclarent leurs revenus en BNC. Au-delà de 77 700 € de recettes, le régime réel s\'impose avec une déclaration 2035. La tenue d\'un livre de recettes est obligatoire dès la 1re installation.' },
      { question: 'Quelles charges sont déductibles pour un IDEL ?', answer: 'Les frais kilométriques (tournées domicile), le matériel médical, les formations, les cotisations professionnelles, la prévoyance Madelin et les loyers de cabinet sont parmi les principales charges déductibles.' },
      { question: 'Un IDEL remplaçant doit-il s\'inscrire à la CARPIMKO ?', answer: 'Oui, dès le premier acte de soin. L\'inscription à la CARPIMKO est obligatoire pour tout infirmier libéral, même en remplacement. Les cotisations sont calculées sur les revenus de l\'année.' },
    ],
  },

  {
    slug: 'architectes',
    label: 'Architectes',
    headline: 'Expert-comptable architecte : le cabinet dédié aux agences d\'architecture',
    description: 'Expert-comptable architecte : BNC, CIPAV, honoraires à l\'avancement, SELARL d\'architectes. Accompagnez les architectes libéraux et les agences d\'architecture en croissance.',
    keywords: ['expert comptable architecte', 'comptable cabinet architecture', 'expert comptable cipav architecte', 'comptable agence architecture'],
    stat: { value: '30 000', label: 'architectes inscrits à l\'ordre en France (CNOA 2024)' },
    painPoints: [
      'Cotisations CIPAV et options de retraite complémentaire des architectes',
      'Comptabilisation des honoraires à l\'avancement selon les phases de mission',
      'TVA sur les honoraires de maîtrise d\'œuvre et les missions de conseil',
      'Constitution d\'une SARL ou SELARL d\'architectes entre associés',
      'Assurance RC Pro décennale obligatoire et déductibilité des primes',
    ],
    services: [
      'Comptabilité BNC architecte et déclaration 2035',
      'Suivi des honoraires par projet et phase de mission (ESQ, APS, APD, DCE, etc.)',
      'Accompagnement création d\'agence d\'architecture (SARL, SELARL)',
      'Optimisation des cotisations CIPAV et retraite complémentaire',
      'Conseil sur la TVA selon la nature et le taux des missions',
    ],
    avantages: [
      'Clients à revenus stables sur des projets longs avec des honoraires récurrents',
      'Réseau prescripteur naturel dans l\'écosystème BTP et immobilier',
      'Missions de conseil valorisées (structure, cession d\'agence, valorisation)',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
      '7-canaux-acquisition-cabinet-comptable',
    ],
    faqs: [
      { question: 'Les honoraires d\'architecte sont-ils soumis à la TVA ?', answer: 'Oui, au taux de 20 % pour les honoraires de maîtrise d\'œuvre. Certaines missions de conseil liées à des travaux de rénovation énergétique peuvent bénéficier d\'un taux réduit.' },
      { question: 'Quelle est la particularité de la CIPAV pour les architectes ?', answer: 'La CIPAV est la caisse de retraite des professions libérales non médicales (architectes, consultants, ingénieurs). Elle a des taux de cotisation spécifiques et des options de retraite complémentaire à choisir en début d\'activité.' },
      { question: 'Peut-on créer une société d\'architecture ?', answer: 'Oui. L\'architecte peut exercer en SARL d\'architecture ou en SELARL. La structure sociétaire est recommandée dès que le CA dépasse 80 000 € ou quand plusieurs associés veulent collaborer.' },
    ],
  },

  {
    slug: 'coaching',
    label: 'Coachs & Formateurs',
    headline: 'Expert-comptable coach : le cabinet des coachs et formateurs indépendants',
    description: 'Expert-comptable coach professionnel et formateur : SASU, TVA, droits d\'auteur, exonération formation. Accompagnez les coachs et formateurs avec une comptabilité adaptée.',
    keywords: ['expert comptable coach', 'comptable coach professionnel', 'comptable formateur indépendant', 'expert comptable coaching'],
    stat: { value: '25 000+', label: 'coachs professionnels certifiés en France (ICF France 2024)' },
    painPoints: [
      'Exonération de TVA possible si l\'activité relève de la formation professionnelle',
      'Choix du statut selon les revenus : auto-entrepreneur, SASU, artiste-auteur',
      'Comptabilisation des revenus mixtes (coaching + formation + cours en ligne)',
      'Déductibilité des certifications professionnelles (ICF, EMCC, RNCP)',
      'Gestion des revenus saisonniers et des acomptes clients',
    ],
    services: [
      'Comptabilité coach et formateur (multi-sources de revenus)',
      'Conseil sur l\'exonération TVA et les conditions de formation professionnelle',
      'Accompagnement création de SASU ou SARL coaching',
      'Optimisation de la rémunération (salaire, dividendes)',
      'Déclarations fiscales et suivi des charges déductibles',
    ],
    avantages: [
      'Marché en forte croissance porté par le développement personnel et professionnel',
      'Clients très prescripteurs dans leurs réseaux professionnels et sur LinkedIn',
      'Dossiers standardisables avec des revenus récurrents (abonnements, programmes)',
    ],
    relatedArticles: [
      'comment-specialiser-cabinet-comptable',
      '7-canaux-acquisition-cabinet-comptable',
      'seo-expert-comptable-guide-complet',
    ],
    faqs: [
      { question: 'Un coach professionnel est-il exonéré de TVA ?', answer: 'Cela dépend de l\'activité. Si le coaching est assimilé à de la formation professionnelle (objectifs de compétences, public éligible, convention), l\'exonération TVA est possible. Sinon la TVA s\'applique à 20 %.' },
      { question: 'Quelle structure pour un coach qui génère 60 000 € de CA ?', answer: 'À ce niveau, la SASU devient souvent intéressante : optimisation du mix salaire/dividendes, crédibilité professionnelle et déductibilité des charges réelles. L\'auto-entreprise reste possible mais les cotisations sociales sont calculées sur le CA brut.' },
      { question: 'Peut-on déduire une certification ICF ou EMCC ?', answer: 'Oui. Les frais de formation et de certification professionnelle sont des charges d\'exploitation déductibles dès lors qu\'elles sont directement liées à l\'activité de coaching.' },
    ],
  },
]
