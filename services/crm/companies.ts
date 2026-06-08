import { companies as mockCompanies, type Company } from './mockData'

export async function getCompanies(): Promise<Company[]> {
  return [...mockCompanies]
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  return mockCompanies.find((c) => c.id === id)
}
