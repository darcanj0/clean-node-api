import { AccountModel } from '../../../../domain/models/account'

export interface ILoadAccountByTokenRepository {
  loadByToken: (params: ILoadAccountByTokenRepository.Params) => Promise<ILoadAccountByTokenRepository.Result>
}

export namespace ILoadAccountByTokenRepository {
  export type Params = {
    token: string
    role?: string
  }
  export type Result = AccountModel | null
}
