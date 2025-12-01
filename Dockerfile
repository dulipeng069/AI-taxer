# Use Node.js LTS (Alpine for smaller size)
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client (MySQL)
RUN npx prisma generate --schema=prisma/schema.prisma

# Build Frontend (Vite)
RUN npm run build

# Build Backend (Node.js Adapter)
RUN npm run build:server

# --- Production Image ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install runtime dependencies (OpenSSL is required for Prisma)
RUN apk add --no-cache openssl

# Copy built artifacts and dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Start command
# 1. Run migrations (Optional: safer to do this in a release phase or manually)
# 2. Start server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist-server/index.cjs"]
