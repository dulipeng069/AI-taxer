import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { D1Database } from '@cloudflare/workers-types'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

// List all users (Super Admin only)
// TODO: Add proper middleware for role check
app.get('/', async (c) => {
  try {
    const prisma = getPrisma(c)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        companyName: true,
        status: true,
        createdAt: true,
        // Exclude passwordHash
      }
    })
    return c.json({ status: 'ok', data: users })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Create a new user (Super Admin only)
app.post('/', async (c) => {
  try {
    const { username, password, role, companyName } = await c.req.json()
    
    if (!username || !password || !role) {
      return c.json({ error: 'Username, password and role are required' }, 400)
    }

    const prisma = getPrisma(c)
    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        role, // 'SUPER_ADMIN' or 'ENTERPRISE_ADMIN'
        companyName: companyName || (role === 'SUPER_ADMIN' ? 'TaxMaster Admin' : undefined),
        status: 'ACTIVE'
      }
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
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

// Update user details (Super Admin only)
app.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { companyName, status } = await c.req.json()
    
    const prisma = getPrisma(c.env.DB)
    
    const user = await prisma.user.update({
      where: { id },
      data: {
        companyName,
        status
      }
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        status: user.status
      }
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Reset user password (Super Admin only)
app.put('/:id/password', async (c) => {
  try {
    const id = c.req.param('id')
    const { newPassword } = await c.req.json()

    if (!newPassword) {
      return c.json({ error: 'New password is required' }, 400)
    }

    const prisma = getPrisma(c.env.DB)
    const hashedPassword = bcrypt.hashSync(newPassword, 10)

    await prisma.user.update({
      where: { id },
      data: {
        passwordHash: hashedPassword
      }
    })

    return c.json({ status: 'ok', message: 'Password updated successfully' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Delete user (Super Admin only)
app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const prisma = getPrisma(c.env.DB)
    
    await prisma.user.delete({
      where: { id }
    })

    return c.json({ status: 'ok', message: 'User deleted successfully' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export default app
