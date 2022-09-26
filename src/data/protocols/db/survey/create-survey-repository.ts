export interface ICreateSurveyRepository {
  add: (data: ICreateSurveyRepository.Params) => Promise<ICreateSurveyRepository.Result>
}

export namespace ICreateSurveyRepository {
  export type SurveyAnswer = {
    answer: string
    image?: string
  }

  export type Params = {
    question: string
    answers: SurveyAnswer[]
    date: Date
  }
  export type Result = any
}
