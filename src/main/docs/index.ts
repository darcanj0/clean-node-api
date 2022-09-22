import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { loginParamsSchema } from './schemas/login-params-schema'
import { errorSchema } from './schemas/error-schema'
import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { notFound } from './components/not-found'

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
    '/user/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
