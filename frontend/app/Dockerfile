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

# Expose the port the app runs on
EXPOSE 3000  

# Command to run the application
CMD ["npm", "run", "start-watch"]
