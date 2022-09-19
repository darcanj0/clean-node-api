import { ILoadAccountByToken, AccountModel, IDecrypter, ILoadAccountByTokenRepository } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}

  async load (token: string, role?: string): Promise<AccountModel | null> {
    const accessToken = await this.decrypter.decrypt(token)
    if (accessToken) {
      return this.loadAccountByTokenRepository.loadByToken(token, role)
    }
    return null
  }
}
