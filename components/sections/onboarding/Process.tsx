const steps = [
  {
    n: '01',
    t: 'Entrée en relation',
    d: 'KYC, Kbis, statuts, pièce d’identité, bénéficiaires effectifs, lettre de mission, mandats. Tout collecté via le portail en une seule session client.',
  },
  {
    n: '02',
    t: 'Accès & habilitations',
    d: 'Fisc, banques, URSSAF, caisses, historiques comptables. Récupérés via procédure guidée — sans jamais demander de mots de passe.',
  },
  {
    n: '03',
    t: 'Suivi des connexions',
    d: 'À faire / En attente client / En attente organisme / Validé. Votre équipe voit en temps réel où en est chaque flux. Les relances partent automatiquement côté client.',
  },
  {
    n: '04',
    t: 'Préparation Pennylane',
    d: 'Création du dossier, configuration de l’exercice, imports, organisation documentaire. Prêt avant même que votre collaborateur ouvre le dossier.',
  },
  {
    n: '05',
    t: 'Handoff',
    d: 'Vous récupérez un dossier complet. Tout est là. Vous produisez.',
  },
]

export default function Process() {
  return (
    <section className="py-16 md:py-[88px] bg-white" id="process">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="mb-12 max-w-[680px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Process
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.035em', lineHeight: 0.98 }}
          >
            Cinq étapes. Zéro Excel.
          </h2>
        </div>

        <div className="rounded-2xl border border-line bg-paper overflow-hidden">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`flex gap-6 items-start px-6 md:px-8 py-7 ${i < steps.length - 1 ? 'border-b border-line' : ''}`}
            >
              <div
                className="rounded-full bg-ink text-white font-display font-bold flex items-center justify-center flex-shrink-0"
                style={{ width: 44, height: 44, fontSize: 15 }}
              >
                {s.n}
              </div>
              <div>
                <h3
                  className="font-display font-semibold text-ink mb-1.5"
                  style={{ fontSize: 19, letterSpacing: '-0.02em' }}
                >
                  Étape {s.n} — {s.t}
                </h3>
                <p className="text-[14.5px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
