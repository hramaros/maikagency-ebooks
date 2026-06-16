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
| `NEXT_PUBLIC_SITE_URL` | (Optionnel) URL publique pour les balises Open Graph. |

## 🔌 Workflow n8n

`Webhook → Normalize → Save Lead (Google Sheets) → Send Ebook Email (Gmail) → Respond`

- **Webhook** (`POST /webhook/ebook-prompt-engineering`) reçoit
  `{ email, profile, profileLabel, age, sector, sectorLabel }`.
- **Google Sheets** : ajoute une ligne `date | email | profil | age | secteur`.
- **Gmail** : envoie l'email marketing avec le bouton de téléchargement.

> ℹ️ Le credential Gmail doit disposer d'un token OAuth valide côté n8n.

## ☁️ Déploiement

Hébergé sur **Vercel**. Définir `N8N_WEBHOOK_URL` dans les variables
d'environnement du projet, puis déployer (build : `next build`).
