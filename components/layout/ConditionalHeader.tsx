'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import FacturationHeader from './FacturationHeader'

export default function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname === '/' || pathname?.startsWith('/facturation-electronique-2026')) {
    return <FacturationHeader />
  }
  return <Header />
}
