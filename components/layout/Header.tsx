import Link from 'next/link'
import LogoMark from '@/components/ui/LogoMark'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#method', label: 'Méthode' },
  { href: '#cases', label: 'Études de cas' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-[1280px] mx-auto px-8 h-[68px] flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display font-bold tracking-display text-ink leading-none text-[22px]"
          aria-label="GrowthCompta — accueil"
        >
          <LogoMark size={26} />
          <span>growthcompta</span>
          <span
            className="inline-block w-[7px] h-[7px] rounded-full bg-accent"
            style={{ transform: 'translateY(-2px)' }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-2 hover:text-ink transition-colors relative py-1.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <span className="inline-flex items-center gap-2 bg-paper border border-line px-3 py-1.5 rounded-full font-mono text-xs text-ink-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
            />
            2 slots Q1
          </span>
          <Link
            href="/outils/audit-acquisition"
            className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium text-sm px-[18px] py-2.5 rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            Obtenir mon audit offert
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>

        <MobileMenu links={navLinks} />
      </div>
    </header>
  )
}
