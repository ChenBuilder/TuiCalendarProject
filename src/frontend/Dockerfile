# Stage 1: Build the application
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine

# Copy built assets from builder stage to nginx server
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Create a custom Nginx configuration file
RUN echo "server { listen 8080; root /usr/share/nginx/html; index index.html; }" > /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
