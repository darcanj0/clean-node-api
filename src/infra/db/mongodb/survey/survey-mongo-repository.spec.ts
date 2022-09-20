import { Collection } from 'mongodb'
import { ICreateSurveyRepository } from '../../../../data/usecases/survey/create-survey/db-create-survey-protocols'
import { CreateSurveyData } from '../../../../domain/usecases/survey/create-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import MockDate from 'mockdate'

const makeSut = (): ICreateSurveyRepository => {
  return new SurveyMongoRepository()
}

const makeFakeSurveyData = (): CreateSurveyData => ({
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date()
})

let surveyCollection: Collection

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  test('Should return a survey on add success', async () => {
    const sut = makeSut()
    const survey = await sut.add(makeFakeSurveyData())
    expect(survey).toBeTruthy()
    expect(survey.id).toBeTruthy()
    expect(survey.question).toBe('any_question')
    expect(survey.answers).toEqual([{ image: 'any_image', answer: 'any_answer' }])
  })
})
