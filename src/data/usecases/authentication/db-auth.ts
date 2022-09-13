import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: ILoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email } = authentication
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) {
      return null
    }
    return ''
  }
}
