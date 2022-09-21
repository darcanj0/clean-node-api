import { Router } from 'express'
import { adaptMiddleware } from '../../infra/adapters/express/express-middleware-adapter'
import { adaptRoute } from '../../infra/adapters/express/express-route-adapter'
import { makeCreateSurveyController } from '../factories/controllers/survey/create-survey/create-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { makeSaveSurveyResultController } from '../factories/controllers/survey/save-survey-result/save-survey-result-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

const surveyRouter = Router()

surveyRouter.post('', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeCreateSurveyController()))
surveyRouter.get('', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadSurveysController()))
surveyRouter.put('/:surveyId/results', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeSaveSurveyResultController()))

export default surveyRouter
