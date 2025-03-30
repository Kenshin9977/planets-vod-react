# Use a lightweight Node.js image as the base
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Use a lightweight web server to serve the built React app
FROM nginx:alpine

# Remove default Nginx config and add custom one
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]