export default function DashboardMock() {
  const bars = [18, 22, 28, 24, 36, 42, 38, 52, 60, 68, 72, 88]
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

  return (
    <div
      className="bg-white border border-line rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 30px 60px -20px rgba(10,10,10,0.15), 0 0 0 1px var(--color-line)' }}
    >
      {/* Browser chrome */}
      <div className="px-4 py-3 border-b border-line bg-paper flex items-center gap-2.5">
        <span className="w-[11px] h-[11px] rounded-full bg-[#ff6b5e]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#28c940]" />
        <span className="ml-2 font-mono text-[11px] text-muted">growth.cabinet-mercier.fr / dashboard</span>
      </div>

      {/* Body */}
      <div className="grid p-5 gap-4" style={{ gridTemplateColumns: '180px 1fr', minHeight: 300 }}>
        {/* Sidebar */}
        <div className="flex flex-col gap-2">
          {[
            { label: 'Overview', active: true },
            { label: 'SEO programmatique' },
            { label: 'Paid ads' },
            { label: 'Content' },
            { label: 'CRM / Sales' },
            { label: 'Settings', spacer: true },
          ].map((item) => (
            <div
              key={item.label}
              className={`px-3 py-2 rounded-lg font-mono text-[13px] ${item.spacer ? 'mt-auto' : ''} ${item.active ? 'bg-ink text-white' : 'text-ink-2'}`}
            >
              {item.active && <span className="text-accent mr-2">→</span>}
              {item.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex flex-col gap-4">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Leads / mois', value: '147', delta: '↗ +312% vs M-3' },
              { label: 'SQL ratio', value: '38%', delta: '↗ +14 pts' },
              { label: 'CA pipe', value: '288k€', delta: '↗ +2.3×' },
            ].map((kpi) => (
              <div key={kpi.label} className="p-3 border border-line rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mb-1">{kpi.label}</div>
                <div className="font-display font-bold text-2xl tracking-display leading-none">{kpi.value}</div>
                <div className="font-mono text-[11px] text-[#1a8a3a] mt-1">{kpi.delta}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="flex-1 border border-line rounded-xl p-3 flex flex-col gap-3 min-h-[120px]">
            <div className="flex items-end gap-1.5 flex-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${i >= 9 ? 'bg-accent' : 'bg-ink'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex gap-2 font-mono text-[10px] text-muted">
              {months.map((m, i) => (
                <span key={m} className={`flex-1 text-center ${i >= 9 ? 'text-ink font-medium' : ''}`}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
