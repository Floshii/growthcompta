// Helpers de formatage — GClients CRM

export function fmtEUR(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

// Format compact : €12,4k pour les totaux de colonnes
export function fmtEURk(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    const s = k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace('.', ',')
    return '€' + s + 'k'
  }
  return '€' + Math.round(n)
}

// Date relative en français : "il y a 3 j"
export function relDate(iso: string): string {
  const now = new Date()
  const d = new Date(iso + 'T00:00:00')
  const days = Math.round((now.getTime() - d.getTime()) / 86400000)
  if (days <= 0) return "aujourd'hui"
  if (days === 1) return 'hier'
  if (days < 7) return `il y a ${days} j`
  if (days < 30) return `il y a ${Math.floor(days / 7)} sem`
  return `il y a ${Math.floor(days / 30)} mois`
}

// Génère un ID de deal unique
export function newDealId(): string {
  return `GC-${Math.floor(1100 + Math.random() * 800)}`
}
