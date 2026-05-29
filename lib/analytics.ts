import { track } from '@vercel/analytics'

type EventProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, props?: EventProps) {
  track(name, props)

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, props)
  }
}

export function trackPixelEvent(name: string, props?: EventProps) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, props)
  }
}
