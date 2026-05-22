'use client'

interface LeadMagnetEmbedProps {
  embedUrl?: string
  embedHeight?: number
  title: string
}

export default function LeadMagnetEmbed({ embedUrl, embedHeight = 600, title }: LeadMagnetEmbedProps) {
  if (!embedUrl) {
    return (
      <div
        className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center"
        style={{ height: embedHeight }}
        role="region"
        aria-label={title}
      >
        <div className="text-center text-gray-400 p-8">
          <p className="font-medium">Formulaire bientôt disponible</p>
          <p className="text-sm mt-1">Revenez prochainement</p>
        </div>
      </div>
    )
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      loading="lazy"
      className="w-full rounded-xl border-0"
      style={{ height: embedHeight }}
      allow="camera; microphone"
    />
  )
}
