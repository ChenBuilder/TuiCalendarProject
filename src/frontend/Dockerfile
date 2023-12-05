# Stage 1: Build the application
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./node_modules/.bin/webpack && npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine

# Copy built assets from builder stage to nginx server
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# This should be the path to the main nginx.conf file if you are replacing the entire configuration.
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
