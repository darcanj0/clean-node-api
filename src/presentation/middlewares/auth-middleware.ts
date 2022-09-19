import {
  forbidden,
  ok,
  serverError,
  AccessDeniedError,
  HttpRequest,
  HttpResponse,
  IMiddleware,
  ILoadAccountByToken
} from './auth-middleware-protocols'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise <HttpResponse> {
    try {
      const { headers } = httpRequest
      const accessToken = headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
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
