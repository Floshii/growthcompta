'use client'
import { useState, useEffect } from 'react'
import { Users, Mail, Phone, Building2 } from 'lucide-react'
import { getContacts } from '@/services/crm/contacts'
import { getCompanies } from '@/services/crm/companies'
import type { Contact, Company } from '@/services/crm/mockData'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-crm-surface border border-crm-line flex items-center justify-center">
        <Users size={28} className="text-crm-muted/40" />
      </div>
      <div>
        <p className="text-crm-primary font-semibold font-crm">Aucun contact</p>
        <p className="text-crm-muted text-sm font-crm mt-1">
          Vos contacts apparaîtront ici.
        </p>
      </div>
    </div>
  )
}

export default function ContactsView() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    Promise.all([getContacts(), getCompanies()]).then(([ct, co]) => {
      setContacts(ct)
      setCompanies(co)
    })
  }, [])

  const companyMap = Object.fromEntries(companies.map((c) => [c.id, c.name]))

  const initials = (c: Contact) =>
    `${c.firstName[0]}${c.lastName[0]}`.toUpperCase()

  const avatarColors = [
    'bg-crm-blue/20 text-crm-blue',
    'bg-crm-purple/20 text-crm-purple',
    'bg-crm-green/20 text-crm-green',
    'bg-crm-amber/20 text-crm-amber',
    'bg-crm-red/20 text-crm-red',
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-crm-muted text-sm font-crm">
          {contacts.length} contact{contacts.length > 1 ? 's' : ''}
        </p>
      </div>

      {contacts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden border border-crm-line rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-crm-line bg-crm-surface/60">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  Contact
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  <span className="flex items-center gap-1.5">
                    <Mail size={12} /> Email
                  </span>
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  <span className="flex items-center gap-1.5">
                    <Phone size={12} /> Téléphone
                  </span>
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={12} /> Cabinet
                  </span>
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  Depuis
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr
                  key={contact.id}
                  className="border-b border-crm-line/50 last:border-0 hover:bg-crm-surface/60 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-crm-mono shrink-0 ${
                          avatarColors[i % avatarColors.length]
                        }`}
                      >
                        {initials(contact)}
                      </div>
                      <div>
                        <p className="font-semibold text-crm-primary font-crm leading-none">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="font-crm-mono text-[11px] text-crm-muted/60 mt-0.5">
                          #{contact.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-crm-muted font-crm text-sm">
                    {contact.email}
                  </td>
                  <td className="px-5 py-4 font-crm-mono text-sm text-crm-muted">
                    {contact.phone}
                  </td>
                  <td className="px-5 py-4 text-crm-primary font-crm text-sm">
                    {companyMap[contact.companyId] ?? '—'}
                  </td>
                  <td className="px-5 py-4 font-crm-mono text-sm text-crm-muted">
                    {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
