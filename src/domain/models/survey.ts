import { SurveyAnswer } from '../usecases/survey/create-survey'

export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswer[]
  date: Date
}
