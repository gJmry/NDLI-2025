# 🏛️ Village Gaulois - Nuit de l'Info 2025

> Un jeu éducatif ludique pour découvrir le **NIDR** (Numérique Inclusif, Responsable et Durable) et résister à l'invasion numérique des Big Tech !

## 📋 À propos du projet

**Village Gaulois** est une plateforme interactive créée pour la **Nuit de l'Info 2025**, inspirée de l'univers d'Astérix. Le projet sensibilise les jeunes aux principes du numérique responsable à travers des mini-jeux ludiques et des défis pédagogiques.

### 👥 Équipe développeuse
- **Titouan-Lysandre André** 
- **Nathan Priano**
- **Jérémy Girard**
- **Axel Raimondo**

---

## 🎮 Fonctionnalités principales

### 📄 Pages de navigation

#### 1. **Accueil (/)** - La taverne bienvenue
- Présentation du concept du NIDR
- Explication des trois piliers : Réemploi ♻️, Logiciels Libres 🔓, Indépendance 🛡️
- Appel à l'action "Entrer dans le village"
- Design thématique avec gradient brun-ambre inspiré de l'univers gaulois

#### 2. **Village (*/village)** - La place centrale
- **Vue interactive du village gaulois** avec des points d'accès cliquables
- Les 4 jeux sont accessibles via une **carte cliquable** du village
- Chaque jeu est représenté par un repère visuel sur le village
- Retour simple à l'accueil

### 🎯 Les 4 mini-jeux

#### **Jeu #1 : Libre ou pas Libre ? (*/libre-ou-pas-libre)**
- **Objectif** : Classifier les logiciels entre libres et propriétaires
- **Mécanique** : 
  - Glisse-dépose des packages/logiciels dans deux catégories
  - Feedback immédiat avec explication pédagogique
  - Scoring progressif
  - **Lore gaulois** : Chaque logiciel vient avec son histoire et son impact numérique
- **Exemples inclus** :
  - ✅ **Libres** : gcc, vim, make, kernel-gaulois, Linux
  - ❌ **Propriétaires** : Windows, Google Cloud, Dropbox, VSCode avec telemetry

#### **Jeu #2 : Attrape le Menhir ! (*/attrape-le-menhir)**
- **Objectif** : Attraper les objets réparables qui tombent du ciel 🎯
- **Mécanique** : 
  - Jeu de reflex au style "catch em all"
  - Obélix se déplace pour attraper/éviter les items
  - **Les items réparables** (à attraper) : câbles, écrans, téléphones, claviers
  - **Les pièges** (à éviter) : Big Tech, Cloud impérial, Verrous propriétaires, Publicités
  - **3 vies** à gérer
  - Victoire à **15 items réparables attrapés**
  - Chaque item inclut des infos lore sur la réparabilité
  - Animation crash colorée quand Obélix se fait toucher

#### **Jeu #3 : Empire Romain (*/empire-romain)**
- **Objectif** : Trouver Windows au milieu de 400 logos open source
- **Mécanique** :
  - Écran rempli de logos animés qui rebondissent (Docker, GNU, Linux, Python, Rust, Vim)
  - **1 seul logo Windows cible** à retrouver et cliquer
  - **Difficulté progressive** : temps limite et vitesse augmentent
  - Message immersif : "Défends le village de l'Empire Romain Numérique !"
  - Design avec mouvements physiques et collisions

#### **Jeu #4 : Quiz NIDR (*/quiz)**
- **Objectif** : Tester tes connaissances sur le numérique responsable
- **Contenu** :
  - **6 questions** sur le NIDR et ses principes
  - Section de **lecture progressive** avec scrolls narratifs
  - Questions à choix multiples avec **feedback personnalisé**
  - Score final avec message encourageant
  - Thème gaulois dans les réponses (mentions des "Romains numériques", etc.)
  - **Exemple de questions** :
    - Que signifient les lettres NIDR ?
    - Quel logiciel est emblématique du NIDR ?
    - Quels sont les trois piliers du NIDR ?
    - Actions pour la sobriété numérique ?

### 💬 Pages supplémentaires

#### **Formulaire de Contact (*/papyrus-form)**
- **Style** : "Parchemin gaulois" avec animations druides
- **Champs** :
  - Nom
  - Email
  - Sujet
  - Message
- **Animations** :
  - Validation "Druid Approval" avec barre de progression ✅
  - Alertes humoristiques (Obélix qui a faim, alerte romaine)
  - Envoi via API backend
- **Backend** : Intégration avec l'API `/api/contact` (nodemailer)

---

## 🛠️ Tech Stack

### Frontend
- **Framework** : [Svelte 5](https://svelte.dev/) avec SvelteKit 2.48.5
- **Styling** : [TailwindCSS 4](https://tailwindcss.com/) + Tailwind Forms/Typography
- **Build** : Vite 7.2.2
- **Language** : TypeScript 5.9.3

### Backend & Services
- **Email** : Nodemailer 7.0.11 (SMTP)
- **API externe** : Groq API (clé configurée dans `.env`)

### DevTools
- **Package Manager** : npm
- **Type Checking** : svelte-check 4.3.4
- **Versioning** : Git

---

## 📦 Installation & Lancement

### Prérequis
- Node.js 18+ 
- npm/yarn/pnpm

### Installation
```bash
# Cloner le projet
git clone <repo-url>
cd NDLI-2025

# Installer les dépendances
npm install
```

### Variables d'environnement (`.env`)
```env
GROQ_API_KEY=<ta_clé_groq>
SMTP_USER=<ton_email@gmail.com>
SMTP_PASS=<ton_mot_de_passe_app>
```

### Lancement

#### Mode développement
```bash
npm run dev
```
Ouvre `http://localhost:5173` automatiquement avec `npm run dev -- --open`

#### Build production
```bash
npm run build
```

#### Prévisualisation
```bash
npm run preview
```

#### Vérification TypeScript
```bash
npm run check
npm run check:watch
```

---

## 📁 Structure du projet

```
NDLI-2025/
├── src/
│   ├── routes/                    # Pages SvelteKit
│   │   ├── +page.svelte          # Accueil (/)
│   │   ├── village/              # Village map (*/village)
│   │   ├── libre-ou-pas-libre/   # Jeu 1
│   │   ├── attrape-le-menhir/    # Jeu 2
│   │   ├── empire-romain/        # Jeu 3
│   │   ├── quiz/                 # Jeu 4
│   │   ├── papyrus-form/         # Formulaire contact
│   │   └── api/
│   │       ├── chat/             # API chatbot (Groq)
│   │       └── contact/          # API contact (email)
│   ├── lib/
│   │   ├── components/           # Composants réutilisables
│   │   │   ├── Chatbot.svelte
│   │   │   ├── ChatBubble.svelte
│   │   │   ├── Header.svelte
│   │   │   ├── IntroLogo.svelte
│   │   │   └── TooltipDot.svelte
│   │   ├── server/               # Logique serveur
│   │   │   ├── groq.ts           # Intégration Groq
│   │   │   └── utils.ts
│   │   └── assets/               # Images, data
│   │       └── expressions.json
│   ├── app.html                  # Template HTML principal
│   ├── app.css                   # Styles globaux
│   └── app.d.ts                  # Types globaux
├── static/                       # Ressources statiques
│   ├── logos/                    # Logos pour empire-romain
│   ├── attrape-le-menhir/
│   ├── compile-ou-ca-creve/
│   ├── papyrus-form/
│   ├── village/
│   └── robots.txt
├── package.json
├── tsconfig.json
├── svelte.config.js
├── vite.config.ts
└── .env                          # Variables d'environnement
```

---

## 🎓 Concepts pédagogiques couverts

Le projet sensibilise aux principes du **NIDR** :

### 1. **Réemploi ♻️**
- Réparation vs remplacement
- Allongement de la durée de vie des appareils
- Lutte contre l'obsolescence programmée

### 2. **Logiciels Libres 🔓**
- Différence libre vs propriétaire
- Avantages de l'open source
- Audit et sécurité
- Indépendance vis-à-vis des géants

### 3. **Indépendance 🛡️**
- Souveraineté numérique
- Décentralisation vs centralisation cloud
- Protection des données personnelles
- Résistance aux Big Tech

---

## 🚀 Fonctionnalités avancées

- ✅ **Animations fluides** avec Svelte transitions
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **Système de scoring** dans les jeux
- ✅ **Feedback pédagogique** contextuel
- ✅ **API intégration** (Groq, email)
- ✅ **Accessibilité** avec sémantique HTML5
- ✅ **Design thématique cohérent** (univers gaulois)

---

## 🤝 Contribuer

Les contributions sont bienvenues ! Pour modifier le projet :

1. Créer une branche feature : `git checkout -b feature/ma-feature`
2. Committer vos changements : `git commit -m 'Add ma feature'`
3. Pousser vers la branche : `git push origin feature/ma-feature`
4. Ouvrir une Pull Request

---

## 📝 License

Projet créé pour la **Nuit de l'Info 2025**.  
À usage éducatif et libre de droits.

---

## 📞 Contact & Support

Pour des questions ou des retours :
- 📧 Email : [à compléter]
- 🐛 Signaler un bug : Créer une issue sur GitHub
- 💡 Suggestions : Proposer une discussion

---

**Par Toutatis, bienvenue dans la résistance numérique !** 🗿⚔️🛡️
