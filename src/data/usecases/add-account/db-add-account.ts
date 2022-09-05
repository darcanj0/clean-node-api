import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel, IAddAccount } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter

  constructor (encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    return this.encrypter.encrypt(account.password)
  }
}
