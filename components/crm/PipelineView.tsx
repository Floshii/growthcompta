'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core'
import { getDeals, updateDealStage } from '@/services/crm/deals'
import { getCompanies } from '@/services/crm/companies'
import { getContacts } from '@/services/crm/contacts'
import { type Deal, type Company, type Contact, type Stage, STAGES } from '@/services/crm/mockData'
import KpiChip from './KpiChip'
import DealCard from './DealCard'
import Toast from './Toast'

// ── Couleurs par stage ─────────────────────────────
const stageMeta: Record<Stage, { label: string; text: string; dot: string }> = {
  prospect:    { label: 'Prospect',    text: 'text-crm-blue',   dot: 'bg-crm-blue' },
  qualifié:    { label: 'Qualifié',    text: 'text-crm-purple', dot: 'bg-crm-purple' },
  proposition: { label: 'Proposition', text: 'text-crm-amber',  dot: 'bg-crm-amber' },
  négociation: { label: 'Négociation', text: 'text-crm-red',    dot: 'bg-crm-red' },
  signé:       { label: 'Signé',       text: 'text-crm-green',  dot: 'bg-crm-green' },
}

// ── Colonne Kanban ─────────────────────────────────
function KanbanColumn({
  stage,
  deals,
  companies,
  contacts,
}: {
  stage: Stage
  deals: Deal[]
  companies: Company[]
  contacts: Contact[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const meta = stageMeta[stage]
  const totalMrr = deals.reduce((s, d) => s + d.mrr, 0)

  const companyMap = Object.fromEntries(companies.map((c) => [c.id, c.name]))
  const contactMap = Object.fromEntries(
    contacts.map((c) => [c.id, `${c.firstName} ${c.lastName}`]),
  )

  return (
    <div
      ref={setNodeRef}
      className={[
        'flex flex-col gap-3 min-w-[260px] w-[260px] shrink-0',
        'bg-crm-surface/40 border rounded-2xl p-3 transition-all duration-150',
        isOver ? 'border-crm-blue/50 bg-crm-blue/5' : 'border-crm-line',
      ].join(' ')}
    >
      {/* En-tête de colonne */}
      <div className="flex items-center justify-between px-1 pb-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${meta.dot}`} />
          <span className={`text-xs font-bold uppercase tracking-wider font-crm ${meta.text}`}>
            {meta.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-crm-muted font-crm-mono">
            {totalMrr.toLocaleString('fr-FR')} €
          </span>
          <span className="text-[11px] bg-crm-line text-crm-muted px-1.5 py-0.5 rounded-full font-crm">
            {deals.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5 min-h-[80px]">
        {deals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-crm-muted/40 text-xs font-crm gap-1">
            <div className="w-8 h-8 rounded-full border border-dashed border-crm-muted/20 flex items-center justify-center">
              <span className="text-lg leading-none">·</span>
            </div>
            Aucun deal
          </div>
        )}
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            companyName={companyMap[deal.companyId] ?? '—'}
            contactName={contactMap[deal.contactId] ?? '—'}
          />
        ))}
      </div>
    </div>
  )
}

// ── Vue Pipeline ───────────────────────────────────
export default function PipelineView() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([getDeals(), getCompanies(), getContacts()]).then(([d, co, ct]) => {
      setDeals(d)
      setCompanies(co)
      setContacts(ct)
    })
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const newStage = over.id as Stage
    const dealId = active.id as string

    // Mise à jour optimiste
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d)),
    )
    setToast(`Deal déplacé → ${stageMeta[newStage].label}`)

    await updateDealStage(dealId, newStage)
  }

  const dismissToast = useCallback(() => setToast(null), [])

  // KPIs
  const totalMrr = deals.reduce((s, d) => s + d.mrr, 0)
  const activeDeals = deals.filter((d) => d.stage !== 'signé').length
  const signedDeals = deals.filter((d) => d.stage === 'signé')
  const tauxSigne = deals.length > 0 ? Math.round((signedDeals.length / deals.length) * 100) : 0
  const mrrSigne = signedDeals.reduce((s, d) => s + d.mrr, 0)

  const activeDeal = deals.find((d) => d.id === activeId) ?? null
  const companyMap = Object.fromEntries(companies.map((c) => [c.id, c.name]))
  const contactMap = Object.fromEntries(
    contacts.map((c) => [c.id, `${c.firstName} ${c.lastName}`]),
  )

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Barre de KPIs */}
      <div className="flex gap-3 flex-wrap">
        <KpiChip
          label="Total Pipeline"
          value={totalMrr.toLocaleString('fr-FR')}
          suffix="€/m"
          accent="blue"
        />
        <KpiChip label="Deals actifs" value={activeDeals} accent="purple" />
        <KpiChip label="Taux signé" value={tauxSigne} suffix="%" accent="green" />
        <KpiChip
          label="MRR signé"
          value={mrrSigne.toLocaleString('fr-FR')}
          suffix="€/m"
          accent="amber"
        />
      </div>

      {/* Kanban */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              deals={deals.filter((d) => d.stage === stage)}
              companies={companies}
              contacts={contacts}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal && (
            <DealCard
              deal={activeDeal}
              companyName={companyMap[activeDeal.companyId] ?? '—'}
              contactName={contactMap[activeDeal.contactId] ?? '—'}
              overlay
            />
          )}
        </DragOverlay>
      </DndContext>

      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </div>
  )
}
