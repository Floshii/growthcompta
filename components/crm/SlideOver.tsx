'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Deal, Stage, Owner } from '@/services/crm/mockData'
import { STAGES, OWNERS, OWNER_COLORS } from '@/services/crm/mockData'
import { newDealId } from '@/services/crm/format'

interface SlideOverProps {
  open: boolean
  deal: Deal | null
  isMobile: boolean
  onClose: () => void
  onSave: (deal: Deal) => void
  onDelete: (id: string) => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-crm-muted font-crm">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputCls = [
  'h-[38px] px-3 rounded-[9px] w-full',
  'bg-crm-base border border-crm-line text-crm-primary text-[14px] font-crm',
  'outline-none focus:border-crm-blue/60 transition-colors placeholder:text-crm-muted/50',
].join(' ')

function blank(owners: Owner[]): Deal {
  return {
    id: '',
    company: '',
    contact: '',
    sector: '',
    mrr: 0,
    stage: 'prospect',
    owner: owners[0],
    last: new Date().toISOString().split('T')[0],
  }
}

export default function SlideOver({ open, deal, isMobile, onClose, onSave, onDelete }: SlideOverProps) {
  const isEdit = Boolean(deal?.id)
  const [form, setForm] = useState<Deal>(() => blank(OWNERS))
  const [mrrInput, setMrrInput] = useState('')

  useEffect(() => {
    if (open) {
      if (deal) {
        setForm(deal)
        setMrrInput(String(deal.mrr))
      } else {
        const b = blank(OWNERS)
        setForm(b)
        setMrrInput('')
      }
    }
  }, [open, deal])

  function set<K extends keyof Deal>(k: K, v: Deal[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function submit() {
    if (!form.company.trim()) return
    onSave({
      ...form,
      mrr: parseInt(mrrInput, 10) || 0,
      id: form.id || newDealId(),
    })
  }

  // Fermeture au clavier
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Voile */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity duration-200"
        style={{
          background: 'rgba(4,4,8,0.6)',
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      />

      {/* Panneau */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-crm-surface border-l border-crm-line"
        style={{
          width: isMobile ? '100vw' : 400,
          maxWidth: '100vw',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 260ms cubic-bezier(.2,.8,.2,1)',
          boxShadow: '-24px 0 60px -20px rgba(0,0,0,0.7)',
        }}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-crm-line shrink-0">
          <div>
            <div className="text-[15px] font-bold text-crm-primary font-crm">
              {isEdit ? 'Modifier le deal' : 'Nouveau deal'}
            </div>
            {isEdit && (
              <div className="font-crm-mono text-[11.5px] text-crm-muted mt-[2px]">{form.id}</div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-[8px] border border-crm-line bg-crm-base text-crm-muted grid place-items-center hover:text-crm-primary transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Formulaire */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          <Field label="Entreprise">
            <input
              className={inputCls}
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              placeholder="Boulangerie Lefèvre"
              autoFocus
            />
          </Field>
          <Field label="Contact">
            <input
              className={inputCls}
              value={form.contact}
              onChange={(e) => set('contact', e.target.value)}
              placeholder="Camille Lefèvre"
            />
          </Field>
          <Field label="Secteur">
            <input
              className={inputCls}
              value={form.sector}
              onChange={(e) => set('sector', e.target.value)}
              placeholder="Artisan / Commerce"
            />
          </Field>
          <Field label="MRR mensuel (€)">
            <input
              className={`${inputCls} font-crm-mono`}
              type="number"
              value={mrrInput}
              onChange={(e) => setMrrInput(e.target.value)}
              placeholder="890"
            />
          </Field>

          {/* Sélecteur d'étape */}
          <Field label="Étape">
            <div className="grid grid-cols-2 gap-[7px]">
              {STAGES.map((s) => {
                const active = form.stage === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => set('stage', s.id as Stage)}
                    className="flex items-center gap-[7px] h-[34px] px-[10px] rounded-[8px] text-[12.5px] font-crm transition-all duration-100 cursor-pointer"
                    style={{
                      color: active ? s.color : '#6B6B80',
                      background: active ? s.color + '1A' : '#0A0A0F',
                      border: `1px solid ${active ? s.color + '66' : '#1E1E2E'}`,
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    <span
                      className="w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: s.color }}
                    />
                    {s.label}
                  </button>
                )
              })}
            </div>
          </Field>

          {/* Sélecteur responsable */}
          <Field label="Responsable">
            <div className="flex gap-2">
              {OWNERS.map((o) => {
                const active = form.owner === o
                const color = OWNER_COLORS[o]
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => set('owner', o as Owner)}
                    className="w-[38px] h-[38px] rounded-[9px] font-crm-mono text-[12px] font-semibold transition-all duration-100 cursor-pointer"
                    style={{
                      color,
                      background: active ? color + '26' : '#0A0A0F',
                      border: `1px solid ${active ? color : '#1E1E2E'}`,
                    }}
                  >
                    {o}
                  </button>
                )
              })}
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-[10px] px-5 py-4 border-t border-crm-line shrink-0">
          {isEdit && (
            <button
              type="button"
              onClick={() => onDelete(form.id)}
              className="h-[38px] px-[14px] rounded-[9px] bg-transparent border border-crm-line text-crm-red text-[13px] font-medium font-crm hover:border-crm-red/40 transition-colors cursor-pointer"
            >
              Supprimer
            </button>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] px-4 rounded-[9px] bg-crm-base border border-crm-line text-crm-primary text-[13px] font-medium font-crm hover:bg-crm-line/50 transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={submit}
            className="gc-cta h-[38px] px-[18px] rounded-[9px] border-none text-[13px] font-bold font-crm cursor-pointer"
            style={{ background: '#22C55E', color: '#04130A' }}
          >
            {isEdit ? 'Enregistrer' : 'Créer le deal'}
          </button>
        </div>
      </aside>
    </>
  )
}
