import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import { D1Database } from '@cloudflare/workers-types'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

// Get notifications for a user
app.get('/', async (c) => {
  const userId = c.req.query('userId')
  if (!userId) {
    return c.json({ error: 'User ID is required' }, 400)
  }

  const prisma = getPrisma(c)
  
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { userId: userId },
          { userId: null } // Global notifications
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return c.json({ status: 'ok', data: notifications })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Create a notification (Admin only)
app.post('/', async (c) => {
  const body = await c.req.json()
  const { title, content, type, targetUserId } = body
  // targetUserId is optional. If null, it's a global notification.

  if (!title || !content) {
    return c.json({ error: 'Title and content are required' }, 400)
  }

  const prisma = getPrisma(c)

  try {
    // If targetUserId is provided, verify user exists
    if (targetUserId) {
      const user = await prisma.user.findUnique({ where: { id: targetUserId } })
      if (!user) {
        return c.json({ error: 'Target user not found' }, 404)
      }
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        content,
        type: type || 'SYSTEM',
        userId: targetUserId || null
      }
    })
    return c.json({ status: 'ok', data: notification })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Mark as read
app.put('/:id/read', async (c) => {
  const id = c.req.param('id')
  const prisma = getPrisma(c)

  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    })
    return c.json({ status: 'ok', data: notification })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Delete notification
app.delete('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = getPrisma(c)
  
    try {
      await prisma.notification.delete({
        where: { id }
      })
      return c.json({ status: 'ok', message: 'Notification deleted' })
    } catch (e: any) {
      return c.json({ error: e.message }, 500)
    }
  })

export default app
