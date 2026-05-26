import type { ReactNode } from 'react'

export default function TLDRBox({ children }: { children: ReactNode }) {
  return (
    <div className="article-tldr not-prose">
      <p className="article-tldr-title">En résumé</p>
      {children}
    </div>
  )
}
