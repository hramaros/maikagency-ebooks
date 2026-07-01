# Maikagency — Landing Ebook « Devenir un dieu du prompt engineering »

Landing page (one-page) de téléchargement de l'ebook, au design cohérent avec
[maikagency-portfolio](https://github.com/hramaros/maikagency-portfolio)
(thème sombre, accent ambre `#f59e0b`, typographies Inter + JetBrains Mono,
glassmorphism et effets de glow).

## ✨ Fonctionnalités

- **Hook percutant**, titre et **packshot** de la couverture de l'ebook.
- **Formulaire de capture** : email + âge + menu déroulant de profil
  (`Étudiant` / `Professionnel`) + menu déroulant de secteur d'activité.
- Le bouton **« Recevoir l'ebook »** ne s'active **que** si tous les champs sont
  valides (email valide, âge entre 13 et 120, profil et secteur sélectionnés).
- Section **« Au programme »** (reformulation claire du sommaire).
- À la soumission, la route `POST /api/subscribe` relaie vers un **workflow n8n**
  qui, immédiatement :
  1. envoie un **email marketing structuré** (résumé du livre + remerciement +
     bouton de téléchargement du PDF) à l'adresse saisie ;
  2. enregistre **date + email + profil + âge + secteur** dans **Google Sheets**.
- Section **« Offre-moi un café »** : soutien ponctuel (3€ / 5€ / 10€) via
  **Stripe Checkout**, entièrement piloté par n8n (aucune clé Stripe côté
  Next.js). `POST /api/checkout` relaie vers n8n qui crée la session Stripe et
  renvoie l'URL de paiement.
- Section **« Donne ton avis »** (`#feedback`, aussi rappelée dans l'email de
  l'ebook) : note 1-5 + commentaire + email. `POST /api/feedback` relaie vers
  n8n qui enregistre l'avis dans Google Sheets et notifie l'équipe.

## 🏗️ Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (tokens repris du portfolio)
- [Framer Motion](https://www.framer.com/motion/) · [lucide-react](https://lucide.dev/)

## 🚀 Démarrage local

```bash
npm install
cp .env.example .env.local   # renseigner N8N_WEBHOOK_URL
npm run dev
```

## 🔧 Variables d'environnement

| Variable | Description |
| --- | --- |
| `N8N_WEBHOOK_URL` | URL du webhook n8n (envoi email + enregistrement Sheets). |
| `N8N_CHECKOUT_WEBHOOK_URL` | URL du webhook n8n qui crée la session Stripe Checkout. |
| `N8N_FEEDBACK_WEBHOOK_URL` | URL du webhook n8n qui enregistre le feedback. |
| `NEXT_PUBLIC_SITE_URL` | (Optionnel) URL publique pour les balises Open Graph. |

## 🔌 Workflows n8n

**Ebook - Prompt Engineering Lead**
`Webhook → Normalize → Save Lead (Google Sheets) → Send Ebook Email (Gmail) → Respond`

- **Webhook** (`POST /webhook/ebook-prompt-engineering`) reçoit
  `{ email, profile, profileLabel, age, sector, sectorLabel }`.
- **Google Sheets** : ajoute une ligne `date | email | profil | age | secteur`.
- **Gmail** : envoie l'email marketing avec le bouton de téléchargement + un
  lien vers la section feedback de la landing.

**Buy Me a Coffee - Créer session de paiement**
`Webhook → Normalize Amount → Montant valide ? → HTTP Request (Stripe Checkout Sessions) → Respond`

- **Webhook** (`POST /webhook/bmc-checkout`) reçoit `{ amount, currency, successUrl, cancelUrl }`.
- Le montant est validé contre la whitelist `3 / 5 / 10 €` avant d'appeler Stripe.
- **HTTP Request** appelle `POST https://api.stripe.com/v1/checkout/sessions`
  avec le credential natif **Stripe API** (aucune clé Stripe côté Next.js) et
  renvoie l'URL de paiement au front, qui redirige le navigateur.

**Buy Me a Coffee - Paiement reçu**
`Stripe Trigger (checkout.session.completed) → Normalize → Save Café (Google Sheets) → Send Thank You Email (Gmail)`

- Se déclenche automatiquement quand le paiement Stripe Checkout est complété.
- **Google Sheets** : ajoute une ligne `date | email | montant | devise` dans
  l'onglet `cafes`.
- **Gmail** : envoie un email de remerciement au donateur.

**Ebook - Feedback**
`Webhook → Normalize → Save Feedback (Google Sheets) → Notify Owner (Gmail) → Respond`

- **Webhook** (`POST /webhook/ebook-feedback`) reçoit `{ rating, comment, email }`.
- **Google Sheets** : ajoute une ligne `date | note | commentaire | email` dans
  l'onglet `feedback`.
- **Gmail** : notifie l'équipe par email à chaque nouvel avis.

> ℹ️ Les credentials Gmail / Google Sheets / Stripe doivent être configurés côté
> n8n (voir la section Setup ci-dessous pour le détail).

## ⚙️ Setup n8n requis (à faire une fois)

1. **Credential Stripe** : créer un credential de type **Stripe API** dans n8n
   (nommé `Maikagency - Stripe API`) avec la clé secrète Stripe. Utilisé par les
   deux workflows Buy Me a Coffee.
2. **Onglets Google Sheets** : dans le spreadsheet existant (celui utilisé par
   `Save Lead`), créer deux nouveaux onglets nommés `cafes`
   (colonnes `date, email, montant, devise`) et `feedback`
   (colonnes `date, note, commentaire, email`).
3. **Vérifier les credentials Gmail/Sheets** sur chaque nouveau node : le
   compte de service a plusieurs credentials du même type, à confirmer
   manuellement dans l'UI n8n.
4. **Publier** les workflows `Buy Me a Coffee - Créer session de paiement`,
   `Buy Me a Coffee - Paiement reçu` et `Ebook - Feedback` une fois les
   credentials vérifiés.

## ☁️ Déploiement

Hébergé sur **Vercel**. Définir `N8N_WEBHOOK_URL`, `N8N_CHECKOUT_WEBHOOK_URL`
et `N8N_FEEDBACK_WEBHOOK_URL` dans les variables d'environnement du projet,
puis déployer (build : `next build`).
