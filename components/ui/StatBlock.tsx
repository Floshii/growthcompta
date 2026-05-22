interface StatBlockProps {
  value: string
  label: string
  description?: string
  accent?: boolean
}

export default function StatBlock({ value, label, description, accent = false }: StatBlockProps) {
  return (
    <div className="text-center">
      <p className={`text-5xl font-bold font-display mb-2 ${accent ? 'text-emerald-600' : 'text-blue-700'}`}>
        {value}
      </p>
      <p className="text-gray-900 font-semibold text-lg">{label}</p>
      {description ? <p className="text-gray-500 text-sm mt-1">{description}</p> : null}
    </div>
  )
}
