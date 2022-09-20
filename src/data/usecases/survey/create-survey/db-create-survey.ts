import { ICreateSurvey, CreateSurveyData, ICreateSurveyRepository } from './db-create-survey-protocols'

export class DbCreateSurvey implements ICreateSurvey {
  constructor (private readonly createSurveyRepository: ICreateSurveyRepository) {}
  async create (createSurveyData: CreateSurveyData): Promise<any> {
    const { answers, question, date } = createSurveyData
    await this.createSurveyRepository.add({ answers, question, date })
    return null
  }
}
