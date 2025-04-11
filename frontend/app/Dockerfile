# Use Node.js 18 with Alpine for a lightweight base image
FROM node:22.11.0-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies consistently with npm ci
RUN npm ci

# Ensure Vite has proper cache permissions
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Copy the rest of the application code
COPY . .

# Expose the port Vite typically runs on (si tu utilises Vite, c'est souvent 5173)
EXPOSE 5173

# Command to run the application (adapté pour Vite)
CMD ["npm", "run", "dev", "--", "--host"]