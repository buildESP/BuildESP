# Neighborrow – Plateforme de prêt d’objets entre voisins 🔧🏡

**Neighborrow** est une application web collaborative qui permet aux utilisateurs de **partager, prêter et emprunter des objets** entre voisins. L’objectif est de favoriser une consommation plus responsable et solidaire, tout en renforçant les liens de proximité.

---

## 🛠️ Technologies utilisées

| Frontend        | Backend        | Autres                  |
|----------------|----------------|-------------------------|
| React 19 ⚛️       | Express.js 🚂    | Docker 🐳                |
| Vite ⚡          | Sequelize 🗃️      | MySQL 🐬                 |
| Chakra UI 🎨      | JWT Auth 🔐       | ESLint / Prettier 🧹     |
| Zod ✅           | Swagger 🧾        | GitHub Actions ⚙️       |
| React Hook Form ✍️ |                 |                         |

---

## ✨ Fonctionnalités clés

- 🔐 Authentification sécurisée (JWT)
- 📦 Gestion des objets (ajout, édition, suppression)
- 🧑‍💼 Interface d’administration pour gérer utilisateurs, objets et catégories
- 📤 Upload d'images sur S3
- 📚 Documentation via Swagger
- 🔁 Requêtes API avec `useFetchData`
- 🧪 Tests Cypress (E2E)

---

## 📁 Structure du Projet

```bash
.
├── frontend/          # Application React (Vite)
├── backend/           # API Express avec Sequelize
├── monitoring/        # Interface & outils de suivi
├── docker-compose.yml # Docker multi-container
