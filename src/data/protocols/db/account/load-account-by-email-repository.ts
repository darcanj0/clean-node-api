export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: ILoadAccountByEmailRepository.Params) => Promise<ILoadAccountByEmailRepository.Result>
}

export namespace ILoadAccountByEmailRepository {
  export type Params = string
  export type Result = {
    id: string
    email: string
    name: string
    password: string
  } | null
}
