import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ObjectId } from 'mongodb'
import { ILoadSurveysRepository } from '../../../../data/protocols/db/survey/load-survey-repository'
import { CreateSurveyData, ICreateSurveyRepository } from '../../../../data/usecases/survey/create-survey/db-create-survey-protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements ICreateSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async add (data: CreateSurveyData): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(data)
    const { insertedId: id } = result
    return MongoHelper.map(await surveyCollection.findOne({ _id: id }))
  }

  async loadSurveys (): Promise<SurveyModel[] | any> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.find().toArray()
    const formated: SurveyModel[] = []
    result.forEach((doc) => {
      const formatedDoc = MongoHelper.map(doc)
      formated.push(formatedDoc)
    })
    return formated
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const isValidId = ObjectId.isValid(id)
    if (!isValidId) {
      return null
    }
    const result = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return result && MongoHelper.map(result)
  }
}
