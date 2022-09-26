import { SurveyModel } from '@/domain/models/survey'

export interface ICreateSurvey {
  create: (createSurveyData: ICreateSurvey.Params) => Promise<ICreateSurvey.Result>
}

export namespace ICreateSurvey {
  export type Params = Omit<SurveyModel, 'id'>
  export type Result = any
}
