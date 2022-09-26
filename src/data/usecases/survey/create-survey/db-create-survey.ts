import { ICreateSurvey, ICreateSurveyRepository } from './db-create-survey-protocols'

export class DbCreateSurvey implements ICreateSurvey {
  constructor (private readonly createSurveyRepository: ICreateSurveyRepository) {}
  async create (createSurveyData: ICreateSurvey.Params): Promise<ICreateSurvey.Result> {
    const { answers, question, date } = createSurveyData
    await this.createSurveyRepository.add({ answers, question, date })
    return null
  }
}
