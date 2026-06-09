'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, Users, FileText, Activity } from 'lucide-react'
import { getActivities } from '@/services/crm/activities'
import { getDeals } from '@/services/crm/deals'
import type { Activity as ActivityType, ActivityType as AType } from '@/services/crm/mockData'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-crm-surface border border-crm-line grid place-items-center">
        <Activity size={28} className="text-crm-muted/40" />
      </div>
      <div>
        <p className="text-crm-primary font-semibold font-crm">Aucune activité</p>
        <p className="text-crm-muted text-sm font-crm mt-1">Les interactions seront listées ici.</p>
      </div>
    </div>
  )
}

const activityMeta: Record<AType, { icon: typeof Phone; label: string; color: string; bg: string }> = {
  appel:   { icon: Phone,    label: 'Appel',   color: '#3B82F6', bg: '#3B82F610 border-[#3B82F620]' },
  email:   { icon: Mail,     label: 'Email',   color: '#8B5CF6', bg: '#8B5CF610 border-[#8B5CF620]' },
  réunion: { icon: Users,    label: 'Réunion', color: '#22C55E', bg: '#22C55E10 border-[#22C55E20]' },
  note:    { icon: FileText, label: 'Note',    color: '#F59E0B', bg: '#F59E0B10 border-[#F59E0B20]' },
}

export default function ActivityView() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [dealMap, setDealMap] = useState<Record<string, string>>({})

  useEffect(() => {
    Promise.all([getActivities(), getDeals()]).then(([acts, dls]) => {
      setActivities(acts)
      setDealMap(Object.fromEntries(dls.map((d) => [d.id, d.company])))
    })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <p className="text-crm-muted text-sm font-crm">
        {activities.length} activité{activities.length > 1 ? 's' : ''}
      </p>

      {activities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {activities.map((a) => {
            const meta = activityMeta[a.type]
            const Icon = meta.icon
            const date = new Date(a.date).toLocaleDateString('fr-FR', {
              weekday: 'short', day: 'numeric', month: 'short',
            })

            return (
              <div
                key={a.id}
                className="flex gap-4 bg-crm-surface border border-crm-line rounded-xl p-4 hover:bg-crm-surface2 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-xl border grid place-items-center shrink-0"
                  style={{ background: meta.color + '10', borderColor: meta.color + '20' }}
                >
                  <Icon size={15} style={{ color: meta.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider font-crm" style={{ color: meta.color }}>
                        {meta.label}
                      </span>
                      <span className="text-crm-muted text-xs">·</span>
                      <span className="text-crm-muted text-xs font-crm truncate">{a.contact}</span>
                    </div>
                    <span className="text-crm-muted text-[11px] font-crm-mono shrink-0">{date}</span>
                  </div>
                  <p className="text-crm-primary text-sm font-crm mt-1 leading-relaxed">{a.note}</p>
                  {a.dealId && (
                    <p className="text-crm-muted text-[11px] font-crm mt-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-crm-muted/40 inline-block" />
                      {dealMap[a.dealId] ?? a.dealId}
                      <span className="font-crm-mono ml-1">{a.dealId}</span>
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
