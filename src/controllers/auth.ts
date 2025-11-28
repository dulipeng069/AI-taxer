import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { D1Database } from '@cloudflare/workers-types'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

app.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    const prisma = getPrisma(c.env.DB)

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    // Update last login or audit log here if needed

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        permissions: user.permissions
      }
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

app.post('/register', async (c) => {
  try {
    const { username, password, companyName } = await c.req.json()
    
    if (!username || !password) {
        return c.json({ error: 'Username and password are required' }, 400)
    }

    const prisma = getPrisma(c.env.DB)
    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        companyName,
        role: 'ENTERPRISE_ADMIN',
        status: 'ACTIVE'
      }
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        companyName: user.companyName
      }
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
        return c.json({ error: 'Username already exists' }, 400)
    }
    return c.json({ error: e.message }, 500)
  }
})

export default app
