'use client'

import { useState } from 'react'
import Link from 'next/link'
import LogoMark from '@/components/ui/LogoMark'
import { trackEvent } from '@/lib/analytics'
import { OB_CALENDLY_URL } from '@/components/sections/onboarding/constants'

const navLinks = [
  { href: '/onboarding-client#deliverables', label: 'Services' },
  { href: '/onboarding-client#process', label: 'Méthode' },
  { href: '/onboarding-client#offre', label: 'Tarifs' },
  { href: '/blog', label: 'Blog' },
  { href: '/onboarding-client#faq', label: 'FAQ' },
]

export default function OnboardingHeader() {
  const [open, setOpen] = useState(false)

  function handleCTA(source: string) {
    trackEvent('cta_click', { source, page: 'onboarding-client' })
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
        <Link
          href="/onboarding-client"
          className="inline-flex items-center gap-2.5 font-display font-bold tracking-display text-ink leading-none text-[22px]"
          aria-label="GrowthCompta — accueil"
        >
          <LogoMark size={26} />
          <span>growthcompta</span>
          <span className="inline-block w-[7px] h-[7px] rounded-full bg-accent" style={{ transform: 'translateY(-2px)' }} />
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
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
            Offre Fondateurs · 10 places
          </span>
          <a
            href={OB_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA('header')}
            className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium text-sm px-[18px] py-2.5 rounded-full border border-transparent hover:bg-accent-deep hover:-translate-y-px transition-all duration-200 group"
          >
            Vérifier mon éligibilité
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-ink hover:bg-paper transition-colors"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          <span className="block w-5 h-px bg-ink mb-1.5 transition-all" style={open ? { transform: 'rotate(45deg) translate(2px, 2px)' } : {}} />
          <span className="block w-5 h-px bg-ink mb-1.5" style={open ? { opacity: 0 } : {}} />
          <span className="block w-5 h-px bg-ink" style={open ? { transform: 'rotate(-45deg) translate(2px, -2px)' } : {}} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[68px] bg-white z-40 flex flex-col p-8 border-t border-line md:hidden">
          <nav className="flex flex-col" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-4 text-xl font-display font-semibold tracking-display text-ink border-b border-line hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={OB_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { handleCTA('header_mobile'); setOpen(false) }}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-accent text-white font-medium py-4 rounded-full hover:bg-accent-deep transition-colors"
          >
            Vérifier mon éligibilité ↗
          </a>
        </div>
      )}
    </header>
  )
}
