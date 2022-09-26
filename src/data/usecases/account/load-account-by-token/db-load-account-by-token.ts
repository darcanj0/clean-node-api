import { ILoadAccountByToken, IDecrypter, ILoadAccountByTokenRepository } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}

  async load (params: ILoadAccountByToken.Params): Promise<ILoadAccountByToken.Result> {
    const { token, role } = params
    const accessToken = await this.decrypter.decrypt(token)
    if (accessToken) {
      return this.loadAccountByTokenRepository.loadByToken({ token, role })
    }
    return null
  }
}
