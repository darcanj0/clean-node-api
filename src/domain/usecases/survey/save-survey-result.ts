import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (saveSurveyData: SaveSurveyResultModel) => Promise<SurveyResultModel>
}