# Utiliser une image Node.js basée sur Alpine pour un conteneur léger
FROM node:22-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Installer AWS CLI directement via `apk`
RUN apk add --no-cache aws-cli curl unzip python3 py3-pip

# Vérifier l'installation d'AWS CLI
RUN aws --version

# Copier package.json et package-lock.json avant d'installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances Node.js
RUN npm install --omit=dev

# Copier le reste du code source
COPY . .

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "app.js"]
