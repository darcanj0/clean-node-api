export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface CreateSurveyData {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface ICreateSurvey {
  create: (createSurveyData: CreateSurveyData) => Promise<any>
}
