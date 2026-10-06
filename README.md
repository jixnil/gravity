# GRAVITY

Site professionnel en français pour le collectif de développeurs GRAVITY à Madagascar : accueil, services, portfolio, tarifs en MGA, équipe, méthode, FAQ et demandes de devis.

## Contenu à compléter

- Réalisations : ajouter uniquement des captures et références réelles dans `app/page.tsx`.
- Prix : renseigner les montants, périmètres et frais récurrents validés par GRAVITY.
- Équipe : ajouter les profils des membres.
- Contact : renseigner l’adresse e-mail et le téléphone. Aucun lien WhatsApp fictif n’est utilisé.

## Formulaire

`POST /api/devis` valide et enregistre les demandes dans D1. Les soumissions possèdent une référence et un identifiant pour éviter les doublons lors des nouvelles tentatives. Les informations saisies sont conservées à l’écran en cas d’échec. Le formulaire ne transmet aucun e-mail : aucun fournisseur ni adresse de réception n’a été fourni. Les demandes enregistrées peuvent être consultées par le propriétaire du Site dans la table `quote_requests`.

Les requêtes invalides, les demandes depuis une autre origine et les soumissions trop fréquentes sont refusées. Les erreurs ne journalisent pas les coordonnées ni la description du client.

## Développement

Le projet utilise Vinext, React, TypeScript, les composants Shadcn installés et D1. Les migrations SQL sont générées depuis `db/schema.ts` avec le script `db:generate`.

Le visuel orbital est une création originale, et ne représente aucun projet client.

## Installation locale

Consultez [INSTALLATION.md](INSTALLATION.md) pour lancer le projet sous Windows ou Linux.
