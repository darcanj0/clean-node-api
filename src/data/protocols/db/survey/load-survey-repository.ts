import { SurveyModel } from '../../../../domain/models/survey'

export interface ILoadSurveysRepository {
  loadSurveys: () => Promise<SurveyModel[]>
}
