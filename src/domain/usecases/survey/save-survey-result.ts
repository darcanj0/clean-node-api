import { SurveyResultModel } from '@/domain/models/survey-result'

export interface ISaveSurveyResult {
  save: (saveSurveyData: ISaveSurveyResult.Params) => Promise<ISaveSurveyResult.Result>
}

export namespace ISaveSurveyResult {
  export type Params = Omit<SurveyResultModel, 'id'>
  export type Result = SurveyResultModel
}
