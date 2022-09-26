export type SurveyAnswer = {
  answer: string
  image?: string
}

export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswer[]
  date: Date
}
