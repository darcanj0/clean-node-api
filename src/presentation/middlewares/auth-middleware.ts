import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { IMiddleware } from '../protocols/middleware'

export class AuthMiddleware implements IMiddleware {
  async handle (httpRequest: HttpRequest): Promise <HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
