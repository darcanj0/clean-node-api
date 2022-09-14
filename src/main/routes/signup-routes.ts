import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'

const userRouter = Router()

userRouter.post('/signup', async (req, res) => {
  const route = adaptRoute(makeSignUpController())
  return await route(req, res)
})

export default userRouter
