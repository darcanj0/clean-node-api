import { AccountModel, AddAccountModel, IAddAccount, IHasher, IAddAccountRepository, ILoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const accountExists = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (accountExists) {
      return null
    }
    const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
