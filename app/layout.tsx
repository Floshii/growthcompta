import type { Metadata } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import MetaPixel from '@/components/analytics/MetaPixel'
import GeoReferral from '@/components/analytics/GeoReferral'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GrowthCompta — Le seul cabinet de growth pour experts-comptables',
    template: '%s | GrowthCompta',
  },
  description:
    "GrowthCompta installe votre moteur d'acquisition complet — SEO programmatique, paid ads, content & sales ops. Dédié aux cabinets d'expertise comptable.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://growthcompta.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GrowthCompta',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'GrowthCompta' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GrowthCompta',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <GoogleAnalytics />
        <MetaPixel />
        <GeoReferral />
      </body>
    </html>
  )
}
