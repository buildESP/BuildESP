# Utiliser une image Node.js basée sur Alpine
FROM node:22-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Installer AWS CLI et autres outils
RUN apk add --no-cache aws-cli curl unzip python3 py3-pip

# Copier les fichiers nécessaires à l'installation
COPY package.json ./

# Installer les dépendances de production
RUN npm install --omit=dev

# Copier le reste de l'application
COPY . .

# Définir l'environnement
ENV NODE_ENV=production

# Exposer le port de l'application
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]
