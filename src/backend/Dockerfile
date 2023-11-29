# Use the official Node.js image as a base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/apps

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the files to the container
COPY . .

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
