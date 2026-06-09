// Données mock GClients — 18 deals, cabinets comptables français

export type Stage = 'prospect' | 'qualifie' | 'proposition' | 'negociation' | 'signe'
export type Owner = 'ML' | 'TR' | 'AC' | 'SB'
export type ActivityType = 'appel' | 'email' | 'réunion' | 'note'

export interface Deal {
  id: string
  company: string
  sector: string
  contact: string
  mrr: number
  stage: Stage
  owner: Owner
  last: string // ISO date
}

export interface Activity {
  id: string
  type: ActivityType
  note: string
  contact: string
  dealId: string
  date: string
}

export interface StageConfig {
  id: Stage
  label: string
  color: string
  hint: string
}

export const STAGES: StageConfig[] = [
  { id: 'prospect',    label: 'Prospect',    color: '#3B82F6', hint: 'Premiers contacts à qualifier' },
  { id: 'qualifie',    label: 'Qualifié',    color: '#8B5CF6', hint: 'Besoin confirmé, budget identifié' },
  { id: 'proposition', label: 'Proposition', color: '#F59E0B', hint: 'Devis envoyé, en attente retour' },
  { id: 'negociation', label: 'Négociation', color: '#F97316', hint: 'Ajustement des honoraires' },
  { id: 'signe',       label: 'Signé',       color: '#22C55E', hint: 'Mandat signé, onboarding lancé' },
]

export const OWNERS: Owner[] = ['ML', 'TR', 'AC', 'SB']

export const OWNER_COLORS: Record<Owner, string> = {
  ML: '#8B5CF6',
  TR: '#3B82F6',
  AC: '#F59E0B',
  SB: '#22C55E',
}

export const deals: Deal[] = [
  // ── Prospect
  { id: 'GC-1042', company: 'Boulangerie Lefèvre',      sector: 'Artisan / Commerce',  contact: 'Camille Lefèvre',     mrr: 340,  stage: 'prospect',    owner: 'AC', last: '2026-06-07' },
  { id: 'GC-1051', company: 'Garage Petit & Fils',      sector: 'Automobile',           contact: 'Damien Petit',        mrr: 520,  stage: 'prospect',    owner: 'TR', last: '2026-06-05' },
  { id: 'GC-1063', company: 'Fleuriste Margot',         sector: 'Commerce de détail',   contact: 'Margot Vasseur',      mrr: 290,  stage: 'prospect',    owner: 'ML', last: '2026-06-02' },
  { id: 'GC-1067', company: 'Transports Girard SARL',   sector: 'Logistique',           contact: 'Olivier Girard',      mrr: 1180, stage: 'prospect',    owner: 'SB', last: '2026-06-06' },
  { id: 'GC-1071', company: 'Restaurant Le Comptoir',   sector: 'Restauration',         contact: 'Inès Bonnet',         mrr: 640,  stage: 'prospect',    owner: 'AC', last: '2026-05-30' },
  // ── Qualifié
  { id: 'GC-1009', company: 'Studio Mont-Blanc',        sector: 'Architecture',         contact: 'Hugo Marchand',       mrr: 980,  stage: 'qualifie',    owner: 'ML', last: '2026-06-06' },
  { id: 'GC-1018', company: 'Pharmacie du Marché',      sector: 'Santé',                contact: 'Dr. Élise Roux',      mrr: 1240, stage: 'qualifie',    owner: 'TR', last: '2026-06-04' },
  { id: 'GC-1024', company: 'Menuiserie Rousseau',      sector: 'BTP / Artisanat',      contact: 'Paul Rousseau',       mrr: 760,  stage: 'qualifie',    owner: 'SB', last: '2026-06-03' },
  { id: 'GC-1031', company: 'Éditions Vallée',          sector: 'Édition',              contact: 'Sophie Vallée',       mrr: 1450, stage: 'qualifie',    owner: 'AC', last: '2026-06-01' },
  // ── Proposition
  { id: 'GC-0987', company: 'Tech Nantes SAS',          sector: 'Logiciel / SaaS',      contact: 'Yanis Lemoine',       mrr: 2400, stage: 'proposition', owner: 'ML', last: '2026-06-07' },
  { id: 'GC-0992', company: 'Clinique Vét. Pasteur',    sector: 'Santé animale',        contact: 'Dr. Claire Fontaine', mrr: 1320, stage: 'proposition', owner: 'TR', last: '2026-06-05' },
  { id: 'GC-0998', company: 'Maison Dubois Immobilier', sector: 'Immobilier',           contact: 'Antoine Dubois',      mrr: 1890, stage: 'proposition', owner: 'SB', last: '2026-05-31' },
  // ── Négociation
  { id: 'GC-0954', company: 'Brasserie La Rochelle',    sector: 'Agroalimentaire',      contact: 'Manon Charpentier',   mrr: 2150, stage: 'negociation', owner: 'AC', last: '2026-06-06' },
  { id: 'GC-0961', company: 'Atelier Caron Design',     sector: 'Design / Studio',      contact: 'Théo Caron',          mrr: 1080, stage: 'negociation', owner: 'ML', last: '2026-06-04' },
  // ── Signé
  { id: 'GC-0902', company: 'Cabinet Dr. Moreau',       sector: 'Profession libérale',  contact: 'Dr. Lucas Moreau',    mrr: 890,  stage: 'signe',       owner: 'TR', last: '2026-05-28' },
  { id: 'GC-0915', company: 'Boucherie Centrale',       sector: 'Artisan / Commerce',   contact: 'Nadia Aubert',        mrr: 470,  stage: 'signe',       owner: 'SB', last: '2026-05-25' },
  { id: 'GC-0921', company: 'Cave Saint-Émilion',       sector: 'Négoce / Vin',         contact: 'Pierre Gaillard',     mrr: 1620, stage: 'signe',       owner: 'AC', last: '2026-06-02' },
  { id: 'GC-0930', company: 'Coiffure Émeraude',        sector: 'Services',             contact: 'Léa Mercier',         mrr: 380,  stage: 'signe',       owner: 'ML', last: '2026-05-20' },
]

export const activities: Activity[] = [
  { id: 'a01', type: 'appel',   note: 'Premier contact — intéressé par la mise en conformité',  contact: 'Camille Lefèvre',     dealId: 'GC-1042', date: '2026-06-07' },
  { id: 'a02', type: 'email',   note: 'Envoi de la plaquette de présentation et tarifs 2026',   contact: 'Yanis Lemoine',       dealId: 'GC-0987', date: '2026-06-07' },
  { id: 'a03', type: 'réunion', note: 'Démo du dashboard GrowthCompta. Client très réactif.',   contact: 'Hugo Marchand',       dealId: 'GC-1009', date: '2026-06-06' },
  { id: 'a04', type: 'note',    note: 'Budget confirmé à 2 150 €/mois. Décision attendue fin juin.', contact: 'Manon Charpentier', dealId: 'GC-0954', date: '2026-06-06' },
  { id: 'a05', type: 'email',   note: 'Envoi proposition commerciale v2 avec remise fidélité',  contact: 'Dr. Claire Fontaine', dealId: 'GC-0992', date: '2026-06-05' },
  { id: 'a06', type: 'appel',   note: 'Négociation tarifaire — demande remise 10 %',            contact: 'Théo Caron',          dealId: 'GC-0961', date: '2026-06-04' },
  { id: 'a07', type: 'réunion', note: 'Kick-off projet. Onboarding prévu semaine 24.',          contact: 'Dr. Lucas Moreau',    dealId: 'GC-0902', date: '2026-05-28' },
  { id: 'a08', type: 'email',   note: 'Contrat signé reçu. Facturation activée.',              contact: 'Pierre Gaillard',     dealId: 'GC-0921', date: '2026-06-02' },
  { id: 'a09', type: 'note',    note: 'Référence client potentielle — à solliciter en juillet', contact: 'Pierre Gaillard',     dealId: 'GC-0921', date: '2026-06-03' },
  { id: 'a10', type: 'appel',   note: 'Relance sans réponse — reproposer en semaine 25',       contact: 'Damien Petit',        dealId: 'GC-1051', date: '2026-06-05' },
]
