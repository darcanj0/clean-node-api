import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/authentication'
import { IHashComparer } from '../../protocols/criptography/hash-comparer'
import { IEncrypter } from '../../protocols/criptography/encrypter'
import { ILoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../protocols/db/account/update-access-token-repository'

export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      return null
    }
    const isCorrectPassword = await this.hashComparer.compare(password, account.password)
    if (!isCorrectPassword) {
      return null
    }
    const token = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, token)
    return token
  }
}
