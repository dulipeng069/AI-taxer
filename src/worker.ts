import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getPrisma } from './lib/prisma'
import auth from './controllers/auth'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/*', cors())

// Mount Auth Routes
app.route('/api/auth', auth)

// Health Check
app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'TaxMaster API is running' })
})

// Test DB Connection: List Users
app.get('/api/users', async (c) => {
  const prisma = getPrisma(c.env.DB)
  try {
    const users = await prisma.user.findMany()
    return c.json(users)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Create a Test User (for verification)
app.post('/api/users/test', async (c) => {
  const prisma = getPrisma(c.env.DB)
  try {
    const user = await prisma.user.create({
      data: {
        username: `user_${Date.now()}`,
        passwordHash: 'hashed_password_123',
        companyName: 'Test Company',
        role: 'ENTERPRISE_ADMIN'
      }
    })
    return c.json(user)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export default app
