import { ILoadSurveyById, ILoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<ILoadSurveyById.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
