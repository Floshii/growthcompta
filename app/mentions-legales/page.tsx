import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales | GrowthCompta',
  description: 'Mentions légales du site growthcompta.com.',
  alternates: { canonical: 'https://growthcompta.com/mentions-legales' },
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

export default function MentionsLegalesPage() {
  return (
    <main className="bg-paper text-ink">
      <div className="max-w-[720px] mx-auto px-6 py-24">
        <h1 className="text-[2rem] font-bold tracking-tight text-ink mb-2">Mentions légales</h1>
        <p className="text-sm text-muted mb-12">Dernière mise à jour : juin 2026</p>

        <H2>Éditeur du site</H2>
        <table className="w-full text-sm mb-2">
          <tbody>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted w-[220px]">Nom</td>
              <td className="py-2 text-ink/80">THURIN FLORENT</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">Forme juridique</td>
              <td className="py-2 text-ink/80">Entrepreneur Individuel</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">SIREN</td>
              <td className="py-2 text-ink/80">830 812 913</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">SIRET (siège)</td>
              <td className="py-2 text-ink/80">830 812 913 00010</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">N° TVA intracommunautaire</td>
              <td className="py-2 text-ink/80">FR83830812913</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">Adresse</td>
              <td className="py-2 text-ink/80">1 B Quai Expert Sud, 33720 Cérons, France</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">Email</td>
              <td className="py-2 text-ink/80">
                <a href="mailto:hello@growthcompta.com" className="text-accent hover:underline">hello@growthcompta.com</a>
              </td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">Site web</td>
              <td className="py-2 text-ink/80">
                <a href="https://www.growthcompta.com" className="text-accent hover:underline">www.growthcompta.com</a>
              </td>
            </tr>
          </tbody>
        </table>

        <Divider />

        <H2>Directeur de la publication</H2>
        <p className="text-ink/80 mb-3">Florent Thurin, en qualité d&apos;entrepreneur individuel.</p>

        <Divider />

        <H2>Hébergement</H2>
        <table className="w-full text-sm mb-2">
          <tbody>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted w-[220px]">Hébergeur</td>
              <td className="py-2 text-ink/80">Vercel Inc.</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">Adresse</td>
              <td className="py-2 text-ink/80">340 Pine Street, Suite 700, San Francisco, CA 94104, États-Unis</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4 text-muted">Site web</td>
              <td className="py-2 text-ink/80">
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a>
              </td>
            </tr>
          </tbody>
        </table>

        <Divider />

        <H2>Propriété intellectuelle</H2>
        <p className="text-ink/80 mb-3">
          L&apos;ensemble du contenu de ce site (textes, visuels, structure, code) est la propriété exclusive de Florent Thurin / GrowthCompta, sauf mention contraire. Toute reproduction, représentation ou diffusion, même partielle, sans autorisation écrite préalable est interdite.
        </p>

        <Divider />

        <H2>Données personnelles</H2>
        <p className="text-ink/80 mb-3">
          Les informations relatives au traitement des données personnelles figurent dans la{' '}
          <a href="/confidentialite" className="text-accent hover:underline">Politique de confidentialité</a>.
        </p>

        <Divider />

        <H2>Cookies</H2>
        <p className="text-ink/80 mb-3">
          Le site peut déposer des cookies à des fins d&apos;analyse d&apos;audience. Pour en savoir plus, consultez notre{' '}
          <a href="/confidentialite" className="text-accent hover:underline">Politique de confidentialité</a>.
        </p>

        <Divider />

        <H2>Liens hypertextes</H2>
        <p className="text-ink/80 mb-3">
          GrowthCompta décline toute responsabilité quant au contenu des sites tiers vers lesquels des liens sont proposés. Ces liens sont fournis à titre informatif uniquement.
        </p>

        <Divider />

        <H2>Droit applicable</H2>
        <p className="text-ink/80 mb-3">
          Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </div>
    </main>
  )
}
