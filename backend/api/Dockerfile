# Use a lighter Alpine-based Node.js image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Change ownership of the application files to the node user
RUN chown -R node:node /usr/src/app

# Use a smaller runtime image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Set the container to run as the non-root node user
USER node

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]