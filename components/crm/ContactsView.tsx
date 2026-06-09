'use client'
import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { getContacts, type Contact } from '@/services/crm/contacts'
import { OWNER_COLORS, type Owner } from '@/services/crm/mockData'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-crm-surface border border-crm-line grid place-items-center">
        <Users size={28} className="text-crm-muted/40" />
      </div>
      <div>
        <p className="text-crm-primary font-semibold font-crm">Aucun contact</p>
        <p className="text-crm-muted text-sm font-crm mt-1">Vos contacts apparaîtront ici.</p>
      </div>
    </div>
  )
}

function OwnerChip({ owner }: { owner: string }) {
  const color = OWNER_COLORS[owner as Owner] ?? '#6B6B80'
  return (
    <span
      className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-[7px] font-crm-mono text-[10px] font-bold"
      style={{ background: color + '22', color, boxShadow: `inset 0 0 0 1px ${color}33` }}
    >
      {owner}
    </span>
  )
}

export default function ContactsView() {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    getContacts().then(setContacts)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <p className="text-crm-muted text-sm font-crm">{contacts.length} contact{contacts.length > 1 ? 's' : ''}</p>

      {contacts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden border border-crm-line rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-crm-line bg-crm-surface/60">
                {['Contact', 'Entreprise', 'Secteur', 'MRR', 'Resp.'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => {
                const initials = c.name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
                const avatarColors = ['#8B5CF6', '#3B82F6', '#22C55E', '#F59E0B', '#EF4444']
                const ac = avatarColors[i % avatarColors.length]
                return (
                  <tr key={c.id} className="border-b border-crm-line/50 last:border-0 hover:bg-crm-surface/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold font-crm-mono shrink-0"
                          style={{ background: ac + '20', color: ac }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-crm-primary font-crm leading-none">{c.name}</p>
                          <p className="font-crm-mono text-[11px] text-crm-muted/60 mt-0.5">#{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-crm-primary font-crm text-sm">{c.company}</td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex px-2 py-0.5 rounded-[5px] text-[11px] font-medium font-crm border"
                        style={{ color: '#F59E0B', background: '#F59E0B18', borderColor: '#F59E0B26' }}
                      >
                        {c.sector}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-crm-mono text-sm font-bold text-crm-green">
                      {c.mrr.toLocaleString('fr-FR')} €/m
                    </td>
                    <td className="px-5 py-4">
                      <OwnerChip owner={c.owner} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
