import { activities as mockActivities, type Activity } from './mockData'

export async function getActivities(): Promise<Activity[]> {
  return [...mockActivities].sort((a, b) => b.date.localeCompare(a.date))
}
