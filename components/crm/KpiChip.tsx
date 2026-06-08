'use client'

type Accent = 'green' | 'amber' | 'blue' | 'purple'

interface KpiChipProps {
  label: string
  value: string | number
  suffix?: string
  accent?: Accent
}

const accentClass: Record<Accent, string> = {
  green: 'text-crm-green',
  amber: 'text-crm-amber',
  blue: 'text-crm-blue',
  purple: 'text-crm-purple',
}

export default function KpiChip({ label, value, suffix, accent = 'blue' }: KpiChipProps) {
  return (
    <div className="flex flex-col gap-1.5 bg-crm-surface border border-crm-line rounded-xl px-5 py-4 min-w-[170px] flex-1">
      <span className="text-[10px] font-semibold text-crm-muted uppercase tracking-widest font-crm">
        {label}
      </span>
      <span className={`font-crm-mono text-2xl font-bold leading-none ${accentClass[accent]}`}>
        {value}
        {suffix && (
          <span className="text-sm font-normal ml-1 text-crm-muted">{suffix}</span>
        )}
      </span>
    </div>
  )
}
