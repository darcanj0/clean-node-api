import { ILoadSurveys, ILoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async loadSurveys (): Promise<ILoadSurveys.Result> {
    const surveys = await this.loadSurveysRepository.loadSurveys()
    return surveys
  }
}
