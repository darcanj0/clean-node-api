import { Router } from 'express'
import { adaptRoute } from '../../infra/adapters/express/express-route-adapter'
import { makeCreateSurveyController } from '../factories/controllers/survey/create-survey/create-survey-controller-factory'

const surveyRouter = Router()

surveyRouter.post('', async (req, res) => {
  const route = adaptRoute(makeCreateSurveyController())
  return await route(req, res)
})

export default surveyRouter
