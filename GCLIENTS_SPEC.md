# GClients — Spécifications complètes pour agent d'implémentation

> **Pour l'agent qui lit ceci :** ce document est autosuffisant. Tu n'as besoin
> d'aucun autre contexte. Lis-le intégralement avant d'écrire la moindre ligne.
> Chaque sprint est une session de travail indépendante. Commence toujours par
> relire les sections "Contraintes techniques" et "Design system" même si tu
> travailles sur le sprint 3 ou 4.

---

## 1. Contexte produit

**GClients** est un CRM SaaS multi-tenant conçu pour les cabinets d'expertise
comptable français. Il est développé par GrowthCompta (growthcompta.com) et
proposé à leurs clients cabinets comme outil inclus dans leur offre.

**Utilisateurs finaux :** les commerciaux et associés d'un cabinet comptable
(3–10 personnes par workspace). Chaque cabinet = un workspace isolé.

**Ce que GClients fait :**
- Pipeline commercial kanban (Prospect → Qualifié → Proposition → Négociation → Signé)
- Gestion contacts, entreprises, activités
- Analytics MRR et prévisions de revenus
- Alertes deals stagnants par email
- Multi-user avec rôles (owner / admin / member)

**Ce que GClients n'est pas :**
- Un outil de facturation
- Un outil de comptabilité
- Une suite CRM généraliste (Salesforce, HubSpot)

---

## 2. Architecture — pourquoi un repo séparé

GrowthCompta (`floshii/growthcompta`) est un **site marketing** :
- Contenu statique MDX, SEO programmatique, pages blog
- Pas d'authentification, pas de DB, rendu quasi-entièrement statique
- Stack orientée performance de chargement et SEO

GClients est une **application SaaS** :
- Auth obligatoire, sessions, multi-tenant
- Mutations fréquentes, données temps réel
- Route protection, middleware, webhooks

Mélanger les deux dans le même repo crée :
- Des conflits de stratégie de cache (statique vs dynamique)
- Des layouts incompatibles (site marketing vs app shell)
- Des env vars qui se mélangent (NEXT_PUBLIC_SUPABASE_URL dans un site SEO)
- Une complexité de déploiement inutile

**Décision :** GClients vit dans son propre repo `floshii/gclients`, son propre
projet Vercel, sa propre URL (`app.gclients.fr` ou `app.gclients.growthcompta.com`).

### Référence UI existante

Une version prototype de l'UI existe déjà dans `floshii/growthcompta` (branche
`claude/gclients-crm-build-5hhrk4`), dans `components/crm/`. L'agent peut
**lire** ces fichiers comme référence visuelle et les adapter, mais ne doit pas
les copier tels quels (ils contiennent du mock data et pas de vrai backend).
Les chemins à consulter :
- `components/crm/AppShell.tsx` — layout général, sidebar, topbar
- `components/crm/PipelineView.tsx` — kanban, colonnes, KPI chips
- `components/crm/DealCard.tsx` — card de deal avec glow
- `components/crm/SlideOver.tsx` — panneau ajout/édition
- `app/globals.css` — tokens CSS (section `/* GClients CRM */`)

---

## 3. Tech stack

| Couche | Choix | Raison |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC, middleware auth, API routes |
| UI | React 19 + TypeScript | Typage strict, hooks modernes |
| CSS | Tailwind CSS v4 | Tokens CSS-first, pas de config JS |
| DB + Auth | Supabase | PostgreSQL + RLS + Realtime + Auth en un |
| Email | Resend | SDK simple, deliverability, templates React |
| Drag & drop | @dnd-kit/core + @dnd-kit/sortable | Accessible, performant |
| Icônes | lucide-react | Cohérence avec prototype existant |
| Charts | recharts v3 | Meilleur React-natif que Chart.js ; v3 requis pour React 19 (peer-deps) |
| Déploiement | Vercel | Intégration GitHub, preview URLs |
| Fonts | next/font/google (Inter + JetBrains Mono) | Pas de flash, optimisé |

### Versions cibles
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "@supabase/ssr": "^0.5.0",
  "@supabase/supabase-js": "^2.45.0",
  "resend": "^4.0.0",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^9.0.0",
  "lucide-react": "^0.400.0",
  "recharts": "^3.0.0"
}
```

---

## 4. Design system

### Thème : dark + light mode

L'app supporte deux thèmes : dark (défaut) et light. L'utilisateur peut basculer
depuis Settings → Apparence. La préférence est persistée en DB (`workspace_members.theme`
ou `localStorage` pour les guests). La détection automatique via
`prefers-color-scheme` s'applique au premier chargement si aucune préférence n'est
enregistrée.

**Implémentation (validée dans le prototype growthcompta) :**
- Tokens de couleur runtime : `--gc-bg`, `--gc-surface`, `--gc-surface2`, `--gc-border`,
  `--gc-text`, `--gc-muted`, `--gc-hover-bg`, `--gc-shadow-card`, `--gc-scrim`,
  `--gc-scrollbar`, `--gc-scrollbar-h`, `--gc-grid` — définis sur `:root` (dark)
  et `:root[data-theme="light"]` (light)
- `@theme` Tailwind v4 référence ces vars : `--color-crm-base: var(--gc-bg)` etc.
  → toutes les classes `bg-crm-*` / `text-crm-*` s'adaptent automatiquement
- Le composant `AppShell` maintient un state `theme: 'dark' | 'light'` et fait
  `document.documentElement.setAttribute('data-theme', theme)` dans un `useEffect`
- Composants : utiliser uniquement les tokens CSS (`var(--gc-text)`, etc.) dans les
  inline styles — jamais de valeurs hex hardcodées pour les couleurs d'interface
- Glows (text-shadow, box-shadow colorés) : désactivés en light mode via
  `:root[data-theme="light"] .gc-glow-num { text-shadow: none !important; }`

### Couleurs (CSS custom properties dans `app/globals.css`)

**Un seul mécanisme de theming dans toute l'app : les tokens `--gc-*` définis sur
`:root` (dark, défaut) et surchargés sur `:root[data-theme="light"]`. Jamais de
classes `.theme-dark`/`.theme-light`, jamais de prefix Tailwind `dark:`.**

```css
/* ── Dark theme (défaut) ── */
:root {
  --gc-bg:         #0A0A0F;
  --gc-surface:    #111118;
  --gc-surface2:   #16161F;
  --gc-border:     #1E1E2E;
  --gc-text:       #F0F0F5;
  --gc-muted:      #6B6B80;
  --gc-input-bg:   #0E0E16;
  --gc-hover-bg:   rgba(255,255,255,0.045);
  --gc-shadow-card: 0 1px 2px rgba(0,0,0,0.35);
  --gc-scrim:      rgba(4, 4, 8, 0.55);
  --gc-scrollbar:  #1E1E2E;
  --gc-scrollbar-h: #2A2A3E;
  --gc-grid:       rgba(255,255,255,0.018);
}

/* ── Light theme ── */
:root[data-theme="light"] {
  --gc-bg:         #F4F5F8;
  --gc-surface:    #FFFFFF;
  --gc-surface2:   #FAFAFB;
  --gc-border:     #E5E7EE;
  --gc-text:       #15151D;
  --gc-muted:      #767688;
  --gc-hover-bg:   rgba(0,0,0,0.04);
  --gc-shadow-card: 0 1px 2px rgba(20,22,40,0.06);
  --gc-scrim:      rgba(30,32,48,0.32);
  --gc-scrollbar:  #D9DBE4;
  --gc-scrollbar-h: #C2C5D2;
  --gc-grid:       rgba(20,20,40,0.035);
  --gc-input-bg:   #FFFFFF;
}

/* ── Accents sémantiques (invariants dark/light) ── */
:root {
  --gc-green:  #22C55E;
  --gc-amber:  #F59E0B;
  --gc-blue:   #3B82F6;
  --gc-red:    #EF4444;
  --gc-purple: #8B5CF6;
  --gc-orange: #F97316;
  --gc-cta:    #22C55E;
  --gc-accent: #F97316; /* accent UI = orange GC par défaut */
}
```

**Note sur les glows en light mode :** Les `text-shadow` et `box-shadow` de glow
doivent être désactivés en light mode (opacité 0) car illisibles sur fond clair.
Utiliser uniquement les bordures colorées pour marquer le stage.

### Stages pipeline
```typescript
export const STAGES = [
  { id: 'prospect',    label: 'Prospect',    color: '#3B82F6', hint: 'Premiers contacts à qualifier' },
  { id: 'qualifie',    label: 'Qualifié',    color: '#8B5CF6', hint: 'Besoin confirmé, budget identifié' },
  { id: 'proposition', label: 'Proposition', color: '#F59E0B', hint: 'Devis envoyé, en attente retour' },
  { id: 'negociation', label: 'Négociation', color: '#F97316', hint: 'Ajustement des honoraires' },
  { id: 'signe',       label: 'Signé',       color: '#22C55E', hint: 'Mandat signé, onboarding lancé' },
]
```

### Typographie
- **UI** : Inter (tous les textes)
- **Nombres, IDs, mono** : JetBrains Mono
- Taille de base : 14px
- Labels KPI : 11px uppercase tracking-wide
- Nombres KPI : 30–38px bold

### Règles visuelles
- Dark mode par défaut, light mode complet disponible (toggle Settings)
- Jamais de valeurs couleur hardcodées dans les composants — toujours `var(--gc-bg)` etc.
- Pas de gradients sauf : logo GClients, avatars responsables
- Glow effects : `text-shadow` et `box-shadow` avec la couleur du stage + opacité 24–40%
- Fond global : grille de points `radial-gradient` 26×26px à opacité 0.018
- Rayon des cartes : 11px
- Rayon des éléments UI : 8–9px
- Transition standard : 120–140ms

### Composants UI à implémenter (fidèles au prototype)

**GCLogo** : carré 26×26px gradient vert `145deg #22C55E→#16A34A`, lettre "G"
en JetBrains Mono bold, boxShadow avec ring vert + drop shadow.

**DealCard** (treatment A) :
- `background: var(--gc-surface2)`, `border-radius: 11px`
- Bande gauche 3px en couleur du stage, avec glow au hover
- Hover : lift `-3px` + `box-shadow` avec couleur stage à 88% opacité
- Contenu : nom entreprise (bold 13.5px) + contact (muted 12px) + avatar
  responsable (coin haut droit) + MRR (JetBrains Mono bold vert) + date
  relative française (coin bas droit avec icône clock)

**KpiChip** :
- Grid 4 colonnes avec gap 1px rempli de `var(--gc-border)` → hairlines
- Count-up animation easeOutCubic 900ms au montage
- Delta badges : `▲ 12%` vert / `▼ x%` rouge
- Nombre : 30–38px JetBrains Mono bold avec text-shadow glow

**ColonneKanban** :
- En-tête : top border 2px couleur stage, dot lumineux, label + badge count,
  MRR total en fmtEURk avec text-shadow glow, phrase d'aide sous le MRR
- Drop zone : highlight `background: color + '0E'` + `box-shadow inset` au hover
- État vide : dashed border colorée, fond teinté, bouton "Ajouter un deal"

**Sidebar** :
- 240px fixe, `background: var(--gc-surface)`, `border-right: 1px solid var(--gc-border)`
- NavItem actif : fond `var(--gc-surface2)`, barre latérale 3px orange, icône orange
- Badge count : JetBrains Mono 11px, fond `var(--gc-bg)`, border
- Mobile : slide drawer depuis la gauche, scrim `rgba(4,4,8,0.55) blur(2px)`

**Topbar** :
- Height 56px, breadcrumb desktop, search bar avec focus border orange
- Bouton CTA vert avec class `.gc-cta` (lift + brightness + glow au hover)

**SlideOver** :
- 400px depuis la droite (100vw mobile)
- Stage picker : grille 2 colonnes, chaque bouton coloré dynamiquement par stage
- Owner picker : avatars colorés avec `background: color + '26'`
- Fermeture Escape

---

## 5. Structure du repo

```
gclients/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Magic link login
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts      # Supabase OAuth callback
│   ├── (app)/                    # Groupe protégé par middleware
│   │   ├── layout.tsx            # AppShell (sidebar + topbar)
│   │   ├── pipeline/
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   ├── companies/
│   │   │   └── page.tsx
│   │   ├── activities/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── onboarding/
│   │   └── page.tsx              # Premier login → création workspace
│   ├── invite/
│   │   └── [token]/
│   │       └── page.tsx          # Acceptation invitation
│   ├── api/
│   │   ├── invite/route.ts       # Envoi invitation Resend
│   │   └── export/route.ts       # Export CSV (voir T3.4)
│   ├── layout.tsx                # Root layout (bare, pas de header site)
│   └── globals.css
├── components/
│   ├── pipeline/
│   │   ├── PipelineView.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── DealCard.tsx
│   │   └── DealSlideOver.tsx
│   ├── contacts/
│   │   ├── ContactsView.tsx
│   │   └── ContactSlideOver.tsx
│   ├── companies/
│   │   └── CompaniesView.tsx
│   ├── activities/
│   │   └── ActivityView.tsx
│   ├── analytics/
│   │   ├── DashboardView.tsx
│   │   ├── MrrChart.tsx
│   │   └── FunnelChart.tsx
│   ├── settings/
│   │   └── SettingsView.tsx
│   ├── shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── ui/
│       ├── KpiChip.tsx
│       ├── Toast.tsx
│       ├── Avatar.tsx
│       └── EmptyState.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # createBrowserClient()
│   │   ├── server.ts             # createServerClient() pour RSC
│   │   └── middleware.ts         # refreshSession()
│   ├── hooks/
│   │   ├── useDeals.ts           # SWR/React Query ou Supabase Realtime
│   │   ├── useWorkspace.ts
│   │   └── useCountUp.ts
│   └── utils/
│       ├── format.ts             # fmtEUR, fmtEURk, relDate
│       └── stages.ts             # STAGES constant
├── services/
│   ├── deals.ts                  # CRUD Supabase deals
│   ├── contacts.ts
│   ├── companies.ts
│   ├── activities.ts
│   └── workspaces.ts
├── types/
│   └── index.ts                  # Deal, Contact, Company, etc.
├── emails/
│   └── StagnantDealEmail.tsx     # Template React Resend
├── middleware.ts                  # Auth protection + workspace check
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── .env.local.example
└── CLAUDE.md                     # Instructions pour agents futurs
```

---

## 6. Schéma base de données Supabase

### `schema.sql` — à exécuter dans l'éditeur SQL Supabase

> **Principes du modèle (v1.2) :**
> 1. **Relationnel d'abord** : les deals référencent `companies`, `contacts` et
>    `workspace_members` par FK. Les champs texte dénormalisés (`company_name`,
>    `contact_name`) servent uniquement à la saisie rapide et à l'affichage —
>    le matching des intégrations (Sprint 5) et les alertes (Sprint 3) passent
>    par les FK.
> 2. **Historique des stages** : chaque transition est journalisée dans
>    `deal_stage_events` (trigger automatique). C'est la source de vérité du
>    funnel de conversion et du MRR mensuel — pas `created_at`.
> 3. **PK uuid + référence affichable** : l'ID métier "GC-XXXX" est une colonne
>    `ref` générée par trigger (compteur par workspace), pas la PK.

```sql
-- ── Workspaces ──────────────────────────────────────
CREATE TABLE workspaces (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  logo_url      text,
  status        text NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'suspended')),
  deal_counter  integer NOT NULL DEFAULT 0,  -- pour générer les refs GC-XXXX
  created_at    timestamptz DEFAULT now()
);

-- ── Workspace members ───────────────────────────────
CREATE TABLE workspace_members (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role          text NOT NULL DEFAULT 'member'
                  CHECK (role IN ('owner', 'admin', 'member')),
  display_name  text NOT NULL,
  initials      text NOT NULL CHECK (char_length(initials) <= 3),
  color         text NOT NULL DEFAULT '#8B5CF6',
  theme         text NOT NULL DEFAULT 'dark'
                  CHECK (theme IN ('dark', 'light', 'auto')),
  invited_by    uuid REFERENCES auth.users(id),
  joined_at     timestamptz DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- ── Companies (déclarée avant deals pour les FK) ─────
CREATE TABLE companies (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name          text NOT NULL,
  siren         text,
  sector        text DEFAULT '',
  created_at    timestamptz DEFAULT now()
);

-- ── Contacts ─────────────────────────────────────────
CREATE TABLE contacts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  company_id    uuid REFERENCES companies(id) ON DELETE SET NULL,
  first_name    text NOT NULL,
  last_name     text NOT NULL,
  email         text,
  phone         text,
  sector        text DEFAULT '',
  created_at    timestamptz DEFAULT now()
);

-- ── Deals ────────────────────────────────────────────
CREATE TABLE deals (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref               text NOT NULL,            -- "GC-0001", généré par trigger
  workspace_id      uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  company_id        uuid REFERENCES companies(id) ON DELETE SET NULL,
  contact_id        uuid REFERENCES contacts(id) ON DELETE SET NULL,
  company_name      text NOT NULL,            -- dénormalisé (saisie rapide / affichage)
  contact_name      text NOT NULL DEFAULT '',
  sector            text NOT NULL DEFAULT '',
  mrr               integer NOT NULL DEFAULT 0 CHECK (mrr >= 0),
  stage             text NOT NULL DEFAULT 'prospect'
                      CHECK (stage IN ('prospect','qualifie','proposition','negociation','signe')),
  owner_id          uuid NOT NULL REFERENCES workspace_members(id),
  last_activity_at  date NOT NULL DEFAULT current_date,
  last_alerted_at   timestamptz,              -- anti-spam alertes stagnants (T3.3)
  signed_at         timestamptz,              -- rempli par trigger au passage en 'signe'
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now(),
  UNIQUE(workspace_id, ref)
);

-- Génération de la ref "GC-XXXX" (compteur par workspace, pas de collision)
CREATE OR REPLACE FUNCTION set_deal_ref()
RETURNS TRIGGER AS $$
DECLARE n integer;
BEGIN
  UPDATE workspaces SET deal_counter = deal_counter + 1
    WHERE id = NEW.workspace_id
    RETURNING deal_counter INTO n;
  NEW.ref := 'GC-' || lpad(n::text, 4, '0');
  RETURN NEW;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER deals_set_ref BEFORE INSERT ON deals
  FOR EACH ROW WHEN (NEW.ref IS NULL OR NEW.ref = '') EXECUTE FUNCTION set_deal_ref();

-- Mise à jour auto du champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Historique des stages (source de vérité analytics) ──
CREATE TABLE deal_stage_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  deal_id       uuid NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  from_stage    text,                         -- NULL = création du deal
  to_stage      text NOT NULL,
  changed_by    uuid REFERENCES auth.users(id),
  created_at    timestamptz DEFAULT now()
);

-- Journalise chaque transition + remplit signed_at automatiquement
CREATE OR REPLACE FUNCTION log_stage_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO deal_stage_events (workspace_id, deal_id, from_stage, to_stage, changed_by)
    VALUES (NEW.workspace_id, NEW.id, NULL, NEW.stage, auth.uid());
    IF NEW.stage = 'signe' THEN NEW.signed_at := now(); END IF;
  ELSIF NEW.stage IS DISTINCT FROM OLD.stage THEN
    INSERT INTO deal_stage_events (workspace_id, deal_id, from_stage, to_stage, changed_by)
    VALUES (NEW.workspace_id, NEW.id, OLD.stage, NEW.stage, auth.uid());
    IF NEW.stage = 'signe' AND NEW.signed_at IS NULL THEN NEW.signed_at := now(); END IF;
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER deals_log_stage BEFORE INSERT OR UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION log_stage_change();

-- ── Activities ───────────────────────────────────────
CREATE TABLE activities (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  deal_id       uuid REFERENCES deals(id) ON DELETE CASCADE,
  contact_id    uuid REFERENCES contacts(id) ON DELETE SET NULL,
  type          text NOT NULL CHECK (type IN ('appel','email','reunion','note')),
  note          text NOT NULL,
  contact_name  text DEFAULT '',
  source        text NOT NULL DEFAULT 'manual'
                  CHECK (source IN ('manual','gmail','outlook','calendly','aircall','ringover')),
  created_by    uuid REFERENCES auth.users(id),
  created_at    timestamptz DEFAULT now()
);

-- ── Integrations OAuth tokens ──────────────────────
-- Stocke les tokens OAuth des intégrations tierces par workspace
CREATE TABLE integration_tokens (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  provider      text NOT NULL CHECK (provider IN (
                  'pennylane', 'tiime', 'gmail', 'outlook',
                  'calendly', 'aircall', 'ringover', 'pappers'
                )),
  access_token  text NOT NULL,
  refresh_token text,
  expires_at    timestamptz,
  meta          jsonb DEFAULT '{}',  -- scopes, compte lié, etc.
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now(),
  UNIQUE(workspace_id, provider)
);

-- SÉCURITÉ : les tokens OAuth ne sont JAMAIS lisibles côté client.
-- RLS activé sans aucune policy = accès service role uniquement (routes serveur).
-- Le client affiche le statut de connexion via la fonction get_integration_status()
-- (SECURITY DEFINER) qui ne retourne jamais les tokens.
ALTER TABLE integration_tokens ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION get_integration_status(wsid uuid)
RETURNS TABLE (provider text, connected boolean, updated_at timestamptz) AS $$
  SELECT provider, true AS connected, updated_at
  FROM integration_tokens
  WHERE workspace_id = wsid AND is_workspace_member(wsid);
$$ LANGUAGE sql SECURITY DEFINER;

-- ── Invitations ──────────────────────────────────────
CREATE TABLE invitations (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  email         text NOT NULL,
  role          text NOT NULL DEFAULT 'member'
                  CHECK (role IN ('owner', 'admin', 'member')),
  token         text UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  invited_by    uuid REFERENCES auth.users(id),
  accepted_at   timestamptz,
  expires_at    timestamptz DEFAULT now() + interval '7 days',
  created_at    timestamptz DEFAULT now()
);

-- ── Row Level Security ───────────────────────────────
ALTER TABLE workspaces        ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals             ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies         ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities        ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_stage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations       ENABLE ROW LEVEL SECURITY;

-- Helper : est-ce que l'user courant est membre du workspace ?
CREATE OR REPLACE FUNCTION is_workspace_member(wsid uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wsid AND user_id = (SELECT auth.uid())
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper : est-ce que l'user courant est owner/admin du workspace ?
CREATE OR REPLACE FUNCTION is_workspace_admin(wsid uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wsid
      AND user_id = (SELECT auth.uid())
      AND role IN ('owner', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper : est-ce que l'user courant est owner du workspace ?
CREATE OR REPLACE FUNCTION is_workspace_owner(wsid uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wsid
      AND user_id = (SELECT auth.uid())
      AND role = 'owner'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper : workspace actif (non suspendu) ? Utilisé pour bloquer les MUTATIONS
-- d'un workspace suspendu, tout en laissant la LECTURE possible (sinon la
-- bannière "accès suspendu" ne pourrait même pas s'afficher).
CREATE OR REPLACE FUNCTION is_workspace_active(wsid uuid)
RETURNS boolean AS $$
  SELECT EXISTS (SELECT 1 FROM workspaces WHERE id = wsid AND status = 'active');
$$ LANGUAGE sql SECURITY DEFINER;

-- Workspaces : lecture si membre, update si admin, delete si owner.
-- PAS de policy INSERT : la création passe exclusivement par le RPC
-- create_workspace_with_owner() ci-dessous (évite les workspaces orphelins
-- et le problème d'œuf-et-poule "pas encore admin donc pas le droit de
-- s'ajouter comme membre").
CREATE POLICY "ws_select" ON workspaces FOR SELECT USING (is_workspace_member(id));
CREATE POLICY "ws_update" ON workspaces FOR UPDATE USING (is_workspace_admin(id) AND is_workspace_active(id));
CREATE POLICY "ws_delete" ON workspaces FOR DELETE USING (is_workspace_owner(id));

-- RPC onboarding : crée le workspace + son owner en une transaction
CREATE OR REPLACE FUNCTION create_workspace_with_owner(
  ws_name text, ws_slug text, member_name text, member_initials text
) RETURNS uuid AS $$
DECLARE new_ws uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  INSERT INTO workspaces (name, slug) VALUES (ws_name, ws_slug) RETURNING id INTO new_ws;
  INSERT INTO workspace_members (workspace_id, user_id, role, display_name, initials)
  VALUES (new_ws, auth.uid(), 'owner', member_name, member_initials);
  RETURN new_ws;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Members.
-- IMPORTANT : pas de clause "OR user_id = auth.uid()" sur l'INSERT — elle
-- permettrait à n'importe quel utilisateur authentifié de s'ajouter à
-- n'importe quel workspace (breach multi-tenant). L'ajout d'un membre se fait
-- soit par un admin (invitation in-app), soit côté serveur (service role)
-- lors de l'acceptation d'une invitation (/invite/[token]), soit via le RPC
-- d'onboarding ci-dessus.
CREATE POLICY "members_select" ON workspace_members FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "members_insert" ON workspace_members FOR INSERT WITH CHECK (is_workspace_admin(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "members_update" ON workspace_members FOR UPDATE USING ((is_workspace_admin(workspace_id) OR user_id = (SELECT auth.uid())) AND is_workspace_active(workspace_id));
CREATE POLICY "members_delete" ON workspace_members FOR DELETE USING (is_workspace_admin(workspace_id));
-- NB : members_update autorise le self-update (theme, display_name, initiales) ;
-- empêcher l'escalade de rôle via un trigger : un non-admin ne peut pas changer
-- son propre champ `role`.
CREATE OR REPLACE FUNCTION prevent_role_self_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND NOT is_workspace_admin(OLD.workspace_id) THEN
    RAISE EXCEPTION 'only admins can change roles';
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER members_role_guard BEFORE UPDATE ON workspace_members
  FOR EACH ROW EXECUTE FUNCTION prevent_role_self_escalation();

-- Tables data : lecture si membre, mutations si membre ET workspace actif
CREATE POLICY "deals_select"  ON deals FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "deals_insert"  ON deals FOR INSERT WITH CHECK (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "deals_update"  ON deals FOR UPDATE USING (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "deals_delete"  ON deals FOR DELETE USING (is_workspace_admin(workspace_id) AND is_workspace_active(workspace_id));

CREATE POLICY "contacts_select" ON contacts FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "contacts_write"  ON contacts FOR INSERT WITH CHECK (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "contacts_update" ON contacts FOR UPDATE USING (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "contacts_delete" ON contacts FOR DELETE USING (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));

CREATE POLICY "companies_select" ON companies FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "companies_write"  ON companies FOR INSERT WITH CHECK (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "companies_update" ON companies FOR UPDATE USING (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "companies_delete" ON companies FOR DELETE USING (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));

CREATE POLICY "activities_select" ON activities FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "activities_write"  ON activities FOR INSERT WITH CHECK (is_workspace_member(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "activities_delete" ON activities FOR DELETE USING (is_workspace_admin(workspace_id) AND is_workspace_active(workspace_id));

-- Stage events : lecture seule pour les membres (écrits par trigger uniquement)
CREATE POLICY "stage_events_select" ON deal_stage_events FOR SELECT USING (is_workspace_member(workspace_id));

-- Invitations : visibles et créées par les admins UNIQUEMENT.
-- SÉCURITÉ : jamais de "OR token IS NOT NULL" (le token n'est jamais NULL →
-- toutes les invitations de tous les workspaces seraient lisibles, emails et
-- tokens inclus). Jamais de policy UPDATE USING (true).
-- L'acceptation (/invite/[token]) se fait côté serveur avec le service role :
-- lookup du token, vérif expiration, création du workspace_member, accepted_at.
CREATE POLICY "invitations_select" ON invitations FOR SELECT USING (is_workspace_admin(workspace_id));
CREATE POLICY "invitations_insert" ON invitations FOR INSERT WITH CHECK (is_workspace_admin(workspace_id) AND is_workspace_active(workspace_id));
CREATE POLICY "invitations_delete" ON invitations FOR DELETE USING (is_workspace_admin(workspace_id));

-- ── Index (RLS évalue is_workspace_member() à chaque requête :
--     sans ces index, tout dégrade dès quelques milliers de lignes) ──
CREATE INDEX idx_members_user      ON workspace_members(user_id);
CREATE INDEX idx_members_ws        ON workspace_members(workspace_id);
CREATE INDEX idx_deals_ws          ON deals(workspace_id);
CREATE INDEX idx_deals_ws_stage    ON deals(workspace_id, stage);
CREATE INDEX idx_deals_company     ON deals(company_id);
CREATE INDEX idx_deals_contact     ON deals(contact_id);
CREATE INDEX idx_contacts_ws       ON contacts(workspace_id);
CREATE INDEX idx_contacts_email    ON contacts(workspace_id, email);
CREATE INDEX idx_contacts_phone    ON contacts(workspace_id, phone);
CREATE INDEX idx_companies_ws      ON companies(workspace_id);
CREATE INDEX idx_activities_ws     ON activities(workspace_id);
CREATE INDEX idx_activities_deal   ON activities(deal_id);
CREATE INDEX idx_stage_events_ws   ON deal_stage_events(workspace_id, created_at);
CREATE INDEX idx_stage_events_deal ON deal_stage_events(deal_id);
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_tokens_ws         ON integration_tokens(workspace_id);
```

### `seed.sql` — données de démo pour un workspace de test

Le seed est **autosuffisant** (aucune référence externe). Il suppose qu'un user
de test existe déjà dans `auth.users` — remplacer `:OWNER_USER_ID` par son uuid.
Les 4 responsables démo : ML (#8B5CF6), TR (#3B82F6), AC (#F59E0B), SB (#22C55E).

```sql
-- Workspace de démo
INSERT INTO workspaces (id, name, slug) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Cabinet Demo', 'cabinet-demo');

-- Membres démo (un seul rattaché à un vrai user ; les 3 autres pour les avatars)
-- NB : pour un seed simple, rattacher les 4 au même user_id de test est acceptable
-- si la contrainte UNIQUE(workspace_id, user_id) est temporairement contournée en
-- créant 4 users de test, OU ne créer qu'un membre réel et utiliser owner_id de
-- celui-ci pour tous les deals.
INSERT INTO workspace_members (id, workspace_id, user_id, role, display_name, initials, color) VALUES
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-000000000001', :OWNER_USER_ID, 'owner', 'Marie Lambert', 'ML', '#8B5CF6');

-- 18 deals démo (cabinets comptables français) — owner_id = membre ML ci-dessus.
-- Colonnes : company_name, contact_name, sector, mrr, stage, last_activity_at
INSERT INTO deals (workspace_id, company_name, contact_name, sector, mrr, stage, owner_id, last_activity_at) VALUES
  -- Prospect
  ('00000000-0000-0000-0000-000000000001', 'Boulangerie Lefèvre',      'Camille Lefèvre',     'Artisan / Commerce',  340,  'prospect',    '00000000-0000-0000-0000-0000000000a1', '2026-06-07'),
  ('00000000-0000-0000-0000-000000000001', 'Garage Petit & Fils',      'Damien Petit',        'Automobile',          520,  'prospect',    '00000000-0000-0000-0000-0000000000a1', '2026-06-05'),
  ('00000000-0000-0000-0000-000000000001', 'Fleuriste Margot',         'Margot Vasseur',      'Commerce de détail',  290,  'prospect',    '00000000-0000-0000-0000-0000000000a1', '2026-06-02'),
  ('00000000-0000-0000-0000-000000000001', 'Transports Girard SARL',   'Olivier Girard',      'Logistique',          1180, 'prospect',    '00000000-0000-0000-0000-0000000000a1', '2026-06-06'),
  ('00000000-0000-0000-0000-000000000001', 'Restaurant Le Comptoir',   'Inès Bonnet',         'Restauration',        640,  'prospect',    '00000000-0000-0000-0000-0000000000a1', '2026-05-30'),
  -- Qualifié
  ('00000000-0000-0000-0000-000000000001', 'Studio Mont-Blanc',        'Hugo Marchand',       'Architecture',        980,  'qualifie',    '00000000-0000-0000-0000-0000000000a1', '2026-06-06'),
  ('00000000-0000-0000-0000-000000000001', 'Pharmacie du Marché',      'Dr. Élise Roux',      'Santé',               1240, 'qualifie',    '00000000-0000-0000-0000-0000000000a1', '2026-06-04'),
  ('00000000-0000-0000-0000-000000000001', 'Menuiserie Rousseau',      'Paul Rousseau',       'BTP / Artisanat',     760,  'qualifie',    '00000000-0000-0000-0000-0000000000a1', '2026-06-03'),
  ('00000000-0000-0000-0000-000000000001', 'Éditions Vallée',          'Sophie Vallée',       'Édition',             1450, 'qualifie',    '00000000-0000-0000-0000-0000000000a1', '2026-06-01'),
  -- Proposition
  ('00000000-0000-0000-0000-000000000001', 'Tech Nantes SAS',          'Yanis Lemoine',       'Logiciel / SaaS',     2400, 'proposition', '00000000-0000-0000-0000-0000000000a1', '2026-06-07'),
  ('00000000-0000-0000-0000-000000000001', 'Clinique Vét. Pasteur',    'Dr. Claire Fontaine', 'Santé animale',       1320, 'proposition', '00000000-0000-0000-0000-0000000000a1', '2026-06-05'),
  ('00000000-0000-0000-0000-000000000001', 'Maison Dubois Immobilier', 'Antoine Dubois',      'Immobilier',          1890, 'proposition', '00000000-0000-0000-0000-0000000000a1', '2026-05-31'),
  -- Négociation
  ('00000000-0000-0000-0000-000000000001', 'Brasserie La Rochelle',    'Manon Charpentier',   'Agroalimentaire',     2150, 'negociation', '00000000-0000-0000-0000-0000000000a1', '2026-06-06'),
  ('00000000-0000-0000-0000-000000000001', 'Atelier Caron Design',     'Théo Caron',          'Design / Studio',     1080, 'negociation', '00000000-0000-0000-0000-0000000000a1', '2026-06-04'),
  -- Signé
  ('00000000-0000-0000-0000-000000000001', 'Cabinet Dr. Moreau',       'Dr. Lucas Moreau',    'Profession libérale', 890,  'signe',       '00000000-0000-0000-0000-0000000000a1', '2026-05-28'),
  ('00000000-0000-0000-0000-000000000001', 'Boucherie Centrale',       'Nadia Aubert',        'Artisan / Commerce',  470,  'signe',       '00000000-0000-0000-0000-0000000000a1', '2026-05-25'),
  ('00000000-0000-0000-0000-000000000001', 'Cave Saint-Émilion',       'Pierre Gaillard',     'Négoce / Vin',        1620, 'signe',       '00000000-0000-0000-0000-0000000000a1', '2026-06-02'),
  ('00000000-0000-0000-0000-000000000001', 'Coiffure Émeraude',        'Léa Mercier',         'Services',            380,  'signe',       '00000000-0000-0000-0000-0000000000a1', '2026-05-20');
```

---

## 7. Types TypeScript

### `types/index.ts`

```typescript
export type Stage = 'prospect' | 'qualifie' | 'proposition' | 'negociation' | 'signe'
export type MemberRole = 'owner' | 'admin' | 'member'
export type ActivityType = 'appel' | 'email' | 'reunion' | 'note'

export type WorkspaceStatus = 'active' | 'suspended'
export type Theme = 'dark' | 'light' | 'auto'
export type ActivitySource = 'manual' | 'gmail' | 'outlook' | 'calendly' | 'aircall' | 'ringover'

export interface Workspace {
  id: string
  name: string
  slug: string
  logo_url: string | null
  status: WorkspaceStatus
  created_at: string
}

export interface WorkspaceMember {
  id: string
  workspace_id: string
  user_id: string
  role: MemberRole
  display_name: string
  initials: string
  color: string
  theme: Theme
  joined_at: string
}

export interface Deal {
  id: string                    // uuid
  ref: string                   // "GC-0001" — affichage uniquement
  workspace_id: string
  company_id: string | null     // FK companies — utilisé par les intégrations
  contact_id: string | null     // FK contacts — utilisé par le matching email/tél
  company_name: string          // dénormalisé pour l'affichage
  contact_name: string
  sector: string
  mrr: number
  stage: Stage
  owner_id: string              // FK workspace_members — jamais d'initiales seules
  last_activity_at: string
  last_alerted_at: string | null
  signed_at: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  workspace_id: string
  company_id: string | null
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  sector: string
  created_at: string
}

export interface Company {
  id: string
  workspace_id: string
  name: string
  siren: string | null
  sector: string
  created_at: string
}

export interface Activity {
  id: string
  workspace_id: string
  deal_id: string | null
  contact_id: string | null
  type: ActivityType
  note: string
  contact_name: string
  source: ActivitySource
  created_by: string | null
  created_at: string
}

export interface DealStageEvent {
  id: string
  workspace_id: string
  deal_id: string
  from_stage: Stage | null      // null = création du deal
  to_stage: Stage
  changed_by: string | null
  created_at: string
}

export interface Invitation {
  id: string
  workspace_id: string
  email: string
  role: MemberRole
  token: string
  accepted_at: string | null
  expires_at: string
}

export interface StageConfig {
  id: Stage
  label: string
  color: string
  hint: string
}
```

---

## 8. Authentification

### Stratégie : magic link (pas de mot de passe)
L'utilisateur entre son email → reçoit un lien → clique → il est connecté.
Plus simple, plus sécurisé, pas de "mot de passe oublié" à gérer.

### Flux login
```
/login
  → user entre email
  → POST supabase.auth.signInWithOtp({ email })
  → user reçoit email avec lien magic
  → clic → redirect vers /auth/callback?code=xxx
  → /auth/callback échange le code → session créée
  → redirect vers :
      - /onboarding  si l'user n'a pas encore de workspace
      - /(app)/pipeline  sinon
```

### Middleware (`middleware.ts`)

**Pièges connus à éviter :**
- `@supabase/ssr` n'exporte PAS `createMiddlewareClient` (c'était l'ancien
  package `auth-helpers`). Utiliser `createServerClient` avec la gestion
  manuelle des cookies ci-dessous.
- Les route groups `(app)` n'apparaissent **jamais** dans l'URL — un check
  `pathname.startsWith('/(app)')` ne matche rien. Matcher les chemins réels.
- Utiliser `auth.getUser()` (vérifie le JWT côté serveur), pas `getSession()`.
- Le check "a-t-il un workspace ?" ne se fait PAS dans le middleware (ça
  ajouterait une requête DB à chaque navigation) mais dans le layout serveur
  du groupe `(app)`, qui redirige vers `/onboarding` si aucun membership.

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/pipeline', '/contacts', '/companies', '/activities', '/settings', '/onboarding', '/admin']

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = req.nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some(p => path.startsWith(p))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

### Page Onboarding (`/onboarding`)
Affiché uniquement lors du premier login (pas de workspace pour cet user — le
layout `(app)` fait ce check serveur et redirige).
Formulaire : "Nom de votre cabinet" + "Vos initiales" → appelle le RPC
`create_workspace_with_owner(name, slug, display_name, initials)` (section 6) —
**pas** d'inserts directs sur `workspaces`/`workspace_members` (les policies RLS
ne le permettent pas, c'est voulu).
Redirige vers `/pipeline` après création.

---

## 9. Variables d'environnement

### `.env.local.example`
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...   # server-side uniquement, jamais exposé

# Resend
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=noreply@gclients.fr

# App
NEXT_PUBLIC_APP_URL=https://app.gclients.fr
```

---

## 10. Sprint 1 — Foundation SaaS `jours 1–4`

### Objectif
Socle fonctionnel : repo créé, DB configurée, login qui marche, workspace
isolé, pipeline connecté à Supabase (CRUD réel, pas de mock).

### Pré-requis (à faire par l'humain avant de démarrer)
1. Créer le repo `floshii/gclients` sur GitHub (vide)
2. Créer un projet Supabase sur supabase.com (free tier)
3. Copier `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Créer un projet Vercel connecté au repo GitHub
5. Ajouter les env vars dans Vercel

### Tâches agent

**T1.1 — Initialisation du repo**
```bash
npx create-next-app@latest gclients \
  --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd gclients
npm install @supabase/ssr @supabase/supabase-js @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities lucide-react
```
- Configurer `next.config.ts` : `serverExternalPackages: []`, headers sécurité
- **Tailwind v4 = config CSS-first : PAS de `tailwind.config.ts`.** Déclarer les
  tokens via le bloc `@theme` dans `app/globals.css` qui référence les custom
  properties `--gc-*` (ex. `--color-crm-base: var(--gc-bg)`)
- Créer `app/globals.css` avec les CSS custom properties (section 4), la grille
  de fond, le class `.gc-cta`, les scrollbars

**T1.2 — Supabase setup**
- Créer `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (RSC)
- Créer `middleware.ts` selon spec section 8
- Exécuter `supabase/schema.sql` dans l'éditeur SQL Supabase

**T1.3 — Auth : page login**
- `app/login/page.tsx` : formulaire email simple, dark mode, GCLogo
- `app/auth/callback/route.ts` : échange code PKCE → session
- Test manuel : envoyer un magic link, vérifier la session

**T1.4 — Onboarding**
- `app/onboarding/page.tsx` : "Nom de votre cabinet" + "Vos initiales"
- Appelle le RPC `create_workspace_with_owner()` (section 6) — pas d'inserts
  directs, les policies RLS les bloquent volontairement
- Redirige vers `/pipeline`

**T1.5 — Pipeline connecté**
- `services/deals.ts` : `getDeals(workspaceId)`, `createDeal()`, `updateDeal()`,
  `moveDealStage()`, `deleteDeal()` — toutes les fonctions appellent Supabase,
  pas de données en mémoire
- `app/pipeline/page.tsx` : Server Component qui récupère les deals via RSC
- `components/pipeline/PipelineView.tsx` : Client Component (drag & drop),
  reçoit les deals en props, mutations via Server Actions ou API routes
- Implémenter le design fidèlement (voir section 4 et référence prototype)
- Vérifier : créer un deal, le glisser, le supprimer — tout persiste après refresh

**T1.6 — Test d'isolation RLS (livrable obligatoire, pas un test manuel)**
- `scripts/test-rls.ts` : script exécutable (`npx tsx scripts/test-rls.ts`) qui :
  1. Crée 2 users de test + 2 workspaces (via service role)
  2. Avec le client anon authentifié en user A, tente de lire/écrire les
     deals, contacts, companies, activities, members et invitations du
     workspace B → tout doit échouer ou retourner 0 ligne
  3. Tente de s'insérer soi-même comme membre du workspace B → doit échouer
  4. Tente de lire `integration_tokens` → doit retourner 0 ligne
  5. Nettoie les données de test
- Ce script est rejoué à la fin de chaque sprint qui touche au schéma ou aux
  policies (2, 4, 5)

### Critères d'acceptation Sprint 1
- [ ] `npm run build` passe sans erreur
- [ ] Login magic link fonctionne
- [ ] Onboarding crée bien workspace + member en DB (via RPC)
- [ ] Pipeline affiche les deals depuis Supabase
- [ ] Drag & drop persiste en DB et génère un événement dans `deal_stage_events`
- [ ] "Nouveau deal" via SlideOver crée en DB avec une `ref` GC-XXXX auto-générée
- [ ] `scripts/test-rls.ts` passe : isolation totale entre deux workspaces
- [ ] Déployé sur Vercel avec preview URL fonctionnelle

---

## 11. Sprint 2 — CRM core vivant `jours 5–9`

### Objectif
CRUD complet sur tous les entités, realtime multi-user, log d'activités inline,
deal detail avec historique.

### Tâches agent

**T2.1 — Realtime pipeline**
- Supabase Realtime sur la table `deals` : quand un autre user déplace une card,
  elle bouge sans refresh pour tout le monde dans le même workspace
- Utiliser `supabase.channel('deals').on('postgres_changes', ...)` dans
  `PipelineView.tsx`
- Indicateur visuel subtil ("X en train de modifier..." ou juste le mouvement live)

**T2.2 — CRUD Contacts**
- `app/contacts/page.tsx` : table avec colonnes nom, email, téléphone, entreprise,
  secteur, créé le
- `components/contacts/ContactSlideOver.tsx` : formulaire ajout/édition
- `services/contacts.ts` : `getContacts`, `createContact`, `updateContact`,
  `deleteContact`
- Bouton "Nouveau contact" dans la topbar quand l'onglet est actif

**T2.3 — CRUD Companies**
- Même pattern que contacts
- Colonnes : nom, SIREN, secteur, nb de contacts liés, créé le
- `services/companies.ts`

**T2.4 — Log d'activité inline**
- Sur chaque DealCard : icône "+" qui ouvre un mini-formulaire inline
  (type: appel/email/réunion/note + champ note)
- Met à jour `last_activity_at` sur le deal automatiquement
- `services/activities.ts` : `createActivity`, `getActivitiesForDeal`

**T2.5 — Deal detail panel**
- Agrandir le SlideOver actuel : au-dessus du formulaire d'édition, afficher
  la timeline des activités du deal (chronologique, avec icône par type)
- Ajouter une activité directement depuis ce panel

**T2.6 — Recherche améliorée**
- La barre de recherche filtre en temps réel : company, contact, sector, ID
- Sur mobile : recherche full-width, rétractable

### Critères d'acceptation Sprint 2
- [ ] Déplacer une card sur laptop A → visible immédiatement sur laptop B (même workspace)
- [ ] Créer/éditer/supprimer un contact et une entreprise
- [ ] Logger une activité depuis une card → apparaît dans le deal detail
- [ ] Recherche filtre bien sur tous les champs
- [ ] Performance : pas de re-render global à chaque keystroke de recherche (debounce 200ms)

---

## 12. Sprint 3 — Intelligence `jours 10–14`

### Objectif
Dashboard analytics, prévisions, alertes email, export.

### Tâches agent

**T3.1 — Dashboard analytics (`/pipeline` ou nouvel onglet)**
Ajouter un toggle "Kanban / Dashboard" en haut du pipeline view.

Dashboard contient :
- **MRR par mois** : courbe recharts des 6 derniers mois, calculée depuis
  **`signed_at`** des deals signés (rempli automatiquement par le trigger
  `deals_log_stage`) — jamais depuis `created_at`, qui est la date de création
  du deal, pas celle de la signature. Couleur : `--gc-green`
- **Funnel de conversion** : barres horizontales, une par stage, montrant le %
  de deals **ayant atteint** chaque étape (source : `deal_stage_events`, pas le
  snapshot du stage courant — un deal signé est passé par tous les stages
  intermédiaires). Couleur : couleur du stage. Bonus : afficher la durée
  moyenne passée dans chaque stage (delta entre événements consécutifs)
- **Top 5 deals** : tableau des 5 plus gros MRR en cours (non signés)
- **Activité par responsable** : petit tableau initiales → nb d'activités
  ce mois

Utiliser recharts. Responsive. Même dark theme.

**T3.2 — Weighted pipeline (prévision de revenus)**
Ajouter dans la stats bar un 5e chip (ou remplacer un existant) :
"Prévision pondérée" = somme des MRR × probabilité par stage :
- prospect : 10%
- qualifie : 25%
- proposition : 50%
- negociation : 75%
- signe : 100%

**T3.3 — Alertes deals stagnants**
- Cron job Vercel (`app/api/cron/stagnant/route.ts`) : toutes les 24h
- Requête Supabase (service role) : deals dont `last_activity_at` < today - 7 jours
  ET stage ≠ 'signe' ET (`last_alerted_at` IS NULL OU < now() - 7 jours)
  — la condition `last_alerted_at` évite de spammer le même email chaque jour
- Résolution de l'email du owner : `deal.owner_id` → `workspace_members.user_id`
  → `supabase.auth.admin.getUserById(user_id).email` (service role). C'est pour
  ça que `owner_id` est une FK et pas des initiales.
- Pour chaque deal alerté : envoyer l'email Resend PUIS mettre à jour
  `last_alerted_at = now()`
- Template `emails/StagnantDealEmail.tsx` : React Email, dark style cohérent
  avec l'app. Contenu : nom entreprise, MRR, dernière activité, lien direct
  vers le deal
- Dans `.env` : `CRON_SECRET` pour sécuriser l'endpoint (header `Authorization`)
- Dans `vercel.json` : configurer le cron à 08:00 UTC

**T3.4 — Export CSV**
- Bouton "Exporter" dans chaque vue (Pipeline, Contacts, Companies)
- `app/api/export/route.ts` : génère un CSV, protégé par session Supabase
- Colonnes Pipeline : Ref (GC-XXXX), Entreprise, Contact, Secteur, MRR, Stage,
  Responsable (display_name via owner_id), Dernière activité, Créé le
- Téléchargement direct sans page intermédiaire

**T3.5 — Filtres avancés**
Dans le Pipeline, un bouton "Filtrer" (icône funnel) ouvre un dropdown :
- Par responsable (checkboxes avec avatars)
- Par stage (checkboxes colorées)
- Par fourchette MRR (slider range ou deux inputs min/max)
- Par secteur

Les filtres s'appliquent en plus de la recherche texte. Badge sur le bouton
indique le nombre de filtres actifs.

### Critères d'acceptation Sprint 3
- [ ] Dashboard affiche les graphiques recharts avec des vraies données Supabase
- [ ] Prévision pondérée est cohérente avec les deals présents
- [ ] Créer un deal avec `last_activity_at` = aujourd'hui - 8 jours → recevoir l'alerte email
- [ ] Relancer le cron le lendemain → PAS de second email pour le même deal (cooldown 7 jours)
- [ ] Funnel calculé depuis `deal_stage_events` (un deal signé compte dans tous les stages traversés)
- [ ] Export CSV télécharge un fichier avec toutes les colonnes
- [ ] Filtres par responsable fonctionnent et sont combinables avec la recherche

---

## 13. Sprint 4 — Enterprise `jours 15–20`

### Objectif
Multi-user complet, settings, vue superadmin GrowthCompta, PWA.

### Tâches agent

**T4.1 — Settings workspace (`/settings`)**
Page settings avec 3 onglets :

*Général* :
- Modifier nom du cabinet
- Upload logo (Supabase Storage)
- Supprimer le workspace (confirmation "Tapez le nom du cabinet")

*Membres* :
- Liste des membres avec rôle, initiales, date d'arrivée
- Bouton "Inviter un membre" : email + rôle → crée une invitation en DB +
  envoie email Resend avec lien `/invite/[token]`
- Changer le rôle d'un membre (owner seulement)
- Retirer un membre

*Apparence* :
- Toggle de thème "Sombre / Clair / Automatique" (voir T4.6)

> **Clé API workspace : reportée.** Une clé API n'a de sens que si une API
> publique existe (endpoints, scopes, rate limiting, docs) — rien de tout ça
> n'est spécifié. Le besoin "connecter Zapier/Make" est couvert par les
> webhooks sortants Make (T5.9). Si une API publique devient nécessaire, elle
> fera l'objet d'une spec dédiée (sprint 6+).

**T4.2 — Page acceptation invitation (`/invite/[token]`)**
- **Tout le flow passe par le serveur avec le service role** : les policies RLS
  ne permettent ni de lire une invitation par token, ni de s'auto-insérer comme
  membre (c'est volontaire, voir section 6)
- Route serveur : lookup du token (non expiré, non accepté), affiche le nom du
  cabinet
- Si l'user n'est pas connecté : page "Connectez-vous pour rejoindre [nom cabinet]"
  avec login magic link (redirect retour vers `/invite/[token]` après auth)
- Après login : Server Action service role qui vérifie à nouveau le token,
  vérifie que l'email de l'user connecté == l'email invité, crée le
  workspace_member, marque `accepted_at`, redirect pipeline

**T4.3 — Vue superadmin GrowthCompta**
Route `/admin` protégée par email (seuls les emails `@growthcompta.com` y accèdent,
vérification de `user.email` dans le middleware ET dans chaque route serveur —
ne jamais se fier au middleware seul).

Le champ `workspaces.status` existe déjà dans le schéma (section 6), ainsi que
les policies de suspension. Rien à migrer.

**Accès aux données** : le superadmin n'est membre d'aucun workspace, donc les
policies RLS ne lui donnent accès à rien — c'est normal. Toutes les lectures de
`/admin` passent par des routes serveur avec le **service role**, après
vérification stricte de l'email `@growthcompta.com`. Jamais de service role
exposé dans un Client Component.

Contenu :
- Liste de tous les workspaces : nom, status (badge actif/suspendu), nb membres,
  nb deals, MRR total pipeline, date création, dernière activité
- Métriques globales en haut : nb workspaces actifs (activité < 7 jours),
  MRR total agrégé, nb deals en cours
- Cliquer sur un workspace → voir son pipeline en lecture seule
- Actions disponibles (owner GrowthCompta uniquement) :
  - **Suspendre** un workspace : le status passe à `suspended`, une bannière
    apparaît pour tous les membres du cabinet ("Votre accès est suspendu.
    Contactez GrowthCompta."), toutes les **mutations** sont bloquées via RLS
  - **Réactiver** : repasse à `active`, bannière disparaît immédiatement

**Comportement de la suspension (déjà câblé dans les policies section 6)** :
la **lecture reste autorisée** pour les membres (sinon impossible d'afficher
la bannière ou même le nom du cabinet), seules les mutations (INSERT/UPDATE/
DELETE) sont bloquées via `is_workspace_active()`. Le client affiche la bannière
en lisant `workspace.status` et passe l'UI en lecture seule.

**T4.4 — PWA**
- `app/manifest.ts` : Web App Manifest avec nom "GClients", icônes, theme_color `#0A0A0F`
- `app/apple-icon.png` et `app/icon.png` : icône carré vert avec "G"
- Meta tags dans root layout pour iOS
- `next.config.ts` : headers cache pour les assets statiques
- Test : "Ajouter à l'écran d'accueil" sur iPhone → ouvre en fullscreen

**T4.5 — Polish final**
- Page 404 custom dark theme
- Page 500 custom dark theme
- Loading states : skeleton screens sur le pipeline au chargement initial
  (pas de spinner global, mais des cartes fantômes avec animation pulse)
- Toast notifications : système global (Provider en root layout) pour les
  succès/erreurs de toutes les mutations
- Favicon : même icône que PWA

**T4.6 — Toggle light/dark mode**
- Toggle dans Settings → Apparence : "Sombre / Clair / Automatique"
- Appliquer `document.documentElement.setAttribute('data-theme', 'light')`
  (ou retirer l'attribut pour dark) — **un seul mécanisme dans toute l'app,
  jamais de classes `.theme-dark`/`.theme-light`** (voir section 4)
- Persister la préférence dans `workspace_members.theme` (colonne déjà
  présente dans le schéma section 6)
- Fallback `localStorage` pour les pages non-authentifiées (login, invite)
- Les glows de stage sont désactivés en light mode (opacité 0)
- Anti-flash : script inline dans le `<head>` qui lit localStorage et pose
  `data-theme` avant le premier paint

### Critères d'acceptation Sprint 4
- [ ] Inviter un membre par email → il reçoit l'email, clique, rejoint le workspace
- [ ] Le membre invité voit les mêmes deals, ses actions sont visibles par l'owner
- [ ] Settings : changer le nom du cabinet → mis à jour partout instantanément
- [ ] `/admin` accessible uniquement avec email GrowthCompta
- [ ] Suspendre un workspace → les membres voient la bannière et ne peuvent plus mutater
- [ ] Réactiver le workspace → accès rétabli immédiatement sans refresh
- [ ] Toggle light/dark → bascule instantané, persisté après refresh
- [ ] App installable comme PWA sur mobile (manifest + meta tags)
- [ ] Skeleton screens visibles 200ms au chargement (simular slow 3G dans DevTools)

---

## 14. Sprint 5 — Intégrations natives `jours 21–28`

### Objectif
Connecter GClients aux outils déjà utilisés par les cabinets comptables.
Chaque intégration est native : bouton "Connecter" dans Settings → OAuth →
sync automatique. Pas besoin de Make/Zapier pour les cas d'usage principaux.

L'onglet Settings gagne un sous-onglet **Intégrations** avec une grille de
connecteurs (nom + logo + status badge connected/disconnected + bouton action).

---

### T5.1 — Infrastructure OAuth commune

Avant d'implémenter les connecteurs individuels, poser la fondation :

- `app/api/integrations/[provider]/connect/route.ts` : initie le flow OAuth
  (redirect vers le provider avec `state = workspaceId + CSRF`)
- `app/api/integrations/[provider]/callback/route.ts` : reçoit le code,
  échange contre access + refresh token, stocke dans `integration_tokens`
  **via le service role** — cette table n'a aucune policy RLS client (section 6),
  les tokens ne transitent jamais par le navigateur
- Le statut de connexion affiché dans Settings vient du RPC
  `get_integration_status(workspaceId)` (section 6) qui retourne
  provider + connected, jamais les tokens
- `lib/integrations/refresh.ts` : helper générique pour rafraîchir un token
  expiré avant chaque appel API
- **Tous les endpoints webhook entrants vérifient la signature** du provider
  (header HMAC ou secret partagé) avant de traiter le payload — un webhook
  non signé est une porte d'entrée pour injecter des activités
- Composant `IntegrationCard` : carte réutilisable avec logo, nom, description,
  status (connected/error/disconnected), bouton connect/disconnect

---

### T5.2 — Pennylane

**Déclencheur sur signature** : quand un deal passe en stage `signe`, créer
automatiquement le dossier client dans Pennylane.

OAuth :
- `PENNYLANE_CLIENT_ID` / `PENNYLANE_CLIENT_SECRET` dans `.env`
- Scopes : `customers:write`
- Redirect URI : `{APP_URL}/api/integrations/pennylane/callback`

Sync :
```typescript
// Appelé dans updateDealStage() quand newStage === 'signe'
async function syncDealToPennylane(deal: Deal, workspaceId: string) {
  const token = await getIntegrationToken(workspaceId, 'pennylane') // service role
  if (!token) return  // intégration non connectée, silencieux
  const contact = deal.contact_id ? await getContact(deal.contact_id) : null
  await pennylaneAPI.createCustomer({
    name: deal.company_name,
    source_id: deal.ref,                  // pour idempotence
    billing_email: contact?.email ?? '',  // résolu via la FK contact_id
  })
}
```

Affichage : dans DealCard et le SlideOver, badge "Sync Pennylane" sur les deals
en stage `signe` qui ont été synchronisés (flag `meta.pennylane_synced` dans
le deal ou dans `integration_tokens.meta`).

---

### T5.3 — Tiime

Même pattern que Pennylane — un workspace utilisera l'un OU l'autre.
Settings affiche les deux connecteurs, mais bloque si l'autre est déjà connecté
("Vous utilisez déjà Pennylane. Déconnectez-le pour activer Tiime.").

OAuth Tiime : API moins documentée — implémenter en mode "API key" si OAuth
non disponible (champ texte dans Settings pour coller la clé API Tiime).

Action à la signature : `POST /api/v1/clients` avec `{ name, siret }`.

---

### T5.4 — Gmail / Outlook

**Objectif** : les emails envoyés aux contacts apparaissent automatiquement
comme activités `email` dans GClients.

**Gmail** :
- OAuth Google : scopes `gmail.readonly` + `gmail.send`
- Après connexion : enregistrer un Gmail Push Notification (Pub/Sub Google)
  vers `app/api/integrations/gmail/webhook/route.ts`
- ⚠️ **Le `users.watch()` Gmail expire au bout de 7 jours.** Sans renouvellement,
  l'intégration meurt silencieusement. Ajouter au cron quotidien existant
  (`app/api/cron/stagnant/route.ts` ou un cron dédié `integrations-renew`) le
  renouvellement du watch pour chaque workspace connecté à Gmail. Stocker
  l'expiration dans `integration_tokens.meta.watch_expires_at`.
- À chaque nouveau message : si l'expéditeur ou destinataire correspond à un
  contact GClients (matching par `contacts.email`, index déjà en place), créer
  une activité `email` avec `source = 'gmail'` et `contact_id` renseigné ;
  rattacher au deal ouvert le plus récent de ce contact via `deals.contact_id`
- Affichage : les emails importés ont un badge "Gmail" dans la timeline activités
  (champ `activities.source`)

**Outlook** :
- OAuth Microsoft : scopes `Mail.Read`
- Microsoft Graph webhooks vers `app/api/integrations/outlook/webhook/route.ts`
- ⚠️ **Les subscriptions Microsoft Graph sur les mails expirent en ~3 jours
  maximum.** Même traitement que le watch Gmail : renouvellement dans le cron
  quotidien, expiration stockée dans `meta.subscription_expires_at`.
- Même logique de matching et création d'activité (`source = 'outlook'`)

**Envoi depuis GClients** (optionnel, Sprint 5+) :
- Bouton "Envoyer un email" sur un deal → ouvre composer in-app
- Envoi via Gmail/Outlook API avec l'email connecté

---

### T5.5 — Calendly

**Objectif** : quand un meeting Calendly est planifié avec un contact GClients,
créer une activité `réunion` avec la date, l'objet et le lien de la réunion.

- OAuth Calendly : scope `default`
- Créer un webhook Calendly via API : `invitee.created` → 
  `app/api/integrations/calendly/webhook/route.ts`
- À chaque event : matching par email de l'invité → créer activité `réunion`
  sur le deal correspondant (deal le plus récent de ce contact)
- Si aucun deal trouvé : créer l'activité sans deal_id (visible dans Activities globales)

---

### T5.6 — Pappers / INPI

**Objectif** : enrichissement automatique des données entreprise. Quand un deal
est créé avec un nom d'entreprise, GClients propose d'auto-remplir les données
depuis Pappers.

- API Pappers (clé API dans Settings → Intégrations) — pas d'OAuth, clé API simple
- Dans le SlideOver de création d'un deal : champ "Entreprise" avec autocomplete
  qui interroge Pappers `GET /entreprises?q={query}` (debounce 300ms)
- Sélectionner une entreprise → remplit automatiquement : secteur (code NAF → libellé),
  SIREN, dirigeant principal (en tant que Contact suggéré)
- Ne pas stocker de données Pappers en DB — juste utiliser pour pré-remplir le formulaire

API key : `PAPPERS_API_KEY` dans `.env`.

---

### T5.7 — Aircall

**Objectif** : log automatique des appels + click-to-call.

**Log automatique** :
- Dans Settings → Intégrations → Aircall : entrer le webhook secret Aircall
- Créer un endpoint `app/api/integrations/aircall/webhook/route.ts`
- Écouter l'event `call.ended` : extraire numéro appelé/appelant, durée, date
- Matching par téléphone contre les contacts GClients
- Si match : créer activité `appel` avec note "Appel Aircall — Xmin Ys"
  et mise à jour de `last_activity_at` sur le deal lié

**Click-to-call** :
- Dans DealCard et ContactSlideOver : icône téléphone → ouvre `aircall://dial/{phone}`
  (protocole Aircall desktop app) ou `https://phone.aircall.io/calls/new?phone=`

---

### T5.8 — Ringover

Même pattern qu'Aircall (les deux ne peuvent pas être actifs simultanément —
même garde que Pennylane/Tiime).

- Webhook Ringover sur `call_ended`
- Click-to-call via `ringover://` protocol ou l'API web Ringover

---

### T5.9 — Make (Webhooks sortants)

**Objectif** : permettre aux utilisateurs de connecter GClients à n'importe quel
scénario Make sans code.

Dans Settings → Intégrations → Make :
- Champ "URL du webhook" (fourni par Make)
- Triggers disponibles (checkboxes) :
  - Nouveau deal créé
  - Deal changé de stage
  - Deal signé
  - Nouvelle activité logée
  - Nouveau contact créé

À chaque trigger coché : `POST {webhookUrl}` avec le payload JSON de l'entité.

```typescript
// lib/integrations/make.ts
export async function sendMakeWebhook(
  workspaceId: string,
  event: MakeEvent,
  payload: Record<string, unknown>
) {
  const config = await getMakeConfig(workspaceId)
  if (!config?.webhookUrl || !config.triggers.includes(event)) return
  await fetch(config.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, timestamp: new Date().toISOString(), data: payload }),
  })
}
```

Stocker la config Make dans `integration_tokens.meta` (provider = 'make', pas d'OAuth).

---

### Structure des fichiers Sprint 5

```
app/
├── api/
│   └── integrations/
│       ├── [provider]/
│       │   ├── connect/route.ts     # Initie OAuth
│       │   └── callback/route.ts    # Reçoit token
│       ├── gmail/webhook/route.ts
│       ├── outlook/webhook/route.ts
│       ├── calendly/webhook/route.ts
│       └── aircall/webhook/route.ts
├── (app)/settings/
│   └── integrations/                # Nouvel onglet Settings
│       └── page.tsx
lib/
├── integrations/
│   ├── oauth.ts          # Helpers communs OAuth
│   ├── refresh.ts        # Refresh token générique
│   ├── pennylane.ts      # API Pennylane
│   ├── tiime.ts          # API Tiime
│   ├── gmail.ts          # Gmail API
│   ├── outlook.ts        # Microsoft Graph
│   ├── calendly.ts       # Calendly API
│   ├── pappers.ts        # Pappers API
│   ├── aircall.ts        # Aircall webhooks + click-to-call
│   ├── ringover.ts       # Ringover webhooks
│   └── make.ts           # Make webhooks sortants
components/
└── settings/
    ├── IntegrationCard.tsx          # Carte réutilisable
    └── IntegrationsView.tsx         # Grille de connecteurs
```

### Variables d'environnement supplémentaires (Sprint 5)
```bash
# Pennylane
PENNYLANE_CLIENT_ID=
PENNYLANE_CLIENT_SECRET=

# Google (Gmail)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_PUBSUB_TOPIC=

# Microsoft (Outlook)
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_TENANT_ID=common

# Calendly
CALENDLY_CLIENT_ID=
CALENDLY_CLIENT_SECRET=

# Pappers
PAPPERS_API_KEY=

# Aircall
AIRCALL_WEBHOOK_SECRET=

# Ringover
RINGOVER_WEBHOOK_SECRET=
```

### Critères d'acceptation Sprint 5
- [ ] Settings → Intégrations affiche tous les connecteurs avec status correct
- [ ] Connecter Pennylane → déplacer un deal en Signé → vérifier création client dans Pennylane
- [ ] Tiime bloqué si Pennylane déjà connecté (et vice-versa)
- [ ] Envoyer un email Gmail à un contact → activité apparaît dans GClients < 30s
- [ ] Créer un event Calendly avec email d'un contact → activité réunion créée
- [ ] Champ entreprise avec autocomplete Pappers → sélection remplit le formulaire
- [ ] Terminer un appel Aircall avec numéro d'un contact → activité appel créée
- [ ] Click-to-call sur une card → appel lancé dans Aircall/Ringover
- [ ] Webhook Make déclenché sur signature de deal → payload reçu dans Make

---

## 15. Contraintes transversales (valables pour tous les sprints)

### Code
- TypeScript strict (`"strict": true` dans tsconfig)
- Toutes les fonctions service sont `async` et retournent `Promise<T>`
- Erreurs Supabase : toujours vérifier `error` et throw/retourner proprement
- Pas de `any`, pas de `// @ts-ignore`
- Server Components par défaut, `'use client'` uniquement si hooks ou events

### Sécurité
- Jamais de `SUPABASE_SERVICE_ROLE_KEY` côté client
- Toutes les mutations passent par RLS — ne pas bypasser avec service role
- Valider les inputs côté serveur (zod ou validation manuelle)
- Headers sécurité dans `next.config.ts` : X-Frame-Options, CSP minimal

### Performance
- Pas de fetch waterfalls : paralléliser avec `Promise.all`
- Debounce 200ms sur la recherche
- Images Supabase Storage via `next/image` avec `sizes` appropriés
- Bundle : pas d'import de librairies entières si tree-shaking possible

### Design
- Respecter scrupuleusement le design system section 4
- Tailwind uniquement pour le layout/spacing/typography
- Inline styles uniquement pour les valeurs dynamiques calculées en JS
  (couleurs de stage, glow box-shadow)
- Deux thèmes (dark défaut + light) via les tokens `--gc-*` et l'attribut
  `data-theme` — jamais de prefix Tailwind `dark:`, jamais de couleurs
  hardcodées dans les composants (voir section 4 et T4.6)

### Git
- Une branche par sprint : `sprint/1-foundation`, `sprint/2-core`, etc.
- Commits conventionnels : `feat:`, `fix:`, `chore:`
- PR vers `main` à la fin de chaque sprint

---

## 16. CLAUDE.md à placer à la racine du repo gclients

```markdown
# GClients — Instructions pour agents

## Ce projet
SaaS CRM multi-tenant pour cabinets comptables. Voir GCLIENTS_SPEC.md dans
floshii/growthcompta pour les specs complètes si tu as besoin de contexte.

## Stack
Next.js 15 App Router · React 19 · TypeScript strict · Tailwind v4 · Supabase

## Commandes
- `npm run dev` — dev server
- `npm run build` — vérifier avant tout commit
- `npx tsc --noEmit` — type check

## Règles absolues
1. Lire les docs Next.js dans node_modules/next/dist/docs/ avant d'utiliser
   une API — cette version peut différer de tes données d'entraînement
2. Server Components par défaut. 'use client' seulement si hooks/events
3. Jamais SUPABASE_SERVICE_ROLE_KEY côté client
4. npm run build doit passer avant chaque push
5. Tailwind pour tout ce qui est statique, inline style pour les valeurs
   dynamiques calculées depuis des variables JS (couleurs de stage, glows)

## Design system
Voir section 4 de GCLIENTS_SPEC.md. En résumé :
- Dark mode par défaut + light mode complet (toggle Settings)
- Tokens CSS `--gc-*` sur `:root` (dark) et `:root[data-theme="light"]` —
  jamais de classes de thème, jamais de couleurs hardcodées, jamais de `dark:`
- --gc-bg: #0A0A0F (dark) / #F4F5F8 (light), --gc-surface: #111118 (dark) / #FFFFFF (light)
- Inter pour UI, JetBrains Mono pour les nombres
- Stages : blue/purple/amber/orange/green (invariants dark/light)
- Glow effects (text-shadow, box-shadow) : activés en dark, désactivés en light

## Modèle de données — règles non négociables
- deals.owner_id / contact_id / company_id sont des FK — jamais de matching
  par initiales ou par nom en texte libre
- Le stage d'un deal ne change JAMAIS sans passer par un UPDATE de deals.stage
  (le trigger journalise dans deal_stage_events et remplit signed_at)
- integration_tokens : service role uniquement, aucun accès client
- Création de workspace : RPC create_workspace_with_owner(), jamais d'INSERT direct
- Acceptation d'invitation : service role côté serveur uniquement

## Référence UI
Les composants prototype sont dans floshii/growthcompta branche
claude/gclients-crm-build-5hhrk4, dossier components/crm/
```

---

*Spec rédigée le 9 juin 2026 — version 1.2 (10 juin 2026)*
*Auteur : Claude (session GClients CRM build)*

**Changelog v1.2 (10 juin 2026) — revue pré-lancement :**
- **Sécurité RLS** : suppression du `OR user_id = auth.uid()` sur members_insert
  (n'importe qui pouvait rejoindre n'importe quel workspace), du
  `OR token IS NOT NULL` sur invitations_select (toutes les invitations de tous
  les workspaces étaient lisibles, tokens inclus), du `UPDATE USING (true)` sur
  invitations ; integration_tokens passe en service-role-only ; ajout du RPC
  `create_workspace_with_owner()`, du garde anti-escalade de rôle, et du test
  d'isolation obligatoire `scripts/test-rls.ts` (T1.6)
- **Modèle relationnel** : deals.owner_id/contact_id/company_id en FK (les
  initiales et noms en texte libre rendaient impossibles les alertes T3.3 et
  tout le matching Sprint 5) ; PK uuid + ref "GC-XXXX" générée par trigger
- **Historique des stages** : table deal_stage_events + trigger (signed_at
  auto) — le MRR mensuel et le funnel se calculent depuis l'historique, plus
  depuis created_at ; index ajoutés sur toutes les colonnes RLS/matching
- **Suspension** : lecture conservée pour afficher la bannière, mutations
  bloquées via is_workspace_active() ; superadmin = service role server-side
- **Alertes stagnants** : cooldown 7 jours via last_alerted_at (plus de spam quotidien)
- **Intégrations** : renouvellement du watch Gmail (7 j) et des subscriptions
  Graph (~3 j) dans le cron ; vérification de signature sur tous les webhooks
- **Cohérence** : un seul système de thème (tokens --gc-* + data-theme),
  suppression des reliquats "dark mode only" et tailwind.config.ts (v4 =
  CSS-first), middleware réécrit pour la vraie API @supabase/ssr (route groups
  non matchables en URL, getUser() au lieu de getSession()), recharts v3
  (React 19), seed.sql autosuffisant, clé API workspace reportée (pas d'API
  publique spécifiée), schema.sql = source de vérité unique (status, theme)*
