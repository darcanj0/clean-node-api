import { AccountModel } from '../../../../domain/models/account'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountRepository.Params) => Promise<IAddAccountRepository.Result>
}

export namespace IAddAccountRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = AccountModel
}
