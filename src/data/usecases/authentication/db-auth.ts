import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/authentication'
import { IHashComparer } from '../../protocols/criptography/hash-comparer'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashComparer
  constructor (loadAccountByEmailRepository: ILoadAccountByEmailRepository, hashComparer: IHashComparer) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
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
    return ''
  }
}
