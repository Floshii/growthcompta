'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, Users, FileText, Activity } from 'lucide-react'
import { getActivities } from '@/services/crm/activities'
import { getContacts } from '@/services/crm/contacts'
import { getDeals } from '@/services/crm/deals'
import type { Activity as ActivityType, ActivityType as AType } from '@/services/crm/mockData'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-crm-surface border border-crm-line flex items-center justify-center">
        <Activity size={28} className="text-crm-muted/40" />
      </div>
      <div>
        <p className="text-crm-primary font-semibold font-crm">Aucune activité</p>
        <p className="text-crm-muted text-sm font-crm mt-1">
          Les interactions avec vos contacts seront listées ici.
        </p>
      </div>
    </div>
  )
}

const activityMeta: Record<AType, { icon: typeof Phone; label: string; color: string; bg: string }> = {
  appel:   { icon: Phone,    label: 'Appel',   color: 'text-crm-blue',   bg: 'bg-crm-blue/10 border-crm-blue/20' },
  email:   { icon: Mail,     label: 'Email',   color: 'text-crm-purple', bg: 'bg-crm-purple/10 border-crm-purple/20' },
  réunion: { icon: Users,    label: 'Réunion', color: 'text-crm-green',  bg: 'bg-crm-green/10 border-crm-green/20' },
  note:    { icon: FileText, label: 'Note',    color: 'text-crm-amber',  bg: 'bg-crm-amber/10 border-crm-amber/20' },
}

export default function ActivityView() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [contactMap, setContactMap] = useState<Record<string, string>>({})
  const [dealMap, setDealMap] = useState<Record<string, string>>({})

  useEffect(() => {
    Promise.all([getActivities(), getContacts(), getDeals()]).then(([acts, cts, dls]) => {
      setActivities(acts.sort((a, b) => b.date.localeCompare(a.date)))
      setContactMap(Object.fromEntries(cts.map((c) => [c.id, `${c.firstName} ${c.lastName}`])))
      setDealMap(Object.fromEntries(dls.map((d) => [d.id, d.title])))
    })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-crm-muted text-sm font-crm">
          {activities.length} activité{activities.length > 1 ? 's' : ''}
        </p>
      </div>

      {activities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {activities.map((activity) => {
            const meta = activityMeta[activity.type]
            const Icon = meta.icon
            const date = new Date(activity.date).toLocaleDateString('fr-FR', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })

            return (
              <div
                key={activity.id}
                className="flex gap-4 bg-crm-surface border border-crm-line rounded-xl p-4 hover:border-crm-line/80 transition-colors"
              >
                {/* Icône type */}
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${meta.bg}`}
                >
                  <Icon size={15} className={meta.color} />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider font-crm ${meta.color}`}
                      >
                        {meta.label}
                      </span>
                      <span className="text-crm-muted text-xs font-crm">·</span>
                      <span className="text-crm-muted text-xs font-crm truncate">
                        {contactMap[activity.contactId] ?? '—'}
                      </span>
                    </div>
                    <span className="text-crm-muted text-[11px] font-crm-mono shrink-0">
                      {date}
                    </span>
                  </div>

                  <p className="text-crm-primary text-sm font-crm mt-1 leading-relaxed">
                    {activity.note}
                  </p>

                  {activity.dealId && (
                    <p className="text-crm-muted text-[11px] font-crm mt-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-crm-muted/40 inline-block" />
                      {dealMap[activity.dealId] ?? activity.dealId}
                    </p>
                  )}
                </div>

                {/* ID */}
                <span className="font-crm-mono text-[10px] text-crm-muted/30 shrink-0 self-end">
                  #{activity.id}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
