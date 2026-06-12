export default function TruthSection() {
  return (
    <section className="py-16 md:py-[100px] bg-white">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          La vérité que personne ne vous dit
        </p>

        <h2
          className="font-display font-bold text-ink m-0 mb-8"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
        >
          Votre problème n&apos;est pas{' '}
          <span style={{ background: 'linear-gradient(180deg, transparent 70%, var(--color-accent) 70%)', padding: '0 2px' }}>
            de trouver des clients
          </span>
          .
        </h2>

        <div className="flex flex-col gap-5 text-[16px] md:text-[17px] leading-[1.7] text-ink-2">
          <p>
            Vous refusez déjà des dossiers. Vous avez 2 à 4 postes ouverts en permanence que vous
            n&apos;arrivez pas à pourvoir. Chaque nouveau client est du travail en plus pour une équipe déjà saturée.
          </p>
          <p>
            Pendant ce temps : vos honoraires n&apos;ont pas bougé depuis 3 ans, les salaires montent de 5% par an,
            et vos dossiers les moins rentables consomment vos meilleures heures.
          </p>
        </div>

        <div className="article-insight mt-9 mb-0">
          Le levier n&apos;est pas le volume. C&apos;est le revenu par client, à effectif constant.
          Et le 1er septembre vous donne le prétexte légal parfait pour le réajuster — client par client.
        </div>

      </div>
    </section>
  )
}
