import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (saveSurveyData: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
