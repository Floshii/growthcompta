import { deals } from './mockData'

export interface Company {
  name: string
  sector: string
  totalMrr: number
  dealCount: number
  owners: string[]
}

export async function getCompanies(): Promise<Company[]> {
  const map = new Map<string, Company>()
  for (const d of deals) {
    if (!map.has(d.company)) {
      map.set(d.company, { name: d.company, sector: d.sector, totalMrr: 0, dealCount: 0, owners: [] })
    }
    const c = map.get(d.company)!
    c.totalMrr += d.mrr
    c.dealCount++
    if (!c.owners.includes(d.owner)) c.owners.push(d.owner)
  }
  return [...map.values()].sort((a, b) => b.totalMrr - a.totalMrr)
}
