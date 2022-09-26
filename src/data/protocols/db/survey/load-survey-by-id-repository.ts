import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}

export namespace ILoadSurveyByIdRepository {
  export type Result = {
    id: string
    question: string
    answers: SurveyAnswer[]
    date: Date
  }

  export type SurveyAnswer = {
    answer: string
    image?: string
  }
}
