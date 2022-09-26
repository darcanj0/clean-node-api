export interface IAuthentication {
  auth: (authentication: IAuthentication.Params) => Promise<IAuthentication.Result>
}

export namespace IAuthentication {
  export type Params = {
    email: string
    password: string
  }
  export type Result = string
}
