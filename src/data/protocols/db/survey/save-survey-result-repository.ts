export interface ISaveSurveyResultRepository {
  save: (data: ISaveSurveyResultRepository.Params) => Promise<ISaveSurveyResultRepository.Result>
}

export namespace ISaveSurveyResultRepository {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }

  export type Result = {
    id: string
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
}
