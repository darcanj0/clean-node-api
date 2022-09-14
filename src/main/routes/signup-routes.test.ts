import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Signup Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Daniel',
        email: 'xorig89280@nicoimg.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
