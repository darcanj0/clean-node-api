import { makeSignUpController } from '../../../factories/controllers/account/signup/signup-controller-factory'
import { adaptResolver } from '../../../../infra/adapters/express/apollo-server-resolver-adapter'
import { makeLoginController } from '../../../../main/factories/controllers/account/login/login-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    signup: async (parent: any, args: any) => adaptResolver(makeSignUpController(), args)
  }
}
