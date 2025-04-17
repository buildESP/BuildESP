# Use Node.js 18 with Alpine for a lightweight base image
FROM node:22.11.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies consistently with npm ci
RUN npm ci

# Create and set permissions for the Vite cache directory
RUN mkdir -p node_modules/.vite && chmod -R 777 node_modules/.vite

# Copy the rest of your application code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]