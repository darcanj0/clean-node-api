import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { IValidation } from '../signup/signup-controller-protocols'
import { HttpResponse, IAuthentication, IController } from './login-controller-protocols'

export class LoginController implements IController {
  constructor (private readonly authenticator: IAuthentication, private readonly validation: IValidation) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request

      const accessToken = await this.authenticator.auth({ email, password })
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
