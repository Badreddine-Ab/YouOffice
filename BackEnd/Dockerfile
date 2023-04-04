# Use the official Node.js image as the base image
FROM node:16.17.0-bullseye-slim

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the npm packages
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the project files
COPY . .

# Expose the application's port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
