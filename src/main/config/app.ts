import express from 'express'
import userRouter from '../routes/signup-routes'
import setupMiddlewares from './middlewares'

const app = express()
setupMiddlewares(app)
app.use('/api', userRouter)

export default app
