import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import MockDate from 'mockdate'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeFakeSurvey = async (): Promise<SurveyModel> => {
  const surveyData = {
    question: 'any_question',
    answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'another_answer' }],
    date: new Date()
  }
  const { insertedId } = await surveyCollection.insertOne(surveyData)
  return MongoHelper.map(await surveyCollection.findOne({ _id: insertedId }))
}

const makeFakeAccount = async (): Promise<AccountModel> => {
  const accountData = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
  const { insertedId } = await accountCollection.insertOne(accountData)
  return MongoHelper.map(await accountCollection.findOne({ _id: insertedId }))
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

describe('SurveyResultMongoRepository', () => {
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
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  test('Should create a survey result it is new', async () => {
    const { id: surveyId, answers } = await makeFakeSurvey()
    const { id: accountId } = await makeFakeAccount()
    const sut = makeSut()
    const surveyResult = await sut.save({
      accountId,
      surveyId,
      date: new Date(),
      answer: answers[0].answer
    })
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toBeTruthy()
    expect(surveyResult.answer).toBe(answers[0].answer)
  })

  test('Should update a survey result if it exists', async () => {
    const { id: surveyId, answers } = await makeFakeSurvey()
    const { id: accountId } = await makeFakeAccount()
    const { insertedId } = await surveyResultCollection.insertOne({
      accountId,
      surveyId,
      date: new Date(),
      answer: answers[0].answer
    })
    const sut = makeSut()
    const surveyResult = await sut.save({
      accountId,
      surveyId,
      date: new Date(),
      answer: answers[1].answer
    })
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toEqual(insertedId.toString())
    expect(surveyResult.answer).toBe(answers[1].answer)
  })
})
