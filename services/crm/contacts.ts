import { contacts as mockContacts, type Contact } from './mockData'

export async function getContacts(): Promise<Contact[]> {
  return [...mockContacts]
}

export async function getContactById(id: string): Promise<Contact | undefined> {
  return mockContacts.find((c) => c.id === id)
}
