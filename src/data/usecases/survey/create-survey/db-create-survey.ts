import { ICreateSurvey, CreateSurveyParams, ICreateSurveyRepository } from './db-create-survey-protocols'

export class DbCreateSurvey implements ICreateSurvey {
  constructor (private readonly createSurveyRepository: ICreateSurveyRepository) {}
  async create (createSurveyData: CreateSurveyParams): Promise<any> {
    const { answers, question, date } = createSurveyData
    await this.createSurveyRepository.add({ answers, question, date })
    return null
  }
}
