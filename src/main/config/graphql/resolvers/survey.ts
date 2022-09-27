import { makeLoadSurveysController } from '../../../../main/factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adaptResolver } from '../../../../infra/adapters/express/apollo-server-resolver-adapter'

export default {
  Query: {
    surveys: async () => adaptResolver(makeLoadSurveysController())
  }
}
