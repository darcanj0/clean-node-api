import { DbSaveSurveyResult } from '../../../../../data/usecases/survey/save-survey-result/db-save-survey-result'
import { ISaveSurveyResult } from '../../../../../domain/usecases/survey/save-survey-result'
import { SurveyResultMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-result-mongo-repository'

export const makeDbSaveSurveyResult = (): ISaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository)
}
