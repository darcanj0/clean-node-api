import { loginPath, saveSurveyResultPath, singupPath, surveysPath } from './paths'
import {
  accountSchema,
  addSurveyParamsSchema,
  apiKeyAuth, errorSchema,
  loginParamsSchema,
  saveSurveyResultParamsSchema,
  surveyAnswerSchema,
  surveysSchema,
  signupParamsSchema,
  surveySchema,
  surveyResultSchema
} from './schemas'
import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { notFound } from './components/not-found'
import { forbidden } from './components/forbidden'

export default {
  openapi: '3.0.0',
  info: {
    title: 'CleanNodeApi',
    description: 'Api desenvolvida no curso TDD com Rodrigo Manguinho, para criar e responder enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC'
  },
  tags: [
    { name: 'Login' },
    { name: 'Account' },
    { name: 'Survey' }
  ],
  paths: {
    '/user/login': loginPath,
    '/user/signup': singupPath,
    '/survey': surveysPath,
    '/survey/{surveyId}/results': saveSurveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    surveyAnswer: surveyAnswerSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyResultParams: saveSurveyResultParamsSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
