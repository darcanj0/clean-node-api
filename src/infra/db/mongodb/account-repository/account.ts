import { IAddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    // coleta o insertedId numa variável 'id'
    const { insertedId: id } = result
    const accountById = await accountCollection.findOne({ _id: id })

    // _id é desconstruído e armazenado numa variável homônima
    // 'accountWithoutId' é um objetos com todos os atributos de 'accountById', exceto o _id, que virou variável
    const { _id, ...accountWithoutId } = accountById
    return Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as AccountModel
  }
}
