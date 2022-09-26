import { SurveyResultModel } from '@/domain/models/survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: ISaveSurveyResultRepository.Params) => Promise<ISaveSurveyResultRepository.Result>
}

export namespace ISaveSurveyResultRepository {
  export type Params = Omit<SurveyResultModel, 'id'>

  export type Result = SurveyResultModel
}
