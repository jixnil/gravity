# Installer et lancer GRAVITY

Ce dossier contient le code source du site GRAVITY, avec son visuel original, ses composants d’interface et le formulaire de demande de devis.

## 1. Prérequis

- Node.js 22.13.0 ou supérieur, conformément au projet.
- pnpm 11.25.0, version déclarée dans `package.json`.
- Une connexion Internet pour télécharger les dépendances lors de la première installation.

Vérifiez Node.js :

```sh
node --version
```

Si pnpm n’est pas installé :

```sh
npm install --global pnpm@11.25.0
```

## 2. Ouvrir le projet

Décompressez le ZIP et ouvrez le dossier `gravity` dans VS Code. Ouvrez un terminal dans ce dossier, celui qui contient `package.json`.

```sh
pnpm install --frozen-lockfile
```

Cette commande convient à Windows PowerShell et à Linux. Le script historique `install:ci` du projet est destiné à l’environnement Linux géré ; l’installation locale se fait avec la commande ci-dessus.

## 3. Préparer le formulaire de devis

Le formulaire sauvegarde ses données dans une base D1, basée sur SQLite. En local, Wrangler simule cette base dans le dossier `.wrangler/state`.

Construisez le projet pour générer la configuration locale :

```sh
pnpm build
```

Appliquez la migration initiale sur une base locale neuve :

```sh
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_messy_tombstone.sql
```

La migration initiale est à appliquer une seule fois par base locale. Les futures modifications du schéma produiront leurs propres migrations.

## 4. Lancer le développement

```sh
pnpm dev
```

Ouvrez l’adresse affichée par le terminal, normalement :

```text
http://localhost:5173
```

Les fichiers du site peuvent ensuite être modifiés avec rechargement pendant le développement.

## 5. Tester la version construite

```sh
pnpm build
pnpm start
```

Ouvrez l’adresse indiquée par Wrangler. Ce mode lance localement le Worker construit ; il ne publie pas le site sur Internet.

## 6. Fichiers principaux

| Fichier | Rôle |
| --- | --- |
| `app/page.tsx` | Sections du site, offres, FAQ et formulaire. |
| `app/globals.css` | Couleurs, typographie, disposition et adaptation mobile. |
| `app/layout.tsx` | Titre, description, langue et favicon. |
| `app/api/devis/route.ts` | Validation et sauvegarde des demandes de devis. |
| `lib/quote.ts` | Prestations disponibles et règles de validation. |
| `db/schema.ts` | Structure de la table des demandes de devis. |
| `db/index.ts` | Accès à la base D1. |
| `drizzle/` | Migration SQL et historique du schéma. |
| `public/images/gravity-orbital.webp` | Visuel original optimisé. |
| `components/ui/` | Composants utilisés par l’interface. |
| `.openai/hosting.json` | Identité du Site GRAVITY et déclaration du binding DB. |

## 7. Personnaliser le contenu

Dans `app/page.tsx`, complétez les projets réels, leurs captures, les prix en ariary, les profils de l’équipe et les coordonnées. Le lien WhatsApp sera à raccorder à votre numéro réel.

Le formulaire enregistre les demandes et retourne une référence. Il inclut une validation des champs, un consentement obligatoire, une protection contre les doublons lors d’une nouvelle tentative et une limite de fréquence. Il n’envoie pas d’e-mail : une intégration d’envoi et une adresse de réception restent à configurer.

## 8. Contenu de l’archive

Le ZIP contient les sources et le fichier de verrouillage des dépendances. Les dépendances installées, les caches, les données locales et les sorties de compilation sont exclus. Vous les recréez avec les commandes ci-dessus.
