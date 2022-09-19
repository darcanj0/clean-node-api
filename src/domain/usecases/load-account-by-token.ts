import { AccountModel } from '../models/account'

export interface ILoadAccountByToken {
  load: (token: string, role?: string) => Promise<AccountModel | null>
}
