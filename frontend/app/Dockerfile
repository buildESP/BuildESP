# Stage 1: Build
FROM node:22.11.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies consistently with npm ci
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build the application (adjust the build command if needed)
RUN npm run build

# Stage 2: Runtime
FROM node:22.11.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]