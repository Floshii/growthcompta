'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavLink { href: string; label: string }
interface MobileMenuProps { links: NavLink[] }

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-ink hover:bg-paper transition-colors"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
      >
        <span className="block w-5 h-px bg-ink mb-1.5 transition-all" style={open ? { transform: 'rotate(45deg) translate(2px, 2px)' } : {}} />
        <span className="block w-5 h-px bg-ink mb-1.5" style={open ? { opacity: 0 } : {}} />
        <span className="block w-5 h-px bg-ink" style={open ? { transform: 'rotate(-45deg) translate(2px, -2px)' } : {}} />
      </button>

      {open && (
        <div className="fixed inset-0 top-[68px] bg-white z-40 flex flex-col p-8 border-t border-line">
          <nav className="flex flex-col" aria-label="Navigation mobile">
            {links.map((link) => (
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
          <Link
            href="/outils/audit-acquisition"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-accent text-white font-medium py-4 rounded-full hover:bg-accent-deep transition-colors"
          >
            Obtenir mon audit de croissance ↗
          </Link>
        </div>
      )}
    </div>
  )
}
