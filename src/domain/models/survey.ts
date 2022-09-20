import { SurveyAnswer } from '../usecases/survey/create-survey'

export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswer[]
  date: Date
}
