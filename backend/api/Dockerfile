# Utilisation d'une image Node.js basée sur Alpine
FROM node:22-alpine

# Définir le répertoire de travail dans le container
WORKDIR /usr/src/app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json ./

# Installer uniquement les dépendances de production
RUN npm i

# Installer AWS CLI et curl
RUN apk add --no-cache aws-cli curl

# Copier le reste du code de l'application
COPY . .

# Changer les permissions pour l'utilisateur node
RUN chown -R node:node /usr/src/app

# Exécuter en tant qu'utilisateur non root
USER node

# Exposer le port de l'application
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["node", "app.js"]
