'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { X, Search, Plus } from 'lucide-react'
import type { Deal, Stage } from '@/services/crm/mockData'
import { OWNER_COLORS } from '@/services/crm/mockData'
import { getDeals } from '@/services/crm/deals'
import PipelineView from './PipelineView'
import ContactsView from './ContactsView'
import CompaniesView from './CompaniesView'
import ActivityView from './ActivityView'
import SlideOver from './SlideOver'

type Tab = 'pipeline' | 'contacts' | 'companies' | 'activities'

const TODAY = new Date().toISOString().split('T')[0]

// ── Responsive hook ──────────────────────────────
function useViewport() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)
  useEffect(() => {
    function onResize() { setWidth(window.innerWidth) }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return { isMobile: width < 860, width }
}

// ── Logo GClients ────────────────────────────────
function GCLogo() {
  return (
    <div className="flex items-center gap-[9px]">
      <div
        className="w-[26px] h-[26px] rounded-[7px] grid place-items-center shrink-0"
        style={{
          background: 'linear-gradient(145deg, #22C55E, #16A34A)',
          boxShadow: '0 0 0 1px rgba(34,197,94,0.4), 0 4px 12px -2px rgba(34,197,94,0.45)',
        }}
      >
        <span className="font-crm-mono font-bold text-[14px] tracking-[-0.04em]" style={{ color: '#04130A' }}>
          G
        </span>
      </div>
      <span className="text-[16px] font-bold tracking-[-0.02em] text-crm-primary font-crm">GClients</span>
    </div>
  )
}

// ── Icônes nav (SVG inline) ──────────────────────
const IC = {
  contacts: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="5" r="2.4"/><path d="M3 13c0-2.5 2.2-4 5-4s5 1.5 5 4"/>
    </svg>
  ),
  companies: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="2.5" width="7" height="11" rx="1"/><path d="M10 6h3v7.5H10M5.5 5h2M5.5 7.5h2M5.5 10h2"/>
    </svg>
  ),
  pipeline: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="3" width="3" height="10" rx="1"/>
      <rect x="6.5" y="3" width="3" height="10" rx="1"/>
      <rect x="10.5" y="3" width="3" height="10" rx="1"/>
    </svg>
  ),
  activities: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 8h3l1.5-4 3 8L13 8h1"/>
    </svg>
  ),
  key: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3"/><path d="M8 8l5 5M11 11l1.5-1.5M9.5 9.5L11 11"/>
    </svg>
  ),
  menu: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2.5 4h11M2.5 8h11M2.5 12h11"/>
    </svg>
  ),
}

// ── Item de navigation ───────────────────────────
function NavItem({
  icon, label, active, badge, onClick,
}: { icon: React.ReactNode; label: string; active?: boolean; badge?: number | string; onClick?: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex items-center gap-[11px] w-full px-[10px] py-[8px] rounded-[8px] text-[13.5px] text-left transition-all duration-100 cursor-pointer border-0"
      style={{
        color: active ? 'var(--gc-text)' : hover ? 'var(--gc-text)' : 'var(--gc-muted)',
        background: active ? 'var(--gc-border)' : hover ? 'var(--gc-hover-bg)' : 'transparent',
        boxShadow: active ? 'inset 0 0 0 1px var(--gc-border)' : 'none',
        fontWeight: active ? 600 : 500,
        fontFamily: 'inherit',
      }}
    >
      {/* Indicateur actif */}
      {active && (
        <span
          className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-[3px] h-[16px] rounded-[2px]"
          style={{ background: '#F97316' }}
        />
      )}
      <span
        className="w-4 h-4 grid place-items-center shrink-0"
        style={{ color: active ? '#F97316' : 'currentColor' }}
      >
        {icon}
      </span>
      <span className="flex-1 font-crm">{label}</span>
      {badge != null && (
        <span className="font-crm-mono text-[11px] font-semibold text-crm-muted bg-crm-base border border-crm-line px-1.5 py-px rounded-[5px]">
          {badge}
        </span>
      )}
    </button>
  )
}

// ── Sidebar ──────────────────────────────────────
function Sidebar({
  activeTab, onTabChange, mobile, open, onClose, dealCount,
}: {
  activeTab: Tab
  onTabChange: (t: Tab) => void
  mobile: boolean
  open: boolean
  onClose: () => void
  dealCount: number
}) {
  const [apiVisible, setApiVisible] = useState(false)

  const aside = (
    <aside
      className="flex flex-col bg-crm-surface border-r border-crm-line"
      style={{
        width: 240,
        flexShrink: 0,
        padding: '18px 14px',
        ...(mobile ? {
          position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 51,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 240ms cubic-bezier(.2,.8,.2,1)',
          boxShadow: open ? '24px 0 60px -20px rgba(0,0,0,0.7)' : 'none',
        } : {}),
      }}
    >
      {/* Logo + close (mobile) */}
      <div className="flex items-center justify-between px-[6px] pb-[18px]">
        <GCLogo />
        {mobile && (
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] rounded-[7px] border border-crm-line bg-crm-base text-crm-muted grid place-items-center hover:text-crm-primary transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-[2px]">
        <NavItem icon={IC.contacts}   label="Contacts"    badge={dealCount}        active={activeTab === 'contacts'}   onClick={() => { onTabChange('contacts');   if (mobile) onClose() }} />
        <NavItem icon={IC.companies}  label="Entreprises" badge={Math.ceil(dealCount * 0.8)} active={activeTab === 'companies'}  onClick={() => { onTabChange('companies');  if (mobile) onClose() }} />
        <NavItem icon={IC.pipeline}   label="Pipeline"    badge={dealCount}        active={activeTab === 'pipeline'}   onClick={() => { onTabChange('pipeline');   if (mobile) onClose() }} />
        <NavItem icon={IC.activities} label="Activités"   badge={10}               active={activeTab === 'activities'} onClick={() => { onTabChange('activities'); if (mobile) onClose() }} />
      </nav>

      <div className="flex-1" />

      {/* Footer sidebar : clé API + avatar */}
      <div className="flex flex-col gap-2 pt-[14px] border-t border-crm-line">
        <NavItem icon={IC.key} label="Clé API" onClick={() => setApiVisible((v) => !v)} />
        {apiVisible && (
          <p className="font-crm-mono text-[10px] text-crm-muted/60 px-3 py-2 bg-crm-base border border-crm-line rounded-[8px] break-all crm-fade-in">
            gclients_live_sk_z9kQ2Xm7pLrN4vYa1Bw8eUhT3jR6sDf
          </p>
        )}
        <div className="flex items-center gap-[10px] px-2 py-[6px]">
          <div
            className="w-[30px] h-[30px] rounded-[8px] grid place-items-center text-[12px] font-bold font-crm-mono shrink-0"
            style={{ background: OWNER_COLORS.ML, color: '#fff' }}
          >
            ML
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-crm-primary font-crm truncate">Marie Lambert</p>
            <p className="text-[11px] text-crm-muted font-crm">Cabinet GrowthCompta</p>
          </div>
        </div>
      </div>
    </aside>
  )

  if (!mobile) return aside
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="crm-fade-in fixed inset-0 z-50"
          style={{ background: 'var(--gc-scrim)', backdropFilter: 'blur(2px)' }}
        />
      )}
      {aside}
    </>
  )
}

// ── Topbar ───────────────────────────────────────
function Topbar({
  activeTab, query, setQuery, onNewDeal, mobile, onMenu, theme, onToggleTheme,
}: {
  activeTab: Tab
  query: string
  setQuery: (q: string) => void
  onNewDeal: () => void
  mobile: boolean
  onMenu: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}) {
  const [focus, setFocus] = useState(false)

  const breadcrumbs: Record<Tab, string> = {
    pipeline: 'Tous les deals',
    contacts: 'Tous les contacts',
    companies: 'Toutes les entreprises',
    activities: 'Toutes les activités',
  }
  const sections: Record<Tab, string> = {
    pipeline: 'Pipeline', contacts: 'Contacts', companies: 'Entreprises', activities: 'Activités',
  }

  return (
    <header
      className="flex items-center bg-crm-base border-b border-crm-line shrink-0"
      style={{ height: 56, gap: mobile ? 10 : 16, padding: mobile ? '0 14px' : '0 22px' }}
    >
      {mobile && (
        <button
          onClick={onMenu}
          className="w-[34px] h-[34px] shrink-0 rounded-[9px] border border-crm-line bg-crm-surface text-crm-primary grid place-items-center"
        >
          {IC.menu}
        </button>
      )}
      {!mobile && (
        <div className="flex items-center gap-2 text-[13px] font-crm">
          <span className="text-crm-muted">{sections[activeTab]}</span>
          <span className="text-crm-line">/</span>
          <span className="text-crm-primary font-semibold">{breadcrumbs[activeTab]}</span>
        </div>
      )}

      <div className="flex-1" />

      {/* Recherche */}
      <div
        className="flex items-center gap-2 px-[11px] rounded-[9px] bg-crm-surface transition-colors"
        style={{
          width: mobile ? 'auto' : 280,
          flex: mobile ? 1 : 'none',
          height: 34,
          border: `1px solid ${focus ? '#3B82F6' : 'var(--gc-border)'}`,
        }}
      >
        <Search size={14} className="text-crm-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={mobile ? 'Rechercher…' : 'Rechercher un deal, client…'}
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-crm-primary text-[13px] font-crm placeholder:text-crm-muted/50"
        />
        {!mobile && (
          <kbd className="font-crm-mono text-[10.5px] text-crm-muted border border-crm-line rounded-[4px] px-[5px] py-px">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Toggle thème sombre / clair */}
      <button
        onClick={onToggleTheme}
        aria-label={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
        className="w-[34px] h-[34px] shrink-0 rounded-[9px] border border-crm-line bg-crm-surface text-crm-muted grid place-items-center transition-colors hover:text-crm-primary"
      >
        {theme === 'light' ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 9.5A5 5 0 0 1 6.5 3a5 5 0 1 0 6.5 6.5z"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="3"/>
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M13 3l-1 1M4 12l-1 1"/>
          </svg>
        )}
      </button>

      {/* Nouveau deal */}
      <button
        onClick={onNewDeal}
        className="gc-cta flex items-center justify-center gap-[7px] h-[34px] rounded-[9px] font-bold text-[13px] font-crm shrink-0"
        style={{
          width: mobile ? 34 : 'auto',
          padding: mobile ? 0 : '0 14px',
          background: '#22C55E',
          color: '#04130A',
          border: 'none',
        }}
        aria-label="Nouveau deal"
      >
        <Plus size={14} />
        {!mobile && 'Nouveau deal'}
      </button>
    </header>
  )
}

// ── App Shell principal ──────────────────────────
export default function AppShell() {
  const { isMobile } = useViewport()

  // État global
  const [allDeals, setAllDeals] = useState<Deal[]>([])
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('pipeline')
  const [navOpen, setNavOpen] = useState(false)
  const [soOpen, setSoOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  // Applique data-theme sur <html> pour que les CSS vars et Tailwind s'adaptent
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    return () => { document.documentElement.removeAttribute('data-theme') }
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => t === 'dark' ? 'light' : 'dark'), [])

  // Chargement initial
  useEffect(() => {
    getDeals().then(setAllDeals)
  }, [])

  // Fermer le drawer sur desktop
  useEffect(() => { if (!isMobile) setNavOpen(false) }, [isMobile])

  // Deals filtrés par la recherche
  const filteredDeals = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allDeals
    return allDeals.filter((d) =>
      `${d.company} ${d.contact} ${d.sector} ${d.id}`.toLowerCase().includes(q),
    )
  }, [allDeals, query])

  // Opérations sur les deals
  const moveDeal = useCallback((id: string, stage: Stage) => {
    setAllDeals((prev) => prev.map((d) => d.id === id ? { ...d, stage, last: TODAY } : d))
  }, [])

  const openNew  = useCallback(() => { setEditingDeal(null); setSoOpen(true) }, [])
  const openEdit = useCallback((deal: Deal) => { setEditingDeal(deal); setSoOpen(true) }, [])

  const saveDeal = useCallback((deal: Deal) => {
    setAllDeals((prev) => {
      const exists = prev.some((d) => d.id === deal.id)
      return exists ? prev.map((d) => d.id === deal.id ? deal : d) : [...prev, deal]
    })
    setSoOpen(false)
  }, [])

  const deleteDeal = useCallback((id: string) => {
    setAllDeals((prev) => prev.filter((d) => d.id !== id))
    setSoOpen(false)
  }, [])

  // Ligne de bienvenue (pipeline uniquement)
  const signedCount = allDeals.filter((d) => d.stage === 'signe').length

  return (
    <div className="crm-root fixed inset-0 z-50 flex bg-crm-base font-crm overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobile={isMobile}
        open={navOpen}
        onClose={() => setNavOpen(false)}
        dealCount={allDeals.length}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          activeTab={activeTab}
          query={query}
          setQuery={setQuery}
          onNewDeal={openNew}
          mobile={isMobile}
          onMenu={() => setNavOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Zone de contenu */}
        {activeTab === 'pipeline' ? (
          <main
            className="flex-1 flex flex-col overflow-hidden"
            style={{ gap: isMobile ? 14 : 18, padding: isMobile ? '16px 14px 4px' : '20px 22px 4px' }}
          >
            {/* Ligne de bienvenue */}
            <div className="flex items-baseline gap-[10px] flex-wrap px-[2px] shrink-0">
              <h1
                className="m-0 font-bold tracking-[-0.02em] text-crm-primary font-crm"
                style={{ fontSize: isMobile ? 19 : 22 }}
              >
                Bonjour Marie
              </h1>
              <span className="text-[13.5px] text-crm-muted font-crm">
                {signedCount} deal{signedCount > 1 ? 's' : ''} signé{signedCount > 1 ? 's' : ''} ce mois
                {' · '}
                {filteredDeals.length} en jeu dans le pipeline.
              </span>
            </div>

            <PipelineView
              deals={filteredDeals}
              onMoveDeal={moveDeal}
              onOpenDeal={openEdit}
              onNewDeal={openNew}
              isMobile={isMobile}
            />
          </main>
        ) : (
          <main className="flex-1 overflow-y-auto" style={{ padding: isMobile ? '16px 14px' : '20px 22px' }}>
            {activeTab === 'contacts'   && <ContactsView />}
            {activeTab === 'companies'  && <CompaniesView />}
            {activeTab === 'activities' && <ActivityView />}
          </main>
        )}
      </div>

      <SlideOver
        open={soOpen}
        deal={editingDeal}
        isMobile={isMobile}
        onClose={() => setSoOpen(false)}
        onSave={saveDeal}
        onDelete={deleteDeal}
      />
    </div>
  )
}
