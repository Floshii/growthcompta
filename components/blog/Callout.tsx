import type { ReactNode } from 'react'

export default function Callout({ children, label = 'À retenir' }: { children: ReactNode; label?: string }) {
  return (
    <div className="article-callout not-prose">
      <p className="article-callout-icon">{label}</p>
      <div>{children}</div>
    </div>
  )
}
