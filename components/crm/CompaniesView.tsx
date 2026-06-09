'use client'
import { useState, useEffect } from 'react'
import { Building2 } from 'lucide-react'
import { getCompanies, type Company } from '@/services/crm/companies'
import { OWNER_COLORS, type Owner } from '@/services/crm/mockData'
import { fmtEUR } from '@/services/crm/format'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-crm-surface border border-crm-line grid place-items-center">
        <Building2 size={28} className="text-crm-muted/40" />
      </div>
      <div>
        <p className="text-crm-primary font-semibold font-crm">Aucune entreprise</p>
        <p className="text-crm-muted text-sm font-crm mt-1">Vos clients apparaîtront ici.</p>
      </div>
    </div>
  )
}

const SECTOR_COLORS: Record<string, string> = {
  'Logiciel / SaaS':       '#3B82F6',
  'Santé':                 '#22C55E',
  'Santé animale':         '#22C55E',
  'Profession libérale':   '#8B5CF6',
  'Immobilier':            '#F59E0B',
  'Agroalimentaire':       '#F97316',
  'Architecture':          '#8B5CF6',
  'Artisan / Commerce':    '#F59E0B',
  'BTP / Artisanat':       '#F97316',
  'Design / Studio':       '#8B5CF6',
  'Négoce / Vin':          '#22C55E',
}

function getSectorColor(sector: string): string {
  return SECTOR_COLORS[sector] ?? '#6B6B80'
}

export default function CompaniesView() {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    getCompanies().then(setCompanies)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <p className="text-crm-muted text-sm font-crm">
        {companies.length} entreprise{companies.length > 1 ? 's' : ''}
      </p>

      {companies.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden border border-crm-line rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-crm-line bg-crm-surface/60">
                {['Entreprise', 'Secteur', 'MRR total', 'Deals', 'Équipe'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-crm-muted uppercase tracking-wider font-crm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => {
                const sc = getSectorColor(c.sector)
                return (
                  <tr key={c.name} className="border-b border-crm-line/50 last:border-0 hover:bg-crm-surface/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-crm-blue/10 border border-crm-blue/20 grid place-items-center shrink-0">
                          <Building2 size={14} className="text-crm-blue" />
                        </div>
                        <p className="font-semibold text-crm-primary font-crm">{c.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex px-2 py-0.5 rounded-[5px] text-[11px] font-medium font-crm border"
                        style={{ color: sc, background: sc + '18', borderColor: sc + '26' }}
                      >
                        {c.sector}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-crm-mono text-sm font-bold text-crm-green">
                      {fmtEUR(c.totalMrr)}/m
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-crm-line text-crm-muted text-xs font-crm-mono">
                        {c.dealCount}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {c.owners.map((o) => {
                          const color = OWNER_COLORS[o as Owner] ?? '#6B6B80'
                          return (
                            <span
                              key={o}
                              title={o}
                              className="inline-flex items-center justify-center w-6 h-6 rounded-[5px] font-crm-mono text-[9px] font-bold"
                              style={{ background: color + '22', color, boxShadow: `inset 0 0 0 1px ${color}33` }}
                            >
                              {o}
                            </span>
                          )
                        })}
                      </div>
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
