import { deals as mockDeals, type Deal, type Stage } from './mockData'

// État local mutable — remplacé par un vrai appel API plus tard
let _deals: Deal[] = [...mockDeals]

export async function getDeals(): Promise<Deal[]> {
  return [..._deals]
}

export async function getDealsByStage(stage: Stage): Promise<Deal[]> {
  return _deals.filter((d) => d.stage === stage)
}

export async function updateDealStage(dealId: string, stage: Stage): Promise<Deal> {
  _deals = _deals.map((d) =>
    d.id === dealId
      ? { ...d, stage, lastActivityAt: new Date().toISOString().split('T')[0] }
      : d,
  )
  return _deals.find((d) => d.id === dealId)!
}
