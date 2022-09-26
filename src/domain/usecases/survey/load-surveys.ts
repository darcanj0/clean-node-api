import { SurveyModel } from '../../models/survey'

export interface ILoadSurveys {
  loadSurveys: () => Promise<SurveyModel[]>
}

export namespace ILoadSurveys {
  export type Result = SurveyModel[]
}
