# Utiliser une image Node.js basée sur Alpine pour un conteneur léger
FROM node:22-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Installer AWS CLI directement via `apk`
RUN apk add --no-cache aws-cli curl unzip python3 py3-pip

# Vérifier l'installation d'AWS CLI
RUN aws --version

# Copier package.json et package-lock.json avant d'installer les dépendances
COPY api/package.json ./package.json
#COPY api/package-lock.json ./package-lock.json

# Copier le fichier .env depuis la racine du projet
COPY .env .env

# Installer les dépendances Node.js (y compris celles de production)
RUN npm install --omit=dev

# Installer explicitement les dépendances nécessaires qui ne sont pas dans package.json
RUN npm install multer multer-s3 @aws-sdk/client-s3 dotenv helmet

# Copier le reste du code source
COPY api/ ./

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "app.js"]
