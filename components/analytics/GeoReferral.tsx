'use client'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

const GEO_SOURCES: Record<string, string> = {
  'perplexity.ai': 'perplexity',
  'chatgpt.com': 'chatgpt',
  'claude.ai': 'claude',
  'gemini.google.com': 'gemini',
  'copilot.microsoft.com': 'copilot',
  'you.com': 'you',
  'phind.com': 'phind',
}

export default function GeoReferral() {
  useEffect(() => {
    const ref = document.referrer
    if (!ref) return
    const match = Object.entries(GEO_SOURCES).find(([domain]) => ref.includes(domain))
    if (match) {
      trackEvent('geo_referral', { source: match[1], referrer_url: ref.slice(0, 200) })
    }
  }, [])
  return null
}
