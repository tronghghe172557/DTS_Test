# Stage 1: build the application
# As builder is the name of the first state, it can be used in the second stage
FROM node:20.18.1-alpine AS builder

# Set the working directory in the container
# Workdir helps this Dockerfile to be more portable
WORKDIR /app 

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Stage 2: create the production image
FROM node:20.18.1-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies ( in package.json, the dependencies are listed in the dependencies section)
RUN npm install --only=production

# Copy the built application from the builder stage
#only copy file src
COPY --from=builder /app/src ./src 
# only copy file sever.js
COPY --from=builder /app/sever.js ./sever.js

EXPOSE 3000

CMD ["node", "sever.js"]