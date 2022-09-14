import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return a token on success', async () => {
    const password = await hash('123', 12)
    await accountCollection.insertOne({
      name: 'Daniel',
      email: 'xorig89280@nicoimg.com',
      password
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'xorig89280@nicoimg.com',
        password: '123'
      })
      .expect(200)
  })
})
