import { CreateSurveyData, ICreateSurveyRepository } from '../../../../data/usecases/survey/create-survey/db-create-survey-protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements ICreateSurveyRepository {
  async add (data: CreateSurveyData): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(data)
    const { insertedId: id } = result
    return MongoHelper.map(await surveyCollection.findOne({ _id: id }))
  }
}
