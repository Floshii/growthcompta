const clients = ['cabinet · mercier', 'fiducia & co', 'audit-lab', 'compta+nantes', 'expertis lyon', 'NUMA fiduciaire']

export default function LogosStripSection() {
  return (
    <section className="py-8 md:py-9 border-t border-b border-line bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:max-w-[160px] leading-[1.4] shrink-0">
            Ils ont fait croître leur cabinet avec nous
          </p>
          <div className="flex gap-6 md:gap-10 items-center flex-wrap">
            {clients.map((name) => (
              <span
                key={name}
                className="font-display font-semibold text-[17px] md:text-[20px] tracking-display text-muted opacity-70 hover:opacity-100 hover:text-ink transition-all duration-200 cursor-default"
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
