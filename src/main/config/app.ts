import express from 'express'
import surveyRouter from '../routes/survey-routes'
import userRouter from '../routes/user-routes'
import setupMiddlewares from './middlewares'
import setupSwagger from './swagger-config'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
app.use('/survey', surveyRouter)
app.use('/user', userRouter)

export default app
