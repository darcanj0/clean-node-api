import { CreateSurveyParams } from '../../../../domain/usecases/survey/create-survey'

export interface ICreateSurveyRepository {
  add: (data: CreateSurveyParams) => Promise<any>
}
