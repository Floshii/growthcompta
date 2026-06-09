import { deals } from './mockData'

export interface Contact {
  id: string
  name: string
  company: string
  sector: string
  mrr: number
  owner: string
  dealId: string
}

export async function getContacts(): Promise<Contact[]> {
  return deals.map((d) => ({
    id: d.id,
    name: d.contact,
    company: d.company,
    sector: d.sector,
    mrr: d.mrr,
    owner: d.owner,
    dealId: d.id,
  }))
}
