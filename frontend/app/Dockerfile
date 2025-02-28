# Use Node.js 18 with Alpine for a lightweight base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies consistently with npm ci
RUN npm i

# Copy the rest of your application code
COPY . .

# Change ownership to the non-root 'node' user for security
RUN chown -R node:node /app

# Switch to the non-root 'node' user
USER node

# Expose the port your app runs on (assuming 8080)
EXPOSE 8080

# Define the command to start your application
CMD ["npm", "run", "start-watch"]