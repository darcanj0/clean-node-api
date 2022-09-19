import { ILoadAccountByToken, AccountModel, IDecrypter } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter
  ) {}

  async load (token: string, role?: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(token)
    return null
  }
}
