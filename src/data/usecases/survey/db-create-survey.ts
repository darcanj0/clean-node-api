import { ICreateSurvey, CreateSurveyData, ICreateSurveyRepository } from './db-create-survey-protocols'

export class DbCreateSurvey implements ICreateSurvey {
  constructor (private readonly createSurveyRepository: ICreateSurveyRepository) {}
  async create (createSurveyData: CreateSurveyData): Promise<any> {
    await this.createSurveyRepository.add(createSurveyData)
    return null
  }
}
