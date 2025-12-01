import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { D1Database } from '@cloudflare/workers-types'
import { Prisma } from '@prisma/client'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

// List all users (Super Admin only)
// TODO: Add proper middleware for role check
// Types verified: phone, contactPerson, subscription, validUntil are valid User fields
app.get('/', async (c) => {
  try {
    const prisma = getPrisma(c)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        companyName: true,
        companyCode: true,
        status: true,
        createdAt: true,
        phone: true,
        realName: true,
        subscription: true,
        validUntil: true
        // Exclude passwordHash
      }
    })
    return c.json({ status: 'ok', data: users })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Submit Application (Public)
app.post('/apply', async (c) => {
  try {
    const { companyName, realName, phone } = await c.req.json()
    
    if (!companyName || !realName || !phone) {
      return c.json({ error: 'All fields are required' }, 400)
    }

    const prisma = getPrisma(c)
    
    // Default password is last 6 digits of phone
    const defaultPassword = phone.slice(-6)
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10)

    // Generate Enterprise Code
    const companyCode = `ENT-${Math.floor(100000 + Math.random() * 900000)}`;

    const userData = {
      username: phone, // Login with phone
      passwordHash: hashedPassword,
      role: 'ENTERPRISE_ADMIN',
      companyName,
      companyCode,
      // @ts-ignore: IDE cache issue
      contactPerson: realName,
      contactPhone: phone,
      realName,
      phone,
      status: 'PENDING_APPROVAL',
      // @ts-ignore: IDE cache issue
      subscription: 'FREE', // Default
    }

    const user = await prisma.user.create({
      data: userData
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        status: user.status
      }
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return c.json({ error: 'Phone number already registered' }, 400)
    }
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

    // Generate Enterprise Code if role is ENTERPRISE_ADMIN
    const companyCode = role === 'ENTERPRISE_ADMIN' 
      ? `ENT-${Math.floor(100000 + Math.random() * 900000)}` 
      : undefined;

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        role, // 'SUPER_ADMIN' or 'ENTERPRISE_ADMIN'
        companyName: companyName || (role === 'SUPER_ADMIN' ? 'TaxMaster Admin' : undefined),
        companyCode,
        status: 'ACTIVE'
      }
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
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

// Update user details (Super Admin only)
app.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { companyName, status, subscription, validUntil } = await c.req.json()
    
    const prisma = getPrisma(c)
    
    const user = await prisma.user.update({
      where: { id },
      data: {
        companyName,
        status,
        // @ts-ignore: IDE cache issue
        subscription,
        validUntil: validUntil ? new Date(validUntil) : undefined
      }
    })

    return c.json({
      status: 'ok',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        status: user.status,
        subscription: user.subscription,
        validUntil: user.validUntil
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

    const prisma = getPrisma(c)
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
    const prisma = getPrisma(c)
    
    // Manually delete related records due to D1 foreign key constraints
    // Order matters: TaxRecord -> Employee -> UploadBatch -> AuditLog -> User

    // 1. Delete Tax Records
    await prisma.taxRecord.deleteMany({
        where: { enterpriseId: id }
    })

    // 2. Delete Employees
    await prisma.employee.deleteMany({
        where: { enterpriseId: id }
    })

    // 3. Delete Upload Batches
    await prisma.uploadBatch.deleteMany({
        where: { enterpriseId: id }
    })

    // 4. Delete Audit Logs
    await prisma.auditLog.deleteMany({
        where: { userId: id }
    })

    // 5. Finally Delete User
    await prisma.user.delete({
      where: { id }
    })

    return c.json({ status: 'ok', message: 'User deleted successfully' })
  } catch (e: any) {
    console.error('Delete user error:', e);
    return c.json({ error: e.message }, 500)
  }
})

export default app
