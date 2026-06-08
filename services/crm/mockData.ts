// Données mock — GClients CRM

export type Stage = 'prospect' | 'qualifié' | 'proposition' | 'négociation' | 'signé'
export type ActivityType = 'appel' | 'email' | 'réunion' | 'note'

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  companyId: string
  createdAt: string
}

export interface Company {
  id: string
  name: string
  siren: string
  sector: string
  mrr: number
  contactIds: string[]
}

export interface Deal {
  id: string
  title: string
  companyId: string
  contactId: string
  mrr: number
  stage: Stage
  createdAt: string
  lastActivityAt: string
}

export interface Activity {
  id: string
  type: ActivityType
  note: string
  contactId: string
  dealId: string
  date: string
}

export const STAGES: Stage[] = [
  'prospect',
  'qualifié',
  'proposition',
  'négociation',
  'signé',
]

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Fiduciaire Dupont & Associés',
    siren: '123 456 789',
    sector: 'Expertise comptable',
    mrr: 3200,
    contactIds: ['ct1', 'ct2'],
  },
  {
    id: 'c2',
    name: 'Martin Conseil & Gestion',
    siren: '987 654 321',
    sector: 'Audit & Conseil',
    mrr: 1800,
    contactIds: ['ct3'],
  },
  {
    id: 'c3',
    name: 'Leblanc Audit Finance',
    siren: '456 789 123',
    sector: 'Commissariat aux comptes',
    mrr: 2500,
    contactIds: ['ct4', 'ct5'],
  },
]

export const contacts: Contact[] = [
  {
    id: 'ct1',
    firstName: 'Sophie',
    lastName: 'Dupont',
    email: 'sophie.dupont@fiduciaire-dupont.fr',
    phone: '06 12 34 56 78',
    companyId: 'c1',
    createdAt: '2024-01-15',
  },
  {
    id: 'ct2',
    firstName: 'Marc',
    lastName: 'Leroux',
    email: 'm.leroux@fiduciaire-dupont.fr',
    phone: '06 98 76 54 32',
    companyId: 'c1',
    createdAt: '2024-02-03',
  },
  {
    id: 'ct3',
    firstName: 'Julie',
    lastName: 'Martin',
    email: 'j.martin@martin-conseil.fr',
    phone: '07 23 45 67 89',
    companyId: 'c2',
    createdAt: '2024-03-10',
  },
  {
    id: 'ct4',
    firstName: 'Thomas',
    lastName: 'Leblanc',
    email: 't.leblanc@leblanc-audit.fr',
    phone: '06 45 67 89 01',
    companyId: 'c3',
    createdAt: '2024-01-28',
  },
  {
    id: 'ct5',
    firstName: 'Isabelle',
    lastName: 'Renard',
    email: 'i.renard@leblanc-audit.fr',
    phone: '07 89 01 23 45',
    companyId: 'c3',
    createdAt: '2024-04-05',
  },
]

export const deals: Deal[] = [
  {
    id: 'd1',
    title: 'Refonte site + SEO cabinet',
    companyId: 'c1',
    contactId: 'ct1',
    mrr: 1200,
    stage: 'prospect',
    createdAt: '2024-05-01',
    lastActivityAt: '2024-05-20',
  },
  {
    id: 'd2',
    title: 'Ads Google Spécialisation LMNP',
    companyId: 'c2',
    contactId: 'ct3',
    mrr: 800,
    stage: 'prospect',
    createdAt: '2024-05-10',
    lastActivityAt: '2024-05-22',
  },
  {
    id: 'd3',
    title: 'Content Marketing + Newsletter',
    companyId: 'c3',
    contactId: 'ct4',
    mrr: 600,
    stage: 'qualifié',
    createdAt: '2024-04-15',
    lastActivityAt: '2024-05-18',
  },
  {
    id: 'd4',
    title: 'SEO Programmatique — 50 villes',
    companyId: 'c1',
    contactId: 'ct2',
    mrr: 2000,
    stage: 'qualifié',
    createdAt: '2024-04-20',
    lastActivityAt: '2024-05-25',
  },
  {
    id: 'd5',
    title: 'Tunnel acquisition leads PME',
    companyId: 'c3',
    contactId: 'ct5',
    mrr: 1500,
    stage: 'proposition',
    createdAt: '2024-03-01',
    lastActivityAt: '2024-05-23',
  },
  {
    id: 'd6',
    title: 'Pack Visibilité 360°',
    companyId: 'c2',
    contactId: 'ct3',
    mrr: 900,
    stage: 'négociation',
    createdAt: '2024-02-14',
    lastActivityAt: '2024-05-26',
  },
  {
    id: 'd7',
    title: 'Audit Digital + Roadmap',
    companyId: 'c1',
    contactId: 'ct1',
    mrr: 400,
    stage: 'signé',
    createdAt: '2024-01-10',
    lastActivityAt: '2024-05-15',
  },
  {
    id: 'd8',
    title: 'Growth Engine complet',
    companyId: 'c3',
    contactId: 'ct4',
    mrr: 3200,
    stage: 'signé',
    createdAt: '2024-02-28',
    lastActivityAt: '2024-05-28',
  },
]

export const activities: Activity[] = [
  {
    id: 'a1',
    type: 'appel',
    note: 'Premier contact — intéressé par le SEO local',
    contactId: 'ct1',
    dealId: 'd1',
    date: '2024-05-20',
  },
  {
    id: 'a2',
    type: 'email',
    note: 'Envoi de la plaquette de présentation',
    contactId: 'ct3',
    dealId: 'd2',
    date: '2024-05-22',
  },
  {
    id: 'a3',
    type: 'réunion',
    note: 'Démo du dashboard GrowthCompta. Client très réactif.',
    contactId: 'ct4',
    dealId: 'd3',
    date: '2024-05-18',
  },
  {
    id: 'a4',
    type: 'note',
    note: 'Budget confirmé à 2 000 €/mois. Décision attendue fin mai.',
    contactId: 'ct2',
    dealId: 'd4',
    date: '2024-05-25',
  },
  {
    id: 'a5',
    type: 'email',
    note: 'Envoi proposition commerciale v2 avec remise fidélité',
    contactId: 'ct5',
    dealId: 'd5',
    date: '2024-05-23',
  },
  {
    id: 'a6',
    type: 'appel',
    note: 'Négociation tarifaire — demande remise 10 %',
    contactId: 'ct3',
    dealId: 'd6',
    date: '2024-05-26',
  },
  {
    id: 'a7',
    type: 'réunion',
    note: 'Kick-off projet. Onboarding prévu semaine 22.',
    contactId: 'ct1',
    dealId: 'd7',
    date: '2024-05-15',
  },
  {
    id: 'a8',
    type: 'email',
    note: 'Contrat signé reçu. Facturation activée.',
    contactId: 'ct4',
    dealId: 'd8',
    date: '2024-05-28',
  },
  {
    id: 'a9',
    type: 'note',
    note: 'Référence client potentielle — à solliciter en juin',
    contactId: 'ct4',
    dealId: 'd8',
    date: '2024-05-29',
  },
  {
    id: 'a10',
    type: 'appel',
    note: 'Relance sans réponse — reproposer en semaine 24',
    contactId: 'ct3',
    dealId: 'd2',
    date: '2024-05-24',
  },
]
