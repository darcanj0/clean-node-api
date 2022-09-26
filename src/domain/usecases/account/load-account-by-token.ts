import { AccountModel } from '@/domain/models/account'

export interface ILoadAccountByToken {
  load: (params: ILoadAccountByToken.Params) => Promise<ILoadAccountByToken.Result>
}

export namespace ILoadAccountByToken {
  export type Params = {
    token: string
    role?: string
  }
  export type Result = AccountModel | null
}
