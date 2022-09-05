import { AccountModel, AddAccountModel, IAddAccount, IEncrypter, IAddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter
  private readonly addAccountRepository

  constructor (encrypter: IEncrypter, addAccountRepository: IAddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
