'use client'
import { useCallback, useState } from 'react'
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
import type { Deal, Stage, StageConfig } from '@/services/crm/mockData'
import { STAGES } from '@/services/crm/mockData'
import { fmtEUR, fmtEURk } from '@/services/crm/format'
import KpiChip from './KpiChip'
import DealCard from './DealCard'
import Toast from './Toast'

interface PipelineViewProps {
  deals: Deal[]
  onMoveDeal: (id: string, stage: Stage) => void
  onOpenDeal: (deal: Deal) => void
  onNewDeal: () => void
  isMobile: boolean
}

// ── Colonne kanban ────────────────────────────────
function KanbanColumn({
  stage,
  deals,
  onOpen,
  onDrop,
  onNew,
  dragId,
  setDragId,
  isMobile,
}: {
  stage: StageConfig
  deals: Deal[]
  onOpen: (d: Deal) => void
  onDrop: (stageId: Stage) => void
  onNew: () => void
  dragId: string | null
  setDragId: (id: string | null) => void
  isMobile: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })
  const [colHover, setColHover] = useState(false)
  const total = deals.reduce((s, d) => s + d.mrr, 0)
  const colW = isMobile ? 252 : 286

  return (
    <div style={{ width: colW, flexShrink: 0 }} className="flex flex-col gap-3">
      {/* En-tête de colonne — carte tintée */}
      <div
        className="flex flex-col gap-[9px] p-[12px_14px] rounded-[12px] bg-crm-surface border border-crm-line"
        style={{ borderTop: `2px solid ${stage.color}` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-[7px] h-[7px] rounded-full shrink-0"
            style={{ background: stage.color, boxShadow: `0 0 8px ${stage.color}` }}
          />
          <span className="text-[13px] font-bold text-crm-primary tracking-[0.01em] font-crm">
            {stage.label}
          </span>
          <span
            className="font-crm-mono text-[11px] font-semibold text-crm-muted bg-crm-base border border-crm-line rounded-[5px] px-1.5 py-px"
          >
            {deals.length}
          </span>
          <div className="flex-1" />
          <button
            onClick={onNew}
            title="Ajouter un deal"
            className="w-6 h-6 rounded-[7px] grid place-items-center bg-transparent border border-crm-line text-crm-muted hover:text-crm-primary hover:bg-crm-line/40 transition-colors cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v10M3 8h10"/>
            </svg>
          </button>
        </div>

        {/* MRR total de la colonne */}
        <div className="flex items-baseline gap-[3px]">
          <span
            className="font-crm-mono text-[22px] font-bold tracking-[-0.03em] leading-none"
            style={{
              color: stage.color,
              textShadow: `0 0 18px ${stage.color}24`,
            }}
          >
            {fmtEURk(total)}
          </span>
          <span className="text-[11px] text-crm-muted font-crm-mono">/mo</span>
        </div>

        {/* Hint humain */}
        <p className="text-[11px] text-crm-muted font-crm leading-[1.3]">{stage.hint}</p>
      </div>

      {/* Zone de dépôt */}
      <div
        ref={setNodeRef}
        onMouseEnter={() => setColHover(true)}
        onMouseLeave={() => setColHover(false)}
        className="flex flex-col gap-[10px] flex-1 p-[6px] rounded-[13px] min-h-[140px] transition-all duration-120"
        style={{
          background: isOver ? stage.color + '0E' : 'transparent',
          boxShadow: isOver ? `inset 0 0 0 1.5px ${stage.color}66` : 'inset 0 0 0 1px transparent',
        }}
      >
        {deals.length === 0 ? (
          <ColumnEmpty color={stage.color} label={stage.label} onNew={onNew} />
        ) : (
          deals.map((d) => (
            <DealCard
              key={d.id}
              deal={d}
              stageColor={stage.color}
              onOpen={onOpen}
            />
          ))
        )}
      </div>
    </div>
  )
}

// ── État vide par colonne ─────────────────────────
function ColumnEmpty({ color, label, onNew }: { color: string; label: string; onNew: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-4 py-[26px] text-center rounded-[12px]"
      style={{ border: `1px dashed ${color}33`, background: color + '08' }}
    >
      <div
        className="w-[34px] h-[34px] rounded-[10px] grid place-items-center"
        style={{ color, background: color + '18', border: `1px solid ${color}30` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M8 3.5v9M3.5 8h9"/>
        </svg>
      </div>
      <p className="text-[12.5px] text-crm-muted font-crm max-w-[168px] leading-[1.45]">
        Rien en{' '}
        <span className="font-semibold" style={{ color }}>{label}</span>
        {' '}pour l'instant.{'\n'}Glissez une carte ou ajoutez-en une.
      </p>
      <button
        onClick={onNew}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-[8px] text-[12.5px] font-semibold font-crm transition-all duration-120 cursor-pointer"
        style={{
          color,
          background: hover ? color + '22' : color + '12',
          border: `1px solid ${color + (hover ? '55' : '33')}`,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v10M3 8h10"/>
        </svg>
        Ajouter un deal
      </button>
    </div>
  )
}

// ── Vue principale ────────────────────────────────
export default function PipelineView({ deals, onMoveDeal, onOpenDeal, onNewDeal, isMobile }: PipelineViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as string)
    setDragId(e.active.id as string)
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    setActiveId(null)
    setDragId(null)
    if (!over || active.id === over.id) return
    const newStage = over.id as Stage
    const stageLabel = STAGES.find((s) => s.id === newStage)?.label ?? newStage
    onMoveDeal(active.id as string, newStage)
    setToast(`Deal déplacé → ${stageLabel}`)
  }

  const dismissToast = useCallback(() => setToast(null), [])

  // KPIs
  const enCours = deals.filter((d) => d.stage !== 'signe')
  const signe = deals.filter((d) => d.stage === 'signe')
  const pipelineMrr = enCours.reduce((s, d) => s + d.mrr, 0)
  const signeMrr = signe.reduce((s, d) => s + d.mrr, 0)
  const conv = deals.length ? Math.round((signe.length / deals.length) * 100) : 0

  const activeDeal = deals.find((d) => d.id === activeId) ?? null
  const activeStageColor = activeDeal
    ? (STAGES.find((s) => s.id === activeDeal.stage)?.color ?? '#3B82F6')
    : '#3B82F6'

  return (
    <div className="flex flex-col gap-[18px] h-full overflow-hidden">
      {/* Barre de KPIs — grille avec séparateurs */}
      <div
        className="grid rounded-[14px] overflow-hidden border border-crm-line shrink-0"
        style={{
          gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
          gap: 1,
          background: '#1E1E2E', // gap color = border = hairlines
        }}
      >
        <KpiChip label="Pipeline MRR"        target={pipelineMrr} format={fmtEUR} accent="#F0F0F5" delta={12} big />
        <KpiChip label="Deals en cours"      target={enCours.length} accent="#3B82F6" delta={null} />
        <KpiChip label="Taux de conversion"  target={conv} accent="#8B5CF6" suffix="%" delta={4} />
        <KpiChip label="MRR signé · juin"    target={signeMrr} format={fmtEUR} accent="#22C55E" delta={9} />
      </div>

      {/* Kanban */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-[18px] overflow-x-auto overflow-y-hidden flex-1 pb-2">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              deals={deals.filter((d) => d.stage === stage.id)}
              isMobile={isMobile}
              onOpen={onOpenDeal}
              onDrop={(sid) => onMoveDeal(dragId ?? '', sid)}
              onNew={onNewDeal}
              dragId={dragId}
              setDragId={setDragId}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal && (
            <DealCard
              deal={activeDeal}
              stageColor={activeStageColor}
              onOpen={() => {}}
              overlay
            />
          )}
        </DragOverlay>
      </DndContext>

      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </div>
  )
}
