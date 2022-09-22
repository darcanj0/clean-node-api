import { SurveyModel } from '@/domain/models/survey'

export interface SurveyAnswer {
  image?: string
  answer: string
}

export type CreateSurveyParams = Omit<SurveyModel, 'id'>

export interface ICreateSurvey {
  create: (createSurveyData: CreateSurveyParams) => Promise<any>
}
