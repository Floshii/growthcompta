'use client'
import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Deal, Owner } from '@/services/crm/mockData'
import { OWNER_COLORS } from '@/services/crm/mockData'
import { fmtEUR, relDate } from '@/services/crm/format'

interface DealCardProps {
  deal: Deal
  stageColor: string
  onOpen: (deal: Deal) => void
  overlay?: boolean
}

function OwnerAvatar({ owner }: { owner: Owner }) {
  const color = OWNER_COLORS[owner]
  return (
    <div
      title={owner}
      className="w-[22px] h-[22px] rounded-[6px] shrink-0 grid place-items-center font-crm-mono text-[9px] font-bold"
      style={{ background: color + '26', color, boxShadow: `inset 0 0 0 1px ${color}33` }}
    >
      {owner}
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="6" cy="6" r="4.4"/>
      <path d="M6 3.6V6l1.6 1"/>
    </svg>
  )
}

export default function DealCard({ deal, stageColor, onOpen, overlay }: DealCardProps) {
  const [hover, setHover] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
    data: { deal },
    disabled: overlay,
  })

  const glowAmt = 0.55
  const boxShadow = isDragging
    ? `0 18px 40px -10px rgba(0,0,0,0.7), 0 0 0 1px ${stageColor}`
    : hover
    ? `0 10px 26px -12px rgba(0,0,0,0.6), 0 0 ${Math.round(26 * glowAmt)}px -6px ${stageColor}88`
    : 'var(--gc-shadow-card)'

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      {...(overlay ? {} : { ...attributes, ...listeners })}
      style={{
        transform: overlay ? undefined : CSS.Translate.toString(transform),
        boxShadow,
        borderColor: hover ? stageColor + '66' : 'var(--gc-border)',
        opacity: isDragging ? 0.3 : 1,
      }}
      className={[
        'relative cursor-grab active:cursor-grabbing select-none',
        'bg-crm-surface2 border rounded-[11px]',
        'px-4 py-[13px] flex flex-col gap-[9px]',
        'transition-[transform,box-shadow,border-color] duration-[140ms]',
        hover && !isDragging ? '-translate-y-[3px]' : '',
      ].filter(Boolean).join(' ')}
      onClick={() => !overlay && !isDragging && onOpen(deal)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Bande colorée gauche */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[11px] transition-shadow duration-[140ms]"
        style={{
          background: stageColor,
          boxShadow: hover ? `0 0 10px ${stageColor}` : 'none',
        }}
      />

      {/* Ligne haute: company + owner */}
      <div className="flex justify-between items-start gap-2 pl-0.5">
        <div className="min-w-0">
          <div className="text-[13.5px] font-semibold text-crm-primary tracking-[-0.01em] truncate leading-tight font-crm">
            {deal.company}
          </div>
          <div className="text-[12px] text-crm-muted mt-[2px] font-crm truncate">
            {deal.contact}
          </div>
        </div>
        <OwnerAvatar owner={deal.owner} />
      </div>

      {/* Ligne basse: MRR + date */}
      <div className="flex justify-between items-center pt-[1px] pl-0.5">
        <span className="font-crm-mono font-bold text-[17px] tracking-[-0.02em] text-crm-green leading-none">
          {fmtEUR(deal.mrr)}
          <span className="text-[10px] font-medium text-crm-muted ml-[2px]">/mo</span>
        </span>
        <span className="flex items-center gap-[5px] text-[11.5px] text-crm-muted font-crm">
          <ClockIcon />
          {relDate(deal.last)}
        </span>
      </div>
    </div>
  )
}
