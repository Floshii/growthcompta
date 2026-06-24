import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | GrowthCompta',
  description: 'Politique de confidentialité et de protection des données de GrowthCompta.',
  alternates: { canonical: 'https://growthcompta.com/confidentialite' },
  robots: { index: false, follow: true },
}

function Divider() {
  return <hr className="border-t border-ink/10 my-10" />
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.06em] text-ink mt-0 mb-3">
      {children}
    </h2>
  )
}

const dataRows = [
  {
    data: 'Nom, email, nom du cabinet, téléphone',
    source: 'Formulaire Calendly (prise de rendez-vous)',
    purpose: 'Organisation du diagnostic et suivi commercial',
    basis: 'Consentement / Intérêt légitime',
    duration: '3 ans après le dernier contact',
  },
  {
    data: 'Adresse email',
    source: 'Contact direct (hello@growthcompta.com)',
    purpose: 'Réponse aux demandes entrantes',
    basis: 'Intérêt légitime',
    duration: '3 ans après le dernier contact',
  },
  {
    data: 'Données de navigation (IP, pages visitées, durée)',
    source: "Outils d'analyse (voir article 5)",
    purpose: "Mesure d'audience, amélioration du site",
    basis: 'Consentement',
    duration: '13 mois maximum',
  },
  {
    data: 'Données contractuelles et de facturation',
    source: 'Devis / contrats signés',
    purpose: 'Exécution du contrat, obligations comptables',
    basis: 'Exécution du contrat / Obligation légale',
    duration: '10 ans (pièces comptables)',
  },
]

export default function ConfidentialitePage() {
  return (
    <main className="bg-paper text-ink">
      <div className="max-w-[720px] mx-auto px-6 py-24">
        <h1 className="text-[2rem] font-bold tracking-tight text-ink mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-muted mb-12">Dernière mise à jour : juin 2026</p>

        <H2>Article 1 — Responsable du traitement</H2>
        <p className="text-ink/80 mb-3">
          Le responsable du traitement des données collectées via <strong className="text-ink">growthcompta.com</strong> est :
        </p>
        <p className="text-ink/80 mb-3">
          THURIN FLORENT, entrepreneur individuel — 1 B Quai Expert Sud, 33720 Cérons —{' '}
          <a href="mailto:hello@growthcompta.com" className="text-accent hover:underline">hello@growthcompta.com</a>
        </p>

        <Divider />

        <H2>Article 2 — Données collectées et finalités</H2>
        <p className="text-ink/80 mb-3">GrowthCompta collecte uniquement les données strictement nécessaires à ses activités.</p>

        <div className="overflow-x-auto mb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide py-2 pr-3">Données</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide py-2 pr-3">Source</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide py-2 pr-3">Finalité</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide py-2 pr-3">Base légale</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide py-2">Durée</th>
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row) => (
                <tr key={row.data} className="border-b border-ink/5 align-top">
                  <td className="py-2.5 pr-3 text-ink/80">{row.data}</td>
                  <td className="py-2.5 pr-3 text-ink/80">{row.source}</td>
                  <td className="py-2.5 pr-3 text-ink/80">{row.purpose}</td>
                  <td className="py-2.5 pr-3 text-ink/80">{row.basis}</td>
                  <td className="py-2.5 text-ink/80">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Divider />

        <H2>Article 3 — Destinataires des données</H2>
        <p className="text-ink/80 mb-3">
          Les données collectées ne sont pas vendues ni cédées à des tiers. Elles peuvent être transmises aux sous-traitants techniques suivants, dans le seul cadre de la fourniture de leurs services :
        </p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li>
            <strong className="text-ink">Vercel Inc.</strong> (hébergement) — San Francisco, CA, États-Unis —{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">politique de confidentialité</a>
          </li>
          <li>
            <strong className="text-ink">Calendly LLC</strong> (prise de rendez-vous) — Atlanta, GA, États-Unis —{' '}
            <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">politique de confidentialité</a>
          </li>
        </ul>
        <p className="text-ink/80 mb-3">
          Ces transferts vers les États-Unis s&apos;effectuent sur la base des clauses contractuelles types de la Commission européenne ou du Data Privacy Framework.
        </p>

        <Divider />

        <H2>Article 4 — Droits des personnes concernées</H2>
        <p className="text-ink/80 mb-3">
          Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li><strong className="text-ink">Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
          <li><strong className="text-ink">Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
          <li><strong className="text-ink">Droit à l&apos;effacement</strong> : demander la suppression de vos données sous certaines conditions</li>
          <li><strong className="text-ink">Droit à la limitation</strong> : restreindre le traitement de vos données</li>
          <li><strong className="text-ink">Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible</li>
          <li><strong className="text-ink">Droit d&apos;opposition</strong> : vous opposer au traitement fondé sur l&apos;intérêt légitime</li>
        </ul>
        <p className="text-ink/80 mb-3">
          Pour exercer ces droits, contactez :{' '}
          <a href="mailto:hello@growthcompta.com" className="text-accent hover:underline">hello@growthcompta.com</a>. Une réponse sera apportée dans un délai de 30 jours.
        </p>
        <p className="text-ink/80 mb-3">
          En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la <strong className="text-ink">CNIL</strong> (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>).
        </p>

        <Divider />

        <H2>Article 5 — Cookies et traceurs</H2>
        <p className="text-ink/80 mb-3">Le site growthcompta.com peut utiliser les traceurs suivants :</p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li><strong className="text-ink">Cookies strictement nécessaires</strong> : fonctionnement du site, aucun consentement requis.</li>
          <li><strong className="text-ink">Cookies d&apos;analyse d&apos;audience</strong> : mesure du trafic (ex. : données anonymisées). Ces cookies ne sont déposés qu&apos;avec votre consentement.</li>
        </ul>
        <p className="text-ink/80 mb-3">
          Vous pouvez à tout moment gérer vos préférences cookies via les paramètres de votre navigateur ou le bandeau de consentement affiché lors de votre première visite.
        </p>
        <p className="text-ink/80 mb-3">Durée de conservation des cookies d&apos;analyse : 13 mois maximum.</p>

        <Divider />

        <H2>Article 6 — Sécurité</H2>
        <p className="text-ink/80 mb-3">
          GrowthCompta met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation : connexions chiffrées (HTTPS/TLS), accès restreints aux données de production, sauvegardes régulières.
        </p>

        <Divider />

        <H2>Article 7 — Mineurs</H2>
        <p className="text-ink/80 mb-3">
          Le site growthcompta.com s&apos;adresse exclusivement à des professionnels. Aucune donnée concernant des mineurs n&apos;est collectée sciemment.
        </p>

        <Divider />

        <H2>Article 8 — Modifications</H2>
        <p className="text-ink/80 mb-3">
          La présente politique peut être mise à jour à tout moment. La date de dernière modification figure en haut de page. En cas de modification substantielle, une information sera publiée sur le site.
        </p>

        <Divider />

        <H2>Contact</H2>
        <p className="text-ink/80 mb-3">
          Pour toute question relative au traitement de vos données :{' '}
          <a href="mailto:hello@growthcompta.com" className="text-accent hover:underline">hello@growthcompta.com</a>
        </p>
      </div>
    </main>
  )
}
