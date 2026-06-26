'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { OB_CTA_LABEL, faqItems } from './constants'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/cabinet-growth-score'

  return (
    <section className="py-16 md:py-[88px]" id="faq">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-16">

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              FAQ · objections réelles
            </p>
            <h2
              className="font-display font-bold text-ink mb-5"
              style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', letterSpacing: '-0.035em', lineHeight: 1 }}
            >
              Les questions{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 65%, var(--color-accent) 65%)', padding: '0 4px' }}>
                qui reviennent
              </span>
              .
            </h2>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-6">
              D&apos;autres ? Posez-les pendant l&apos;appel de 30 min. Réponse sous 24 h.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { source: 'faq', page: 'onboarding-client' })}
              className="inline-flex items-center gap-2 bg-accent text-white font-medium text-[14px] px-[18px] py-[11px] rounded-full hover:bg-accent-deep transition-colors group"
            >
              {OB_CTA_LABEL}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>

          <div className="flex flex-col divide-y divide-line">
            {faqItems.map((it, i) => (
              <div key={i} className="py-5">
                <button
                  className="w-full flex items-start justify-between gap-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span
                    className="font-display font-medium"
                    style={{ fontSize: 21, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--color-ink)' }}
                  >
                    {it.q}
                  </span>
                  <span
                    className="flex-shrink-0 grid place-items-center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '99px',
                      border: open === i ? '1px solid var(--color-accent)' : '1px solid var(--color-line)',
                      background: open === i ? 'var(--color-accent)' : 'transparent',
                      color: open === i ? 'white' : 'var(--color-ink-2)',
                      fontSize: 18,
                      lineHeight: 1,
                      transform: open === i ? 'rotate(45deg)' : 'none',
                      transition: 'background 0.2s, border-color 0.2s, transform 0.25s',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: open === i ? '320px' : '0',
                    opacity: open === i ? 1 : 0,
                    marginTop: open === i ? '14px' : '0',
                    transition: 'max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s, margin-top 0.25s',
                  }}
                >
                  <p className="text-[15.5px] text-ink-2 leading-relaxed pr-10">{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
