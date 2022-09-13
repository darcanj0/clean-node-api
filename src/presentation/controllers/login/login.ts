import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { IValidation } from '../signup/signup-protocols'
import { HttpRequest, HttpResponse, IAuthentication, IController } from './login-protocols'

export class LoginController implements IController {
  private readonly validation: IValidation
  private readonly authenticator: IAuthentication

  constructor (authenticator: IAuthentication, validation: IValidation) {
    this.validation = validation
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body

      const accessToken = await this.authenticator.auth({ email, password })
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
