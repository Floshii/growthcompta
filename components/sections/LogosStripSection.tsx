const clients = ['cabinet · mercier', 'fiducia & co', 'audit-lab', 'compta+nantes', 'expertis lyon', 'NUMA fiduciaire']

export default function LogosStripSection() {
  return (
    <section className="py-9 border-t border-b border-line bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid items-center gap-12" style={{ gridTemplateColumns: 'auto 1fr' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted max-w-[160px] leading-[1.4]">
            Ils ont fait croître leur cabinet avec nous
          </p>
          <div className="flex gap-14 items-center flex-wrap">
            {clients.map((name) => (
              <span
                key={name}
                className="font-display font-semibold text-[22px] tracking-display text-muted opacity-70 hover:opacity-100 hover:text-ink transition-all duration-200 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
