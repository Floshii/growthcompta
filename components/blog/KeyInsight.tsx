import type { ReactNode } from 'react'

export default function KeyInsight({ children }: { children: ReactNode }) {
  return <div className="article-insight not-prose">{children}</div>
}
