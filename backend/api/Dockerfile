# Utilisation d'une image Node.js basée sur Alpine
FROM node:22-alpine

# Définir le répertoire de travail dans le container
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Installer les dépendances (y compris axios et autres)
RUN npm install

# Installer AWS CLI et curl
RUN apk add --no-cache curl unzip python3 py3-pip \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

# Copier le reste du code de l'application
COPY . .

# Changer les permissions pour l'utilisateur node
RUN chown -R node:node /usr/src/app

# Exposer le port de l'application
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["node", "app.js"]
