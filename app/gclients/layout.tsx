import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-crm',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'GClients — CRM',
  description: 'CRM interne GrowthCompta',
  robots: { index: false, follow: false },
}

export default function GClientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${jbMono.variable}`}>
      {children}
    </div>
  )
}
