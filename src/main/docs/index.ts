import { loginPath } from './paths/login-path'
import { surveysPath } from './paths/surveys-path'
import { accountSchema } from './schemas/account-schema'
import { loginParamsSchema } from './schemas/login-params-schema'
import { signupParamsSchema } from './schemas/signup-params-schema'
import { errorSchema } from './schemas/error-schema'
import { surveyAnswerSchema } from './schemas/survey-answer'
import { surveySchema } from './schemas/survey-schema'
import { surveysSchema } from './schemas/surveys-schema'
import { apiKeyAuth } from './schemas/api-key-auth-schema'
import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { notFound } from './components/not-found'
import { forbidden } from './components/forbidden'
import { singupPath } from './paths/signup-path'

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
    '/survey': surveysPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    surveyAnswer: surveyAnswerSchema,
    survey: surveySchema,
    surveys: surveysSchema
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
