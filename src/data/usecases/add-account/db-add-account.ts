import { AccountModel, AddAccountModel, IAddAccount, IHasher, IAddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly hasher: IHasher, private readonly addAccountRepository: IAddAccountRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
