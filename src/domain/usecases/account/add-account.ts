import { AccountModel } from '../../models/account'

export interface IAddAccount {
  add: (account: IAddAccount.Params) => Promise<IAddAccount.Result>
}

export namespace IAddAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Result = AccountModel | null
}
