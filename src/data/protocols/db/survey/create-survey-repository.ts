import { CreateSurveyData } from '../../../../domain/usecases/survey/create-survey'

export interface ICreateSurveyRepository {
  add: (data: CreateSurveyData) => Promise<any>
}
