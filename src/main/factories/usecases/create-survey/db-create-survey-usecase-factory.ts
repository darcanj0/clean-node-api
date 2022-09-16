import { DbCreateSurvey } from '../../../../data/usecases/survey/db-create-survey'
import { ICreateSurvey } from '../../../../domain/usecases/survey/create-survey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbCreateSurvey = (): ICreateSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCreateSurvey(surveyMongoRepository)
}
