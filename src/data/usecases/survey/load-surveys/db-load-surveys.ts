import { ILoadSurveys, SurveyModel, ILoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async loadSurveys (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadSurveys()
    return surveys
  }
}
