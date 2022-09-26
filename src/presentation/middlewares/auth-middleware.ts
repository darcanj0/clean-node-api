import {
  forbidden,
  ok,
  serverError,
  AccessDeniedError,
  HttpResponse,
  IMiddleware,
  ILoadAccountByToken
} from './auth-middleware-protocols'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise <HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const account = await this.loadAccountByToken.load({ token: accessToken, role: this.role })
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
