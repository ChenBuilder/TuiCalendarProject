# Use the official Node.js image as a base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the files to the container
COPY . .

# Expose port (whatever port your frontend runs on, e.g., 8080). Adjust as per your configuration.
EXPOSE 8080

# Command to start the frontend
CMD ["npx", "webpack", "serve"]
