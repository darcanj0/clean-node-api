import { AuthenticationParams, IAuthentication, ILoadAccountByEmailRepository, IUpdateAccessTokenRepository, IEncrypter, IHashComparer } from './db-auth-protocols'
export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<string> {
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
