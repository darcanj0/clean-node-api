import { AccountModel, AddAccountModel, IAddAccount, IHasher, IAddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly hasher
  private readonly addAccountRepository

  constructor (hasher: IHasher, addAccountRepository: IAddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
