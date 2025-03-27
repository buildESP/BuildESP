# 🚀 README – Lancement du **Frontend**

## ⚛️ Lancement du Frontend (React)

---

## 📦 Prérequis

- Node.js `v22+`
- npm ou yarn
- Docker (optionnel, pour MySQL backend)

---

### 1️⃣ Cloner le repo

git clone git@github.com:buildESP/BuildESP.git
cd frontend
 ###2️⃣ Créer un fichier .env

# .env
```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AUTH_TOKEN_KEY=authToken
VITE_APP_NAME=Neighborrow
VITE_DEFAULT_LANGUAGE=fr
VITE_DEBUG_MODE=true
VITE_IMAGE_MAX_SIZE=5000000
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug
```
 ### 3️⃣ Installer les dépendances
```bash
npm install
```
4️⃣ Lancer le projet

```bash
npm run dev
```

✅ L'application est maintenant accessible sur : http://localhost:5173 🎉

### 🧱 Architecture du dossier `src/`

| Dossier / Fichier        | Description |
|--------------------------|-------------|
| `assets/`                | Images et fichiers statiques |
| `components/`            | Composants UI réutilisables (Navbar, Modals, Tables…) |
| `context/`               | Providers React (AuthContext, ItemContext…) |
| `hooks/`                 | Hooks personnalisés (useAuth, useFetchData, etc.) |
| `layouts/`               | Layouts d’application (MainLayout, AuthLayout…) |
| `lib/`                   | Fonctions utilitaires (formatDate, etc.) |
| `pages/`                 | Pages principales (Accueil, Profil, etc.) |
| `routes/`                | Fichier de routing (AppRoutes.jsx) |
| `services/`              | Fonctions de requêtes API (userService, authService…) |
| `validation/`            | Schémas de validation Zod |
| `App.jsx`                | Composant racine de l’application |
| `main.jsx`               | Point d’entrée de l’application |
| `index.css / App.css`    | Styles globaux et principaux |

