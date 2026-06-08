'use client'
import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2500)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="crm-toast-enter fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 bg-crm-surface border border-crm-green/30 text-crm-green px-4 py-3 rounded-xl shadow-2xl text-sm font-medium font-crm">
      <CheckCircle2 size={16} className="shrink-0" />
      {message}
    </div>
  )
}
