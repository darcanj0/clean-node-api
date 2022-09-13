import { AccountModel } from '../../usecases/authentication/db-auth-protocols'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel | null>
}
