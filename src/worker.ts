import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from './controllers/auth'
import userController from './controllers/user'
import notificationController from './controllers/notification'
import { taxController } from './controllers/tax'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/*', cors())

// Mount Routes
app.route('/api/auth', auth)
app.route('/api/users', userController)
app.route('/api/notifications', notificationController)

// Tax Routes
app.post('/api/tax/upload', taxController.uploadBatch)
app.get('/api/tax/records', taxController.getRecords)
app.delete('/api/tax/batch/:id', taxController.deleteBatch)

// Health Check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'TaxMaster API Health Check OK' })
})

import { getPrisma } from './lib/prisma'

app.get('/api/test-db', async (c) => {
  const prisma = getPrisma(c);
  try {
    const count = await prisma.user.count();
    return c.json({ status: 'ok', count, message: 'DB Connection Successful' });
  } catch (e: any) {
    return c.json({ status: 'error', message: e.message }, 500);
  }
})

export default app
