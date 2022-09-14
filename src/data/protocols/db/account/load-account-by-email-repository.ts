import { AccountModel } from '../../../usecases/authentication/db-auth-protocols'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
