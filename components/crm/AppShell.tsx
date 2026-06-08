'use client'
import { useState } from 'react'
import {
  Kanban,
  Users,
  Building2,
  Activity,
  Key,
  Search,
  Plus,
  ChevronRight,
} from 'lucide-react'
import PipelineView from './PipelineView'
import ContactsView from './ContactsView'
import CompaniesView from './CompaniesView'
import ActivityView from './ActivityView'

type Tab = 'pipeline' | 'contacts' | 'companies' | 'activities'

const tabs: { id: Tab; label: string; icon: typeof Kanban }[] = [
  { id: 'pipeline',   label: 'Pipeline',    icon: Kanban },
  { id: 'contacts',   label: 'Contacts',    icon: Users },
  { id: 'companies',  label: 'Cabinets',    icon: Building2 },
  { id: 'activities', label: 'Activités',   icon: Activity },
]

const tabTitles: Record<Tab, string> = {
  pipeline:   'Pipeline',
  contacts:   'Contacts',
  companies:  'Cabinets',
  activities: 'Activités',
}

// Clé API mock
const MOCK_API_KEY = 'gclients_live_sk_••••••••••••••••••••••••••••••••'
const MOCK_API_KEY_VISIBLE = 'gclients_live_sk_z9kQ2Xm7pLrN4vYa1Bw8eUhT3jR6sDf'

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('pipeline')
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex bg-crm-base font-crm overflow-hidden">
      {/* ── Sidebar ──────────────────────────────────── */}
      <aside className="w-[240px] shrink-0 flex flex-col border-r border-crm-line bg-crm-surface h-full">
        {/* Wordmark */}
        <div className="px-6 pt-6 pb-5">
          <span className="text-crm-primary font-bold text-lg tracking-tight select-none font-crm">
            GClients
          </span>
          <span className="ml-2 text-[10px] font-crm-mono text-crm-muted bg-crm-line px-1.5 py-0.5 rounded">
            v0
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-100',
                  active
                    ? 'bg-crm-blue/10 text-crm-blue'
                    : 'text-crm-muted hover:text-crm-primary hover:bg-crm-line/50',
                ].join(' ')}
              >
                <Icon size={16} className="shrink-0" />
                {label}
                {active && (
                  <ChevronRight size={12} className="ml-auto opacity-60" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Badge API Key */}
        <div className="px-4 pb-6">
          <button
            onClick={() => setShowApiKey((v) => !v)}
            className="w-full flex items-center gap-2.5 bg-crm-line/50 hover:bg-crm-line border border-crm-line rounded-xl px-3 py-2.5 transition-colors group"
          >
            <div className="w-6 h-6 rounded-lg bg-crm-green/10 border border-crm-green/20 flex items-center justify-center shrink-0">
              <Key size={12} className="text-crm-green" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[10px] font-semibold text-crm-muted uppercase tracking-wider">
                API Key
              </p>
              <p className="font-crm-mono text-[10px] text-crm-muted/60 truncate mt-0.5">
                {showApiKey ? MOCK_API_KEY_VISIBLE : MOCK_API_KEY}
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* ── Zone principale ───────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-crm-line bg-crm-surface/60 shrink-0">
          <h1 className="text-crm-primary font-bold text-lg font-crm">
            {tabTitles[activeTab]}
          </h1>

          {/* Recherche décorative */}
          <div className="flex-1 max-w-sm relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-crm-muted"
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-crm-base border border-crm-line rounded-xl pl-9 pr-4 py-2 text-sm text-crm-muted placeholder:text-crm-muted/50 focus:outline-none focus:border-crm-blue/50 font-crm transition-colors"
              readOnly
            />
          </div>

          <div className="ml-auto">
            <button className="flex items-center gap-2 bg-crm-blue hover:bg-crm-blue/90 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors font-crm">
              <Plus size={15} />
              Nouveau deal
            </button>
          </div>
        </header>

        {/* Contenu de l'onglet actif */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'pipeline'   && <PipelineView />}
          {activeTab === 'contacts'   && <ContactsView />}
          {activeTab === 'companies'  && <CompaniesView />}
          {activeTab === 'activities' && <ActivityView />}
        </main>
      </div>
    </div>
  )
}
