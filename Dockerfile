# Use Node.js 20 Alpine image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client for Standard SQL (MySQL/PostgreSQL)
RUN npx prisma generate --schema=schema.prisma

# Build Frontend (Vite)
RUN npm run build

# Build Backend (Node.js)
RUN npm run build:server

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
