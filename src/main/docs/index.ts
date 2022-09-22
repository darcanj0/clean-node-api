import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { loginParamsSchema } from './schemas/login-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'CleanNodeApi',
    description: 'Api desenvolvida no curso TDD com Rodrigo Manguinho, para criar e responder enquetes entre programadores',
    version: '1.0.0'
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
    loginParams: loginParamsSchema
  }
}
