import { Router } from 'express'
import { adaptRoute } from '../../infra/adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/controllers/account/login/login-controller-factory'
import { makeSignUpController } from '../factories/controllers/account/signup/signup-controller-factory'

const userRouter = Router()

userRouter.post('/signup', async (req, res) => {
  const route = adaptRoute(makeSignUpController())
  return await route(req, res)
})

userRouter.post('/login', async (req, res) => {
  const route = adaptRoute(makeLoginController())
  return await route(req, res)
})

export default userRouter
