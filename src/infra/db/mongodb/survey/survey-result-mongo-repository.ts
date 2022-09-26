import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save (data: ISaveSurveyResultRepository.Params): Promise<ISaveSurveyResultRepository.Result> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const { value } = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    return value && MongoHelper.map(value)
  }
}
