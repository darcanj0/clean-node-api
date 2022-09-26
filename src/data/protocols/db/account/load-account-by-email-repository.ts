import { AccountModel } from '@/domain/models/account'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: ILoadAccountByEmailRepository.Params) => Promise<ILoadAccountByEmailRepository.Result>
}

export namespace ILoadAccountByEmailRepository {
  export type Params = string
  export type Result = AccountModel | null
}
