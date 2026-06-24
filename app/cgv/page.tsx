import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions générales de vente | GrowthCompta',
  description: 'Conditions générales de vente de GrowthCompta.',
  alternates: { canonical: 'https://growthcompta.com/cgv' },
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

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper-2 border border-ink/10 rounded-md px-5 py-4 my-4 text-sm text-ink/80">
      {children}
    </div>
  )
}

export default function CGVPage() {
  return (
    <main className="bg-paper text-ink">
      <div className="max-w-[720px] mx-auto px-6 py-24">
        <h1 className="text-[2rem] font-bold tracking-tight text-ink mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-muted mb-12">Dernière mise à jour : juin 2026</p>

        <H2>Article 1 — Identification du prestataire</H2>
        <p className="text-ink/80 mb-3">Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre :</p>
        <p className="text-ink/80 mb-3">
          <strong className="text-ink">THURIN FLORENT</strong>, entrepreneur individuel, SIREN 830 812 913, dont le siège est situé 1 B Quai Expert Sud, 33720 Cérons — ci-après « GrowthCompta » ou « le Prestataire »,
        </p>
        <p className="text-ink/80 mb-3">et toute personne physique ou morale souhaitant bénéficier de ses services — ci-après « le Client ».</p>

        <Divider />

        <H2>Article 2 — Objet et champ d&apos;application</H2>
        <p className="text-ink/80 mb-3">Les présentes CGV s&apos;appliquent à l&apos;ensemble des prestations proposées par GrowthCompta, notamment :</p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li>Automatisation de la facturation électronique (conformité Factur-X / PDP 2026)</li>
          <li>Audit et cartographie des flux de facturation</li>
          <li>Intégration avec les outils de gestion (Pennylane, ACD, Cegid, MyUnisoft)</li>
          <li>Formation des équipes et accompagnement à la migration</li>
          <li>Accès à la console GrowthCompta (suivi des flux)</li>
          <li>Prestations de conseil en repricing et acquisition (phases ultérieures)</li>
        </ul>
        <p className="text-ink/80 mb-3">Toute commande implique l&apos;acceptation pleine et entière des présentes CGV.</p>

        <Divider />

        <H2>Article 3 — Diagnostic préalable</H2>
        <p className="text-ink/80 mb-3">
          Un diagnostic gratuit de 45 minutes est proposé avant toute souscription. Ce diagnostic est sans engagement. Il donne lieu à une proposition commerciale chiffrée, valable 30 jours à compter de sa date d&apos;émission.
        </p>

        <Divider />

        <H2>Article 4 — Tarifs</H2>
        <p className="text-ink/80 mb-3">Les tarifs sont indiqués en euros hors taxes (HT). La TVA applicable est celle en vigueur au jour de la facturation.</p>
        <Highlight>
          Mise en place à partir de <strong className="text-ink">1 490 € HT</strong> — périmètre définitif chiffré après diagnostic.
        </Highlight>
        <p className="text-ink/80 mb-3">À titre indicatif :</p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li>Cabinet 5–10 collaborateurs : 1 490 – 2 500 € HT</li>
          <li>Cabinet 10–25 collaborateurs : 2 500 – 4 900 € HT</li>
          <li>Cabinet 25–50 collaborateurs : sur devis</li>
        </ul>
        <p className="text-ink/80 mb-3">Les prestations complémentaires (repricing, acquisition) font l&apos;objet de propositions commerciales distinctes.</p>

        <Divider />

        <H2>Article 5 — Modalités de paiement</H2>
        <p className="text-ink/80 mb-3">Sauf mention contraire dans le devis :</p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li>50 % à la signature du devis / bon de commande</li>
          <li>50 % à la mise en service du flux automatisé</li>
        </ul>
        <p className="text-ink/80 mb-3">
          Le règlement s&apos;effectue par virement bancaire aux coordonnées indiquées sur la facture. Tout retard de paiement entraîne l&apos;application de pénalités au taux légal en vigueur, ainsi qu&apos;une indemnité forfaitaire de recouvrement de 40 €.
        </p>

        <Divider />

        <H2>Article 6 — Délais d&apos;exécution</H2>
        <p className="text-ink/80 mb-3">
          Le délai de mise en service du flux automatisé est fixé à <strong className="text-ink">30 jours ouvrés</strong> à compter de la date de kick-off, sous réserve de la fourniture par le Client des accès et informations nécessaires dans les délais convenus.
        </p>

        <Divider />

        <H2>Article 7 — Garantie de mise en service</H2>
        <Highlight>
          <p className="mb-2">
            Si le flux défini ensemble n&apos;est pas opérationnel dans les <strong className="text-ink">30 jours ouvrés</strong> suivant le kick-off du fait exclusif de GrowthCompta, la prestation se poursuit sans facturation supplémentaire jusqu&apos;à la mise en service.
          </p>
          <p className="mb-0">
            Si aucun flux n&apos;est en place du fait exclusif de GrowthCompta à l&apos;issue de <strong className="text-ink">60 jours ouvrés</strong>, le Client peut demander le remboursement intégral des honoraires de mise en place versés.
          </p>
        </Highlight>
        <p className="text-ink/80 mb-3">
          Cette garantie ne s&apos;applique pas en cas de retard imputable au Client (fourniture tardive des accès, interlocuteurs indisponibles, changement de périmètre en cours de mission).
        </p>

        <Divider />

        <H2>Article 8 — Obligations du Client</H2>
        <p className="text-ink/80 mb-3">Le Client s&apos;engage à :</p>
        <ul className="list-disc pl-6 text-ink/80 mb-3 space-y-1">
          <li>Fournir les accès aux outils concernés (API, comptes administrateur) dans les délais convenus</li>
          <li>Désigner un interlocuteur référent disponible pour les échanges liés à la mission</li>
          <li>Participer aux sessions de formation et de recette</li>
          <li>Informer GrowthCompta de tout changement d&apos;outil ou de périmètre susceptible d&apos;affecter le flux</li>
        </ul>

        <Divider />

        <H2>Article 9 — Obligations du Prestataire</H2>
        <p className="text-ink/80 mb-3">
          GrowthCompta s&apos;engage à une obligation de moyens. Le Prestataire ne peut garantir un résultat spécifique en matière de gain de productivité, les ordres de grandeur communiqués (20–30 %) étant des estimations basées sur des missions comparables.
        </p>

        <Divider />

        <H2>Article 10 — Confidentialité</H2>
        <p className="text-ink/80 mb-3">
          Les parties s&apos;engagent à la stricte confidentialité de toute information échangée dans le cadre de la mission. Cette obligation subsiste pendant 3 ans après la fin de la prestation.
        </p>

        <Divider />

        <H2>Article 11 — Propriété intellectuelle</H2>
        <p className="text-ink/80 mb-3">
          Les livrables produits (cartographies, scripts, documentation) sont cédés au Client à compter du paiement intégral de la prestation. Les méthodes, frameworks et outils propriétaires de GrowthCompta restent sa propriété exclusive.
        </p>

        <Divider />

        <H2>Article 12 — Protection des données</H2>
        <p className="text-ink/80 mb-3">
          GrowthCompta traite les données personnelles transmises dans le cadre de la mission conformément au RGPD. Pour les détails, voir la{' '}
          <a href="/confidentialite" className="text-accent hover:underline">Politique de confidentialité</a>.
        </p>

        <Divider />

        <H2>Article 13 — Résiliation</H2>
        <p className="text-ink/80 mb-3">
          En cas de manquement grave de l&apos;une des parties à ses obligations, non résolu dans un délai de 15 jours suivant mise en demeure par lettre recommandée, l&apos;autre partie peut résilier le contrat. Les sommes déjà versées restent acquises au Prestataire pour les livrables produits, sauf application de la garantie prévue à l&apos;article 7.
        </p>

        <Divider />

        <H2>Article 14 — Droit de rétractation</H2>
        <p className="text-ink/80 mb-3">
          Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de rétractation ne s&apos;applique pas aux prestations de services pleinement exécutées avant la fin du délai de rétractation, avec l&apos;accord préalable exprès du Client. Pour les clients professionnels (B2B), aucun droit de rétractation légal n&apos;est applicable.
        </p>

        <Divider />

        <H2>Article 15 — Responsabilité</H2>
        <p className="text-ink/80 mb-3">
          La responsabilité de GrowthCompta est limitée au montant des honoraires effectivement encaissés au titre de la mission concernée. GrowthCompta ne peut être tenu responsable des dommages indirects (perte de chiffre d&apos;affaires, perte de données, etc.).
        </p>

        <Divider />

        <H2>Article 16 — Droit applicable et juridiction</H2>
        <p className="text-ink/80 mb-3">
          Les présentes CGV sont soumises au droit français. En cas de litige, les parties rechercheront en priorité une solution amiable. À défaut, le tribunal compétent sera celui du siège de GrowthCompta.
        </p>

        <Divider />

        <H2>Contact</H2>
        <p className="text-ink/80 mb-3">
          Pour toute question relative aux présentes CGV : <a href="mailto:hello@growthcompta.com" className="text-accent hover:underline">hello@growthcompta.com</a>
        </p>
      </div>
    </main>
  )
}
