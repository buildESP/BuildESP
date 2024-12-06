# Use an official Node.js image as the base image
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use an official Nginx image to serve the built application
FROM nginx:alpine

# Copy the built files to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the necessary port
EXPOSE 80

# Specify the command to run Nginx
CMD ["nginx", "-g", "daemon off;"]