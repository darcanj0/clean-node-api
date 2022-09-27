import { makeLoadSurveysController } from '../../../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { makeSaveSurveyResultController } from '../../../factories/controllers/survey/save-survey-result/save-survey-result-controller-factory'
import { adaptResolver } from '../../../../infra/adapters/express/apollo-server-resolver-adapter'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveysController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}
