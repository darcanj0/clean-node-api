import { adaptResolver } from '../../../../infra/adapters/express/apollo-server-resolver-adapter'
import { makeLoginController } from '../../../../main/factories/controllers/account/login/login-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  }
}
