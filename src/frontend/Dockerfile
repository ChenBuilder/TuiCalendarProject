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

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy a new configuration file from your repo
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 8080
EXPOSE 8080

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
