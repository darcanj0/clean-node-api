import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let accountCollection: Collection
let surveyCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const { insertedId } = await accountCollection.insertOne({
    name: 'Daniel',
    email: 'xorig89280@nicoimg.com',
    password: '123',
    role: 'admin'
  })
  const id = insertedId.toJSON()
  const accessToken = sign(id, env.jwtSecret)
  await accountCollection.updateOne({ _id: insertedId },
    { $set: { accessToken } })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /survey', () => {
    test('Should return 403 on unsent accessToken in headers', async () => {
      await request(app)
        .post('/survey')
        .send({
          question: 'any_question',
          answers: [
            { answer: 'any_answer', image: 'any_image' },
            { answer: 'any_answer' }
          ]
        })
        .expect(403)
    })

    test('Should return 204 if valid accessToken in headers', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/survey')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            { answer: 'any_answer', image: 'any_image' },
            { answer: 'any_answer' }
          ]
        })
        .expect(204)
    })
  })

  describe('GET /survey', () => {
    test('Should return 403 on unsent accessToken in headers', async () => {
      await request(app)
        .get('/survey')
        .send({
          question: 'any_question',
          answers: [
            { answer: 'any_answer', image: 'any_image' },
            { answer: 'any_answer' }
          ]
        })
        .expect(403)
    })

    test('Should return 204 if valid accessToken in headers', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/survey')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('PUT /survey/results/:surveyId', () => {
    test('Should return 403 on unsent accessToken in headers', async () => {
      await request(app)
        .put('/survey/any_survey_id/results')
        .send({ answer: 'any_answer' })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const { insertedId } = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          { answer: 'any_answer', image: 'any_image' },
          { answer: 'another_answer' }
        ],
        date: new Date()
      })
      const surveyId = insertedId.toString()
      await request(app)
        .put(`/survey/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'another_answer' })
        .expect(200)
    })
  })
})
