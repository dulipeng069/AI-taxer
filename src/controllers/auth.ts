import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { D1Database } from '@cloudflare/workers-types'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

app.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    const prisma = getPrisma(c)

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
       return c.json({ error: '请联系管理员配置使用权限' }, 403)
    }

    // Check for expiration
    // @ts-ignore: IDE cache issue
    if (user.validUntil && new Date(user.validUntil) < new Date()) {
      // Optionally update status to DISABLED or just block
      await prisma.user.update({
        where: { id: user.id },
        data: { status: 'DISABLED' }
      })
      return c.json({ error: '请联系管理员配置使用权限' }, 403)
    }

    // Update last login or audit log here if needed

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        companyCode: user.companyCode,
        permissions: user.permissions,
        // @ts-ignore: IDE cache issue
        validUntil: user.validUntil,
        // @ts-ignore: IDE cache issue
        subscription: user.subscription
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

    const prisma = getPrisma(c)
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Generate Enterprise Code: ENT- + 6 random digits
    const companyCode = `ENT-${Math.floor(100000 + Math.random() * 900000)}`;

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        companyName,
        companyCode,
        role: 'ENTERPRISE_ADMIN',
        status: 'ACTIVE'
      }
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        companyName: user.companyName,
        companyCode: user.companyCode
      }
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
        return c.json({ error: 'Username already exists' }, 400)
    }
    return c.json({ error: e.message }, 500)
  }
})

app.post('/change-password', async (c) => {
  try {
    const { username, oldPassword, newPassword } = await c.req.json()
    
    if (!username || !oldPassword || !newPassword) {
      return c.json({ error: 'Username, old password and new password are required' }, 400)
    }

    const prisma = getPrisma(c)
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user || !bcrypt.compareSync(oldPassword, user.passwordHash)) {
      return c.json({ error: 'Invalid old password' }, 401)
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword }
    })

    return c.json({ status: 'ok', message: 'Password changed successfully' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export default app
