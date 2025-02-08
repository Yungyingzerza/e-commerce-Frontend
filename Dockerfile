# First Stage: Build
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Build the Vite app
RUN npm run build

# Second Stage: Production
FROM nginx:alpine

# Copy the build output from the first stage to nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
