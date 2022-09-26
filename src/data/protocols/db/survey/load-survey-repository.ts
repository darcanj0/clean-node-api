import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveysRepository {
  loadSurveys: () => Promise<ILoadSurveysRepository.Result>
}

export namespace ILoadSurveysRepository {
  export type Result = SurveyModel[]
}
