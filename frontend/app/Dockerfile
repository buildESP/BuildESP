# Use Node.js 18 with Alpine for a lightweight base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies consistently with npm ci
RUN npm i

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Copy the rest of your application code
COPY . .


# Expose the port your app runs on (assuming 8080)
EXPOSE 8080

# Define the command to start your application
CMD ["npm", "run", "start-watch"]