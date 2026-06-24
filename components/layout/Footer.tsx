import Link from 'next/link'
import LogoMark from '@/components/ui/LogoMark'

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://growthcompta.com/cabinet-growth-score'

const cols = {
  Services: [
    { href: '/services/seo-programmatique', label: 'SEO programmatique' },
    { href: '/services/paid-ads', label: 'Paid ads' },
    { href: '/services/content-sales', label: 'Content sales' },
    { href: '/services/sales-ops-automation', label: 'Sales ops' },
    { href: '/services/brand-positioning', label: 'Brand & positioning' },
  ],
  Cabinet: [
    { href: '/acquisition', label: 'Système acquisition' },
    { href: '/blog', label: 'Blog' },
    { href: '/#method', label: 'Méthode' },
    { href: '/tarifs', label: 'Tarifs' },
  ],
  Ressources: [
    { href: '/niches', label: '56 niches comptables' },
    { href: '/expert-comptable', label: 'Expert-comptable par ville' },
    { href: '/facturation-electronique', label: 'Facturation électronique — repricing' },
    { href: '/facturation-electronique-2026', label: 'Automatisation facture élec. 2026' },
  ],
  Contact: [
    { href: 'mailto:hello@growthcompta.com', label: 'hello@growthcompta.com' },
    { href: calendlyUrl, label: 'Prendre rendez-vous', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-white/8">
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12 pb-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display font-bold tracking-display text-white text-[26px] leading-none mb-4"
              aria-label="GrowthCompta"
            >
              <LogoMark size={32} ink="#ffffff" accent="var(--color-accent)" />
              <span>growthcompta</span>
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-accent" style={{ transform: 'translateY(-2px)' }} />
            </Link>
            <p className="text-[#d6d4cf] text-sm leading-relaxed max-w-[320px] mt-4">
              Le système d&apos;acquisition moderne pour cabinets comptables ambitieux.
            </p>
          </div>

          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 font-medium mb-[18px]">
                {title}
              </h3>
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-[14.5px] text-[#d6d4cf] py-1.5 hover:text-accent transition-colors"
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted-2 tracking-[0.08em]">
          <span>© 2026 GROWTHCOMPTA · SIREN 830 812 913</span>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-accent transition-colors">MENTIONS LÉGALES</Link>
            <Link href="/cgv" className="hover:text-accent transition-colors">CGV</Link>
            <Link href="/confidentialite" className="hover:text-accent transition-colors">POLITIQUE DE CONFIDENTIALITÉ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
