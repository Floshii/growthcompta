import type { ReactNode } from 'react'

export default function KeyInsight({ children }: { children: ReactNode }) {
  return <p className="article-insight not-prose">{children}</p>
}
