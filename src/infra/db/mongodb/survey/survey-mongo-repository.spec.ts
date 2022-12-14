import { ICreateSurveyRepository } from '@/data/protocols/db/survey/create-survey-repository'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const makeFakeSurveyData = (): ICreateSurveyRepository.Params => ({
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

  describe('add()', () => {
    test('Should return a survey on add success', async () => {
      const sut = makeSut()
      const survey = await sut.add(makeFakeSurveyData())
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
      expect(survey.question).toBe('any_question')
      expect(survey.answers).toEqual([{ image: 'any_image', answer: 'any_answer' }])
    })
  })

  describe('loadSurveys()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }],
          date: new Date()
        },
        {
          question: 'another_question',
          answers: [{
            answer: 'another_answer'
          }],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('another_question')
    })

    test('Should load an empty list if there are no documents', async () => {
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load a survey by id on success', async () => {
      const { insertedId } = await surveyCollection.insertOne(makeFakeSurveyData())
      const id = insertedId.toString()
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id)
      expect(survey.question).toBe('any_question')
    })

    test('Should return null on loadById fail', async () => {
      const sut = makeSut()
      const survey = await sut.loadById('any_id')
      expect(survey).toBeNull()
    })
  })
})
