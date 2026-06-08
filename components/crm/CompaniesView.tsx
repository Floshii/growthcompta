'use client'
import { useState, useEffect } from 'react'
import { Building2, TrendingUp } from 'lucide-react'
import { getCompanies } from '@/services/crm/companies'
import { getContacts } from '@/services/crm/contacts'
import type { Company } from '@/services/crm/mockData'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-crm-surface border border-crm-line flex items-center justify-center">
        <Building2 size={28} className="text-crm-muted/40" />
      </div>
      <div>
        <p className="text-crm-primary font-semibold font-crm">Aucun cabinet</p>
        <p className="text-crm-muted text-sm font-crm mt-1">
          Vos cabinets clients apparaîtront ici.
        </p>
      </div>
    </div>
  )
}

const sectorColors: Record<string, string> = {
  'Expertise comptable': 'bg-crm-blue/10 text-crm-blue border-crm-blue/20',
  'Audit & Conseil': 'bg-crm-purple/10 text-crm-purple border-crm-purple/20',
  'Commissariat aux comptes': 'bg-crm-amber/10 text-crm-amber border-crm-amber/20',
}

function SectorBadge({ sector }: { sector: string }) {
  const cls = sectorColors[sector] ?? 'bg-crm-line text-crm-muted border-crm-line'
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border font-crm ${cls}`}>
      {sector}
    </span>
  )
}

export default function CompaniesView() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [contactCounts, setContactCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    Promise.all([getCompanies(), getContacts()]).then(([cos, cts]) => {
      setCompanies(cos)
      const counts: Record<string, number> = {}
      cts.forEach((ct) => {
        counts[ct.companyId] = (counts[ct.companyId] ?? 0) + 1
      })
      setContactCounts(counts)
    })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-crm-muted text-sm font-crm">
          {companies.length} cabinet{companies.length > 1 ? 's' : ''}
        </p>
      </div>

      {companies.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden border border-crm-line rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-crm-line bg-crm-surface/60">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  Cabinet
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  SIREN
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  Secteur
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp size={12} /> MRR
                  </span>
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                  Contacts
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-crm-line/50 last:border-0 hover:bg-crm-surface/60 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-crm-blue/10 border border-crm-blue/20 flex items-center justify-center shrink-0">
                        <Building2 size={14} className="text-crm-blue" />
                      </div>
                      <div>
                        <p className="font-semibold text-crm-primary font-crm leading-none">
                          {company.name}
                        </p>
                        <p className="font-crm-mono text-[11px] text-crm-muted/60 mt-0.5">
                          #{company.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-crm-mono text-sm text-crm-muted">
                    {company.siren}
                  </td>
                  <td className="px-5 py-4">
                    <SectorBadge sector={company.sector} />
                  </td>
                  <td className="px-5 py-4 font-crm-mono text-sm font-bold text-crm-green">
                    {company.mrr.toLocaleString('fr-FR')} €/m
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-crm-line text-crm-muted text-xs font-crm-mono">
                      {contactCounts[company.id] ?? 0}
                    </span>
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
