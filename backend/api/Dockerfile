# Utiliser une image Node.js basée sur Alpine
FROM node:22-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Installer AWS CLI et autres outils
RUN apk add --no-cache aws-cli curl unzip python3 py3-pip

# Copier les fichiers package.json et package-lock.json pour l'installation des dépendances
COPY package.json ./
COPY package-lock.json ./

# Installer les dépendances de production
RUN npm install --omit=dev

# Copier le reste du code source
COPY . .

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["node", "app.js"]
