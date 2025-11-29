import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

// Shared helper to get Prisma Client
// Supports both Cloudflare D1 (via Context/Env) and Node.js (Standard connection)

let globalPrisma: PrismaClient | undefined

export const getPrisma = (cOrEnv: any): PrismaClient => {
  // 1. Try to detect Cloudflare D1 binding
  // Input can be Hono Context (c) or Env object
  let d1 = null
  
  // Check if it's Hono Context (c.env.DB)
  if (cOrEnv?.env?.DB) {
    d1 = cOrEnv.env.DB
  } 
  // Check if it's direct Env object (env.DB)
  else if (cOrEnv?.DB) {
    d1 = cOrEnv.DB
  }

  // 2. If D1 is found, use D1 Adapter
  if (d1) {
    const adapter = new PrismaD1(d1)
    // Cast to any to avoid type issues if Client is generated without adapter support
    return new PrismaClient({ adapter } as any)
  }

  // 3. Fallback to Standard Prisma Client (Node.js / Alibaba Cloud RDS)
  // In Node.js, we reuse the global instance to prevent connection exhaustion
  if (!globalPrisma) {
    globalPrisma = new PrismaClient()
  }
  return globalPrisma
}
