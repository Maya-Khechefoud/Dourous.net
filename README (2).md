# Dourous-Net — Extranet Éducatif de Réservation de Séances

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Supabase%20%7C%20Vercel-black) ![License](https://img.shields.io/badge/license-MIT-green)

> Plateforme extranet permettant aux étudiants de réserver des séances pédagogiques avec des professeurs, avec gestion documentaire intégrée.

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Modèle de données](#2-modèle-de-données)
3. [Sécurité — Row Level Security](#3-sécurité--row-level-security)
4. [Fonctionnalités](#4-fonctionnalités)
5. [Analyse d'Architecture](#5-analyse-darchitecture)
6. [Déploiement CI/CD](#6-déploiement-cicd)
7. [Installation locale](#7-installation-locale)

---

## 1. Présentation du projet

**Dourous-Net** est un extranet éducatif conçu pour faciliter la mise en relation entre étudiants et enseignants dans un cadre académique structuré. La plateforme offre un système de réservation de séances pédagogiques individuelles ou collectives, assorti d'une fonctionnalité d'envoi de devoirs au format PDF.

### Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Interface utilisateur, rendu hybride SSR/CSR |
| Backend | Supabase (PostgreSQL 15) | Base de données relationnelle, API REST/GraphQL auto-générée |
| Authentification | Supabase Auth (JWT) | Gestion des sessions, OAuth, RLS |
| Stockage fichiers | Supabase Storage (S3-compatible) | Hébergement des PDF de devoirs |
| Déploiement | Vercel (Edge Network) | Hosting serverless, CI/CD automatisé |

---

## 2. Modèle de données

### Table A — `students` (Élèves)

Les élèves sont gérés nativement via **Supabase Auth**. Chaque inscription crée une entrée dans la table système `auth.users`. Une table publique `students` étend ce profil avec des métadonnées applicatives.

```sql
CREATE TABLE students (
  id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT        NOT NULL,
  level     TEXT,                        -- Ex : "Licence 2", "Master 1"
  created_at TIMESTAMPTZ DEFAULT now()
);
```

> L'identifiant `id` est directement lié à `auth.users.id`, garantissant une cohérence référentielle entre la couche d'authentification et la couche applicative.

---

### Table B — `professors` (Professeurs)

```sql
CREATE TABLE professors (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name  TEXT        NOT NULL,
  subject    TEXT        NOT NULL,        -- Ex : "Réseaux", "Bases de données"
  bio        TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

### Table C — `sessions` (Séances)

Table de jonction enrichie reliant un étudiant à un professeur, avec horodatage et gestion de statut.

```sql
CREATE TABLE sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID REFERENCES students(id)   ON DELETE CASCADE,
  professor_id  UUID REFERENCES professors(id) ON DELETE SET NULL,
  scheduled_at  TIMESTAMPTZ NOT NULL,
  status        TEXT DEFAULT 'pending'          -- 'pending' | 'confirmed' | 'cancelled'
  notes         TEXT,
  pdf_path      TEXT,                           -- Chemin vers Supabase Storage
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

---

### Storage — PDF des devoirs

Les fichiers PDF soumis lors de la réservation sont stockés dans un **bucket Supabase Storage** nommé `homework-pdfs`, organisé par étudiant :

```
homework-pdfs/
└── {student_id}/
    └── {session_id}/
        └── devoir.pdf
```

L'accès au bucket est restreint via des **Storage Policies** identiques aux RLS PostgreSQL, assurant qu'un étudiant ne peut accéder qu'à son propre répertoire.

---

## 3. Sécurité — Row Level Security

### Principe du RLS

Le **Row Level Security (RLS)** est un mécanisme natif de PostgreSQL permettant de filtrer les lignes retournées par une requête en fonction de l'identité de l'utilisateur connecté. Une fois activé sur une table, **toute requête — même une requête administrative — est filtrée par les politiques définies**, sauf si elle est exécutée avec le rôle `service_role` (back-office).

```sql
-- Activation du RLS sur la table sessions
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
```

### Utilisation de `auth.uid()`

Supabase injecte automatiquement l'identifiant de l'utilisateur authentifié dans la variable de session PostgreSQL `auth.uid()`. Cette fonction retourne l'UUID du JWT décodé, lié à `auth.users.id`.

### Politique appliquée — Isolation des séances par étudiant

```sql
CREATE POLICY "student_sees_own_sessions"
ON sessions
FOR SELECT
USING (
  student_id = auth.uid()
);
```

**Mécanisme** : lorsqu'un étudiant effectue une requête `SELECT` sur `sessions`, PostgreSQL évalue la clause `USING`. Seules les lignes dont `student_id` correspond à `auth.uid()` (son propre UUID) sont retournées. Les séances des autres étudiants sont **invisibles au niveau du moteur de base de données**, indépendamment de la logique applicative. Ce principe garantit une isolation forte des données, conforme aux exigences RGPD en matière de confidentialité.

---

## 4. Fonctionnalités

### Flux utilisateur complet

```
[Inscription]
    │
    ▼
Formulaire Next.js → supabase.auth.signUp() → Email de confirmation
    │
    ▼
[Connexion]
    │
    ▼
supabase.auth.signInWithPassword() → Génération JWT → Session côté client
    │
    ▼
[Consultation des professeurs]
    │
    ▼
SELECT * FROM professors → Affichage des profils (matière, bio, disponibilités)
    │
    ▼
[Réservation d'une séance]
    │
    ▼
INSERT INTO sessions (student_id, professor_id, scheduled_at) → statut 'pending'
    │
    ▼
[Upload du devoir PDF]
    │
    ▼
supabase.storage.from('homework-pdfs').upload(path, file) → Mise à jour sessions.pdf_path
    │
    ▼
[Dashboard étudiant]
    │
    ▼
SELECT * FROM sessions WHERE student_id = auth.uid() → Liste des séances avec statuts
```

---

## 5. Analyse d'Architecture

### 5.1 CAPEX vs OPEX

**CAPEX** (*Capital Expenditure*) désigne les dépenses d'investissement en infrastructure physique : achat de serveurs, licences logicielles perpétuelles, équipements réseau, onduleurs, et coûts de datacenter (surface, climatisation, câblage). Ces dépenses sont immobilisées au bilan et amorties sur plusieurs années. Elles impliquent une capacité figée, dimensionnée pour le pic de charge théorique, et engagent l'organisation indépendamment de l'utilisation réelle.

**OPEX** (*Operational Expenditure*) désigne les dépenses opérationnelles récurrentes, facturées à l'usage. Dans le modèle cloud, cela se traduit par un paiement proportionnel à la consommation réelle : requêtes traitées, bande passante, stockage utilisé.

**Avantage de Dourous-Net avec le modèle OPEX :**

| Critère | Serveur classique (CAPEX) | Supabase + Vercel (OPEX) |
|---|---|---|
| Coût initial | Élevé (matériel, licences) | Nul — démarrage gratuit |
| Maintenance matérielle | À charge de l'équipe | Externalisée au fournisseur |
| Scalabilité | Manuelle, limitée | Automatique, élastique |
| Disponibilité | Dépend de l'infrastructure locale | SLA garanti (99.9%) |
| Flexibilité budgétaire | Faible (amortissement) | Haute (pay-as-you-go) |

Pour un projet académique à charge variable (pics en période d'examens), le modèle OPEX élimine le sur-provisionnement et réduit les coûts initiaux à zéro, permettant une mise en production immédiate sans immobilisation de capital.

---

### 5.2 Scalabilité — Cloud vs Data Center physique

**Vercel** repose sur une architecture **serverless** : chaque requête HTTP est traitée par une **Edge Function** déclenchée à la demande, sans serveur persistant. Le scaling est horizontal, automatique et instantané.

| Critère | Data Center physique | Vercel (Serverless) |
|---|---|---|
| Unité de scaling | Serveur entier | Fonction individuelle |
| Temps de réaction | Minutes/heures (provisionnement) | Millisecondes (auto-scaling) |
| CDN | Manuel ou coûteux | Intégré — 100+ PoP mondiaux |
| Capacité maximale | Plafonnée par le matériel | Illimitée (théoriquement) |
| Coût en idle | Constant (serveur allumé) | Nul (facturation à l'exécution) |

Pour Dourous-Net, lors d'un pic de réservations simultanées (ex. : veille d'examens), Vercel instancie automatiquement les fonctions nécessaires sans intervention humaine. Un data center physique nécessiterait une sur-capacité permanente ou un délai de provisionnement incompatible avec les exigences de disponibilité.

---

### 5.3 Données structurées vs non-structurées

**Données structurées — PostgreSQL (Supabase)**

Les tables `students`, `professors` et `sessions` constituent le cœur relationnel de la plateforme. Ces données obéissent à un schéma défini (types, contraintes, clés étrangères), sont indexables, interrogeables via SQL, et soumises aux transactions ACID. Elles permettent des requêtes analytiques précises : taux de réservation par professeur, statistiques de présence, état des séances.

**Données non-structurées — Supabase Storage**

Les fichiers PDF des devoirs n'ont pas de schéma interne exploitable par PostgreSQL. Ils sont des **blobs binaires** stockés dans un système de fichiers objet (compatible S3), référencés uniquement par leur chemin (`pdf_path`) dans la table `sessions`.

**Complémentarité des deux modèles :**

```
PostgreSQL                    Supabase Storage
─────────────────             ──────────────────────
sessions.id ──────────────►  homework-pdfs/{student_id}/{session_id}/devoir.pdf
sessions.pdf_path (TEXT)
```

La séparation est architecturalement nécessaire : stocker des PDF en base de données (colonnes `BYTEA`) dégraderait les performances des requêtes relationnelles et augmenterait exponentiellement la taille des backups. Le stockage objet est optimisé pour les lectures/écritures de fichiers volumineux, avec CDN intégré pour la diffusion.

---

## 6. Déploiement CI/CD

### Pipeline automatisé GitHub → Vercel

```
Developer
    │
    ▼
git push origin main
    │
    ▼
GitHub (dépôt source)
    │  Webhook déclenché automatiquement
    ▼
Vercel Build Pipeline
    ├── Install dependencies (npm ci)
    ├── Lint & Type check (ESLint, TypeScript)
    ├── Build Next.js (next build)
    └── Deploy to Edge Network
    │
    ▼
Production URL (https://dourous-net.vercel.app)
```

Chaque **pull request** génère une **Preview Deployment** sur une URL dédiée, permettant une validation avant fusion. Les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) sont injectées de manière sécurisée via l'interface Vercel, sans exposition dans le dépôt Git.

---

## 7. Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/username/dourous-net.git
cd dourous-net

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Lancer le serveur de développement
npm run dev
```

---

## Auteur

Projet académique développé dans le cadre d'un cours d'Architecture des Systèmes d'Information.

---

*Dourous-Net — Architecture Cloud Serverless · Supabase · Vercel · Next.js*
