import { ISaveSurveyResult, ISaveSurveyResultRepository } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
  async save (data: ISaveSurveyResult.Params): Promise<ISaveSurveyResult.Result> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
