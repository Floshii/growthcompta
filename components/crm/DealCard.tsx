'use client'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { Deal, Stage } from '@/services/crm/mockData'

interface DealCardProps {
  deal: Deal
  companyName: string
  contactName: string
  /** Rendu dans DragOverlay — pas de hook draggable, juste le visuel */
  overlay?: boolean
}

const stageAccent: Record<Stage, string> = {
  prospect: 'bg-crm-blue',
  qualifié: 'bg-crm-purple',
  proposition: 'bg-crm-amber',
  négociation: 'bg-crm-red',
  signé: 'bg-crm-green',
}

function CardBody({ deal, companyName, contactName }: Omit<DealCardProps, 'overlay'>) {
  const lastActivity = new Date(deal.lastActivityAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })

  return (
    <>
      {/* Bande colorée selon le stage */}
      <div
        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${stageAccent[deal.stage]}`}
      />
      <div className="flex-1 min-w-0 pl-1">
        <p className="text-sm font-semibold text-crm-primary leading-snug truncate font-crm">
          {deal.title}
        </p>
        <p className="text-xs text-crm-muted mt-0.5 truncate font-crm">{companyName}</p>
        <p className="text-[11px] text-crm-muted/60 truncate font-crm">{contactName}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-crm-mono text-sm font-bold text-crm-green">
            {deal.mrr.toLocaleString('fr-FR')} €/m
          </span>
          <span className="text-[11px] text-crm-muted font-crm">{lastActivity}</span>
        </div>
      </div>
    </>
  )
}

export default function DealCard({ deal, companyName, contactName, overlay }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
    data: { deal },
    disabled: overlay,
  })

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        'relative flex gap-3 bg-crm-surface border border-crm-line rounded-xl p-4 select-none',
        'transition-all duration-150 group',
        isDragging ? 'opacity-30 scale-[0.98]' : 'hover:border-crm-blue/30 hover:shadow-lg hover:shadow-black/20',
        overlay ? 'shadow-2xl border-crm-blue/40 cursor-grabbing' : 'cursor-grab active:cursor-grabbing',
      ].join(' ')}
    >
      {/* Poignée de drag */}
      {!overlay && (
        <div
          {...attributes}
          {...listeners}
          className="flex items-start pt-0.5 opacity-0 group-hover:opacity-30 transition-opacity cursor-grab shrink-0"
        >
          <GripVertical size={14} className="text-crm-muted" />
        </div>
      )}
      <CardBody deal={deal} companyName={companyName} contactName={contactName} />
    </div>
  )
}
