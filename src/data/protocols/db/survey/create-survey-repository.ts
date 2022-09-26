import { SurveyModel } from '@/domain/models/survey'

export interface ICreateSurveyRepository {
  add: (data: ICreateSurveyRepository.Params) => Promise<ICreateSurveyRepository.Result>
}

export namespace ICreateSurveyRepository {
  export type Params = Omit<SurveyModel, 'id'>
  export type Result = any
}
