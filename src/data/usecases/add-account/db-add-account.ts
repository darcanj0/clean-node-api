import { AccountModel, AddAccountModel, IAddAccount, IEncrypter } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter

  constructor (encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    return this.encrypter.encrypt(account.password)
  }
}
