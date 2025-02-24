# First Stage: Build
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

CMD [ "serve", "-s", "dist" , "-l", "80"]
