import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from './controllers/auth'
import userController from './controllers/user'
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

// Tax Routes
app.post('/api/tax/upload', taxController.uploadBatch)
app.get('/api/tax/records', taxController.getRecords)
app.delete('/api/tax/batch/:id', taxController.deleteBatch)

// Health Check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'TaxMaster API is running' })
})

export default app
