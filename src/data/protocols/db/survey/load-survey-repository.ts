export interface ILoadSurveysRepository {
  loadSurveys: () => Promise<ILoadSurveysRepository.Result>
}

export namespace ILoadSurveysRepository {
  export type Result = SurveyModel[]

  export interface SurveyAnswer {
    answer: string
    image?: string
  }

  export interface SurveyModel {
    id: string
    question: string
    answers: SurveyAnswer[]
    date: Date
  }
}
