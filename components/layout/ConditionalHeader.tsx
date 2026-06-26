'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import FacturationHeader from './FacturationHeader'
import OnboardingHeader from './OnboardingHeader'

export default function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname === '/' || pathname?.startsWith('/facturation-electronique-2026')) {
    return <FacturationHeader />
  }
  if (pathname?.startsWith('/onboarding-client')) {
    return <OnboardingHeader />
  }
  return <Header />
}
