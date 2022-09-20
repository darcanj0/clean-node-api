import { SurveyModel } from '../../models/survey'

export interface ILoadSurveys {
  loadSurveys: () => Promise<SurveyModel[]>
}
