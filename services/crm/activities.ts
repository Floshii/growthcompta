import { activities as mockActivities, type Activity } from './mockData'

export async function getActivities(): Promise<Activity[]> {
  return [...mockActivities]
}

export async function getActivitiesForDeal(dealId: string): Promise<Activity[]> {
  return mockActivities.filter((a) => a.dealId === dealId)
}
