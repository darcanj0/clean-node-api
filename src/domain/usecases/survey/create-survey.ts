import { SurveyModel } from '@/domain/models/survey'

export interface SurveyAnswer {
  image?: string
  answer: string
}

export type CreateSurveyData = Omit<SurveyModel, 'id'>

export interface ICreateSurvey {
  create: (createSurveyData: CreateSurveyData) => Promise<any>
}
