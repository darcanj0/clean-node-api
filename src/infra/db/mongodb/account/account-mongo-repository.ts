import { ObjectId } from 'mongodb'
import { IAddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { ILoadAccountByTokenRepository } from '../../../../data/usecases/account/load-account-by-token/db-load-account-by-token-protocols'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository, IUpdateAccessTokenRepository, ILoadAccountByTokenRepository {
  async add (accountData: IAddAccountRepository.Params): Promise<IAddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    // coleta o insertedId numa variável 'id'
    const { insertedId: id } = result
    return MongoHelper.map(await accountCollection.findOne({ _id: id }))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken: token } })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken: token, $or: [{ role }, { role: 'admin' }] })
    return account && MongoHelper.map(account)
  }
}
