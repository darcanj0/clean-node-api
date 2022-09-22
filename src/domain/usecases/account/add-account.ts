import { AccountModel } from '../../models/account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface IAddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
