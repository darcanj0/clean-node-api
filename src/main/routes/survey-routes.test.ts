import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('CreateSurvey Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
  })

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
})
