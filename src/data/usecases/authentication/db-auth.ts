import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/authentication'
import { IHashComparer } from '../../protocols/criptography/hash-comparer'
import { ITokenGenerator } from '../../protocols/criptography/token-generator'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashComparer
  private readonly tokenGenerator: ITokenGenerator
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) {
      return null
    }
    const isCorrectPassword = await this.hashComparer.compare(password, account.password)
    if (!isCorrectPassword) {
      return null
    }
    const token = await this.tokenGenerator.generate(account.id)
    await this.updateAccessTokenRepository.update(account.id, token)
    return token
  }
}
